<template>
  <div>
    <!-- 背景图 -->
    <div class="myTitle">
      <!-- 有token -->
      <div class="personal" v-if="$store.state.user && $store.state.user.token">
        <img :src="`http://liufusong.top:8080${userObj.avatar}`" alt="" />
        <p>{{ userObj.nickname }}</p>
        <span @click="loginOut">退出</span>
        <div edit>编辑个人资料</div>
      </div>
      <!-- 没有token -->
      <div class="personal" v-else>
        <img src="../../assets/avatar.png" alt="" />
        <p>游客</p>
        <span @click="$router.push({ path: 'login' })">去登录</span>
      </div>
    </div>
    <van-grid clickable :border="false" :column-num="3">
      <van-grid-item icon="star-o" text="我的收藏" to="/collection" />
      <van-grid-item icon="wap-home-o" text="我的出租" to="/mylease" />
      <van-grid-item icon="home-o" text="路由跳转" to="/" />
      <van-grid-item icon="home-o" text="路由跳转" to="/" />
      <van-grid-item icon="home-o" text="路由跳转" to="/" />
      <van-grid-item icon="home-o" text="路由跳转" to="/" />
    </van-grid>
    <div class="join"></div>
  </div>
</template>

<script>
import { getUser } from '@/api/user'
export default {
  created () {
    this.grtUserInfo()
  },
  data () {
    return {
      userObj: {

      }

    }
  },
  methods: {
    // 获取用户信息
    async grtUserInfo () {
      try {
        const res = await getUser()
        // console.log(res)
        this.userObj = res.data.body
        // console.log(this.userObj.avatar)
      } catch (err) {
        console.log(err)
      }
    },
    loginOut () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
  },
  watch: {
  },
  filters: {},
  components: {},
  mounted () {
  }
}
</script>

<style scoped lang="less">
.myTitle {
  position: relative;
  height: 300px;
  background: url("@/assets/bg.png") no-repeat top;
  background-size: 100%;
  .personal {
    text-align: center;
    position: absolute;
    left: 27px;
    bottom: 0;
    width: 320px;
    height: 166px;
    background-color: #fff;
    font-size: 13px;
    p {
      margin-top: 50px;
    }
    span {
      width: 70px;
      display: block;
      margin: 0 auto;
      background-color: #21b97a;
      font-size: 8px;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      border-radius: 55px;
      color: #fff;
      margin-bottom: 10px;
    }
    img {
      position: absolute;
      top: -30px;
      right: 132px;
      width: 60px;
      height: 60px;
      background-color: #fff;
      border-radius: 50%;
    }
    .edit {
      zoom: 6px;
      font-family: 400;
    }
  }
}
.join {
  width: 354px;
  height: 100px;
  background: url("@/assets/join.png") no-repeat top;
  background-size: 100%;
  margin-left: 12px;
}
</style>
