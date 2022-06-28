<template>
  <div>
    <van-nav-bar title="账号登录">
      <template #left>
        <van-icon name="arrow" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit(user)" ref="form">
      <van-field
        name="name"
        v-model.trim="user.username"
        placeholder="请输入账号"
        :rules="[
          {
            required: true,
            message: '请填写用户名',
          },
          { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: '用户名不符合格式' },
        ]"
      />
      <van-field
        v-model.trim="user.password"
        type="password"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\d{6}$/, message: '密码不正确' },
        ]"
      />
      <div style="margin: 8px">
        <van-button block native-type="submit" class="login-btn"
          ><span class="login-btn">登 录</span></van-button
        >
      </div>
    </van-form>
    <div class="flexbox">
      <a href="">还没有账号，去注册~</a>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit (values) {
      if (values.username === '' && values.password === '') return this.$toast.fail('账户或密码不能为空')
      try {
        const res = await login(values)
        console.log(res)
        if (res.data.body.token) {
          this.$toast.success('登录成功')
          this.$store.commit('setUser', res.data.body.token)
          console.log(res.data.body.token)
          this.$router.push({ name: 'my' })
        } else {
          this.$toast.fail('账户或密码错误')
        }
      } catch (err) {
        this.$toast.fail('登录失败,账户或密码错误')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}

}
</script>

<style scoped lang='less'>
.login-btn {
  background-color: #21b97a;
  color: #fff;
}
.van-field {
  padding: 19px;
}
.login-btn {
  font-size: 18px;
}
.flexbox {
  text-align: center;
  font-size: 9px;
}
</style>
