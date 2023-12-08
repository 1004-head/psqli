<template>
    <div class="board-detail">
      <div v-if="isAdmin()" class="common-buttons">
        <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>&nbsp;
      </div>
      <div class="board-contents">
        <h3>{{ nickname }}</h3>
        <div>
          <span>name : {{ name }}</span>
          <br>
          <span v-if="role == 'admin'">role : admin</span>
          <span v-else-if="role == 'maker'">role : maker</span>
          <span v-else>score : {{ score }}</span>
        </div>
      </div>
      <div class="board-contents">
        <strong v-if="role == 'admin'">Posts</strong>
        <strong v-else>Solves</strong>
        <table v-if="role == 'admin'" class="w3-table-all">
          <thead>
                <tr>
                    <th>No</th>
                    <th>제목</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, idx) in list" :key="idx">
                    <td>{{ row[3] }}</td>
                    <td>{{ row[4] }}</td>
                </tr>
            </tbody>
        </table>
        <table v-else class="w3-table-all">
            <thead>
                <tr>
                    <th>No</th>
                    <th>제목</th>
                    <th>점수</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, idx) in list" :key="idx">
                    <td>{{ row[3] }}</td>
                    <td>{{ row[4] }}</td>
                    <td>{{ row[5] }}</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() { //변수생성
      return {
        requestBody: this.$route.query,
        idx: this.$route.query.idx,
        role: this.$route.query.role,
  
        name: '',
        nickname: '',
        score: '',
        list: {},
      }
    },
    mounted() {
      this.fnGetView()
      this.isAdmin()
      this.isMaker()
    },
    methods: {
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
      isMaker() {
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
          return deJWT['isMaker'];
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
      fnGetView() {
        if(this.role == "maker"){
          this.$axios.get(this.$serverUrl + '/users/maker/' + this.idx, {
          }).then((res) => {
              console.log(res.data)
              this.name = res.data[0][0]
              this.nickname = res.data[0][1]
              this.score = res.data[0][2]
              this.list = res.data
              console.log(this.list);
          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
          })
        }else if(this.role == "admin"){
          this.$axios.get(this.$serverUrl + '/users/admin/' + this.idx, {
          }).then((res) => {
              console.log(res.data)
              this.name = res.data[0][0]
              this.nickname = res.data[0][1]
              this.score = res.data[0][2]
              this.list = res.data
              console.log(this.list);
          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
          })
        }else{
          this.$axios.get(this.$serverUrl + '/score/' + this.idx, {
            params: this.requestBody
          }).then((res) => {
              console.log(res.data)
              this.name = res.data[0][0]
              this.nickname = res.data[0][1]
              this.score = res.data[0][2]
              this.list = res.data
          }).catch((err) => {
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
          })
        }
      },
      
    }
  }
  </script>
  <style scoped>
  
  
  </style>