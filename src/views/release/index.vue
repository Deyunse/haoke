<template>
  <div class="main">
    <van-nav-bar title="发布房源">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-cell title="房源信息" class="title-information" />
    <div class="describe">
      <!-- 小区名称 -->
      <van-cell
        title="小区名称"
        is-link
        :value="$store.state.sreaName"
        @click="$router.push({ name: 'housesearch' })"
      >
      </van-cell>
      <!-- 租金 -->
      <van-field
        label="租 金"
        placeholder="请输入租金/月"
        v-model.number="data.price"
      >
        <template #extra> ￥/月 </template>
      </van-field>
      <!-- 建筑面积 -->
      <van-field
        label="建筑面积"
        v-model.number="data.size"
        placeholder="请输入建筑面积"
      >
        <template #extra>m²</template>
      </van-field>
      <!-- 户型 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="value1"
        label="户 型"
        input-align="right"
        placeholder="请选择"
        @click="showPicker1 = true"
        ><template #ringht-icon> <van-icon name="arrow" /> </template>
      </van-field>
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          show-toolbar
          :columns="roomTypeList"
          @confirm="onConfirm1"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- 所在楼层 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="value2"
        label="楼 层"
        input-align="right"
        placeholder="请选择"
        @click="showPicker2 = true"
        ><template #ringht-icon> <van-icon name="arrow" /> </template>
      </van-field>
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          show-toolbar
          :columns="foolList"
          @confirm="onConfirm2"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- 朝向 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="value3"
        label="朝 向"
        input-align="right"
        placeholder="请选择"
        @click="showPicker3 = true"
        class="resources-title"
        ><template #ringht-icon> <van-icon name="arrow" /> </template>
      </van-field>
      <van-popup v-model="showPicker3" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm3"
          @cancel="showPicker = false"
        />
      </van-popup>
      <h6>房屋标题</h6>
    </div>

    <div class="content">
      <van-field
        placeholder="请输入标题 (列如：整租 小区名 2室 5000元)"
        v-model="data.description"
      >
      </van-field>
      <span>房屋图像</span>
    </div>
    <div class="house-content">
      <van-uploader multiple :after-read="afterRead" v-model="fileList" />
      <h5>房屋配置</h5>
    </div>
    <div class="to-configure">
      <div
        class="configure"
        v-for="(item, index) in getParamsList.supporting"
        :key="index"
        @click="addOption(item.label)"
        :class="selection.includes(item.label) ? 'active' : ''"
      >
        <van-icon name="star-o" />
        <p>{{ item.label }}</p>
      </div>
    </div>
    <div class="describe">
      <div class="top">
        <h2>房屋描述</h2>
      </div>
      <div class="bottom">
        <van-cell-group>
          <van-field placeholder="亲输入房屋描述信息" v-model="data.title" />
        </van-cell-group>
      </div>
    </div>
    <div class="footer">
      <van-button type="default" class="left" @click="$router.back()"
        >取消</van-button
      >
      <van-button type="primary" @click="onClick">提交</van-button>
    </div>
  </div>
</template>

