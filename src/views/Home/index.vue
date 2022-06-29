<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in SwiperImgs" :key="item.id"
        ><img :src="`http://liufusong.top:8080${item.imgSrc}`" alt=""
      /></van-swipe-item>
    </van-swipe>
    <div class="search">
      <van-search
        v-model="value"
        show-action
        label="北京"
        placeholder="请输入搜索关键词"
      >
        <template #action>
          <van-icon name="guide-o" size="25px" class="map" />
        </template>
        <template #label
          >北京
          <van-icon name="location-o" size="16px" />
        </template>
      </van-search>
    </div>
    <div>
      <ul class="lookup">
        <li @click="fn">
          <img src="@/assets/下载.png" alt="" />
          <h2>整租</h2>
        </li>
        <li @click="fn">
          <img src="@/assets/下载 (1).png" alt="" />
          <h2>合租</h2>
        </li>
        <li>
          <img src="@/assets/下载 (2).png" alt="" />
          <h2>地图找房</h2>
        </li>
        <li @click="releaseFn">
          <img src="@/assets/下载 (3).png" alt="" />
          <h2>去出租</h2>
        </li>
      </ul>
    </div>
    <div class="grouping">
      <div class="top">
        <h6>租房小组</h6>
        <span>更多</span>
      </div>
      <div class="am-grid-item">
        <ul class="choose">
          <li v-for="item in groupsList" :key="item.id">
            <img :src="`http://liufusong.top:8080${item.imgSrc}`" alt="" />
            <div>
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getSwiper, getGroups } from '@/api/home'
export default {
  async created () {
    try {
      const res = await getGroups()
      // console.log('res', res)
      this.groupsList = res.data.body
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      SwiperImgs: [],
      value: '',
      groupsList: []

    }
  },
  methods: {
    async getSwiperImg () {
      try {
        const res = await getSwiper()
        // console.log(res)
        this.SwiperImgs = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    releaseFn () {
      if (this.$store.state.user && this.$store.state.user) {
        // console.log(123)
        this.$router.push('/release')
      } else {
        this.$router.push('/login')
      }
    },
    fn () {
      if (this.$store.state.user && this.$store.state.user) {
        // console.log(123)
        this.$router.push('/renthouse')
      } else {
        this.$router.push('/login')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    this.getSwiperImg()
  }
}
</script>

<style scoped lang='less'>
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    vertical-align: top;
  }
}
.search {
  width: 310px;
  left: 15px;
  height: 34px;
  position: fixed;
  top: 25px;
  border-radius: 50%;
  .van-search {
    padding: 0;
  }
}
.map {
  position: absolute;
  top: 8px;
  right: -40px;
  color: #fff;
}
.lookup {
  display: flex;
  li {
    padding: 10px 0;
    text-align: center;
    flex: 1;
    img {
      width: 65px;
      height: 65px;
    }
    h2 {
      margin: 11px 0;
      font-size: 14px;
      font-weight: normal;
    }
  }
}
.grouping {
  background-color: #f6f5f6;
  padding: 15px 10px;
  height: 188px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    h6 {
      font-size: 15px;
      color: #333;
      font-weight: 600;
    }
    span {
      font-size: 14px;
      color: #787d72;
    }
  }
}
.am-grid-item {
  .choose {
    display: flex;
    justify-content: space-between;

    flex-flow: wrap;
    li {
      padding-bottom: 7px;
      border-radius: 8px;
      margin: 5px;
      width: 155px;
      height: 60px;
      background-color: #fff;
      display: flex;
      img {
        width: 50px;
        height: 100%;
        margin-right: 15px;
      }
      p {
        font-size: 12px;
      }
      div {
        margin-top: 10px;
      }
    }
  }
}
</style>
