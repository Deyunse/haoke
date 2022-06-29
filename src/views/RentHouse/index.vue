<template>
  <div>
    <van-search
      placeholder="请输入小区或地址"
      background="#4fc08d"
      label="北京👇"
    >
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-search>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1">
        <template #default>
          <span></span>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <InFormAtion :list="getHousesList"></InFormAtion>
  </div>
</template>

<script>
import InFormAtion from '@/components/InFormAtion.vue'
// 获取房源
import { getHouses, getCondition } from '@/api/houses'
export default {
  async created () {
    try {
      const res = await getHouses()
      console.log(res)
      this.getHousesList = res.data.body.list
    } catch (err) {
      console.log(err)
    }
    try {
      const res = await getCondition()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      getHousesList: [],
      value1: 0,
      value2: 'a',
      option1: [
        { text: '区域', value: 0 }
      ]
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { InFormAtion }
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar__title {
  max-width: unset;
}
.search-btn {
  background: rgba(255, 255, 255, 0.5);
  width: 274px;
  height: 30px;
  color: #fff;
  border: 0;
}
.van-icon {
  color: #fff;
  font-size: 18px;
  margin-right: 10px;
}
/deep/.van-cell {
  width: 120px;
}
</style>
