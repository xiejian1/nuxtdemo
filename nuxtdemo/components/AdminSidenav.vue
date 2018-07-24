<template>
  <aside>
    <el-menu unique-opened :default-active="activeIndex" router>
      <template v-for="(menu, index) in menus">
        <el-submenu v-if="menu.children && menu.children.length" :key="index" :index="menu.path">
          <template slot="title">{{menu.title}}</template>
          <el-menu-item v-for="(menuItem, index) in menu.children" :key="index" :index="menuItem.path">{{menuItem.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="index" :index="menu.path">{{menu.title}}</el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '',
      menus: [
        {
          path: '/admin/websiteInfo',
          title: '平台信息配置',
          children: [{
            path: '/admin/unitConfig',
            title: '单位信息配置'
          }, {
            path: '/admin/menuConfig',
            title: '菜单配置'
          }, {
            path: '/admin/dateConfig',
            title: '日期配置'
          }, {
            path: '/admin/imageConfig',
            title: '图片信息配置'
          }, {
            path: '/admin/friendLinksConfig',
            title: '友情链接配置'
          }, {
            path: '/admin/otherConfig',
            title: '其他信息配置'
          }]
        }, {
          path: '/admin/sidenavContent',
          title: '导航内容编辑'
        }, {
          path: '/admin/articles',
          title: '首页文章管理',
          children: [{
            path: '/admin/news',
            title: '新闻News'
          }, {
            path: '/admin/notice',
            title: '通知Notice'
          }, {
            path: '/admin/learn',
            title: '下载Download'
          }]
        }, {
          path: '/admin/gatherInfo',
          title: '采集信息管理',
          children: [{
            path: '/admin/infoFormConfig',
            title: '表单配置'
          }, {
            path: '/admin/userGatherInfo',
            title: '用户采集信息'
          }]
        }
      ]
    }
  },
  methods: {
    setActiveIndex: function () {
      const activeMenu = this.menus.find(menu => {
        return ~window.location.href.indexOf(menu.path)
      })
      if (activeMenu) {
        this.activeIndex = activeMenu.path
      }
    }
  },
  mounted () {
    this.setActiveIndex()
  }
}
</script>

