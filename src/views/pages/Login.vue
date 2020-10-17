<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
========================================================================================== -->


<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">登录账户</h4>
                  <p>欢迎回来，请登录您的帐户。</p>
                </div>
                <vs-input
                  name="account"
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="账号"
                  v-model="account"
                  class="w-full mt-10 no-icon-border"/>
                <span class="text-danger text-sm "></span>

                <vs-input
                  type="password"
                  name="password"
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="密码"
                  v-model="password"
                  class="w-full mt-10 no-icon-border"/>
                <span class="text-danger text-sm "></span>

                <div class="flex flex-wrap justify-between my-5">
                  <vs-checkbox v-model="checkbox_remember_me" class="mb-3">记住登录</vs-checkbox>
                  <router-link to="/forgot-password">忘记密码?</router-link>
                </div>
                <vs-button type="border" @click="registerUser">注册</vs-button>
                <vs-button class="float-right" :disabled="!validateForm" @click="login">登录</vs-button>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      account: '111111',
      password: '123456',
      checkbox_remember_me: false
    }
  },
  computed: {
    validateForm() {
      return this.account != '' && this.password != '';
    },
  },
  methods: {
    login() {

      this.$http.post('/cms/manager/login', {
        username: this.account,
        password: this.password
      }).then(response => {
        if (response.code === 10000) {
          localStorage.setItem("tokenHead", response.data.tokenHead);
          localStorage.setItem("token", response.data.token);
          this.$router.push('/').catch(() => {
            this.$router.push("/");
          });
        }
      })

    },
    registerUser() {
      this.$router.push('/register');
    }
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login {
    .bg-facebook {
      background-color: #1551b1;
    }

    .bg-twitter {
      background-color: #00aaff;
    }

    .bg-google {
      background-color: #4285F4;
    }

    .bg-github {
      background-color: #333;
    }
  }
}
</style>
