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
          <li v-if="isLogin() == true" class="nav-item">
            <router-link to="/post" class="nav-link">Post</router-link>
          </li>
          <li v-if="isLogin() == true" class="nav-item">
            <router-link to="/challenge" class="nav-link">Challenge</router-link>
          </li>
          <li v-if="isLogin() == true" class="nav-item">
            <router-link to="/score" class="nav-link">Score</router-link>
          </li>
          <li v-if="isLogin() && isAdmin()" class="nav-item">
            <router-link to="/users" class="nav-link">Users</router-link>
          </li>
        </ul>
        <ul v-if="isLogin() == true" class="d-flex navbar-nav mb-2 mb-lg-0">
          <li>
            <a v-on:click="fnView()" class="nav-link">profile</a>
          </li>
          <li>
            <a v-on:click="fnLogout()" class="nav-link">logout</a>
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
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
    }
  },
  methods:{
    isLogin(){
      var token = localStorage.getItem("jwt");
      if (typeof token === "string") {
        return true;
      }else{
        return false;
      }
    },
    fnView() {
      const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      };
      var token = localStorage.getItem("jwt");
      var parseToken = parseJwt(token);
      var idx = parseToken["userID"];
      this.requestBody.idx = idx
      if(parseToken["isMaker"]){
        this.requestBody.role = "maker";
      }else if(parseToken["isAdmin"]){
        this.requestBody.role = "admin";
      }else{
        this.requestBody.role = "user";
      }
      this.$router.push({
        path: '/user/detail',
        query: this.requestBody
      })
    },
    fnLogout(){
      localStorage.removeItem("jwt");
      this.$router.replace("/").then(()=>{window.location.reload();});
    },
    isAdmin(){
      const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      };
      var token = localStorage.getItem("jwt");
      var deJWT = parseJwt(token);
      return deJWT['isAdmin'];
    }
  }
}
</script>