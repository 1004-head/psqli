<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card my-5">

          <form v-on:submit.prevent="loginSubmit" class="card-body cardbody-color p-lg-5">
            <div class="mb-3">
              <input type="text" class="form-control" id="loginID" v-model="loginID" aria-describedby="emailHelp"
                placeholder="loginID">
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" v-model="password" placeholder="password">
            </div>
            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
              Registered? <a href="/register" class="text-dark fw-bold"> Create an
                Account</a>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-color{
  background-color: #226cf6;
  color: #fff; 
}

a{
  text-decoration: none;
}
</style>

<script>
export default {
  data() {
    return {
      loginId: '',
      password: '',
      isAdmin: false,
      isMaker: false,
    };
  },
  methods: {
    loginSubmit() {
      var data = {
        loginID: this.loginID,
        password: this.password,
        isAdmin: this.isAdmin,
        isMaker: this.isMaker
      };

      try {
        this.$axios
          .post(this.$serverUrl + "/auth/login", JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // 로그인 성공시 처리해줘야할 부분
              console.log(res.data);
              window.localStorage.setItem("jwt", res.data["Authorization"]);
              this.$router.replace("/").then(()=>{window.location.reload();});
            }
            if (res.status === 404){
              alert(res.data.toString());
              window.location.reload();
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>