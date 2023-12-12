
<template>
    <div class="board-detail">
      <div class="common-buttons">
<button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
</div>
<div class="board-contents">
<input type="text" v-model="title" class="w3-input w3-border" placeholder="제목을 입력해주세요.">
</div>
<div class="board-contents">
<textarea id="" cols="30" rows="10" v-model="subscription" class="w3-input w3-border" style="resize: none;">
</textarea>
</div>
<div class="board-contents">
    <input type="text" v-model="score" class="w3-input w3-border" placeholder="점수를 입력해주세요.">
    <input type="text" v-model="answer" class="w3-input w3-border" placeholder="정답을 입력해주세요.">
</div>
<div class="common-buttons">
<button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnSave">저장</button>&nbsp;
</div>
</div>
</template>

<script>
export default {
    data() { //변수생성
        return {
            requestBody: this.$route.query,
            idx: this.$route.query.idx,

            title: '',
            answer: '',
            subscription: '',
            score: ''
        }
    },
    methods: {
        fnView(idx) {
            this.requestBody.idx = idx
            this.$router.push({
                path: './detail',
                query: this.requestBody
            })
        },
        fnSave() {
            let apiUrl = '/api/challenge/add'
            
            var token = localStorage.getItem("jwt");
    
            this.form = {
                "title": this.title,
                "subscription": this.subscription,
                "score": this.score,
                "answer": this.answer
            }

            if (this.idx === undefined) {
            //INSERT
            this.$axios.post(apiUrl, JSON.stringify(this.form), {
                headers: {
                    "Content-Type": `application/json`,
                    "Authorization": token
                }
            })
            .then((res) => {
                console.log(res)
                if(res.status == 200){
                    alert('글이 저장되었습니다.')
                    this.$router.replace("/challenge").then(()=>{window.location.reload();});
                }
            }).catch((err) => {
                if (err.message.indexOf('Network Error') > -1) {
                alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
                }
            })
            } 
        }
    }
}
</script>
<style scoped>

</style>
