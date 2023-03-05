<template>
  <div>單一產品頁面</div>
  <hr />
  <div class="container">
    <div class="row">
      <div class="col-md-5">
        <img :src="product.imageUrl" alt="" style="width: 300px" />
      </div>
      <div class="col-md-7">{{ product.title }}</div>
    </div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      product: {}
    }
  },
  components: {},
  methods: {
    //在 mounted 取得產品 id

    getProduct() {
      // console.log('$route', this.$route) // 屬性值
      // console.log('$router', this.$router) // 方法集合
      // 以解構方式取得產品 id，意義同 const id=this.$route.params.id
      const { id } = this.$route.params 

      this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`).then((res) => {
        console.log(res)
        this.product = res.data.product
      })
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>
