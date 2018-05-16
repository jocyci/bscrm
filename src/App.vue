<template>
  <div id="app">
    <div class="wrapper" v-if="noHeaderAndAside">
      <header-component
        :sidebarExpand="sidebarExpand"
        :username="username"
        :maxValue="maxValue"
        :minValue="minValue"
        :storeList="storeList"
        @sidebarToggle="sidebarToggle"
        >
      </header-component>
      <aside-nav
        :sidebarExpand="sidebarExpand"
        :username="username"
        :maxValue="maxValue"
        :minValue="minValue"
        :navLists="navLists"
        >
      </aside-nav>
      <div class="content" :style="{'margin-left': sidebarExpand ? maxValue : minValue}">
        <router-view class="view"/>
      </div>
    </div>

    <div class="wrapper" v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import Util from '@/common/util'
import asideConfig from '@/common/config/aside'
import headerComponent from '@/common/components/header'
import asideNav from '@/common/components/asideNav'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      noHeaderAndAside: true,
      sidebarExpand: true,
      maxValue: '230px',
      minValue: '45px',
      selectCompany: '',
      storeList: [],
      username: '',
      navLists: []
    }
  },
  components: {
    headerComponent,
    asideNav
  },
  computed: mapGetters(['globalTokenGetter', 'afterLoginGetter']),
  watch: {
    '$route': function () {
      this.routeChange()
    },
    afterLoginGetter () {
      if (this.afterLoginGetter) {
        let storeList = []
        this.username = Util.decodeBase64(Util.getCookie('username'))
        this.navLists = this.afterLoginGetter.view.map(item => {
          item.icon = asideConfig[item.route] ? asideConfig[item.route].icon : 'clipboard'
          return item
        })
        this.afterLoginGetter.store_list.forEach((item) => {
          if (item.id && item.Name && item.Market) {
            storeList.push({
              value: item.id,
              label: `${item.Name}  |  ${item.Market}`
            })
          }
        })
        this.storeList = storeList
      }
    }
  },
  methods: {
    ...mapActions(['updateToken', 'fetchAfterLoginData']),
    routeChange () {
      let path = this.$route.path
      if (path === '/login' || /^\/register/.test(path)) {
        this.noHeaderAndAside = false
      } else {
        this.noHeaderAndAside = true
      }
    },
    sidebarToggle () {
      this.sidebarExpand = !this.sidebarExpand
    }
  },
  mounted () {
    this.updateToken({token: Util.getCookie('token')})
    if (this.globalTokenGetter) {
      this.fetchAfterLoginData()
    }
  }
}
</script>

<style>
html, body, #app, .wrapper, .content {
  height: 100%;
}
body {
  color: #1a1a1a;
  background: #ecf0f5!important;
}
#app {
  min-width: 1200px;
}
.content {
  padding: 10px 8px 7px 8px;
}
.view {
  background: #fff;
  padding: 5px 12px;
  min-height: 99%;
  margin-top: 3px;
  margin-bottom: 10px;
}
.header-right,
.content {
  -webkit-transition: -webkit-transform .3s ease-in-out,margin .3s ease-in-out;
  -moz-transition: -moz-transform .3s ease-in-out,margin .3s ease-in-out;
  -o-transition: -o-transform .3s ease-in-out,margin .3s ease-in-out;
  transition: transform .3s ease-in-out,margin .3s ease-in-out;
}
.aside-nav,
.header-left {
  -webkit-transition: -webkit-transform .3s ease-in-out,width .3s ease-in-out;
  -moz-transition: -moz-transform .3s ease-in-out,width .3s ease-in-out;
  -o-transition: -o-transform .3s ease-in-out,width .3s ease-in-out;
  transition: transform .3s ease-in-out,width .3s ease-in-out;
}
.content {
  padding-top: 55px;
}
</style>
