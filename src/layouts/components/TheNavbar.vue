<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
========================================================================================== -->


<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar class="vx-navbar navbar-custom" :color="navbarColor" :class="classObj">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer mr-1" icon="MenuIcon"
                      @click.stop="showSidebar"></feather-icon>

        <template v-if="breakpoint != 'md'">
          <!-- STARRED PAGES - FIRST 10 -->
          <ul class="vx-navbar__starred-pages">
            <draggable v-model="starredPagesLimited" :group="{name: 'pinList'}" class="flex cursor-move">
              <li class="starred-page" v-for="page in starredPagesLimited" :key="page.url">
                <vx-tooltip :text="page.label" position="bottom" delay=".3s">
                  <feather-icon svgClasses="h-6 w-6" class="p-2 cursor-pointer" :icon="page.labelIcon"
                                @click="$router.push(page.url)"></feather-icon>
                </vx-tooltip>
              </li>
            </draggable>
          </ul>

          <!-- STARRED PAGES MORE -->
          <div class="vx-navbar__starred-pages--more-dropdown" v-if="starredPagesMore.length">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" class="cursor-pointer p-2"></feather-icon>
              <vs-dropdown-menu>
                <ul class="vx-navbar__starred-pages-more--list">
                  <draggable v-model="starredPagesMore" :group="{name: 'pinList'}" class="cursor-move">
                    <li class="starred-page--more flex items-center cursor-pointer" v-for="page in starredPagesMore"
                        :key="page.url" @click="$router.push(page.url)">
                      <feather-icon svgClasses="h-5 w-5" class="ml-2 mr-1" :icon="page.labelIcon"></feather-icon>
                      <span class="px-2 pt-2 pb-1">{{ page.label }}</span>
                    </li>
                  </draggable>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <div class="bookmark-container">
            <feather-icon icon="StarIcon"
                          :svgClasses="['stoke-current text-warning', {'text-white': navbarColor != '#fff'}]"
                          class="cursor-pointer p-2"
                          @click.stop="showBookmarkPagesDropdown = !showBookmarkPagesDropdown"/>
            <div v-click-outside="outside" class="absolute bookmark-list w-1/3 xl:w-1/4 mt-4"
                 v-if="showBookmarkPagesDropdown">
              <vx-auto-suggest :autoFocus="true" :data="navbarSearchAndPinList" @selected="selected"
                               @actionClicked="actionClicked" inputClassses="w-full" show-action show-pinned
                               background-overlay></vx-auto-suggest>
            </div>
          </div>
        </template>


        <vs-spacer></vs-spacer>


        <!-- USER META -->
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ userInfo.nikename }}</p>
            <small>{{ userInfo.roleName }}</small>
          </div>
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="con-img ml-3">
              <img
                key="localImg"
                :src="require(`@/assets/images/portrait/small/avatar-s-1.png`)"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"/>
            </div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem">
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="$router.push('/profile')">
                  <feather-icon icon="UserIcon" svgClasses="w-4 h-4"></feather-icon>
                  <span class="ml-2">我的信息</span></li>
                <vs-divider class="m-1"></vs-divider>
                <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="LogOut">
                  <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"></feather-icon>
                  <span class="ml-2">退出登录</span></li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

      </vs-navbar>
    </div>
  </div>
</template>

<script>
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue';
import draggable from 'vuedraggable'

export default {
  name: "the-navbar",
  props: {
    navbarColor: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: '',
      userInfo: '',
      showFullSearch: false,
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false,
    }
  },
  watch: {
    '$route'() {
      if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false
    }
  },
  computed: {
    // HELPER
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint() {
      return this.$store.state.breakpoint;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.sidebarWidth == "default") return "navbar-default"
      else if (this.sidebarWidth == "reduced") return "navbar-reduced"
      else if (this.sidebarWidth) return "navbar-full"
      return "navbar-default";
    },

    // BOOKMARK & SEARCH
    data() {
      return this.$store.state.navbarSearchAndPinList;
    },
    starredPages() {
      return this.$store.state.starredPages;
    },
    starredPagesLimited: {
      get() {
        return this.starredPages.slice(0, 10);
      },
      set(list) {
        this.$store.dispatch('arrangeStarredPagesLimited', list);
      }
    },
    starredPagesMore: {
      get() {
        return this.starredPages.slice(10);
      },
      set(list) {
        this.$store.dispatch('arrangeStarredPagesMore', list);
      }
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$http.post('/cms/manager/info', {}).then(response => {
        if (response.code === 10000) {
          this.userInfo = response.data;
        }
      })
    },
    LogOut() {
      localStorage.removeItem("tokenHead");
      localStorage.removeItem("token");
      this.$router.push('/login');
    },
    showSidebar() {
      this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
    },
    selected(item) {
      this.$router.push(item.url)
      this.showFullSearch = false;
    },
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch('updateStarredPage', {index: item.index, val: !item.highlightAction});
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
    },
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? ' Years ' : ' Year ') + 'ago';
      } else if (days > 0) {
        return days + (days > 1 ? ' Days ' : ' Day ') + 'ago';
      } else if (hours > 0) {
        return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago';
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago';
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} sec ago` : 'just now');
      }

      return 'Just Now'
    },
    outside: function () {
      this.showBookmarkPagesDropdown = false
    },
  },
  directives: {
    'click-outside': {
      bind: function (el, binding) {
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        document.addEventListener('click', handler)
      },

      unbind: function (el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  },
  components: {
    VxAutoSuggest,
    draggable
  },
}
</script>
