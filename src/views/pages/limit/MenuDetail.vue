<template>
  <vx-card :title="this.$route.query.editState=='1'? '添加菜单':'编辑菜单'">

    <div class="flex">
      <div class="vs-lg-2 ml-32">
        <label>名称：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <vs-input class="w-full" maxlength="100" v-model="menu.name"></vs-input>
      </div>
    </div>

    <div class="flex mt-4" v-if="this.pShow()">
      <div class="vs-lg-2 ml-32">
        <label>父级菜单：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <vs-select class="w-full countryName" v-model="menu.parentId">
          <vs-select-item :key="index" :value="item.menuId" :text="item.name" v-for="(item,index) in parentList"/>
        </vs-select>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>slug：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <vs-input class="w-full" v-model="menu.slug"></vs-input>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>icon：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <vs-input class="w-full" v-model="menu.icon"></vs-input>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>url：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <vs-input class="w-full" v-model="menu.url"></vs-input>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>排序：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <vs-input class="w-full" maxlength="3" v-model="menu.sort" @keyup="inputChange"></vs-input>
      </div>
    </div>

    <div class="flex mt-4">
      <div class="vs-lg-2 ml-32">
        <label>状态：</label>
      </div>
      <div class="w-full sm:w-1/2 ">
        <ul class="centerx flex">
          <li>
            <vs-radio v-model="menu.hidden" vs-value="false">显示</vs-radio>
          </li>
          <li class="ml-6">
            <vs-radio v-model="menu.hidden" vs-value="true">隐藏</vs-radio>
          </li>

        </ul>
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
      menu: {
        hidden: "false",
        level: 1,
        parentId: 0,
      },
      parentList: [{menuId:0,name:"一级菜单"}],
      editState: 1,

    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$http.post('/cms/menu/getOne', {}).then(response => {
        if (response.code === 10000) {
          this.parentList=this.parentList.concat(response.data);
          console.log(this.parentList);
        }
      });

      this.editState = this.$route.query.editState;
      let editState = this.$route.query.editState;
      if (editState == 2) {
        this.$http.post('/cms/menu/get', {menuId: this.$route.query.id}).then(response => {
          if (response.code === 10000) {
            this.menu = response.data;
            this.menu.hidden = String(this.menu.hidden);
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
      this.$http.post('/cms/menu/create', this.menu).then(response => {
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
      //alert(this.menu.hidden);
      this.$http.post('/cms/menu/update', this.menu).then(response => {
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
      this.menu.sort = this.menu.sort.replace(/[^\d]/g, '');
    },
    pShow() {
      if (this.menu.level == 1 && this.editState == 2) {
        return false;
      }
      return true;
    }
  },
}
</script>
