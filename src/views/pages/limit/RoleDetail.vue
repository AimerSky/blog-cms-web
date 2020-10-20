<template>
  <vx-card :title="this.$route.query.editState=='1'? '添加角色':'编辑角色'">

    <div class="flex">
      <div class="vs-lg-2 ml-32">
        <label>Text：</label>
      </div>
      <div>
        <vs-input></vs-input>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>Search：</label>
      </div>
      <div>
        <vs-input></vs-input>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>Email：</label>
      </div>
      <div>
        <vs-input></vs-input>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>URL：</label>
      </div>
      <div>
        <vs-input></vs-input>
      </div>
    </div>

  </vx-card>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    submitForm() {

    }
  },
}
</script>
