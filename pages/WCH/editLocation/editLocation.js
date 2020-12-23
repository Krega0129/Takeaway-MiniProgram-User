// pages/WCH/editLocation/editLocation.js
import {
  updateAddress,
  deleteAddress,
  addNewAddress,
} from '../../../service/bill'

import {
  getAllCampus
} from '../../../service/home'

Page({
  data: {
    user: {},
    changeSchool: false,
    hasChange: false,
    // 修改第几个地址
    locationIndex: null,
    // 选择的学校
    index: null,
    // schoolList: ['广东工业大学', '清华大学', '北京大学'],
    schoolList: [],
    // 是否是新增地址
    addNewAddress: false
  },
  onLoad: function (options) {
    getAllCampus().then(res => {
      const list = res.data.data
      let schoolList = []
      for(let school of list) {
        schoolList.push(school.campusName)
      }
      this.data.schoolList.push(...schoolList)
      this.setData({
        schoolList: this.data.schoolList
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {
    let eventChannel = this.getOpenerEventChannel()
    // 编辑地址
    eventChannel.on('editLocation', (data) => {
      this.setData({
        user: data.user || {},
        locationIndex: data.index
      })
    })

    // 新增地址
    eventChannel.on('addNewAddress', () => {
      this.setData({
        addNewAddress: true
      })
    })
  },
  changeSchool(e) {
    this.data.user.campus = this.data.schoolList[e.detail.value]
    this.data.hasChange = true
    this.setData({
      index: e.detail.value,
    })
  },
  selectSex(e) {
    this.data.user.sex = e.detail.value
    this.data.hasChange = true
    this.setData({
      user: this.data.user
    })
  },
  newName(e) {
    this.data.hasChange = true
    this.data.user.contactName = e.detail.value
  },
  newRoom(e) {
    this.data.hasChange = true
    this.data.user.detailedAddress = e.detail.value
  },
  newTelNum(e) {
    this.data.hasChange = true
    this.data.user.contactPhone = e.detail.value
  },
  saveLocation() {
    if(/^1\d{10}$/.test(this.data.user.contactPhone)) {
      if(this.data.addNewAddress) {
        addNewAddress({
          userId: wx.getStorageSync('userId'),
          campus: this.data.user.campus,
          contactName: this.data.user.contactName,
          sex: this.data.user.sex,
          contactPhone: this.data.user.contactPhone,
          detailedAddress: this.data.user.detailedAddress
        }).then(res => {
          wx.showToast({
            title: res.data.msg,
            icon: 'success'
          })
          wx.navigateBack()
        })
      } else {
        updateAddress({
          receiveId: this.data.user.receiveId,
          campus: this.data.user.campus,
          contactName: this.data.user.contactName,
          contactPhone: this.data.user.contactPhone,
          sex: this.data.user.sex,
          detailedAddress: this.data.user.detailedAddress,
          receiveId: this.data.user.receiveId
        }).then(res => {
          // 修改成功后
          if(res.data.code === 3258) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success'
            })
            wx.navigateBack()
          } else {
            wx.showToast({
              title: res.data.msg
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '请输入正确的手机号码！',
        icon: 'none'
      })
    }
  },
  deleteLocation() {
    wx.showModal({
      title: '提示',
      content: '确定要删除该地址？',
      confirmColor: 'red',
      cancelColor: 'grey',
      success: ({confirm}) => {
        if(confirm) {
          deleteAddress({
            receiveId: this.data.user.receiveId
          }).then(res => {
            // 删除地址后的操作
          })
          
          wx.navigateBack()
        }
      }
    })
  }
})