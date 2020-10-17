<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card>
                <div slot="no-body" class="full-page-bg-color">
                    <div class="vx-row no-gutter">
                        <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
                            <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto">
                        </div>
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg">
                            <div class="p-8">
                                <div class="vx-card__title">
                                    <h4 class="mb-4">注册帐户</h4>
                                    <p>填写下表以创建新帐户。</p>
                                </div>
                                <div class="clearfix">
                                    <vs-input
                                        label-placeholder="Username"
                                        name="username"
                                        placeholder="用户名"
                                        v-model="username"
                                        class="w-full" />
                                    <span class="text-danger text-sm"></span>

                                    <vs-input
                                        name="email"
                                        type="email"
                                        label-placeholder="Email"
                                        placeholder="邮箱"
                                        v-model="email"
                                        class="w-full mt-10" />
                                    <span class="text-danger text-sm"></span>

                                    <vs-input
                                        ref="password"
                                        type="password"
                                        name="password"
                                        label-placeholder="Password"
                                        placeholder="密码"
                                        v-model="password"
                                        class="w-full mt-10" />
                                    <span class="text-danger text-sm"></span>

                                    <vs-input
                                        type="password"
                                        data-vv-as="password"
                                        name="confirm_password"
                                        label-placeholder="Confirm Password"
                                        placeholder="确认密码"
                                        v-model="confirm_password"
                                        class="w-full mt-10" />
                                    <span class="text-danger text-sm"></span>

                                    <vs-checkbox v-model="isTermsConditionAccepted" class="mt-6">我接受条款和条件。</vs-checkbox>
                                    <vs-button  type="border" to="/login" class="mt-6">登录</vs-button>
                                    <vs-button class="float-right mt-6" @click="registerUser" :disabled="!validateForm">注册</vs-button>
                                </div>
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
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            isTermsConditionAccepted: true
        }
    },
    computed: {
        validateForm() {
            return this.username != '' && this.email != '' && this.password != '' && this.confirm_password != '' && this.isTermsConditionAccepted === true;
        }
    },
    methods: {
        registerUser() {
            if (!this.validateForm) return false
            if(this.$store.state.auth.isUserLoggedIn()) {
              this.notifyAlreadyLogedIn();
              return
            }
            const payload = {
              userDetails: {
                email: this.email,
                password: this.password,
                username: this.username
              },
              notify: this.$vs.notify
            }
            this.$store.dispatch('auth/registerUser', payload)
        },
        notifyAlreadyLogedIn() {
            this.$vs.notify({
                title: 'Login Attempt',
                text: 'You are already logged in!',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'warning'
            });
        },
    }
}
</script>
