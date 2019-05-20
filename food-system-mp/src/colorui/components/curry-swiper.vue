<template>
  <swiper class="screen-swiper"
          :class="dotStyle?'square-dot':'round-dot'"
          :indicator-dots="true"
          :circular="true"
          :autoplay="true"
          interval="5000"
          duration="500">
    <swiper-item v-for="(item,index) in swiperList"
                 :key="index">
      <image :src="item.url"
             mode="aspectFill"
             v-if="item.type=='image'"></image>
      <video :src="item.url"
             autoplay
             loop
             muted
             :show-play-btn="false"
             :controls="false"
             objectFit="cover"
             v-if="item.type=='video'"></video>
    </swiper-item>
  </swiper>
  <!-- <swiper class="card-swiper"
          :class="dotStyle?'square-dot':'round-dot'"
          :indicator-dots="true"
          :circular="true"
          :autoplay="true"
          interval="5000"
          duration="500"
          @change="cardSwiper"
          indicator-color="#8799a3"
          indicator-active-color="#0081ff">
    <swiper-item v-for="(item,index) in swiperList"
                 :key="index"
                 :class="cardCur==index?'cur':''">
      <view class="swiper-item">
        <image :src="item.url"
               mode="aspectFill"
               v-if="item.type=='image'"></image>
        <video :src="item.url"
               autoplay
               loop
               muted
               :show-play-btn="false"
               :controls="false"
               objectFit="cover"
               v-if="item.type=='video'"></video>
      </view>
    </swiper-item>
  </swiper> -->
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      cardCur: 0,
      swiperList: [
        {
          id: 0,
          type: "image",
          url:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2635960507,1237146023&fm=26&gp=0.jpg"
        },
        {
          id: 1,
          type: "image",
          url:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2347306150,151755228&fm=26&gp=0.jpg"
        },
        {
          id: 2,
          type: "image",
          url:
            "http://a.hiphotos.baidu.com/zhidao/pic/item/b3119313b07eca80359800609a2397dda0448393.jpg"
        },
        {
          id: 3,
          type: "image",
          url:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1266005440,2418608000&fm=26&gp=0.jpg"
        },
        {
          id: 4,
          type: "image",
          url:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=194539312,3560030324&fm=200&gp=0.jpg"
        },
        {
          id: 5,
          type: "image",
          url:
            "https://www.9ztj.com/file/upload/image/201503/27/20150327020342_98805.jpg"
        }
      ],
      dotStyle: true,
      towerStart: 0,
      direction: ""
    };
  },
  onLoad() {
    this.TowerSwiper("swiperList");
    // 初始化towerSwiper 传已有的数组名即可
  },
  methods: {
    // towerSwiper
    // 初始化towerSwiper
    cardSwiper(e) {
      this.cardCur = e.detail.current;
    },
    TowerSwiper(name) {
      let list = this[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex =
          parseInt(list.length / 2) +
          1 -
          Math.abs(i - parseInt(list.length / 2));
        list[i].mLeft = i - parseInt(list.length / 2);
      }
      this.swiperList = list;
    },

    // towerSwiper触摸开始
    TowerStart(e) {
      this.towerStart = e.touches[0].pageX;
    },

    // towerSwiper计算方向
    TowerMove(e) {
      this.direction =
        e.touches[0].pageX - this.towerStart > 0 ? "right" : "left";
    },

    // towerSwiper计算滚动
    TowerEnd(e) {
      let direction = this.direction;
      let list = this.swiperList;
      if (direction == "right") {
        let mLeft = list[0].mLeft;
        let zIndex = list[0].zIndex;
        for (let i = 1; i < this.swiperList.length; i++) {
          this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft;
          this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex;
        }
        this.swiperList[list.length - 1].mLeft = mLeft;
        this.swiperList[list.length - 1].zIndex = zIndex;
      } else {
        let mLeft = list[list.length - 1].mLeft;
        let zIndex = list[list.length - 1].zIndex;
        for (let i = this.swiperList.length - 1; i > 0; i--) {
          this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft;
          this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex;
        }
        this.swiperList[0].mLeft = mLeft;
        this.swiperList[0].zIndex = zIndex;
      }
      this.direction = "";
      this.swiperList = this.swiperList;
    }
  }
};
</script>

<style >
.tower-swiper .tower-item {
  transform: scale(calc(0.5 + var(--index) / 10));
  margin-left: calc(var(--left) * 100upx - 150upx);
  z-index: var(--index);
}
</style>
