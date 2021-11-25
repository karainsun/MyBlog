<template>
  <div class="banner pos-rel">
    <div class="banner-content pos-abs w-full h-full">
      <div v-if="info" class="postinfo">
        <div class="tags">
          <span v-for="tag in JSON.parse(tags)" :key="tag.id">
            <router-link :to="{ path: '/tags', query: { id: tag.id } }">
            {{tag.name}}
            </router-link>
          </span>
        </div>
        <h1 class="title text-white mt-10 mb-10">{{ title }}</h1>
        <i class="date text-white fs-22">Posted by Kay on {{ date }}</i>
      </div>
      <div v-else class="slogan text-c text-white w-full">
        <h1 class="fs-26">{{ title }}</h1>
        <div class="fs-18">{{ desc }}</div>
      </div>
      <div class="wave">
        <div class="preview-overlay">
          <svg
            class="preview-waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              ></path>
            </defs>
            <g class="preview-parallax">
              <use class="gentle-wave1" xlink:href="#gentle-wave" x="48" y="0" fill="var(--gentle-wave1)"></use>
              <use class="gentle-wave2" xlink:href="#gentle-wave" x="48" y="3" fill="var(--gentle-wave2)"></use>
              <use class="gentle-wave3" xlink:href="#gentle-wave" x="48" y="5" fill="var(--gentle-wave3)"></use>
              <use class="gentle-wave" xlink:href="#gentle-wave" x="48" y="7" fill="var(--gentle-wave)"></use>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="banner-bg">
      <img :src="image" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    info: {
      type: Boolean,
      default: false
    },
    tags: {
      type: String,
      default: '[]'
    },
    title: {
      type: String,
      default: 'Live My Life'
    },
    desc: {
      type: String,
      default: 'Welcome to my blog.'
    },
    date: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default:
        'https://cdn.jsdelivr.net/gh/V-Vincen/V-Vincen.github.io/img/header_img/newhome_bg.jpg'
    }
  }
})
</script>

<style lang="less" scoped>
@media screen and (max-width: 1024px) {
  .banner {
    height: calc(100vh - 200px);
  }
}
@media screen and (max-width: 768px) {
  .slogan {
    height: calc(100vh - 240px);
  }
  .postinfo {
    padding: 0 20px;
    height: calc(100vh - 240px);
    .title {
      font-size: 20px;
    }
  }
}
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .slogan {
    height: calc(100vh - 300px);
  }
  .postinfo {
    width: 700px;
    margin: auto;
    height: calc(100vh - 300px);
    .title {
      font-size: 20px;
    }
  }
}
@media screen and (min-width: 1024px) {
  .banner {
    height: 100vh;
  }
  .slogan {
    height: calc(100vh - 100px);
  }
  .postinfo {
    width: 770px;
    margin: auto;
    height: calc(100vh - 100px);
    .title {
      font-size: 42px;
    }
  }
}
.banner {
  width: 100vw;
  overflow: hidden;
  .postinfo {
    .tags {
      padding-top: 160px;
      span {
        display: inline-block;
        border: 1px solid rgba(255, 255, 255, 0.8);
        border-radius: 999em;
        padding: 0 10px;
        color: #fff;
        line-height: 24px;
        font-size: 14px;
        margin: 0 8px 6px 0;
        cursor: pointer;
        a{
          color: #fff;
        }
        &:hover{
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
  .slogan {
    h1 {
      padding-top: 180px;
      font-size: 60px;
    }
    text-shadow: 5px 5px 5px var(--bd-shadow);
  }
  .banner-content{
    z-index: 888;
  }
  .banner-bg {
    width: 100%;
    height: 100%;
    top: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(var(--img-light));
    }
  }
}
</style>
