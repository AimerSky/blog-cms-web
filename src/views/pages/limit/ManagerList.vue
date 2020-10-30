<template>
  <vx-card>
    <div class="flex">
      <vs-button @click="addManagerDetail" type="relief">添加</vs-button>
      <vs-input class="inputx ml-auto" v-model="searchValue" placeholder=""/>
      <vs-button @click="search" type="relief" class="ml-6">搜索</vs-button>
    </div>

    <vs-table stripe :data="managerList" class="mt-6">
      <template slot="thead">
        <vs-th>编号</vs-th>
        <vs-th>名称</vs-th>
        <vs-th>账号</vs-th>
        <vs-th>昵称</vs-th>
        <vs-th>状态</vs-th>
        <vs-th>操作</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].managerId">
            {{ data[indextr].managerId }}
          </vs-td>

          <vs-td :data="data[indextr].name">
            {{ data[indextr].name }}
          </vs-td>

          <vs-td :data="data[indextr].username">
            {{ data[indextr].username }}
          </vs-td>

          <vs-td :data="data[indextr].nickname">
            {{ data[indextr].nickname }}
          </vs-td>

          <vs-td :data="data[indextr].state">
            {{ data[indextr].state == 2 ? "正常" : "禁用" }}
          </vs-td>

          <vs-td>
            <div class="flex">
              <vs-button radius color="primary" type="line" icon-pack="feather" size="small"
                         icon="icon-edit-2" @click="editManagerDetail(data[indextr].managerId)"></vs-button>
              <vs-button radius color="primary" type="line" @click="openConfirm(data[indextr].managerId)"
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
      managerList: [],
      deleteManagerId: 0
    }
  },
  mounted() {
    this.getManagerList();
  },
  methods: {
    getManagerList() {
      this.$http.post('/cms/manager/list', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        keyword: this.searchValue
      }).then(response => {
        if (response.code === 10000) {
          this.totalPage = response.data.totalPage;
          if (response.data.list) {
            this.managerList = response.data.list;
            return
          }
          //判断非第一页最后一条数据删除null
          if (response.pageNum != 1) {
            this.pageNum -= 1;
            this.getManagerList();
          }

          this.managerList = [];
        }
      });

    },
    turnPage() {
      this.getManagerList();

    },
    search() {
      this.getManagerList();
    },
    deleteManager() {
      /*this.$http.post('/cms/role/deletebyid', {
        roleId: this.deleteRoleId
      }).then(response => {
        if (response.code === 10000) {
          this.getRoleList();
        }
      });*/
    },
    addManagerDetail() {
      this.$router.push({path: '/ManagerDetail', query: {editState: '1'}});
    },
    editManagerDetail(managerId) {
      this.$router.push({path: '/ManagerDetail', query: {editState: '2', id: managerId}});
    },
    openConfirm(managerId) {
      this.deleteManagerId = managerId;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `消息确认`,
        text: '确认删除该管理员吗？',
        acceptText: "确认",
        cancelText: "取消",
        accept: this.deleteManager
      })
    }

  },
}
</script>
