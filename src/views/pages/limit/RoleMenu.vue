<template>
  <vx-card title="角色菜单">
    <div class="flex">
      <div class="vs-lg-2 ml-32">
        <label>菜单：</label>
      </div>
      <div class="w-full sm:w-1/2">
        <v-tree ref='tree' :data='treeData' :halfcheck='true' :multiple="true"/>
      </div>
    </div>


    <div class="flex">
      <vs-button @click="save" type="relief" class="ml-auto mr-6">保存</vs-button>
      <vs-button @click="bake" color="dark" type="relief" class="mr-32">返回</vs-button>
    </div>
  </vx-card>
</template>

<script>
import {VTree} from 'vue-tree-halower'

export default {
  data() {
    return {
      treeData: [],
      roleId: 0,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.roleId = this.$route.query.roleId;
      this.$http.post('/cms/role/getRoleMenu', {roleId: this.roleId}).then(response => {
        if (response.code === 10000) {
          this.treeData = response.data;
        }
      });
    },
    save() {
      let listMenuId = [];
      this.$refs.tree.getCheckedNodes(true, true).forEach(node => {
          listMenuId.push(node.id);
        }
      )
      this.$refs.tree.getNodes({halfcheck: true}, this.treeData).forEach(node => {
          listMenuId.push(node.id);
        }
      )

      this.$http.post('/cms/role/saveRoleMenu', {roleId: this.roleId, listMenuId: listMenuId}).then(response => {
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
    }
  },
  components: {
    VTree
  }

}
</script>

<style lang="scss">
@import "../../../assets/scss/vuesax/extraComponents/tree.scss";

button.btn-async {
  background: rgba(var(--vs-warning), 0.15);
}

button.btn-delete {
  background: rgba(var(--vs-danger), 0.15);
}
</style>
