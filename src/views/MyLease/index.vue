<template>
  <div>
    <van-nav-bar title="房屋管理">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <InFormAtion :list="PubLiShed"></InFormAtion>
  </div>
</template>

<script>
import InFormAtion from '@/components/InFormAtion.vue'
import { getPubLished } from '@/api/user'
export default {
  name: 'shoucang',
  async created () {
    try {
      if (this.$store.state.user && this.$store.state.user.token) {
        const res = await getPubLished()
        // console.log(res)
        this.PubLiShed = res.data.body
      }
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      PubLiShed: []
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
