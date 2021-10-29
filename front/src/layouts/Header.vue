<template>
  <div>
    <div class="top-scroll pos-fix w-full"><div class="top-bar"></div></div>
    <div
      class="header pos-fix"
      :class="show ? 'active-a' : 'active-b'"
      :style="isScroll ? { backgroundColor: 'rgba(255, 255, 255, 0.5)' } : ''"
    >
      <div
        class="head-cont box-sizing d-flex js-between box-sizing p-20 ai-center"
        :class="!isScroll ? 'text-w' : 'text-b'"
      >
        <div class="avatar"><i class="fs-22 text">Kay`s zone.</i></div>
        <div class="menu">
          <ul class="d-flex fs-14">
            <li>
              <router-link to="/"><i class="nav-txt">主页</i></router-link>
            </li>
            <li>
              <router-link to="/archives"><i class="nav-txt">归档</i></router-link>
            </li>
            <li>
              <router-link to="/category"><i class="nav-txt">分类</i></router-link>
            </li>
            <li>
              <router-link to="/tags"><i class="nav-txt">标签</i></router-link>
            </li>
            <li>
              <router-link to="/collection"><i class="nav-txt">收藏</i></router-link>
            </li>
            <li>
              <router-link to="/about"><i class="nav-txt">关于</i></router-link>
            </li>
            <li>
              <router-link to="/message"><i class="nav-txt">留言</i></router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      isScroll: false,
      show: true,
      scrollHeight: 0,
      topScroll: ''
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const root = document.body.style
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isScroll = scrollTop > 10
      const is_scroll = scrollTop - this.scrollHeight
      this.scrollHeight = scrollTop
      if (is_scroll > 0) {
        this.show = false
      } else {
        this.show = true
      }
      const percent = (scrollTop / (document.body.offsetHeight - window.innerHeight)) * 100
      root.setProperty('--scroll', percent + '')
    }
  }
})
</script>

<style lang="less" scoped>
@media screen and (max-width: 767px) {
  .header {
    .head-cont {
      .avatar {
        display: none;
      }
      .menu {
        ul {
          li {
            margin-left: 18px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .header {
    .head-cont {
      .avatar {
        display: block;
      }
      .menu {
        ul {
          li {
            margin-left: 30px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
.header {
  width: 100%;
  height: 60px;
  z-index: 999;
  transition: 0.5s;
  &.active-a {
    top: 0px;
    transition: 0.5s;
  }
  &.active-b {
    top: -60px;
    transition: 0.5s;
  }
  .head-cont {
    margin: auto;
    height: 60px;
    .avatar {
      font-weight: bold;
    }
    .menu {
      ul {
        li {
          font-weight: bold;
        }
      }
    }
  }
  .text-b {
    .menu {
      .nav-txt {
        color: #333;
        &:hover {
          color: var(--main-color);
        }
      }
    }
  }
  .text-w {
    .avatar {
      .text {
        color: #fff;
        &:hover {
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
    .menu {
      .nav-txt {
        color: #fff;
        &:hover {
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
.top-scroll {
  height: 3px;
  z-index: 9999;
  .top-bar {
    width: calc(var(--scroll) * 1%);
    background-color: var(--main-color);
    height: 3px;
  }
}
</style>
