<template>
  <div>我是後台頁面</div>

  <RouterLink to="/admin/products">後台產品管理頁面</RouterLink> |
  <RouterLink to="/admin/orders">後台訂單管理頁面</RouterLink> |
  <RouterLink to="/">回到前台頁面</RouterLink> |
  <a href="#" @click.prevent="logout">登出</a>
  <hr />
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  components: {
    RouterView
  },
  methods: {
    checkLogin() {
      this.$http
        .post(`${VITE_URL}api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            // alert(res.data.message)
            this.$router.push('/login')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    logout() {
      document.cookie = `krisToken=; expires=${new Date()};` // 登出時清除 cookie 記錄
      this.$router.push('/login')
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)krisToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common['Authorization'] = token
    this.checkLogin()
  }
}
</script>