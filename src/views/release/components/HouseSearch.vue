<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @input="onSearch"
        @cancel="onCancel"
        background="#f6f5f6"
      />
    </form>
    <van-cell-group v-if="getCommunityList.length > 0">
      <van-cell
        :title="item.communityName"
        v-for="(item, index) in getCommunityList"
        :key="index"
        @click="setFn(index)"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { getCommunity } from '@/api/houses'
export default {
  created () {

  },
  data () {
    return {
      value: '',
      getCommunityList: []
    }
  },
  methods: {
    onCancel () {
      this.$router.back()
    },
    onSearch () {
      this.$store.commit('setAreaName', this.value)
      this.getCommunity()
    },
    // 获取搜索结果
    async getCommunity () {
      try {
        if (this.value === '') {
          this.getCommunityList = []
          return
        }
        const res = await getCommunity(this.value, this.$store.state.houseID)
        console.log(res)
        this.getCommunityList = res.data.body
      } catch (err) {
        console.log(err)
      }
    },
    // 小区名称
    setFn (index) {
      this.$store.commit('setAreaName', this.getCommunityList[index].communityName)
      this.$store.commit('setAreaNameID', this.getCommunityList[index].community)
      this.$router.go(-1)
      this.$emit('set-community', this.getCommunityList[index].community)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
