<template>
  <div>
    <cu-custom bgColor="bg-gradual-blue"
               :isBack="false">
      <!-- <block slot="backText">返回</block> -->

      <block slot="content">食品安全追溯系统</block>
    </cu-custom>

    <view v-if="PageCur==='index'">
      <!-- 顶部搜索栏 -->
      <view style="height:48px">
        <view class="cu-bar search bg-white top-bar">
          <view class="search-form round">
            <text class="cuIcon-search"></text>
            <input @focus="InputFocus"
                   @blur="InputBlur"
                   :adjust-position="false"
                   type="text"
                   v-model="searchInfo"
                   placeholder="搜索文章"
                   confirm-type="search"></input>
          </view>
          <view class="action">
            <button class="cu-btn bg-green shadow-blur round"
                    @click="searchArtical">搜索</button>
          </view>
        </view>
      </view>

      <!-- 轮播图 -->
      <cu-swiper style="margin-top:48px" />

      <!-- 文章信息展示 -->
      <view class="cu-card article artical-info"
            :class="isCard?'no-card':''"
            v-for="(item,index) in articalList"
            :key="index"
            @click="showArtical(item._id)">
        <view class="cu-item shadow">
          <view class="title">
            <view class="text-cut">{{item.title}}</view>
          </view>
          <view class="content">
            <view class="desc">
              <view class="text-content"> {{item.content}}</view>
              <view>
                <view class="cu-tag bg-red light sm round">{{item.tag}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <about v-if="PageCur==='about'"></about>

    <!-- 底部栏 -->
    <view style="height:50px">
      <view class="cu-bar tabbar margin-bottom-xl bg-white bottom-bar">
        <view class="action"
              @click="NavChange"
              data-cur="index"
              :class="PageCur==='index'?'icon-color':''">
          <view class="cuIcon-home"></view>
          首页
        </view>
        <view class="action text-gray add-action">
          <button class="cu-btn cuIcon-add bg-green shadow"
                  @click="scan"></button>
          扫一扫
        </view>
        <view class="action text-gray"
              @click="NavChange"
              data-cur="about"
              :class="PageCur==='about'?'icon-color':''">
          <view class="cuIcon-my">
          </view>
          关于
        </view>
      </view>
    </view>

  </div>
</template>

<script>
import { longStackSupport } from "q";
export default {
  name: "",
  components: {},
  data() {
    return {
      isCard: true,
      PageCur: "index",
      articalList: [],
      searchInfo: ""
    };
  },
  onLoad() {
    var _this = this;
    uni.request({
      url: "http://47.107.150.235:2345/api/allartical", //仅为示例，并非真实接口地址。
      success: res => {
        this.articalList = res.data.data[0];
      }
    });
  },
  methods: {
    scan() {
      uni.scanCode({
        // onlyFromCamera: true,
        success: function(res) {
          console.log(res.result);

          uni.navigateTo({
            url: "goodsMap?_id=" + res.result
          });
        }
      });
    },
    IsCard(e) {
      this.isCard = e.detail.value;
    },
    InputFocus(e) {
      this.InputBottom = e.detail.height;
    },
    InputBlur(e) {
      this.InputBottom = 0;
    },
    NavChange: function(e) {
      this.PageCur = e.currentTarget.dataset.cur;
    },
    showArtical(_id) {
      uni.navigateTo({
        url: "artical?_id=" + _id
      });
    },
    searchArtical() {
      if (this.searchInfo === "") {
        uni.request({
          url: "http://47.107.150.235:2345/api/allartical", //仅为示例，并非真实接口地址。
          success: res => {
            this.articalList = res.data.data[0];
          }
        });
      } else {
        uni.request({
          url: "http://47.107.150.235:2345/api/searcharticalmp",
          data: {
            tag: this.searchInfo
          },
          success: res => {
            this.articalList = res.data.data[0];
          }
        });
      }
      // uni.navigateTo({
      //   url: "goodsMap"
      // });
    }
  }
};
</script>

<style >
.bottom-bar {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}

.top-bar {
  width: 100%;
  position: fixed;
  top: 68;
  left: 0;
  z-index: 1000;
  box-shadow: 0px 0px 10px rgb(190, 189, 189);
}
.margin-bottom-xl {
  margin-bottom: 0;
}
.artical-info {
  margin-top: 5px;
}
.artical-info:hover {
  box-shadow: 0px 0px 10px rgb(201, 200, 200);
}
.icon-color {
  color: #4bb949;
}
</style>
