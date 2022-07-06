<template>
  <div>
    <van-search placeholder="请输入小区或地址" background="#4fc08d">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
      <template #label>
        <div @click="$router.push({ path: '/citysele' })">
          <span>{{ $store.state.city }}▼</span> <van-icon name="arrow-down" />
        </div>
      </template>
    </van-search>
    <van-dropdown-menu active-color="#4fc08d">
      <!-- 区域 -->
      <van-dropdown-item title="区域">
        <template>
          <van-picker
            show-toolbar
            :columns="deeplist"
            toolbar-position="bottom"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </template>
      </van-dropdown-item>
      <!-- 方式 -->
      <van-dropdown-item title="方式">
        <template>
          <van-picker
            :columns="modeList"
            show-toolbar
            toolbar-position="bottom"
          />
        </template>
      </van-dropdown-item>
      <!-- 租金 -->
      <van-dropdown-item title="租金">
        <template>
          <van-picker
            :columns="pricelist"
            show-toolbar
            toolbar-position="bottom"
          />
        </template>
      </van-dropdown-item>
      <!-- 筛选 -->
      <van-dropdown-item>
        <template #title>
          <span @click="show = !show">筛选</span>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>

    <InFormAtion :list="getHousesList"></InFormAtion>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '295px' }"
      duration="0"
    >
      <!-- 户型 -->
      <template>
        <div class="details">
          <h3>户型</h3>
          <van-row class="type-selection">
            <van-col
              span="12"
              v-for="(item, index) in region.roomType"
              :key="index"
              @click="onClick1(item.label)"
              :class="selection.includes(item.label) ? 'active' : ''"
            >
              {{ item.label }}
            </van-col>
          </van-row>
        </div>
        <!-- 朝向 -->
        <div class="details">
          <h3>朝向</h3>
          <van-row class="type-selection">
            <van-col
              span="12"
              v-for="(item, index) in region.oriented"
              :key="index"
            >
              {{ item.label }}
            </van-col>
          </van-row>
        </div>
        <!-- 楼层 -->
        <div class="details">
          <h3>楼层</h3>
          <van-row class="type-selection">
            <van-col
              span="12"
              v-for="(item, index) in region.floor"
              :key="index"
            >
              {{ item.label }}
            </van-col>
          </van-row>
        </div>
        <!-- 房屋亮点 -->
        <div class="details">
          <h3>房屋亮点</h3>
          <van-row class="type-selection">
            <van-col
              span="12"
              v-for="(item, index) in region.characteristic"
              :key="index"
            >
              {{ item.label }}
            </van-col>
          </van-row>
        </div>
      </template>
    </van-popup>
    <div class="footer-btn" v-show="show">
      <van-button type="default" @click="show = false">取消</van-button>
      <van-button type="primary">确认</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import InFormAtion from '@/components/InFormAtion.vue'
// 获取房源
import { getHouses, getCondition } from '@/api/houses'
import { formatregion, formathandl } from '@/utils/handle'
export default {
  name: 'renthouse',
  data () {
    return {
      getHousesList: [],
      screenList: [],
      deeplist: [],
      // 区域
      modeList: [], // 方式
      pricelist: [], // 租金
      // 筛选
      screen: {},
      // 地铁
      region: {}, // 房屋查询条件集合
      show: false,
      isProxy: false,
      value: '',
      selection: [],
      state: {
        asea: '',
        subway: '',
        pentType: '',
        price: ''
      }
    }
  },
  methods: {

    // 区域 确定按钮触发回调
    onConfirm (value) {
      console.log(value)
      // Toast(`当前值：${value}, 当前索引：${index}`)
      const val = value[2] ? value[2] : value[1]
      // console.log(val)
      // const result = this.findValue(this.deeplist[0].children, val)
      // console.log(result)
      // this.deeplist[0].forEach(item => {
      //   console.log(item)
      // })
    },
    // 区域 取消按钮触发回调

    onCancel () {
      console.log(234)
    },
    onClick1 (val) {
      if (this.selection.includes(val)) {
        const index = this.selection.indexOf(val)
        this.selection.splice(index, 1)
      } else {
        this.selection.push(val)
      }
    },
    formatregion,
    formathandl
  },
  async created () {
    // 地区数据
    try {
      const res = await getCondition(this.$store.state.houseID)
      console.log('res', res)
      this.region = res.data.body
      // 区域
      this.formatregion(res.data.body.area.children) // 将请求回来的区域数据 将没有childen的添加上childen键为text 值为空
      const formaArea = this.formathandl(res.data.body.area) // 将label 替换为 text
      // console.log(formaArea)
      // 地铁
      this.formatregion(res.data.body.subway.children)
      const formaSubway = this.formathandl(res.data.body.subway)
      // console.log(formaSubway)
      this.deeplist = new Array(formaArea, formaSubway)
      // 租金
      // this.formatregion(res.data.body.price.children)
      this.pricelist = this.formathandl(res.data.body.price)
      // console.log(formaPrice)

      // 方式
      this.modeList = this.formathandl(res.data.body.rentType)
    } catch (err) {
      console.log(err)
    }
    // 热门区域
    try {
      const res = await getHouses()
      console.log(res)
      this.getHousesList = res.data.body.list
    } catch (err) {
      console.log(err)
    }
  },
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

.details {
  padding: 0 14px;
  h3 {
    font-weight: normal;
    font-size: 15px;
    margin: 20px 0;
  }
  .type-selection {
    border-bottom: 1px solid #888888;
  }
}
.city-option {
  width: 250px;
}
.footer-btn {
  z-index: 9999999;
  bottom: 0;
  position: fixed;
  width: 295px;
  display: flex;
  right: 0;
  .van-button--primary {
    flex: 1;
    border: 0;
    height: 50px;
  }
  .van-button--default {
    width: 98px;
    color: #21b97a;
    height: 50px;
  }
}
/deep/.van-picker-column {
  width: 125px;
}
/deep/.van-picker__toolbar {
  width: 375px;
  height: 50px;
  border-top: 1px solid #f5f5f5;
  .van-picker__confirm {
    width: 250px;
    background-color: #21b97a;
    color: #fff;
  }
  .van-picker__cancel {
    padding: 0;
    color: #21b97a;
    text-align: center;
    padding-left: 45px;
  }
}
/deep/.van-col {
  font-size: 12px;
  text-align: center;
  line-height: 32px;
  width: 70px;
  height: 32px;
  font-size: 12px;
  border: 0.01rem solid;
  color: #888888;
  margin: 8px 30px;
  border-radius: 3px;
}
.active {
  background-color: #4fc08d;
  color: #fff;
}
</style>
