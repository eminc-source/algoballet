export class NFDService {
  private static readonly NFD_API_BASE = "https://api.nf.domains";
  private static nfdCache = new Map<string, string | null>();
  private static reverseCache = new Map<string, string | null>();
  private static pendingLookups = new Map<string, Promise<string | null>>();
  
  /**
   * Resolve NFD name to Algorand address using the official NFD API
   * @param nfdName The NFD name (e.g., "algo.algo", "example.algo")
   * @returns Promise<string | null> The resolved Algorand address or null if not found
   */
  public static async resolveNFD(nfdName: string): Promise<string | null> {
    try {
      // Clean the NFD name - remove any protocol, spaces, and normalize
      const cleanNFDName = nfdName.trim().toLowerCase().replace(/^https?:\/\//, '');
      
      // Check if it looks like an NFD (ends with .algo)
      if (!cleanNFDName.endsWith('.algo')) {
        return null;
      }
      
      // Use the direct NFD endpoint: GET /nfd/{name}
      const response = await fetch(`${this.NFD_API_BASE}/nfd/${encodeURIComponent(cleanNFDName)}`, {
        method: "GET",
        headers: { 
          accept: "application/json"
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          console.log(`NFD not found: ${cleanNFDName}`);
        } else {
          console.log(`NFD resolution failed for ${cleanNFDName}: ${response.status}`);
        }
        return null;
      }
      
      const data = await response.json();
      
      // NFD API returns the owner address in the "owner" field
      if (data && data.owner) {
        const ownerAddress = data.owner;
        console.log(`NFD resolved: ${cleanNFDName} -> ${ownerAddress}`);
        return ownerAddress;
      }
      
      return null;
    } catch (error) {
      console.error(`Error resolving NFD ${nfdName}:`, error);
      return null;
    }
  }
  
  /**
   * Check if a string looks like an NFD name
   * @param input The input string to check
   * @returns boolean True if it looks like an NFD
   */
  public static isNFDFormat(input: string): boolean {
    const cleaned = input.trim().toLowerCase();
    // NFDs typically end with .algo
    return cleaned.endsWith('.algo') && cleaned.length > 5;
  }
  
  /**
   * Check if a string is a valid Algorand address
   * @param input The input string to check
   * @returns boolean True if it's a valid Algorand address format
   */
  public static isAlgorandAddress(input: string): boolean {
    // Algorand addresses are 58 characters long and base32 encoded
    return input.length === 58 && /^[A-Z2-7]+$/.test(input);
  }
  
  /**
   * Reverse lookup: Get NFD name for an Algorand address
   * @param address The Algorand address to lookup
   * @returns Promise<string | null> The NFD name or null if not found
   */
  public static async reverseNFDLookup(address: string): Promise<string | null> {
    if (!this.isAlgorandAddress(address)) {
      return null;
    }
    
    // Check cache first
    if (this.reverseCache.has(address)) {
      return this.reverseCache.get(address) || null;
    }
    
    // Check if lookup is already in progress
    if (this.pendingLookups.has(address)) {
      return this.pendingLookups.get(address) || null;
    }
    
    // Start new lookup
    const lookupPromise = this.performReverseLookup(address);
    this.pendingLookups.set(address, lookupPromise);
    
    const result = await lookupPromise;
    
    // Cache the result and clean up pending lookup
    this.reverseCache.set(address, result);
    this.pendingLookups.delete(address);
    
    return result;
  }
  
  /**
   * Perform the actual reverse NFD lookup
   * @param address The Algorand address
   * @returns Promise<string | null>
   */
  private static async performReverseLookup(address: string): Promise<string | null> {
    try {
      // Use NFD API reverse lookup endpoint
      const response = await fetch(`${this.NFD_API_BASE}/nfd/lookup?address=${encodeURIComponent(address)}&view=tiny`, {
        method: "GET",
        headers: { 
          accept: "application/json"
        },
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          console.log(`No NFD found for address: ${address}`);
        } else {
          console.log(`NFD reverse lookup failed for ${address}: ${response.status}`);
        }
        return null;
      }
      
      const data = await response.json();
      
      // NFD reverse lookup returns an object with addresses as keys
      // Each address key contains an object with NFD info including the 'name' property
      if (data && typeof data === 'object') {
        const addressData = data[address];
        if (addressData && addressData.name) {
          console.log(`NFD reverse lookup: ${address} -> ${addressData.name}`);
          return addressData.name;
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Error in reverse NFD lookup for ${address}:`, error);
      return null;
    }
  }
  
  /**
   * Get display name for an address - returns NFD if available, otherwise truncated address
   * @param address The Algorand address
   * @param maxLength Maximum length for truncated address (default: 8)
   * @returns Promise<string> Either NFD name or truncated address
   */
  public static async getDisplayName(address: string, maxLength: number = 8): Promise<string> {
    if (!this.isAlgorandAddress(address)) {
      return address; // Return as-is if not a valid address
    }
    
    const nfdName = await this.reverseNFDLookup(address);
    if (nfdName) {
      return nfdName;
    }
    
    // Fallback to truncated address
    return `${address.substring(0, maxLength)}...`;
  }
  
  /**
   * Batch lookup NFDs for multiple addresses (efficient for visualizations)
   * @param addresses Array of Algorand addresses
   * @returns Promise<Map<string, string>> Map of address -> display name
   */
  public static async batchGetDisplayNames(addresses: string[]): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    
    // Filter valid addresses and remove duplicates
    const validAddresses = [...new Set(addresses.filter(addr => this.isAlgorandAddress(addr)))];
    
    // Batch process with limited concurrency to avoid overwhelming the API
    const batchSize = 5;
    const batches = [];
    
    for (let i = 0; i < validAddresses.length; i += batchSize) {
      const batch = validAddresses.slice(i, i + batchSize);
      batches.push(batch);
    }
    
    for (const batch of batches) {
      const promises = batch.map(async (address) => {
        const displayName = await this.getDisplayName(address);
        results.set(address, displayName);
      });
      
      await Promise.all(promises);
      
      // Small delay between batches to be respectful to the API
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return results;
  }

  /**
   * Batch lookup NFDs for multiple addresses (returns only actual NFD names, not fallbacks)
   * @param addresses Array of Algorand addresses
   * @returns Promise<Map<string, string>> Map of address -> NFD name (only includes addresses with NFDs)
   */
  public static async batchGetNFDNames(addresses: string[]): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    
    // Filter valid addresses and remove duplicates
    const validAddresses = [...new Set(addresses.filter(addr => this.isAlgorandAddress(addr)))];
    
    // Batch process with limited concurrency to avoid overwhelming the API
    const batchSize = 5;
    const batches = [];
    
    for (let i = 0; i < validAddresses.length; i += batchSize) {
      const batch = validAddresses.slice(i, i + batchSize);
      batches.push(batch);
    }
    
    for (const batch of batches) {
      const promises = batch.map(async (address) => {
        const nfdName = await this.reverseNFDLookup(address);
        if (nfdName) {
          results.set(address, nfdName);
        }
      });
      
      await Promise.all(promises);
      
      // Small delay between batches to be respectful to the API
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return results;
  }
  
  /**
   * Clear the NFD caches (useful for testing or memory management)
   */
  public static clearCaches(): void {
    this.nfdCache.clear();
    this.reverseCache.clear();
    this.pendingLookups.clear();
  }
}