<template>
  <div>這是前台頁面</div>
  
  <nav>
    <RouterLink to="/">Home</RouterLink> | 
    <RouterLink to="/about">About</RouterLink> |
    <RouterLink to="/products">產品頁面</RouterLink> |
    <RouterLink to="/cart">購物車</RouterLink> |
    <RouterLink to="/admin">前往後台頁面</RouterLink>
  </nav>
  <hr />
  <RouterView></RouterView>
</template>

<script>
// 主版
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView
  }
}
</script>