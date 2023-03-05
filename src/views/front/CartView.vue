<template>
  <div>這是購物車頁面</div>
  <div class="text-end">
    <button class="btn btn-outline-danger" type="button">清空購物車</button>
  </div>

  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <!--確認購物車中有品項-->
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="deleteCartItem(item)"
              :disabled="item.id === loadingItem"
            >
              <i class="fas fa-spinner fa-pulse" v-if="item.id === loadingItem"></i>
              x
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <!-- <div class="text-success">
                      已套用優惠券
                    </div> -->
          </td>
          <td>
            <div class="input-group input-group-sm">
              <select
                name=""
                id=""
                class="form-select"
                v-model="item.qty"
                @change="updateCartItem(item)"
                :disabled="item.id === loadingItem"
              >
                <option :value="i" v-for="i in 5" :key="`${i}+1235`">{{ i }}</option>
              </select>
            </div>
          </td>
          <td class="text-end">
            <!-- <small class="text-success">折扣價：</small> -->
            {{ item.total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
  <!-- VeeValidate -->

      <div class="my-5 row justify-content-center">
        <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="onSubmit">

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <v-field id="email" name="email" type="email" class="form-control"
              :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="required"
              v-model="user.email"></v-field>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名" rules="required" v-model="user.name"></v-field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話" rules="required|min:8|max:10" v-model="user.tel"></v-field>
            <error-message name="tel" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址" rules="required" v-model="user.address"></v-field>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea id="message" class="form-control" cols="30" rows="10" placeholder="如有特殊需求，請留言並來電通知"></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger">送出訂單</button>
          </div>
        </v-form>
      </div>
</template>



<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
    data() {
        return {
            products: [],
            productId: '', // 被點擊「查看更多」的產品的 id
            cart: {},
            loadingItem: '', // 存 id，控制是否 disabled 選單
            user: {
                name: '',
                email: '',
                tel: '',
                address: '',
                message: ''
              },
        }
    },
    methods: {
        // 取得「加入到購物車中的品項」
        getCarts() {
            this.$http.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`)
                .then((res) => {
                    console.log('購物車', res.data)
                    this.cart = res.data.data;

                })
        },

        // 調整數量
        updateCartItem(item) {
            // 購物車的 id & 產品的 id
            const data = {
                product_id: item.product.id, // 產品 id
                qty: item.qty,
            }
            // console.log(data, item.id)

            this.loadingItem = item.id; // this.loadingItem 原為空值，change 選單中的數量 (購物車品項的數量) 有改變時，將 item.id 賦值給 this.loadingItem，但在打完下面 change 之後的 api, this.loadingItem 就恢復空值，停止 disabled 效果

            this.$http.put(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`, { data }) // 此處取得的是購物車的 id
                .then((res) => {
                    console.log('更新購物車', res.data)
                    this.getCarts(); // 更新後再重新取得購物車內品項資訊
                    this.loadingItem = '';
                })
        },

        // 刪除購物車品項
        deleteCartItem(item) {

            this.loadingItem = item.id; // this.loadingItem 原為空值，當點擊 x 按鈕後，將 item.id 賦值給 this.loadingItem，但在打完下面 delete 之後的 api, this.loadingItem 就恢復空值，停止 disabled 效果

            this.$http.delete(`${VITE_URL}/v2/api/${VITE_PATH}/cart/${item.id}`)
                .then((res) => {
                    // 此處要取得購物車的 id
                    console.log('刪除購物車品項', res.data)
                    this.getCarts(); // 刪除後再重新取得購物車內品項資訊
                    this.loadingItem = '';
                })
        },

        onSubmit(){
            console.log('onSubmit')
        }

    },
    
    mounted() {       
        this.getCarts(); // 一載入就要取得「加入到購物車中的品項」
    }
}
</script>