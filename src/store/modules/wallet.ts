import { Module } from 'vuex';

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
  provider: string | null;
  assets: any[];
  connecting: boolean;
}

const walletModule: Module<WalletState, any> = {
  namespaced: true,
  
  state: (): WalletState => ({
    connected: false,
    address: null,
    balance: 0,
    provider: null,
    assets: [],
    connecting: false,
  }),
  
  mutations: {
    SET_CONNECTING(state, connecting: boolean) {
      state.connecting = connecting;
    },
    
    SET_CONNECTED(state, payload: { address: string; provider: string }) {
      state.connected = true;
      state.address = payload.address;
      state.provider = payload.provider;
      state.connecting = false;
    },
    
    SET_DISCONNECTED(state) {
      state.connected = false;
      state.address = null;
      state.provider = null;
      state.balance = 0;
      state.assets = [];
      state.connecting = false;
    },
    
    SET_BALANCE(state, balance: number) {
      state.balance = balance;
    },
    
    SET_ASSETS(state, assets: any[]) {
      state.assets = assets;
    },
  },
  
  actions: {
    async connect({ commit }, { address, provider }: { address: string; provider: string }) {
      commit('SET_CONNECTED', { address, provider });
    },
    
    async disconnect({ commit }) {
      commit('SET_DISCONNECTED');
    },
    
    async updateBalance({ commit }, balance: number) {
      commit('SET_BALANCE', balance);
    },
    
    async updateAssets({ commit }, assets: any[]) {
      commit('SET_ASSETS', assets);
    },
  },
  
  getters: {
    isConnected: (state) => state.connected,
    walletAddress: (state) => state.address,
    walletProvider: (state) => state.provider,
    walletBalance: (state) => state.balance,
    walletAssets: (state) => state.assets,
    isConnecting: (state) => state.connecting,
    
    // Tokengating helper
    hasAsset: (state) => (assetId: string) => {
      return state.assets.some(asset => asset['asset-id'] === parseInt(assetId));
    },
    
    getAssetBalance: (state) => (assetId: string) => {
      const asset = state.assets.find(asset => asset['asset-id'] === parseInt(assetId));
      return asset ? asset.amount : 0;
    },
  },
};

export default walletModule;