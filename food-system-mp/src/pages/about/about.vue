<template>
  <div>
    <view class="about-top">
      <image src="../../static/image/login-bg.jpeg"
             class="top-bg"></image>
      <image src="../../static/image/logo-little.png"
             class="logo-img"></image>
      <view class="top-title"><text style="font-weight:600">食品安全追溯系统</text>mp</view>
      <view class="top-name">By:Snail</view>

      <image src="https://image.weilanwl.com/gif/wave.gif"
             mode="scaleToFill"
             class="gif-white response amation"
             style="height:100upx"></image>
    </view>
    <view class="content-info">
      <view style="font-size:16px;color:rgb(75, 75, 75)"> 关于食品安全追溯系统mp</view>
      <view>
        <view style="text-align:left;margin:10px 0;">Hello，欢迎使用食品安全追溯小程序！</view>
        <view style="text-align:left">食品安全追溯小程序主要用于实现食品安全追溯系统闭环设计，通过自制小程序封装扫码、查看文章功能，实现系统完整性，提高用户体验。</view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  }
};
</script>

<style>
.gif-white {
  mix-blend-mode: multiply;
}
.about-top {
  position: relative;
}
.top-bg {
  width: 100%;
  height: 170px;
}
.logo-img {
  position: fixed;
  top: 75px;
  left: 130px;
  width: 30%;
  height: 100px;
  z-index: 10000;
}
.top-title {
  position: fixed;
  top: 155px;
  left: 100px;
  width: 50%;
  height: 100px;
  font-size: 17px;
  z-index: 10000;
}
.top-name {
  position: fixed;
  top: 185px;
  left: 150px;
  width: 30%;
  height: 100px;
  font-size: 17px;
  color: rgb(87, 85, 85);
  z-index: 10000;
}
.amation {
  width: 100%;
  margin-top: -50px;
  z-index: -1000;
}
.content-info {
  width: 100%;
  height: calc(100vh - 310px);
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
  padding: 10px 20px 0 20px;
  /* margin-top: 5px; */
  box-shadow: 0px 0px 5px rgb(207, 207, 207);
}
</style>

