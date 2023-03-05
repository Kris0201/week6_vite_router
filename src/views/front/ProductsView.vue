<template>
  <div>產品頁面</div>
  <hr />
  <table>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.title }}</td>
        <td style="width: 400px; object-fit: cover">
          <img :src="product.imageUrl" alt="" class="img-fluid" />
        </td>
        <td>
          <RouterLink :to="`/product/${product.id}`" class="btn btn-outline-secondary">
            產品細節
          </RouterLink>
          <button type="button" class="btn btn-outline-primary" @click="addToCart(product.id)">
            加入購物車
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { RouterLink } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      products: []
    }
  },
  components: {
    RouterLink
  },
  methods: {
    getProducts() {
      // 在產品列表頁面取得所有產品資料
      this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/products/all`).then((res) => {
        this.products = res.data.products
      })
    },

    addToCart(id) {
      const data = {
        product_id: id,
        qty: 1
      }

       this.$http.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, {data})
      .then((res)=>{
        console.log('加入購物車', res.data.data)
      })
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>