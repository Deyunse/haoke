<template>
  <div>
    <van-nav-bar title="收藏列表">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <InFormAtion :list="favoIteslist"></InFormAtion>
  </div>
</template>

<script>
import InFormAtion from '@/components/InFormAtion.vue'
import { getFavoItes } from '@/api/user'
export default {
  name: 'shoucang',
  async created () {
    try {
      if (this.$store.state.user && this.$store.state.user.token) {
        const res = await getFavoItes()
        // console.log(res)
        this.favoIteslist = res.data.body
      }
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      favoIteslist: []
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
/deep/.van-nav-bar__title {
  font-size: 18px;
}
/deep/.van-icon {
  font-size: 16px;
}
</style>
