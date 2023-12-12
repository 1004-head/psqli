<template>
  <div class="board-list">
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>No</th>
        <th>유저</th>
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
    var token = localStorage.getItem("jwt");

    this.$axios.get("/api/score/all", {
        headers: {
          "Authorization": token
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
        path: '/user/detail/',
        query: this.requestBody
      })
    }
  }
}
</script>
