<template>
  <v-app-bar
    app
    color="transparent"
    flat
    height="80"
    class="app-header"
  >
    <div class="d-flex align-center logo-container" @click="goHome">
      <img
        src="/img/ballet-logo.png"
        alt="Algorand Ballet"
        class="logo"
      />
      <div class="ml-3">
        <h1 class="logo-text">Algorand Ballet</h1>
        <p class="logo-subtitle">Qualitative Blockchain Analysis</p>
      </div>
    </div>

    <v-spacer></v-spacer>

    <!-- iGA Eco App Branding -->
    <div class="d-flex align-center mr-4">
      <div class="text-right mr-2">
        <p class="iga-text">An <a href="https://igetalgo.com" target="_blank" class="iga-link">iGA</a> Eco App</p>
      </div>
      <img
        src="/img/iga-logo.png"
        alt="iGA Logo"
        class="iga-logo"
        @click="openIGA"
      />
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  
  methods: {
    goHome() {
      // Always reload the page to ensure we get back to the landing page
      window.location.href = '/';
    },
    openIGA() {
      window.open('https://igetalgo.com', '_blank');
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

.logo-container {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.logo-container:hover {
  transform: scale(1.05);
}

.logo {
  height: 40px;
  width: 40px;
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

.iga-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 500;
}

.iga-link {
  color: #4CAF50;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.iga-link:hover {
  color: #66BB6A;
  text-decoration: underline;
}

.iga-logo {
  height: 32px;
  width: 32px;
  cursor: pointer;
  transition: transform 0.2s ease;
  border-radius: 4px;
}

.iga-logo:hover {
  transform: scale(1.1);
}
</style>