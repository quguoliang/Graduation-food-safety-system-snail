<template>
  <div>
    <cu-custom bgColor="bg-gradual-blue"
               :isBack="true">
      <block slot="backText"
             @click="reback">返回</block>

      <block slot="content">商品详情</block>
    </cu-custom>
    <view>
      <view class="page-body">
        <view class="page-section page-section-gap">
          <map style="width: 100%; height: calc(100vh - 64px);"
               :latitude="latitude"
               :longitude="longitude"
               :markers="placeList"
               :polyline="linePoint"
               @markertap="getNodeInfo"
               @tap="goodsInfo">
            <cover-view class="bg-img bg-mask flex align-center"
                        style="background-image: url('http://47.107.150.235:2345/uploads/login-bg.jpeg');height: 414upx;">
              <cover-view class="padding-xl info"
                          style="font-size:14px">
                <cover-view class="goods-item padding-xs text-l text-bold ">商品名称：{{goods.goodsname}}</cover-view>
                <cover-view class="goods-item padding-xs text-l text-bold">商品价格：￥{{goods.price}}</cover-view>
                <cover-view class="goods-item padding-xs text-l text-bold">商品类型：{{goods.type}}</cover-view>
                <cover-view class="goods-item padding-xs text-l text-bold">商品厂家：{{goods.factory}}</cover-view>
                <cover-view class="goods-item padding-xs text-l text-bold">商品简介：{{goods.remark}}</cover-view>
              </cover-view>
            </cover-view>
            <cover-view v-if="controlsMarkerNode"
                        class="show-info">
              <cover-view class="node-title">商品运输节点信息</cover-view>
              <cover-image class="img-node"
                           :src="item.img"></cover-image>
              <cover-view style="text-align:center">节点名称：{{showPlace.label}}</cover-view>
              <cover-view style="text-align:center">节点简介：{{showPlace.remark}}</cover-view>

            </cover-view>
          </map>

        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      title: "map",
      latitude: 39.909,
      longitude: 116.39742,
      controlsMarkerNode: false,
      goods: { goodsname: "", price: "", type: "", factory: "", remark: "" },
      placeList: [],
      showPlace: {},
      covers: [],
      polyline: { color: "#cccccc" }
    };
  },
  onLoad: function(option) {
    uni.request({
      url: "http://47.107.150.235:2345/api/selectgoodsinfo",
      data: {
        _id: option._id
      },
      success: res => {
        this.goods = res.data.data[0];
        this.latitude = res.data.data[0].place[0].lat;
        this.longitude = res.data.data[0].place[0].lng;
        this.placeList = res.data.data[0].place.map((item, index) => {
          let obj = {};
          obj.id = index;
          obj.latitude = item.lat;
          obj.longitude = item.lng;
          obj.label = item.placename;
          obj.remark = item.placeinfo;
          obj.iconPath = "../../static/image/marker@3px.png";
          obj.img = "http://47.107.150.235:2345" + item.img;
          return obj;
        });
        this.polyline.points = res.data.data[0].place.map((item, index) => {
          return { latitude: item.lat, longitude: item.lng };
        });
        console.log(this.placeList);
      }
    });
  },
  methods: {
    reback() {
      uni.navigateBack({
        delta: 1,
        animationType: "pop-out",
        animationDuration: 200
      });
    },
    getNodeInfo(e) {
      this.controlsMarkerNode = !this.controlsMarkerNode;
      this.showPlace = this.placeList[e.markerId];
    },
    goodsInfo() {}
  }
};
</script>

<style>
.goods-item {
  margin-bottom: 10px;
}
.show-info {
  width: 60%;
  height: 300px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgb(173, 172, 172);
}
.node-title {
  padding: 5px 10px 5px 10px;
  text-align: center;
  font-size: 16px;
  height: 15px;
  line-height: 15px;
  border-bottom: 1px solid rgb(199, 198, 198);
  border-radius: 5px;
}
.info {
  color: #fff;
}
.img-node {
  width: 90%;
  height: 200px;
  margin: 0 auto;
}
</style>
