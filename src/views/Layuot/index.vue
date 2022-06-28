<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="renthouse">找房</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="news">咨询</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      active: 0
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
</style>
