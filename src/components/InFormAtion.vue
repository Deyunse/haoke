<template>
  <div class="main">
    <div class="house" v-for="(item, index) in list" :key="index" >
      <div class="left">
        <img :src="`http://liufusong.top:8080${item.houseImg}`" alt="" />
      </div>
      <div class="right">
        <h6>{{ item.title }}</h6>
        <span>{{item.desc}}</span>
        <p>{{ item.tags[0] }}</p>
        <h5>{{ item.price }}元/月</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// .main {
//   padding: 90px 18px 50px;
// }
.house {
  width: 100%;
  height: 120px;
  padding: 0 10px;
  display: flex;
  border-bottom: 1px solid #afb2b3;
  .left {
    padding-top: 18px;
    width: 106px;
    height: 80px;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    font-size: 12px;
    h6 {
      font-size: 15px;
      margin-top: 15px;
    }
    span {
      color: #afb2b3;
    }
    p {
      background-color: #e1f5f8;
      width: 46px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      color: #39becd;
    }
    h5 {
      color: #fa5741;
    }
  }
}
</style>
