<template>
  <div class="search-form-wrapper">
    <v-form id="searchForm">
    <v-row>
      <v-col cols="1" class="pt-8">
        <div class="align-right"
             v-if="accountIDHistory.length < 1"
        >
          Start
          <v-icon>
            mdi-chevron-right
          </v-icon>

        </div>
        <v-btn
        small
        @click="goBack"
        v-if="accountIDHistory.length > 1"
        >
          <v-icon>
            mdi-chevron-left
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="accountID"
          :rules="accountIDRules"
          label="Enter Algorand Account, Asset ID, or NFD (e.g., algo.algo)"
          required
          single-line
          clearable
          class="top-z"
          :loading="isResolvingNFD"
          :hint="nfdHint"
          persistent-hint
        ></v-text-field>
      </v-col>
      <v-col class="pt-7"
             cols="2"
      >
        <v-btn
          color="#4CAF50"
          elevation="2"
          v-on:click="searchReady"
          :disabled="isDisabled ? false : true"
          class="top-z"
          block
        >
          <v-icon>mdi-search-web</v-icon>

          Search
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
  </div>
</template>

<script>
import { EndpointDomains } from "../models/EndpointDomains";
import { NFDService } from "../models/NFDService";

export default {
  name: "SearchForm",
  props: ["parentAccountID"],
  data:() => ({
    accountID: "",
    isResolvingNFD: false,
    nfdHint: "",
    accountIDRules: [
      (v) => !!v || "Account ID, Asset ID, or NFD is required",
      (v) => (v.length === 58 || v.length >= 6 || NFDService.isNFDFormat(v)) || "Must be an account ID, asset ID, or NFD (e.g., algo.algo)",
    ],
    selectedNetwork: EndpointDomains.defaultNetwork, // Always use MainNet
    accountIDHistory: [],
    exampleDeepLinks: [ {
                          accountID: "37VPAD3CK7CDHRE4U3J75IE4HLFN5ZWVKJ52YFNBX753NNDN6PUP2N7YKI",
                          url: "/algorand-ballet/?deeplink=true&network=main&accountid=37VPAD3CK7CDHRE4U3J75IE4HLFN5ZWVKJ52YFNBX753NNDN6PUP2N7YKI&focus=graph&layout=concentric"
                        }
                        ],
    currentDeepLink: {}
  }),
  methods: {
    async searchReady(isDeeplink = false) {
      // Tokengating temporarily removed - search is open to all users
      
      let finalAccountID = this.accountID;
      let originalNFD = null;
      
      // Check if input is an NFD and resolve it
      if (NFDService.isNFDFormat(this.accountID)) {
        originalNFD = this.accountID;
        this.isResolvingNFD = true;
        this.nfdHint = "Resolving NFD...";
        
        try {
          const resolvedAddress = await NFDService.resolveNFD(this.accountID);
          if (resolvedAddress) {
            finalAccountID = resolvedAddress;
            this.nfdHint = `Resolved to: ${resolvedAddress} (${originalNFD})`;
          } else {
            this.nfdHint = "NFD not found or could not be resolved";
            this.isResolvingNFD = false;
            return; // Don't proceed with search if NFD couldn't be resolved
          }
        } catch (error) {
          this.nfdHint = "Error resolving NFD";
          this.isResolvingNFD = false;
          return;
        }
        
        this.isResolvingNFD = false;
      } else {
        this.nfdHint = "";
      }
      
      this.notify(finalAccountID);
    },
    goBack() {
      const topAccountID = this.accountIDHistory.pop();
      const previousAccountID = this.accountIDHistory.pop();
      this.accountID = previousAccountID;
      this.notify();
    },
    notify(resolvedAccountID = null) {
      const accountToUse = resolvedAccountID || this.accountID;
      this.$emit('searchReady', {accountID: accountToUse, network: EndpointDomains.defaultNetwork});
    },
    calculateColumnsForSearchButton() {
      if(accountIDHistory.length > 1) {
        return 2
      } else {
        return 3
      }
    },
    getRandomDeepLink() {
      return this.exampleDeepLinks[Math.floor(Math.random() * this.exampleDeepLinks.length)];
    },
    notifyToShowInformationOverlay() {
      this.$emit('showInformationOverlay', {});
    }
  },
  watch: {
    parentAccountID: function(newVal, oldVal) {
      this.accountID = newVal;
      this.accountIDHistory.push(newVal);
    }
  },
  computed: {
    isDisabled() {
      // Enable search for valid account IDs, asset IDs, or NFDs
      return (this.accountID.length === 58 || this.accountID.length >= 6 || NFDService.isNFDFormat(this.accountID)) && !this.isResolvingNFD;
    }
  },
  mounted: function() {
    // Always use MainNet - no network parameter handling needed
    const accountIDParam = this.$route.query.accountid;
    if(!!accountIDParam && accountIDParam.length === 58) {
      this.accountID = accountIDParam;
      this.searchReady(true); // Pass true to indicate this is a deeplink/URL parameter
    }

    this.currentDeepLink = this.getRandomDeepLink();
  }
};
</script>

<style scoped>

.top-z {
  z-index: 101;
}

.align-right {
  text-align: right;
}
</style>