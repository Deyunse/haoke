<template>
  <div>
    <van-nav-bar title="城市列表">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-index-bar :index-list="indexList" highlight-color="#21b97a">
      <div v-for="(val, index) in indexList" :key="index">
        <van-index-anchor :index="val">{{
          val === "#" ? "当前城市" : val === "热" ? "热门城市" : val
        }}</van-index-anchor>
        <van-cell
          @click="setCity(item.label, item.value)"
          :title="item.label"
          v-for="(item, index) in allCityList[val]"
          :key="index"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCity, getHotCity } from '@/api/home'
export default {
  created () {
    this.loadCities()
  },
  data () {
    return {
      allCityList: {},
      indexList: ['#', '热'],
      hotList: [],
      region: '北京'
    }
  },
  methods: {
    async loadCities () {
      try {
        const res = await getCity(1)
        console.log(res)
        const cityList = {}
        // eslint-disable-next-line prefer-const
        // 第二遍
        const index1 = []
        console.time('计算表')
        // 声明一个空对象 保存数据
        const obj = {}
        res.data.body.forEach(item => {
          // 截取第一个字符串
          let first = item.pinyin.substr(0, 1).toUpperCase()
          // 判断 有没有这个字母开头的值
          if (obj[first]) {
            obj[first].push(item)
          } else {
            obj[first] = [item]
          }
        })
        // let index =
        const index = Array.from(new Set(Object.keys(obj)))

        console.log(index.sort())

        // 已写好
        let allCityListIndex = []
        res.data.body.forEach(item => {
          // 截取第一个 单词转为大写
          const first = item.short.substr(0, 1).toUpperCase()
          if (cityList[first]) {
            cityList[first].push(item)
          } else {
            cityList[first] = [item]
          }
          this.allCityList = { ...this.allCityList, ...cityList }
          // eslint-disable-next-line prefer-const
          allCityListIndex = Object.keys(cityList).sort()
          // console.log(allCityListIndex)
        })
        // console.timeEnd('计算表')
        this.indexList.push(...allCityListIndex)
      } catch (err) {
        console.log(err)
      }
      // 热门城市
      try {
        const res = await getHotCity()
        console.log(res)
        this.hotList = res.data.body
        this.allCityList = { ...this.allCityList, 热: this.hotList, '#': [{ label: this.$store.state.city }] }
      } catch (err) {
        console.log(err)
      }
    },
    setCity (city, value) {
      this.$store.commit('setCity', city)
      this.$router.back()
      this.$store.commit('setHous', value)
    }

  },
  computed: {},
  watch: {
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
/deep/.van-index-anchor {
  font-size: 12px;
  font-weight: normal;
  color: #999999;
}
/deep/.van-index-bar__index {
  display: block;
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 12px 5px 0;
  font-size: 14px;
}
</style>
