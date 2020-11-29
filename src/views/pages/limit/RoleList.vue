<template>
  <vx-card>
    <div class="flex">
      <vs-button @click="addRoleDetail" type="relief">添加</vs-button>
      <vs-input class="inputx ml-auto" v-model="searchValue" placeholder=""/>
      <vs-button @click="search" type="relief" class="ml-6">搜索</vs-button>
    </div>

    <vs-table stripe :data="roleList" class="mt-6">
      <template slot="thead">
        <vs-th>编号</vs-th>
        <vs-th>名称</vs-th>
        <vs-th>后台用户数量</vs-th>
        <vs-th>状态</vs-th>
        <vs-th>操作</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].roleId">
            {{ data[indextr].roleId }}
          </vs-td>

          <vs-td :data="data[indextr].name">
            {{ data[indextr].name }}
          </vs-td>

          <vs-td :data="data[indextr].managerCount">
            {{ data[indextr].managerCount }}
          </vs-td>

          <vs-td :data="data[indextr].state">
            {{ data[indextr].state == 1 ? "正常" : '禁用' }}
          </vs-td>

          <vs-td>
            <div class="flex">
              <vs-button radius color="primary" type="line" icon-pack="feather" size="small"
                         icon="icon-edit-2" @click="editRoleDetail(data[indextr].roleId)"></vs-button>
              <vs-button radius color="primary" type="line" @click="roleMenu(data[indextr].roleId)"
                         icon-pack="feather" size="small" icon="icon-menu"></vs-button>
              <vs-button radius color="primary" type="line" @click="openConfirm(data[indextr].roleId)"
                         icon-pack="feather" size="small" icon="icon-x"></vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <div class="my-5" @click="turnPage">
      <vs-pagination :total="totalPage" v-model="pageNum"></vs-pagination>
    </div>

  </vx-card>
</template>

<script>
export default {
  data() {
    return {
      totalPage: 1,
      pageNum: 1,
      pageSize: 10,
      searchValue: "",
      roleList: [],
      deleteRoleId: 0
    }
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      this.$http.post('/cms/role/list', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        keyword: this.searchValue
      }).then(response => {
        if (response.code === 10000) {
          this.totalPage = response.data.totalPage;
          if (response.data.list) {
            this.roleList = response.data.list;
            return
          }
          //判断非第一页最后一条数据删除null
          if (response.pageNum != 1) {
            this.pageNum -= 1;
            this.getRoleList();
          }

          this.roleList = [];
        }
      });

    },
    turnPage() {
      this.getRoleList();
    },
    search() {
      this.getRoleList();
    },
    deleteRole() {
      this.$http.post('/cms/role/deleteById', {
        roleId: this.deleteRoleId
      }).then(response => {
        if (response.code === 10000) {
          this.getRoleList();
        }
      });
    },
    addRoleDetail() {
      this.$router.push({path: '/RoleDetail', query: {editState: '1'}});
    },
    editRoleDetail(roleId) {
      this.$router.push({path: '/RoleDetail', query: {editState: '2', id: roleId}});
    },
    roleMenu(roleId) {
      this.$router.push({path: '/RoleMenu', query: {roleId: roleId}});
    },
    openConfirm(roleId) {
      this.deleteRoleId = roleId;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `消息确认`,
        text: '删除该角色会把下面的角色账号关联关系删除，你确定要这么做吗？',
        acceptText: "确认",
        cancelText: "取消",
        accept: this.deleteRole
      })
    }

  },
}
</script>
