<template>
  <div class="page">
    <el-menu :collapse="isCollapse" :collapse-transition="true"
      :default-active="this.$store.state.menus.editableTabsValue" class="el-menu-vertical-demo"
      background-color="#304156" text-color="#fff" active-text-color="#F5E44F" :unique-opened="true">
      <el-tooltip :content="content" placement="right-start">
        <el-menu-item style="position: sticky; top: 0; z-index: 10" @click="changeCollapse">
          <i :class="icon" style="color: white; font-size: 24px"></i>
        </el-menu-item>
      </el-tooltip>

      <router-link to="/index">
        <el-menu-item index="Index" @click="selectMenu({ name: 'Index', title: '首页' })">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>

      <el-submenu :index="menu.name + ''" v-for="(menu, index) in menuList" :key="index">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{ menu.title }}</span>
        </template>

        <!--TODO 为了防止跳转不存在的页面，此处需要创建的页面必须有生成路径，假的也行 -->
        <router-link v-if="item.path != undefined" :to="item.path" :key="index" v-for="(item, index) in menu.children">
          <!--TODO  为了联动tab栏与侧边菜单栏此处索引必须是name -->
          <el-menu-item :index="item.name" @click="selectMenu(item)">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
          </el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "SideMenu",

    data() {
      return {
        icon: "",
        isCollapse: true,
        content: "展开",
      };
    },
    //TODO 计算属性动态监控，对菜单数据变化实时绑定
    computed: {
      menuList: {
        get() {
          return this.$store.state.menus.menuList;
        },
      },
    },
    mounted() {
      if (this.isCollapse) {
        this.icon = "el-icon-s-unfold";
      } else {
        this.icon = "el-icon-s-fold";
      }
    },

    methods: {
      selectMenu(item) {
        this.$store.commit("addTab", item);
      },
      changeCollapse() {
        var that = this;
        if (that.isCollapse) {
          this.isCollapse = false;
          this.icon = "el-icon-s-fold";
          this.content = "收起";
        } else {
          this.isCollapse = true;
          this.icon = "el-icon-s-unfold";
          this.content = "展开";
        }
      },
    },
  };
</script>

<style scoped>
  .time {
    font-size: 18px;
    color: rgb(252, 249, 249);
  }

  .el-menu {
    border-right: 0px;
  }

  .el-menu-vertical-demo {
    height: 100vh;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }

  span {
    text-decoration: none;
  }
</style>