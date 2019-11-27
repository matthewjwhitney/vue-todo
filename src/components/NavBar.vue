<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://myndshft.com">
        <img src="../assets/img/logo-light.png" width="112" height="28">
      </a>
      <div class="navbar-start">
        <div class="navbar-item has-text-light">{{ subtitle }}</div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    subtitle: String
  }
};
</script>
