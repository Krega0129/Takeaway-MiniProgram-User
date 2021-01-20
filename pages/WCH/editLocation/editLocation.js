// pages/WCH/editLocation/editLocation.js
import {
  updateAddress,
  deleteAddress,
  addNewAddress,
} from '../../../service/bill'

import {
  H_config
} from '../../../service/config'

import {
  showToast
} from '../../../utils/util'

import {
  getAllCampus
} from '../../../service/home'

Page({
  data: {
    user: {
      sex: 1,
      detailedAddress: '',
      isDefault: 0
    },
    changeSchool: false,
    hasChange: false,
    // 修改第几个地址
    locationIndex: null,
    // 选择的学校
    index: null,
    schoolList: [],
    // 是否是新增地址
    addNewAddress: false
  },
  onLoad: function (options) {
    getAllCampus().then(res => {
      if(res && res.data && res.data.code === H_config.STATECODE_getAllCampus_SUCCESS) {
        const list = res.data.data
        let schoolList = []
        for(let school of list) {
          schoolList.push(school.campusName)
        }
        this.data.schoolList.push(...schoolList)
        this.setData({
          schoolList: this.data.schoolList
        })
      }
    }).then(() => {
      wx.hideLoading()
    }).catch(err => {
      console.log(err);
    })
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
  setDefault() {
    this.data.user.isDefault = !this.data.user.isDefault
    this.data.hasChange = true
  },
  saveLocation() {
    if(/^1\d{10}$/.test(this.data.user.contactPhone)) {
      if(this.data.addNewAddress) {
        const reg = /^(?:[\u4e00-\u9fa5·0-9]{2,6})$/
        const reg1 = /^(?:[\u4e00-\u9fa5A-Za-z0-9]{2,10})$/
        
        if(this.data.index == null) {
          showToast('请选择校区')
        } else if(!reg.test(this.data.user.contactName)) {
          showToast('姓名格式错误，请输入2-6个中文')
        } else if(!reg1.test(this.data.user.detailedAddress)) {
          showToast('详细地址只能是2-10个字符')
        } else {
          addNewAddress({
            userId: wx.getStorageSync('userId'),
            campus: this.data.user.campus,
            contactName: this.data.user.contactName,
            sex: this.data.user.sex,
            contactPhone: this.data.user.contactPhone,
            detailedAddress: this.data.user.detailedAddress,
            isDefault: Number(this.data.user.isDefault)
          }).then(res => {
            if(res && res.data && res.data.code === H_config.STATECODE_addNewAddress_SUCCESS) {
              wx.showToast({
                title: '新增地址成功！',
                duration: 1000
              })
              setTimeout(() => {
                wx.navigateBack()
              }, 500)
            } else {
              showToast('新增地址失败，请重试！')
            }
          })
        }
      } else {
        if(this.data.hasChange) {
          updateAddress({
            userId: wx.getStorageSync('userId'),
            receiveId: this.data.user.receiveId,
            campus: this.data.user.campus,
            contactName: this.data.user.contactName,
            contactPhone: this.data.user.contactPhone,
            sex: this.data.user.sex,
            detailedAddress: this.data.user.detailedAddress,
            receiveId: this.data.user.receiveId,
            isDefault: Number(this.data.user.isDefault)
          }).then(res => {
            // 修改成功后
            if(res && res.data && res.data.code === H_config.STATECODE_updateAddress_SUCCESS) {
              wx.showToast({
                title: '修改地址成功',
                duration: 1000
              })
              setTimeout(() => {
                wx.navigateBack()
              }, 500)
            } else {
              showToast('修改失败，请重试！') 
            }
          })
        } else {
          wx.navigateBack()
        }
      }
    } else {
      showToast('请输入正确的手机号码！')
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
            if(res && res.data && res.data.code === H_config.STATECODE_deleteAddress_SUCCESS) {
              wx.showToast({
                title: '删除地址成功！',
                duration: 1000
              })
              setTimeout(() => {
                wx.navigateBack()
              }, 500)
            } else {
              showToast('删除失败，请重试！')
            }
          })
        }
      }
    })
  }
})