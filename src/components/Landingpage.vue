<template>
  <div id="page">
    <div id="welcome-banner">
      iGetAlgo Welcomes you to the Algo Ballet
    </div>
    <section id="main" class="main">
      <v-container fluid class="pa-0">
        <v-row class="landingpage">
          <v-col cols="12" class="hero">
          <div class="hero-content">
            <h1 class="modern-title">
              OSINT Background-Checks
              <br><span class="accent-text">for Wallets and Assets</span>
            </h1>
            
            <div class="hero-subtitle">
              Ballet helps you make your best-informed decision before interacting on the Algorand Blockchain.
            </div>
            
            <p class="hero-description">
              Use qualitative analysis to get a sense of a wallet or assets "personality" using its track-record of
              past transactions and close relationships within the ecosystem.
            </p>

            
            <div class="hero-actions">
              <v-btn 
                class="cta-primary"
                href="?deeplink=true&network=main&accountid=37VPAD3CK7CDHRE4U3J75IE4HLFN5ZWVKJ52YFNBX753NNDN6PUP2N7YKI&focus=graph&layout=concentric"
                color="#4CAF50"
                large
                rounded
                elevation="3"
              >
                Try Live Demo
              </v-btn>
              
              <v-btn
                @click="showDialog"
                class="cta-secondary"
                outlined
                large
                rounded
                color="white"
              >
                Learn More
              </v-btn>
            </div>
            
            <div style="margin-top: 40px;" class="floating-search-container">
              <div class="floating-search-card">
                <SearchForm :parentAccountID="parentAccountID"
                            @searchReady="handleSearchReady($event)"
                            @showInformationOverlay="handleShowInformationOverlay($event)"
                />
              </div>
            </div>
          </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="demo-section">
      <v-container>
        <v-row class="justify-center">
          <v-col cols="12" lg="10">
            <div class="demo">
              <img src="https://raw.githubusercontent.com/akaalias/algorand-ballet/main/public/img/ballet-ui.png" class="ui-demo"/>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="gallery">
      <v-container>
        <h1 class="headline">Gallery</h1>
        <h2 class="headline">Example Relationships Between Wallets, Assets and Applications</h2>
        <v-row class="landingpage demo">
          <v-col cols="12" sm="6" md="4" v-for="image in galleryImageFilenames" :key="image" class="gallery-image">
            <img :src="cdnURLForGalleryImage(image)" class="gallery-img"/>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <footer>
      <v-container>
        <p>
          Copyright 2025 –
          Made with love by <a href="https://alexisrondeau.me" target="_blank">Alexis Rondeau</a> –
          <a href="https://github.com/akaalias/algorand-ballet" target="_blank">Open Source on Github</a> -
          Relaunched by <a href="https://igetalgo.com" target="_blank">iGetAlgo</a>
        </p>
      </v-container>
    </footer>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";

export default {
  name: "Landingpage",
  components: {
    SearchForm
  },
  props: ["parentAccountID"],
  data: () => ({
    galleryImageFilenames: [
      "app-asset-family", "app-cross", "application-relationships",
      "trickle-down", "weighted-asset-transactions", "web-relationships", "asset-relationship-connection",
      "complexity", "grid-red", "strong-relationships","network",
      "incoming-outgoing-txs","cross", "inner-circle","balanced-transactions",
      "extraction", "transaction-details","centered",

    ],
  }),
  methods: {
    showDialog() {
      this.$emit('popupDialog', {});
    },
    handleSearchReady(event) {
      this.$emit('searchReady', event);
    },
    handleShowInformationOverlay(event) {
      this.$emit('showInformationOverlay', event);
    },
    cdnURLForGalleryImage(filename) {
      return "https://raw.githubusercontent.com/akaalias/algorand-ballet/main/public/gallery/" + filename + ".png";
    }
  }
}
</script>

<style scoped>
.hero {
  padding: 20px 20px 60px 20px;
  text-align: center;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(45, 45, 45, 0.1) 100%);
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.modern-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.accent-text {
  color: #4CAF50;
  font-weight: 600;
}

.hero-subtitle {
  font-size: 1.4rem;
  font-weight: 500;
  color: #4CAF50;
  margin-bottom: 20px;
  line-height: 1.4;
}

.hero-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
}

.cta-primary {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: none;
  padding: 12px 32px;
}

.cta-secondary {
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: none;
  padding: 12px 32px;
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.cta-secondary:hover {
  border-color: #4CAF50;
  color: #4CAF50;
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 16px;
    min-height: 60vh;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions .v-btn {
    width: 250px;
  }
}



.demo-section {
  padding: 60px 0;
  text-align: center;
}

.demo-section img {
  width: 100%;
  max-width: 100%;
}

.gallery-image {
  padding: 8px;
}

.demo {
  text-align: center;
  width: 100%;
}

.demo img {
  width: 100%;
}

footer {
  border-top: 2px dotted #1e1e1e;
  padding: 40px;
  margin-top: 100px;
  font-size: 10pt;
  text-align: center;
  opacity: 0.3;
}

footer:hover {
  opacity: 1;
}

.portrait {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  padding: 10px;
  background: #fff;
}

.ui-demo {
  border-radius: 10px;
  border: 10px solid #333;
  transition: border 1s ease-out 100ms;
}

.ui-demo:hover {
  border: 10px solid #fff;
  padding: 0px;
}

.gallery {
  padding: 60px 0;
  background-color: #0F0F0F;
}

h1.headline {
  font-size: 38pt !important;
  text-align: center;
  line-height: 48pt;
  color: #eee;
  font-weight: lighter;
}

h2.headline {
  font-size: 24pt !important;
  text-align: center;
  line-height: 48pt;
  font-weight: lighter;
}

.gallery-img {
  border-radius: 5px;
  transition: border 0.5s ease-out 100ms;
  border: 5px solid #0F0F0F;
  width: 100%;
}

.gallery-img:hover {
  border: 5px solid #fff;
  padding: 0px;
}

img {
  width: 100%;
}




#welcome-banner {
  background-color: #4CAF50;
  padding: 8px 0;
  width: 100vw;
  text-align: center;
  color: white;
  font-weight: 500;
  font-size: 18px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: -20px 0 0 0;
}

@media (max-width: 768px) {
  #welcome-banner {
    font-size: 12px;
    padding: 6px 0;
  }
}

@media (max-width: 480px) {
  #welcome-banner {
    font-size: 11px;
    padding: 4px 0;
  }
}

.floating-search-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.floating-search-card {
  background: rgba(45, 45, 45, 0.95) !important;
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.floating-search-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

/* Style the search form elements inside the floating card */
.floating-search-card >>> .v-text-field .v-label {
  color: rgba(255, 255, 255, 0.7) !important;
}

.floating-search-card >>> .v-text-field input {
  color: white !important;
}

.floating-search-card >>> .v-text-field .v-input__icon .v-icon {
  color: rgba(255, 255, 255, 0.7) !important;
}

.floating-search-card >>> .v-messages__message {
  color: rgba(255, 255, 255, 0.8) !important;
}

.floating-search-card >>> .align-right {
  color: rgba(255, 255, 255, 0.9) !important;
}

@media (max-width: 768px) {
  .floating-search-card {
    margin: 0 16px;
    border-radius: 12px;
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .floating-search-container {
    padding: 0 8px;
  }
  
  .floating-search-card {
    padding: 16px;
  }
}

</style>