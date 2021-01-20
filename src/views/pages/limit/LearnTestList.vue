<template>
  <vx-card>
    <div class="flex">
      <vs-input class="inputx ml-auto" v-model="searchValue" placeholder=""/>
      <vs-button @click="search" type="relief" class="ml-6">搜索</vs-button>
    </div>

    <vs-table stripe :data="learnTestList" class="mt-6">
      <template slot="thead">
        <vs-th>编号</vs-th>
        <vs-th>名称</vs-th>
        <vs-th>手机号</vs-th>
        <vs-th>性别</vs-th>
        <vs-th>操作</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>

          <vs-td :data="data[indextr].name">
            {{ data[indextr].name }}
          </vs-td>

          <vs-td :data="data[indextr].managerCount">
            {{ data[indextr].phone }}
          </vs-td>

          <vs-td :data="data[indextr].state">
            {{ data[indextr].sex == true ? "男" : '女' }}
          </vs-td>

          <vs-td>
            <div class="flex">
              <vs-button radius color="primary" type="line" @click="openConfirm(data[indextr].learnTestId)"
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
      learnTestList: [],
      deleteLearnTestId: 0
    }
  },
  mounted() {
    this.getLearnTestList();
  },
  methods: {
    getLearnTestList() {
      this.$http.post('/cms/learnTest/list', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        keyword: this.searchValue
      }).then(response => {
        if (response.code === 10000) {
          this.totalPage = response.data.totalPage;
          if (response.data.list) {
            this.learnTestList = response.data.list;
            return
          }
          //判断非第一页最后一条数据删除null
          if (response.pageNum != 1) {
            this.pageNum -= 1;
            this.getLearnTestList();
          }

          this.learnTestList = [];
        }
      });

    },
    turnPage() {
      this.getLearnTestList();
    },
    search() {
      this.getLearnTestList();
    },
    deleteLearnTest() {
      this.$http.post('/cms/learnTest/deleteById', {
        learnTestId: this.deleteLearnTestId
      }).then(response => {
        if (response.code === 10000) {
          this.getLearnTestList();
        }
      });
    },
    openConfirm(learnTestId) {
      this.deleteLearnTestId = learnTestId;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `消息确认`,
        text: '删除该LearnTest会把下面的LearnTest账号关联关系删除，你确定要这么做吗？',
        acceptText: "确认",
        cancelText: "取消",
        accept: this.deleteLearnTest
      })
    }

  },
}
</script>
