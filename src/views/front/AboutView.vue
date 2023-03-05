<template>
  <div class="about">
    <h1>This is an about page</h1>
    
  </div>

  <button type="button" class="btn btn-primary">Primary</button>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },

  mounted() {
    this.$http.get('https://randomuser.me/api/').then((res) => {
      console.log(res);
      this.data=res.data.results[0]
    }) // 測試 vue-axios 是否正確取得遠端資料
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
