// components/WCH/w-to-top-btn/w-to-top-btn.js
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  methods: {
    scrollToTop() {
      wx.pageScrollTo({
        duration: 500,
        scrollTop: 0
      })
    }
  }
})
