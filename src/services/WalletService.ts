import { EndpointDomains } from '@/models/EndpointDomains';
import store from '@/store';

export class WalletService {
  private isInitialized = false;

  constructor() {
    // Initialize any wallet state if needed
  }

  // Initialize the wallet connection
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // For now, just mark as initialized
      // In a real implementation, you would check for existing wallet connections
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
      throw error;
    }
  }

  // Connect to wallet (simplified placeholder)
  async connectWallet(): Promise<string[]> {
    try {
      // This is a placeholder for wallet connection
      // In a real implementation, you would integrate with a wallet library
      const mockAccount = 'PLACEHOLDER_ACCOUNT_ADDRESS';
      await this.handleAccountsChanged([mockAccount]);
      return [mockAccount];
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
      throw error;
    }
  }

  // Method to simulate having the required token for demo purposes
  simulateTokenOwnership(assetId: number, amount: number = 1): void {
    const currentAssets = (store.state as any).wallet?.userAssets || [];
    const updatedAssets = [...currentAssets, {
      assetId: assetId,
      amount: amount,
      isFrozen: false
    }];
    store.commit('wallet/setAssets', updatedAssets);
  }

  // Disconnect from wallet
  async disconnect(): Promise<void> {
    try {
      store.commit('wallet/clearWallet');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      throw error;
    }
  }

  // Handle account changes (connection/disconnection)
  private async handleAccountsChanged(accounts: string[]): Promise<void> {
    if (accounts.length === 0) {
      store.commit('wallet/clearWallet');
      return;
    }

    const connectedAccount = accounts[0]; // Use first account
    store.commit('wallet/setConnectedAccount', connectedAccount);
    store.commit('wallet/setConnectionStatus', true);
    
    // Update account information
    await this.updateAccountInfo(connectedAccount);
  }

  // Fetch account balance and assets
  private async updateAccountInfo(address: string): Promise<void> {
    try {
      const network = EndpointDomains.defaultNetwork;
      if (!network) {
        throw new Error('Default network not configured');
      }
      const requestURL = `https://${network.domain}/v2/accounts/${address}`;
      
      const response = await fetch(requestURL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const accountData = await response.json();
      
      // Update balance in microAlgos
      const balance = accountData.amount || 0;
      store.commit('wallet/setBalance', balance);
      
      // Update assets
      const assets = accountData.assets || [];
      const userAssets = assets.map((asset: any) => ({
        assetId: asset['asset-id'],
        amount: asset.amount,
        isFrozen: asset['is-frozen'] || false
      }));
      store.commit('wallet/setAssets', userAssets || []);
      
    } catch (error) {
      console.error('Failed to fetch account info:', error);
      throw error;
    }
  }

  // Get current wallet state
  getWalletState() {
    return (store.state as any).wallet;
  }

  // Check if user has a specific asset
  checkAssetRequirement(assetId: number, minimumAmount: number = 1): boolean {
    const walletState = this.getWalletState();
    if (!walletState.isConnected || !walletState.userAssets) {
      return false;
    }
    
    const asset = walletState.userAssets.find((a: any) => a.assetId === assetId);
    return asset ? asset.amount >= minimumAmount : false;
  }

  // Check if user holds any NFT from a collection
  checkNFTRequirement(collectionAssetIds: number[]): boolean {
    const walletState = this.getWalletState();
    if (!walletState.isConnected || !walletState.userAssets) {
      return false;
    }
    
    return walletState.userAssets.some((asset: any) => 
      collectionAssetIds.includes(asset.assetId) && asset.amount > 0
    );
  }

  // Check minimum ALGO balance (in microAlgos)
  checkAlgoBalance(minimumBalance: number): boolean {
    const walletState = this.getWalletState();
    return walletState.isConnected && walletState.balance >= minimumBalance;
  }
}

// Create singleton instance
const walletServiceInstance = new WalletService();
export default walletServiceInstance;