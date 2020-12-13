// components/WCH/w-swiper/w-swiper.js
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    swiperList: {
      type: Array,
      value: []
    }
  },
  data: {
    imgUrl: '',
    showImg: false
  },
  methods: {
    tapBanner(e) {
      this.setData({
        showImg: true,
        imgUrl: e.currentTarget.dataset.url
      })
    },
    hideImg() {
      this.setData({
        showImg: false
      })
    }
  }
})
