<template>
  <div id="page">
    <div id="new-banner">
      Hello and welcome to Algorand Ballet!
    </div>
    <section id="main" class="main">
      <v-row class="landingpage">
        <v-col cols="12" class="hero">
          <h1>
            OSINT Background-Checks <br>for Wallets and Assets
          </h1>

          <v-row>
            <v-col cols="12">
              <p>
                <u>Ballet helps you make your best-informed decision before interacting on the Algorand Blockchain.</u>
              </p>
              <p>
                Use qualitative analysis to get a sense of a wallet or assets "personality" using its track-record of
                past transactions and close relationships within the ecosystem.
              </p>

              <p>
                <v-btn class="cta"
                       href="?deeplink=true&network=main&accountid=37VPAD3CK7CDHRE4U3J75IE4HLFN5ZWVKJ52YFNBX753NNDN6PUP2N7YKI&focus=graph&layout=concentric"
                       color="primary"
                       elevation="5"
                >
                  Jump right in with this example!
                </v-btn>
                <br>
                &nbsp; or
                <br>&nbsp;
                <v-btn
                  @click="showDialog"
                  outlined
                  plain
                >
                  Learn more about Ballet
                </v-btn>
              </p>
            </v-col>
            <v-col cols="2"></v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>
    <section>
      <v-row class="landingpage demo hero">
        <v-col cols="12">
          <img src="https://raw.githubusercontent.com/akaalias/algorand-ballet/main/public/img/ballet-ui.png" class="ui-demo"/>
        </v-col>
      </v-row>
    </section>
    <section class="gallery">
      <h1 class="headline">Gallery</h1>
      <h2 class="headline">Example Relationships Between Wallets, Assets and Applications</h2>
      <v-row class="landingpage demo">
        <v-col cols="4" v-for="image in galleryImageFilenames" class="gallery-image">
          <img :src="cdnURLForGalleryImage(image)" class="gallery-img"/>
        </v-col>
      </v-row>
    </section>
    <footer>
      <p>
        Copyright 2025 –
        Made with love by <a href="https://alexisrondeau.me" target="_blank">Alexis Rondeau</a> –
        <a href="https://github.com/akaalias/algorand-ballet" target="_blank">Open Source on Github</a> -
        Relaunched by <a href="https://igetalgo.com" target="_blank">iGetAlgo</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Landingpage",
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
    cdnURLForGalleryImage(filename) {
      return "https://raw.githubusercontent.com/akaalias/algorand-ballet/main/public/gallery/" + filename + ".png";
    }
  }
}
</script>

<style scoped>
.landingpage h1 {
  margin-top: 100px;
  font-size: 48pt;
  text-align: center;
}

.landingpage p, .contact p {
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 18pt;
  text-align: center;
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
  margin-top: 50px;
  padding-bottom: 50px;
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



#new-banner {
  background-color: #d0542b;
  padding: 5px;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 0px;
  left: 0px;
}


</style>