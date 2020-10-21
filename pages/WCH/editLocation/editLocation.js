// pages/WCH/editLocation/editLocation.js
Page({
  data: {
    user: {},
    changeSchool: false,
    hasChange: false,
    // 修改第几个地址
    locationIndex: null,
    index: null,
    schoolList: ['广东工业大学', '清华大学', '北京大学']
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('editLocation', (data) => {
      this.setData({
        user: data.user,
        locationIndex: data.index
      })
    })
  },
  changeSchool(e) {
    this.data.user.school = this.data.schoolList[e.detail.value]
    this.setData({
      index: e.detail.value,
    })
  },
  selectSex(e) {
    const sex = e.detail.value
    if(0 === sex) {
      this.data.user.sex = '先生'
    } else {
      this.data.user.sex = '女士'
    }

    this.setData({
      user: this.data.user
    })
  },
  newName(e) {
    this.data.user.name = e.detail.value
  },
  newRoom(e) {
    this.data.user.room = e.detail.value
  },
  newTelNum(e) {
    this.data.user.telNum = e.detail.value
  },
  saveLocation() {
    let pages = getCurrentPages()
    let lastPages = pages[pages.length - 2]

    lastPages.setData({
      user: this.data.user,
      locationIndex: this.data.locationIndex
    })

    wx.navigateBack()
  },
  deleteLocation() {
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址？',
      confirmColor: 'red',
      cancelColor: 'grey',
      success: () => {
        let pages = getCurrentPages()
        let lastPage = pages[pages.length - 2]
        
        lastPage.data.locationList.splice(this.data.locationIndex, 1)

        lastPage.setData({
          locationList: lastPage.data.locationList
        })
        
        wx.navigateBack()
      }
    })
  }
})