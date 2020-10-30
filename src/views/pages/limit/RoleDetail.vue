<template>
  <vx-card :title="this.$route.query.editState=='1'? '添加角色':'编辑角色'">

    <div class="flex">
      <div class="vs-lg-2 ml-32">
        <label>名称：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <vs-input class="w-full" maxlength="100" v-model="role.name"></vs-input>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>排序：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <vs-input class="w-full" maxlength="3" v-model="role.sort" @keyup="inputChange"></vs-input>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>状态：</label>
      </div>
      <div class="w-full sm:w-1/2 ">
        <ul class="centerx flex">
          <li>
            <vs-radio v-model="role.state" vs-value="1">启动</vs-radio>
          </li>
          <li class="ml-6">
            <vs-radio v-model="role.state" vs-value="2">禁止</vs-radio>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>描述：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <vs-textarea counter="500" maxlength="500" label="限制: 500字" class="w-full" v-model="role.description"/>
      </div>
    </div>

    <div class="flex">
      <vs-button @click="save" type="relief" class="ml-auto mr-6">保存</vs-button>
      <vs-button @click="bake" color="dark" type="relief" class="mr-32">返回</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      role: {state: 1},
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let editState = this.$route.query.editState;
      if (editState == 2) {
        this.$http.post('/cms/role/get', {roleId: this.$route.query.id}).then(response => {
          if (response.code === 10000) {
            this.role = response.data;
          }
        });
      }
    },
    save() {
      let edit = this.$route.query.editState;
      if (edit == 1) {
        this.create();
        return;
      } else if (edit == 2) {
        this.update();
        return;
      }

    },
    create() {
      this.$http.post('/cms/role/create', this.role).then(response => {
        if (response.code === 10000) {
          this.$router.go(-1);
        }
      });
    },
    update() {
      this.$http.post('/cms/role/update', this.role).then(response => {
        if (response.code === 10000) {
          this.$router.go(-1);
        }
      });
    },
    bake() {
      this.$router.go(-1);
    },
    inputChange() { //输入框值改变
      this.role.sort = this.role.sort.replace(/[^\d]/g, '');
    }
  },
}
</script>
