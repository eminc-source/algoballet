export class EndpointDomains {
  public static key = ""; // No longer needed with free indexer
  
  public static apiNetworks = [
    {
      name: "MainNet",
      domain: "mainnet-idx.4160.nodely.dev",
      algoExplorerDomain: "explorer.perawallet.app",
      key: "main"
    },
    {
      name: "TestNet",
      domain: "testnet-idx.4160.nodely.dev",
      algoExplorerDomain: "explorer.perawallet.app", 
      key: "test"
    },
    {
      name: "BetaNet",
      domain: "betanet-idx.4160.nodely.dev",
      algoExplorerDomain: "explorer.perawallet.app",
      key: "beta"
    },
  ];

  public static defaultNetwork = EndpointDomains.apiNetworks.find(x => x.key === "main");
  public static getNetworkForKey(key: string) { return EndpointDomains.apiNetworks.find(x => x.key === key); }
}