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
    desc: {
      type: String,
      value: '欢迎光临！'
    }
  },
  data: {
    
  },
  methods: {

  }
})
