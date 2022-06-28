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
        <li><img src="@/assets/下载.png" alt="" /><h2>整租</h2></li>
        <li><img src="@/assets/下载 (1).png" alt="" /><h2>合租</h2></li>
        <li><img src="@/assets/下载 (2).png" alt="" /><h2>地图找房</h2></li>
        <li><img src="@/assets/下载 (3).png" alt="" /><h2>去出租</h2></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSwiper } from '@/api/home'
export default {
  created () { },
  data () {
    return {
      SwiperImgs: [],
      value: '',
      option1: [{ text: '全部商品', value: 0 }],
      value1: 1
    }
  },
  methods: {
    async getSwiperImg () {
      try {
        const res = await getSwiper()
        console.log(res)
        this.SwiperImgs = res.data.body
      } catch (err) {
        console.log(err)
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
      width: 60px;
      height: 60px;
    }h2{
      margin: 11px 0;
      font-size: 14px;
      font-weight: normal;
    }
  }
}
</style>
