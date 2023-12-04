<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card my-5">

          <form v-on:submit.prevent="registerSubmit" class="card-body cardbody-color p-lg-5">
            <div class="mb-3">
              <input type="text" class="form-control" id="name" v-model="name" placeholder="name">
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="nickname" v-model="nickname" placeholder="nickname">
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="loginID" v-model="loginID" aria-describedby="emailHelp"
                placeholder="loginID">
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" v-model="password" placeholder="password">
            </div>
            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Register</button></div>
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
  
  data: function() {
    return {
      name: '',
      nickname: '',
      loginID: '',
      password: '',
      isAdmin: false,
      isMaker: false,
    }
  },
  methods: {
    registerSubmit() {
      var data = {
        name: this.name,
        nickname: this.nickname,
        loginID: this.loginID,
        password: this.password,
        isAdmin: false,
        isMaker: false
      };

      try {
        this.$axios.post(this.$serverUrl + "/auth/register", JSON.stringify(data), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // 로그인 성공시 처리해줘야할 부분
              //this.$store.commit("login", res.data);
              console.log(res.data);
              window.localStorage.setItem("jwt", res.data["Authorization"]);
              this.$router.replace("/").then(()=>{window.location.reload();});
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>