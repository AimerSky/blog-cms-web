<template>
  <vx-card>
    <div class="flex">
      <vs-button @click="addMenuDetail" type="relief">添加</vs-button>
      <vs-input class="inputx ml-auto" v-model="searchValue" placeholder=""/>
      <vs-button @click="search" type="relief" class="ml-6">搜索</vs-button>
    </div>

    <vs-table stripe :data="menuList" class="mt-6">
      <template slot="thead">
        <vs-th>编号</vs-th>
        <vs-th>名称</vs-th>
        <vs-th>菜单等级</vs-th>
        <vs-th>状态</vs-th>
        <vs-th>操作</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="data[indextr].menuId">
            {{ data[indextr].menuId }}
          </vs-td>

          <vs-td :data="data[indextr].name">
            {{ data[indextr].name }}
          </vs-td>

          <vs-td :data="data[indextr].level">
            {{ data[indextr].level }}
          </vs-td>

          <vs-td :data="data[indextr].hidden">
            {{ data[indextr].hidden == true ? "隐藏" : '显示' }}
          </vs-td>


          <vs-td>
            <div class="flex">
              <vs-button radius color="primary" type="line" icon-pack="feather" size="small"
                         icon="icon-edit-2" @click="editMenuDetail(data[indextr].menuId)"></vs-button>
              <vs-button radius color="primary" type="line" @click="openConfirm(data[indextr].menuId)"
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
      menuList: [],
      deleteMenuId:0,
    }
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.$http.post('/cms/menu/list', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        keyword: this.searchValue
      }).then(response => {
        if (response.code === 10000) {
          this.totalPage = response.data.totalPage;
          if (response.data.list) {
            this.menuList = response.data.list;
            return
          }
          //判断非第一页最后一条数据删除null
          if (response.pageNum != 1) {
            this.pageNum -= 1;
            this.getMenuList();
          }

          this.menuList = [];
        }
      });

    },
    turnPage() {
      this.getMenuList();
    },
    search() {
      this.getMenuList();
    },
    deleteMenu() {
      this.$http.post('/cms/menu/deleteById', {
        menuId: this.deleteMenuId
      }).then(response => {
        if (response.code === 10000) {
          this.getMenuList();
        }
      });
    },
    openConfirm(menuId) {
      this.deleteMenuId = menuId;
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: `消息确认`,
        text: '删除该菜单会把下面子菜单删除，你确定要这么做吗？',
        acceptText: "确认",
        cancelText: "取消",
        accept: this.deleteMenu
      })
    },
    addMenuDetail() {
      this.$router.push({path: '/MenuDetail', query: {editState: '1'}});
    },
    editMenuDetail(menuId) {
      this.$router.push({path: '/MenuDetail', query: {editState: '2', id: menuId}});
    },

  },
}
</script>
