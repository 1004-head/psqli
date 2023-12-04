<template>
  <div class="board-list">
    <div v-if="isMaker() == true" class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
    </div>
    <div v-else class="common-buttons">
      
    </div>
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>No</th>
        <th>제목</th>
        <th>점수</th>
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
    this.$axios.get(this.$serverUrl + "/challenge/get", {
        headers: {
          "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOlsxXSwibmFtZSI6ImphZXllb2wiLCJuaWNrbmFtZSI6Im5pY2V0YXVyZW4iLCJpc0FkbWluIjp0cnVlLCJpc01ha2VyIjpmYWxzZX0.hIlD_J3lZ7rPZg4K94TfkXWHzmP_h4ikR-06hccfUJ0"
        }
      }).then((res) => {      
        console.log(res.data[0][0]);
        this.list = res.data  //서버에서 데이터를 목록으로 보내므로 바로 할당하여 사용할 수 있다.

      }).catch((err) => {
        if (err.message.indexOf('Network Error') > -1) {
          alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
        }
      })
    },
    fnView(idx) {
      this.requestBody.idx = idx
      this.$router.push({
        path: '/challenge/detail',
        query: this.requestBody
      })
    },
    fnWrite() {
      this.$router.push({
        path: '/challenge/add'
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
      var deJWT = parseJwt(token);
      console.log(deJWT['isMaker']);
      return deJWT['isMaker'];
    }
  }
}
</script>