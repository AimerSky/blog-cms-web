<template>
  <div>
    <h4>You are in home.</h4>
    <vs-button @click="aaaaa()" color="danger" type="gradient">Delete Image</vs-button>

  </div>
</template>

<script>

export default {
  methods: {
    aaaaa() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `消息确认`,
        text: '删除该角色会把下面的账号全部清除，你确定要这么做吗？',
      })
    }
  },
}
</script>
