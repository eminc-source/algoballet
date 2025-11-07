<template>
  <v-form>
    <v-row align="center">
      <v-col cols="4"> </v-col>
      <v-col cols="4">
        <h1 class="text-h6">
          <v-icon>mdi-account-check</v-icon>
          Please configure your API Key
        </h1>
        <p>
          Hi there! This application now uses Nodely's free Algorand API service,
          so no API key is required for basic functionality.
        </p>

        <p>
          We've switched to <a href="https://nodely.io/">Nodely</a>: It works really well, 
          it's free for public use and provides reliable access to Algorand blockchain data. 
          (I have no affiliation with Nodely)
        </p>

        <p>
          If you have an API key for enhanced features, you can enter it below. 
          It will be stored locally for the duration of your session.
        </p>

        <br />
        <v-row class="">
          <v-col cols="9">
            <v-text-field
              v-model="userAPIKey"
              :rules="userAPIKeyRules"
              label="My API Key"
              required
              @keydown.enter.prevent="setAPIKey()"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn
              :disabled="!isAPIKeyValid"
              @click="setAPIKey()"
              color="primary"
            >Set Key</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4"> </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { EndpointDomains } from "../models/EndpointDomains";

export default {
  name: "APIKeyForm",
  data:() => ({
    apiKey: EndpointDomains.key,
    userAPIKey: EndpointDomains.key,
    userAPIKeyRules: [
      (v) => !!v || "API Key is required",
      (v) => v.length === 40 || "API Key must be exactly 40 characters",
    ],
  }),
  methods: {
    setAPIKey() {
      if (this.userAPIKey.length == 40) {
        this.apiKey = this.userAPIKey;
        this.$emit('apiKeySet', this.apiKey);
      }
    }
  },
  computed: {
    isAPIKeyValid() {
      return this.userAPIKey.length == 40;
    }
  },
};
</script>

<style scoped>

</style>