<!-- =========================================================================================
    File Name: NotAuthorized.vue
    Description: Not Authorized Page
========================================================================================== -->


<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center">
            <img src="../../assets/images/pages/not-authorized.png" alt="graphic-not-authorized" class="mx-auto mb-4">
            <h1 class="sm:mx-0 mx-4 sm:mb-12 mb-8 text-5xl d-theme-heading-color">你没有授权!</h1>
            <p class="sm:mx-0 mx-4 sm:mb-12 mb-8 d-theme-text-inverse">你没有权限访问该页面请确认页面路径.</p>
            <vs-button size="large" to="/">返回首页</vs-button>
        </div>
    </div>
</template>
