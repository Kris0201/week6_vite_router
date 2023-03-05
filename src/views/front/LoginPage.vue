<template>
    <div class="container">
            <div class="row justify-content-center">
                <h1 class="h3 mb-3 font-weight-normal text-center">
                    請先登入
                </h1>
                <div class="col-8">
                    <form id="form" class="form-signin">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="username" placeholder="name@example.com" v-model="user.username"
                                required autofocus>
                            <label for="username">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="password" placeholder="Password" v-model="user.password" required>
                            <label for="password">Password</label>
                        </div>
                        <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click.prevent="loginBtn">
                            登入
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
     data() {
        return {
            user: {
                username: '',  // 取得email欄位的值
                password: '',  // 取得password欄位的值
            },
            
        }
    },
    methods: {
        loginBtn() {
            this.$http.post(`${VITE_URL}admin/signin`, this.user)
                .then((res) => {
                    console.log(res);
                    const { token, expired } = res.data;
                    console.log(token);

                    // 將 token 和 expired 存到 cookie 裡
                    document.cookie = `krisToken=${token}; expires=${new Date(expired)};`;
                    
                    this.$router.push('/admin/products')
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    },
}
</script>