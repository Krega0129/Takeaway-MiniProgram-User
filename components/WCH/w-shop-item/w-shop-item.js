// components/WCH/w-shop-item/w-shop-item.js
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    storeName: {
      type: String,
      value: '商家名字'
    },
    minPrice: {
      type: [String, Number],
      value: 0
    },
    sentPrice: {
      type: [String, Number],
      value: 0
    },
    intro: {
      type: String,
      value: '欢迎光临！'
    },
    imgURL: String
  },
  data: {
    
  },
  methods: {
    showStoreDetails() {
      wx.navigateTo({
        url: '/pages/WCH/storeDetails/storeDetails',
        success: res => {
          res.eventChannel.emit('sendStoreInfo', {storeName: this.data.storeName, minPrice: this.data.minPrice})
        }
      })
    }
  }
})
