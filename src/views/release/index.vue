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
      <van-field label="小区名称">
        <template #extra>
          <div><span>请输入小区名称</span> <van-icon name="arrow" /></div>
        </template>
      </van-field>
      <!-- 租金 -->
      <van-field
        label="租 金"
        v-model.number="price"
        placeholder="请输入租金/月"
      >
        <template #extra> ￥/月 </template>
      </van-field>
      <!-- 建筑面积 -->
      <van-field
        label="建筑面积"
        v-model="Architecture"
        placeholder="请输入建筑面积"
      >
        <template #extra>m²</template>
      </van-field>
      <!-- 户型 -->
      <van-cell title="户 型" is-link value="请选择" />
      <!-- 所在楼层 -->
      <van-cell title="所在楼层" is-link value="请选择" />
      <!-- 朝向 -->
      <van-cell title="朝向" is-link value="请选择" class="resources-title" />

      <h6>房屋标题</h6>
    </div>
    <div class="content">
      <van-field placeholder="请输入标题 (列如：整租 小区名 2室 5000元)">
      </van-field>
      <span>房屋图像</span>
    </div>
    <div class="house-content">
      <van-uploader multiple />
      <h5>房屋配置</h5>
    </div>
    <div class="to-configure">
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
      <div class="configure">
        <van-icon name="star-o" />
        <p>衣柜</p>
      </div>
    </div>
    <div class="describe">
      <div class="top">
        <h2>房屋描述</h2>
      </div>
      <div class="bottom">
        <van-cell-group>
          <van-field placeholder="亲输入房屋描述信息" />
        </van-cell-group>
      </div>
    </div>
    <div class="footer">
      <van-button type="default" class="left">取消</van-button>
      <van-button type="primary">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      price: '', // 租金
      Architecture: ''// 建筑面积
    }
  },
  methods: {},
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
</style>
