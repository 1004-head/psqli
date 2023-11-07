<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      PSQLI is the service to study SQL-Injection attack.<br>
      You can solve the SQLI problem in challenge tab, and you can get score.<br>
      When you get some scores and You will compete other users.<br>
      If you want to submit your own problems, send email to admin<b>(admin@example.com)</b><br>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

p {
  margin: 20px;
}
</style>