<script>
import { getParams, releaseHouse, getImg } from '@/api/houses'
// console.log(123)
export default {
  created () {
    this.getParams()
  },
  data () {
    return { // 租金
      getParamsList: {},
      data: { // 发布房屋配置
        title: '', // 房屋描述
        description: '', // 房屋配置
        oriented: '', // 楼层
        supporting: '', //
        price: '', // 租金
        roomType: '', // 户型
        size: '', // 面积
        floor: '', // 楼层
        community: this.$store.state.sreaNameID, // 小区名称id
        houseImg: ''
      },
      value1: '',
      value2: '',
      value3: '',
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      columns: [],
      foolList: [],
      roomTypeList: [],
      selection: [],
      fileList: [],
      imgsList: []
    }
  },
  methods: {
    async getParams () {
      try {
        const res = await getParams()
        // console.log(res)
        // 楼层
        this.getParamsList = res.data.body
        this.getParamsList.floor.forEach(item => {
          this.foolList.push(item.label)
        })
        // 户型
        this.getParamsList.roomType.forEach(item => {
          this.roomTypeList.push(item.label)
        })
        // console.log(this.foolList)
        // 朝向
        this.getParamsList.oriented.forEach(item => {
          this.columns.push(item.label)
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 户型
    onConfirm1 (value) {
      this.value1 = value
      this.showPicker1 = false
      this.getParamsList.roomType.forEach(item => {
        if (item.label === value) {
          this.data.roomType = item.value
        }
      })
    },
    // 楼层
    onConfirm2 (value) {
      this.value2 = value
      this.showPicker2 = false
      this.getParamsList.floor.forEach(item => {
        if (item.label === value) {
          this.data.floor = item.value
        }
      })
    },
    // 朝向
    onConfirm3 (value) {
      this.value3 = value
      this.showPicker3 = false
      this.getParamsList.oriented.forEach(item => {
        if (item.label === value) {
          this.data.oriented = item.value
        }
      })
    },
    onCancel () {

    },
    onChange () {

    },
    addOption (val) {
      if (this.selection.includes(val)) {
        const index = this.selection.indexOf(val)
        this.selection.splice(index, 1)
      } else {
        this.selection.push(val)
      }
      this.data.supporting = this.selection.join('|')
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      // console.log(this.fileList)
      this.getImg(file.file)
    }, // 点击提交
    async getImg (img) {
      try {
        const formdata = new FormData()
        formdata.append('file', img)
        const res = await getImg(formdata)
        console.log(res)
        this.imgsList.push(res.data.body[0])
        this.data.houseImg = this.imgsList.join('|')
      } catch (err) {

      }
    },
    async getreleaseHouse () {
      try {
        const res = await releaseHouse(this.data)
        if (res.data.body.status === !200) {
          return
        }
        this.$router.path({ path: '/mylease' })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    onClick () {
      this.getreleaseHouse()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-cell {
  border-bottom: 1px solid #eee;
  color: #888;
}

.title-information {
  color: #21b97a;
  font-size: 15px;
  font-weight: 500;
}
/deep/.van-nav-bar__title {
  font-size: 18px;
}
.van-icon {
  margin-left: 10px;
}
.van-cell {
  font-size: 14px;
}
.describe {
  position: relative;
  .resources-title {
    height: 84px;
  }
  h6 {
    font-size: 15px;
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-weight: normal;
  }
}
.content {
  position: relative;
  .van-cell {
    height: 84px;
  }
  span {
    position: absolute;
    left: 10px;
    bottom: 10px;
    font-size: 15px;
  }
}
.mian {
  background-color: pink;
  padding-bottom: 45px;
}
.house-content {
  height: 150px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  h5 {
    font-weight: normal;
    font-size: 15px;
  }
  .van-uploader {
    margin-bottom: 20px;
  }
}
.to-configure {
  display: flex;
  flex-flow: wrap;

  .configure {
    flex: 20%;
    width: 75px;
    height: 51px;
    font-size: 14px;
    text-align: center;
    margin: 10px 0;
    .van-icon {
      margin-right: 7px;
    }
  }
}
.describe {
  background-color: #f6f5f6;
  .top {
    padding-top: 20px;
    h2 {
      font-size: 15px;
      font-weight: normal;
      padding: 10px 10px 9px;
      background-color: #fff;
    }
  }
  .bottom {
    height: 174px;
    .van-cell-group {
      height: 140px;
    }
  }
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  .van-button {
    width: 50%;
  }
  .left {
    color: #21b97a;
  }
}
/deep/.van-picker__toolbar {
  border-bottom: 1px solid #888888;
  .van-picker__confirm,
  .van-picker__cancel {
    color: #108ee9;
  }
}
.active {
  color: #21b97a;
}
</style>
