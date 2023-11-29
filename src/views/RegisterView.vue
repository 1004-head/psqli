<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5">
            <div class="mb-3">
              <input type="text" class="form-control" id="Name" placeholder="name">
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="Nickname" placeholder="nickname">
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="loginID" aria-describedby="emailHelp"
                placeholder="loginID">
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="password">
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
  data() {
    return {
      userName: null,
      userNickname: null,
      userId: null,
      userPassword: null,
    };
  },
  methods: {
    loginSubmit() {
      let saveData = {};
      saveData.userName = this.userName;
      saveData.userNickname = this.userNickname;
      saveData.userId = this.userId;
      saveData.userPassword = this.userPassword;

      try {
        this.$axios
          .post('localhost' + "/auth/register", JSON.stringify(saveData), {
            headers: {
              "Content-Type": `application/json`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // 로그인 성공시 처리해줘야할 부분
              this.$store.commit("login", res.data);
              this.$router.push("/")
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>