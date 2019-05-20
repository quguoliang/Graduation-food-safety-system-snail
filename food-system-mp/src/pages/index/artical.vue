<template>
  <div>
    <cu-custom bgColor="bg-gradual-blue"
               :isBack="true">
      <block slot="backText">返回</block>

      <block slot="content">文章详情</block>
    </cu-custom>
    <view style="font-size:25upx;font-weight:700;text-align:center">
      <u-parse :content="title"
               @preview="preview"
               @navigate="navigate" />
    </view>
    <view style="font-size:14px;color:rgb(151, 150, 150);text-align:right;padding:0 15px">
      {{date}}
    </view>
    <view style="padding:0 30px">
      <u-parse :content="content"
               @preview="preview"
               @navigate="navigate" />
    </view>
  </div>
</template>

<script>
import marked from "marked";
import uParse from "../../u-parse/u-parse.vue";
import { setTimeout } from "timers";
export default {
  name: "",
  components: { uParse },
  data() {
    return {
      title: "",
      content: "",
      date: ""
    };
  },
  onLoad: function(option) {
    var _this = this;
    uni.request({
      url: "http://47.107.150.235:2346/api/getarticalinfo",
      data: {
        _id: option._id
      },
      success: res => {
        let tit = res.data.data[0].title.toString();
        let con = res.data.data[0].content.toString();
        this.title = marked(tit);
        this.content = marked(con);
        this.date = new Date(res.data.data[0].date).toLocaleString();
      }
    });
  },
  methods: {
    preview(src, e) {
      // do something
    },
    navigate(href, e) {
      // do something
    }
  }
};
</script>

<style >
@import url("../../u-parse/u-parse.css");
</style>
