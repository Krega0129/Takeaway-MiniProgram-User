// components/LSK/l-pop_upBox.js
Component({
  /**
   * 组件的属性列表
   */ 
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    modalName:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // modalName:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideModal(){
      const myShow = {
        myShow: false
      }
      this.triggerEvent('myevent', myShow)
    }
  }
})
