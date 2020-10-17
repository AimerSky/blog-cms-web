<template>
  <vx-card>
    <div class="demo-alignment ">
      <vs-input class="inputx ml-auto" v-model="searchValue" placeholder=""/>
      <vs-button @click="Search" type="relief">搜索</vs-button>
    </div>

    <vs-table stripe :data="roleList" class="mt-6">

      <template slot="thead">
        <vs-th>编号</vs-th>
        <vs-th>名称</vs-th>
        <vs-th>后台用户数量</vs-th>
        <vs-th>状态</vs-th>
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

          <vs-td :data="data[indextr].status">
            {{ data[indextr].status }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <div class="my-5" @click="TurnPage">
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
      roleList: []
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
          if (response.data.list) {
            this.roleList = response.data.list;
          } else {
            this.roleList = [];
          }
          this.totalPage = response.data.totalPage;
        }
      });

    },
    TurnPage() {
      this.getRoleList();

    },
    Search() {
      this.getRoleList();
    }
  },
}
</script>
