<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">PSQLI</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/challenge" class="nav-link">Challenge</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/score" class="nav-link">Score</router-link>
          </li>
        </ul>
        <ul v-if="isLogin() == true" class="d-flex navbar-nav mb-2 mb-lg-0">
          <li>
            <router-link to="/profile" class="nav-link">profile</router-link>
          </li>
        </ul>
        <ul v-else class="d-flex navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/login" class="nav-link" >login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" >register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default{
  methods:{
    isLogin(){
      var token = localStorage.getItem("jwt");
      console.log(typeof token);
      if (typeof token === "string") {
        return true;
      }else{
        return false;
      }
    }
  }
}
</script>