<template>
    <div class="board-detail">
      <div v-if="isMaker() || isAdmin()" class="common-buttons">
        <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      </div>
      <div class="board-contents">
        <h3>{{ title }}</h3>
        <div>
          <strong class="w3-large">{{ author }}</strong>
          <br>
          <span>score : {{ score }}</span>
          <br>
          <span>maker : {{ maker }}</span>
        </div>
      </div>
      <div class="board-contents">
        <span>{{ contents }}</span>
      </div>
      <div v-if="isMaker() == false" class="common-buttons">
        <form v-on:submit.prevent="answerSubmit" class="card-body cardbody-color p-lg-5">
            <div class="mb-3">
              <input type="text" class="form-control" id="answer" v-model="answer" placeholder="NICETAUREN{...}">
            </div>
            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Submit</button></div>
          </form>
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
    data() { //변수생성
      return {
        requestBody: this.$route.query,
        idx: this.$route.query.idx,
  
        title: '',
        maker: '',
        mid: '',
        contents: '',
        score: '',
      }
    },
    mounted() {
      this.fnGetView()
    },
    methods: {
      fnGetView() {
        this.$axios.get(this.$serverUrl + '/challenge/get/' + this.idx, {
          params: this.requestBody
        }).then((res) => {
          this.title = res.data[1]
          this.maker = res.data[5]
          this.contents = res.data[2]
          this.score = res.data[3]
          window.localStorage.setItem("challenge", JSON.stringify(res.data));
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      },
      fnDelete() {
        if (!confirm("삭제하시겠습니까?")) return
  
        this.$axios.delete(this.$serverUrl + '/challenge/delete/' + this.idx, {})
            .then(() => {
              alert('삭제되었습니다.')
              this.$router.replace("/challenge").then(()=>{window.location.reload();});
            }).catch((err) => {
          console.log(err);
        })
      },
      isMaker(){
      const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      };
      var token = localStorage.getItem("jwt");
      if (typeof token === "string"){
        var deJWT = parseJwt(token);
        return deJWT['isMaker'];
      }else{
        return false;
      }
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
    },
    answerSubmit() {
      var answerData = {
        title: JSON.parse(window.localStorage.getItem("challenge"))[1],
        answer: this.answer,
        mid: JSON.parse(window.localStorage.getItem("challenge"))[4]
      };

      function getWithExpiry(key){
        const itemStr = localStorage.getItem(key)

        if(!itemStr){
          return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        if(now.getTime() > item.expiry){
          localStorage.removeItem(key)
          return null
        }
        return item.value
      }
      var token = getWithExpiry("jwt");
      console.log(token);
      
      try {
        this.$axios
          .post(this.$serverUrl + "/score/check_answer", JSON.stringify(answerData), {
            headers: {
              "Content-Type": `application/json`,
              "Authorization": token
            },
          })
          .then((res) => {
            if (res.status === 200) {
              // 로그인 성공시 처리해줘야할 부분
              //window.localStorage.setItem("jwt", res.data["Authorization"]);
              //this.$router.replace("/").then(()=>{window.location.reload();});
              alert(res.data);
            }
          });
      } catch (error) {
        console.error(error);
      }
    },
    }
  }
  </script>
  <style scoped>
  
  
  </style>