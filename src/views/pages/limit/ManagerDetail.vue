<template>
  <vx-card :title="editState=='1'? '添加管理员':'编辑管理员'">
    <ValidationObserver ref="form">
      <ValidationProvider name="账号" rules="required|min:3" v-slot="{ errors }">
        <div class="flex">
          <div class="vs-lg-2 ml-32">
            <label>账号：</label>
          </div>
          <div class="w-full flex sm:w-1/2">
            <vs-input class="w-full" maxlength="24" :disabled="editState=='1'?false : true"
                      v-model.trim="manager.username" @keyup="inputChange"></vs-input>
          </div>
          <div class="flex mt-2">
            <span class="text-danger text-sm ml-6">{{ usernameMsg }}{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>

      <ValidationProvider name="名称" rules="required|min:2" v-slot="{ errors }">
        <div class="flex mt-4">
          <div class="vs-lg-2 ml-32">
            <label>名称：</label>
          </div>
          <div class="w-full sm:w-1/2">
            <vs-input class="w-full" maxlength="100" v-model="manager.name"></vs-input>
          </div>
          <div class="flex mt-2">
            <span class="text-danger text-sm ml-6">{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>

      <ValidationProvider name="昵称" rules="required" v-slot="{ errors }">
        <div class="flex mt-4">
          <div class="vs-lg-2 ml-32">
            <label>昵称：</label>
          </div>
          <div class="w-full sm:w-1/2">
            <vs-input class="w-full" maxlength="100" v-model="manager.nickname"></vs-input>
          </div>
          <div class="flex mt-2">
            <span class="text-danger text-sm ml-6">{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>

      <ValidationProvider name=" " rules="email" v-slot="{ errors }">
        <div class="flex mt-4">
          <div class="vs-lg-2 ml-32">
            <label>邮箱：</label>
          </div>
          <div class="w-full sm:w-1/2">
            <vs-input class="w-full" maxlength="100" v-model="manager.email"></vs-input>
          </div>
          <div class="flex mt-2">
            <span class="text-danger text-sm ml-6">{{ errors[0] }}</span>
          </div>
        </div>
      </ValidationProvider>

      <div class="flex mt-4">
        <div class="vs-lg-2 ml-32">
          <label>头像：</label>
        </div>
        <div class="w-full sm:w-1/2">
          <vs-input class="w-full" maxlength="100" v-model="manager.icon"></vs-input>
        </div>
      </div>

      <div class="flex mt-6">
        <div class="vs-lg-2 ml-32">
          <label>状态：</label>
        </div>
        <div class="w-full sm:w-1/2 ml-1">
          <ul class="flex ">
            <li>
              <vs-radio v-model="manager.state" vs-value="2">正常</vs-radio>
            </li>
            <li class="ml-6">
              <vs-radio v-model="manager.state" vs-value="3">停用</vs-radio>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex ">
        <div class="vs-lg-2 ml-32 mt-6">
          <label>角色：</label>
        </div>
        <div class="w-full sm:w-1/2">
          <ul class="demo-alignment">
            <li :key="role.id" v-for="role in roleList">
              <vs-checkbox v-model="roleIdList" :vs-value="role.id">{{ role.name }}</vs-checkbox>
            </li>
           <!-- <li class="op-block">
              {{ roleIdList }}
            </li>-->
          </ul>
        </div>
      </div>

      <div class="flex mt-6">
        <div class="vs-lg-2 ml-32">
          <label>备注信息：</label>
        </div>
        <div class="w-full sm:w-1/2">
          <vs-textarea counter="500" maxlength="500" label="限制: 500字" class="w-full" v-model="manager.note"/>
        </div>
      </div>

      <div class="flex">
        <vs-button @click="save" :disabled="saveType" class="ml-auto mr-6">保存</vs-button>
        <vs-button @click="bake" color="dark" type="relief" class="mr-32">返回</vs-button>
      </div>
    </ValidationObserver>
  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      manager: {
        state: 2,
      },
      roleIdList: [],
      lastTime: 0,
      usernameMsg: "",
      saveType: false,
      editState: 1,
      roleList: [],
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    "manager.username": {
      handler: function (newVal, oldVal) {
        this.keyword(newVal);
      },
    },
  },
  methods: {
    init() {
      this.$http.post('/cms/role/getNameidList', {managerId: this.$route.query.id}).then(response => {
        if (response.code === 10000) {
          this.roleList = response.data.nameIdList;
          if (Object.prototype.hasOwnProperty.call(response.data, 'roleIdList') != true) {
            return;
          }
          this.roleIdList = response.data.roleIdList;
        }
      });

      this.editState = this.$route.query.editState;
      let editState = this.$route.query.editState;
      if (editState == 2) {
        this.$http.post('/cms/manager/get', {managerId: this.$route.query.id}).then(response => {
          if (response.code === 10000) {
            this.manager = response.data;
          }
        });
      }
    },
    save() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          this.$vs.notify({
            title: '提示信息',
            text: '请输入完整表单再提交！',
            color: 'danger'
          })
          return;
        }
        let edit = this.$route.query.editState;
        if (edit == 1) {
          this.create();
          return;
        } else if (edit == 2) {
          this.update();
          return;
        }
      })

    },
    create() {
      this.$http.post('/cms/manager/create', this.manager).then(response => {
        if (response.code === 10000) {
          this.$vs.notify({
            title: '提示信息',
            text: '保存成功！',
            color: 'success'
          })
          this.$router.go(-1);
        }
      });
    },
    update() {
      this.manager.roleIdList = this.roleIdList;
      this.$http.post('/cms/manager/update', this.manager).then(response => {
        if (response.code === 10000) {
          this.$vs.notify({
            title: '提示信息',
            text: '保存成功！',
            color: 'success'
          })
          this.$router.go(-1);
        }
      });
    },
    bake() {
      this.$router.go(-1);
    },
    inputChange() { //输入框值改变
      this.manager.username = this.manager.username.replace(/[\W]/g, '');
    },
    keyword(newVal) {
      if (this.lastTime == 0) {
        this.lastTime = setTimeout(() => {

        }, 500)
      } else {
        clearTimeout(this.lastTime)
        this.lastTime = setTimeout(() => {
          // AJAX(newVal)
          this.$http.post('/cms/manager/getUsername', {username: this.manager.username}).then(response => {
            if (response.code === 10000) {
              if (response.data == true) {
                this.usernameMsg = "账号重复,请重新输入账号!";
                this.saveType = true;
              } else {
                this.usernameMsg = "";
                this.saveType = false;
              }
            }
          });
        }, 500)
      }
    }


  },
}
</script>
