<template>
  <v-app-bar
    app
    color="transparent"
    flat
    height="60"
    class="app-header"
  >
    <div class="d-flex align-center">
      <img
        src="/img/ballet-logo.png"
        alt="Algorand Ballet"
        class="logo"
        @click="goHome"
      />
      <div class="ml-3">
        <h1 class="logo-text">Algorand Ballet</h1>
        <p class="logo-subtitle">Qualitative Blockchain Analysis</p>
      </div>
    </div>

    <v-spacer></v-spacer>

    <!-- Wallet Connection Section -->
    <div class="d-flex align-center">
      <!-- Not Connected State -->
      <div v-if="!isConnected && !isConnecting">
        <v-btn
          @click="connectWallet"
          color="primary"
          outlined
          class="mr-2"
        >
          <v-icon left>mdi-wallet</v-icon>
          Connect Wallet
        </v-btn>
      </div>

      <!-- Connecting State -->
      <div v-if="isConnecting">
        <v-btn
          color="primary"
          outlined
          disabled
          class="mr-2"
        >
          <v-progress-circular
            indeterminate
            size="20"
            width="2"
            class="mr-2"
          ></v-progress-circular>
          Connecting...
        </v-btn>
      </div>

      <!-- Connected State -->
      <div v-if="isConnected && !isConnecting" class="d-flex align-center">
        <v-chip
          color="success"
          outlined
          class="mr-2"
        >
          <v-icon left small>mdi-check-circle</v-icon>
          {{ truncatedAddress }}
        </v-chip>
        
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Balance</v-list-item-title>
                <v-list-item-subtitle>{{ walletBalance.toFixed(4) }} ALGO</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Assets</v-list-item-title>
                <v-list-item-subtitle>{{ walletAssets.length }} tokens</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
            <v-divider></v-divider>
            
            <v-list-item @click="disconnectWallet">
              <v-list-item-icon>
                <v-icon color="error">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Disconnect</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';
import walletService from '../services/WalletService';

export default {
  name: 'AppHeader',
  
  computed: {
    ...mapGetters('wallet', [
      'isConnected',
      'isConnecting',
      'walletAddress',
      'walletBalance',
      'walletAssets'
    ]),
    
    truncatedAddress() {
      if (!this.walletAddress) return '';
      return `${this.walletAddress.slice(0, 6)}...${this.walletAddress.slice(-4)}`;
    }
  },
  
  data() {
    return {
      isConnecting: false
    };
  },

  async mounted() {
    // Initialize wallet service
    await walletService.initialize();
  },
  
  methods: {
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    
    async connectWallet() {
      this.isConnecting = true;
      try {
        await walletService.connectWallet();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        // You could show a toast/snackbar here
      } finally {
        this.isConnecting = false;
      }
    },
    
    async disconnectWallet() {
      try {
        await walletService.disconnect();
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
      }
    }
  }
};
</script>

<style scoped>
.app-header {
  background: rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  height: 40px;
  width: 40px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0;
  line-height: 1.2;
}

.logo-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1;
}
</style>