<template>
  <div class="board-list">
    <div v-if="isAdmin()" class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
      <button type="button" class="w3-button w3-round w3-red" v-on:click="fnDelete">삭제</button>
    </div>
    
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>작성자</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, idx) in list" :key="idx">
        <td>{{ row[0] }}</td>
        <td><a v-on:click="fnView(`${row[0]}`)">{{ row[1] }}</a></td>
        <td>{{ row[2] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      requestBody: {}, //리스트 페이지 데이터전송
      list: {}, //리스트 데이터
    }
  },
  mounted() {
    this.fnGetList()
  },
  methods: {
    fnGetList() {
    var token = localStorage.getItem("jwt");
    
    this.$axios.get("/api/post/get", {
        headers: {
          "Authorization": token
        }
      }).then((res) => {      
        this.list = res.data  //서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.
        console.log(this.list)
      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnView(idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: '/post/detail',
        query: this.requestBody
      })
    },
    fnDelete(){
      if(!confirm("삭제하시겠습니까?")) return

      this.$axios.delete('/api/post/delete', {})
          .then(() => {
            alert('삭제되었습니다.')
            this.$router.replace("/post").then(()=>{window.location.reload();});
          }).catch((err) => {
            console.log(err);
      })
    },
    fnWrite() {
      this.$router.push({
        path: '/post/add'
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
      var deJWT = parseJwt(token);
      return deJWT['isAdmin'];
    }
  }
}
</script>
