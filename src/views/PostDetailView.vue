<template>
    <div class="board-detail">
      <div v-if="isAdmin()" class="common-buttons">
        <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      </div>
      <div class="board-contents">
        <h3>{{ title }}</h3>
        <div>
          <strong class="w3-large">{{ author }}</strong>
        </div>
      </div>
      <div class="board-contents">
        <span>{{ contents }}</span>
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
        author: '',
        aid: '',
        contents: '',
      }
    },
    mounted() {
      this.fnGetView()
    },
    methods: {
      fnGetView() {
        this.$axios.get(this.$serverUrl + '/post/get/' + this.idx, {
          params: this.requestBody
        }).then((res) => {
          this.title = res.data[1]
          this.author = res.data[4]
          this.contents = res.data[2]
        }).catch((err) => {
          if (err.message.indexOf('Network Error') > -1) {
            alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
          }
        })
      },
      fnDelete() {
        if (!confirm("삭제하시겠습니까?")) return
  
        this.$axios.delete(this.$serverUrl + '/post/delete/' + this.idx, {})
            .then(() => {
              alert('삭제되었습니다.')
              this.$router.replace("/post").then(()=>{window.location.reload();});
            }).catch((err) => {
          console.log(err);
        })
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
      if (typeof token === "string"){
        var deJWT = parseJwt(token);
        return deJWT['isAdmin'];
      }else{
        return false;
      }
    },
    }
  }
  </script>
  <style scoped>
  
  
  </style>