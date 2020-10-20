<!-- =========================================================================================
    File Name: Maintenance.vue
    Description: Maintenance Page
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center">
            <img src="../../assets/images/pages/maintenance-2.png" alt="graphic-maintenance" class="mx-auto mb-4">
            <h1 class="sm:mx-0 mx-4 mb-6 text-5xl d-theme-heading-color">系统维护中!</h1>
            <p class="sm:mx-0 mx-4 mb-6 d-theme-text-inverse">系统正在紧急维护，请稍后再试.</p>
            <vs-button size="large" to="/">返回首页</vs-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value1: ''
        }
    }
}
</script>
