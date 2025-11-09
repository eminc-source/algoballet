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
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppHeader',
  
  methods: {
    goHome() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
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