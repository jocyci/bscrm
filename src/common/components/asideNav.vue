<template>
  <div>
    <div class="aside-nav" :style="{'width': sidebarExpand ? maxValue : minValue, 'overflow': sidebarExpand ? 'hidden' : 'initial'}">
      <div class="user" :style="{'width': sidebarExpand ? maxValue: minValue}">
        <Icon type="person"></Icon>
        <span v-if="sidebarExpand">{{username}}</span>
      </div>
      <p class="header-nav" :style="{'height': sidebarExpand ? 'auto' : '0', padding: sidebarExpand ? '10px 0 10px 8px' : '0'}">选择功能</p>
      <ul class="nav-menus">
        <li v-for="item in lists" :key="item.route" :class="{'current-nav': item.action}">
          <router-link :to="`/${item.route}`">
            <div :class="{'icon-nav': !sidebarExpand, 'nm-box': true}">
              <Icon :type="item.icon"></Icon>
              <span>{{item.name}}</span>
            </div>
          </router-link>
        </li>
        <!-- <li>
          <div :class="{'icon-nav': !sidebarExpand, 'nm-box': true}">
            <Icon type="printer"></Icon>
            <span>打印标签</span>
          </div>
        </li>
        <li>
          <div :class="{'icon-nav': !sidebarExpand, 'nm-box': true}">
            <Icon type="edit"></Icon>
            <span>入库录入</span>
          </div>
        </li>
        <li>
          <div :class="{'icon-nav': !sidebarExpand, 'nm-box': true}">
            <Icon type="aperture"></Icon>
            <span>入库凭证</span>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'asideNav',
  props: ['username', 'sidebarExpand', 'maxValue', 'minValue', 'navLists'],
  data () {
    return {
      lists: []
    }
  },
  watch: {
    '$route': function () {
      this.parseNavs()
    },
    navLists: {
      handler () {
        this.parseNavs()
      },
      deep: true
    }
  },
  methods: {
    parseNavs () {
      let path = this.$route.path
      this.navLists.forEach((item) => {
        if (`/${item.route}` === path) {
          item.action = true
        } else {
          item.action = false
        }
      })
      this.lists = Object.assign({}, this.navLists)
    }
  },
  created () {
    this.parseNavs()
  }
}
</script>

<style>
.aside-nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 230px;
  background-color: #222d32;
  z-index: 1;
  padding-top: 50px;
  color: #fff;
}
.header-nav {
  color: #4b646f;
  background: #1a2226;
  padding: 10px 0 10px 8px;
  overflow: hidden;
  -webkit-transition: -webkit-transform .3s ease-in-out,all .3s ease-in-out;
  -moz-transition: -moz-transform .3s ease-in-out,all .3s ease-in-out;
  -o-transition: -o-transform .3s ease-in-out,all .3s ease-in-out;
  transition: transform .3s ease-in-out,all .3s ease-in-out;
}
.aside-nav ul,
.aside-nav li {
  list-style: none;
}
.sidebar-toggle {
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
.navicon-icon {
  display: inline-block;
  height: 100%;
  padding: 18px 16px 0 16px;
  cursor: pointer;
}
.navicon-icon:hover {
  background-color: #367fa9;
}
.nm-box {
  padding-left: 16px;
  width: 150px;
}
.nm-box i {
  margin-right: 3px;
  font-size: 16px;
}
.nav-menus li {
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  /*padding: 10px 0;*/
  position: relative;
}
.aside-nav a {
  color: #b8c7ce;
  width: 100%;
  height: 100%;
  display: inline-block;
  padding: 10px 0;
}
.nav-menus li:hover {
  color: #fff;
  background-color: #1e282c;
  border-left: 3px solid #3c8dbc;
}
.nav-menus li:hover a {
  color: #fff;
}
.nav-menus li:hover .nm-box {
  padding-left: 13px;
}
.nav-menus li:hover .icon-nav>span {
  display: block;
}
.current-nav {
  color: #fff;
  background-color: #1e282c;
  border-left: 3px solid #3c8dbc;
}
.current-nav .nm-box {
  padding-left: 13px;
  color: #fff;
}
.icon-nav>span {
  border-radius: 3px;
  width: 200px;
  z-index: 100;
  display: block;
  position: absolute;
  padding-top: 10px;
  padding-left: 50px;
  top: 0;
  left: 30px;
  height: 100%;
  background-color: #1e282c;
  display: none;
}
.user {
  width: 300px;
  height: 50px;
  padding-top: 8px;
  font-size: 20px;
  padding-left: 16px;
}
.user span {
  margin-left: 5px;
  width: 100px;
}
.nav-menus i {
  width: 18px;
  display: inline-block;
}
</style>
