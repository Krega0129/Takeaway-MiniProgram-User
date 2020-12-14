// pages/profile/address/address.js
import {
  loadingOn,
  loadingOff,
  showToast
} from '../../../../service/config'
import {
  updateAddress,
  updateAddressStatus,
  addNewAddress,
  deleteAddress
} from '../../../../service/address'
import {
  STATECODE_SUCCESS,
  STATECODE_updateAddress_SUCCESS,
  STATECODE_updateAddress_FALSE,
  STATECODE_updateAddressStatus_SUCCESS,
  STATECODE_addNewAddress_SUCCESS,
  STATECODE_deleteAddress_SUCCESS
} from '../../../../service/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    campus: [
      { name: '广东工业大学', id: 0 },
      { name: '中山大学', id: 1 },
      { name: '广东外语外贸大学', id: 2 },
      { name: '华南理工大学', id: 3 },
      { name: '广州大学', id: 4 },
      { name: '广州中医药大学', id: 5 }
    ],
    // 地址信息
    addressMsg: {},
    sexChecked: true,
    man: 1,
    woman: 0,
    campusIndex: 0,
    sex: '',
    // 点击列表的index
    listId: null,
    // 是否为默认地址
    isDefault: true,
    isEmpty: true
  },
  // 校区选择
  CampusChange: function (e) {
    // 方法一：
    // 通过对应数组索引访问：
    // console.log(that.campus[e.detail.value]);
    // 方法二：
    // console.log('picker发送选择改变，索引值为', e.detail.value)
    // console.log("选中的id值:" + e.target.dataset.id)
    // console.log(e);
    console.log(e.detail.value);

    this.setData({
      campusIndex: e.detail.value
    })

  },
  // 性别选择
  sexSelect: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  // 设置是否为默认地址
  changeStatus: function (e) {
    this.setData({
      isDefault: e.detail.value
    })
  },
  // 保存地址
  formModify: function (e) {
    let { campus, detailedAddress, contactName, contactPhone, sex, Default } = e.detail.value;
    let isDefault = 1
    let addressStatus = 1
    // 判断是否为默认地址
    if (!Default) {
      isDefault = 0
      addressStatus = 0
    }
    else {
      isDefault = 1
      addressStatus = 1
    }
    // 判断所填信息是否完整和正确
    let telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (detailedAddress.length === 0) {
      showToast('地址选项不能为空', 1000)
    } else if (campus.length === 0) {
      showToast('校区选项不能为空', 1000)
    } else if (contactName.length === 0) {
      showToast('联系人姓名不能为空', 1000)
    } else if (contactPhone.length === 0) {
      showToast('联系电话不能为空', 1000)
    } else if (!(telStr.test(contactPhone))) {
      showToast('电话格式有误', 1000)
    } else {
      // console.log(campus, detailedAddress, contactName, contactPhone,sex,receiveId,isDefault);
      if (!this.data.isEmpty) {
        let receiveId = this.data.addressMsg.receiveId
        updateAddress(campus, contactName, contactPhone, detailedAddress, isDefault, receiveId, sex).then((res) => {
          if (res.data.code === STATECODE_SUCCESS || res.data.code === STATECODE_updateAddress_SUCCESS) {
            updateAddressStatus(receiveId, addressStatus).then((res) => {
              if (res.data.code === STATECODE_SUCCESS || res.data.code === STATECODE_updateAddressStatus_SUCCESS) {
                loadingOff()
                showToast('地址更新成功', 1000)
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 1000);
              }
            })
          }
          else if (res.data.code === STATECODE_updateAddress_FALSE) {
            showToast('更新地址失败', 1000)
          }
          else {
            setTimeout(function () {
              showToast('请求错误', 1000)
            }, 5000);
          }
        })
      }
      else {
        let receiveId = 0
        addNewAddress(campus, contactName, contactPhone, detailedAddress, isDefault, receiveId, sex).then((res) => {
          if (res.data.code === STATECODE_SUCCESS || res.data.code === STATECODE_addNewAddress_SUCCESS) {
            loadingOff()
            showToast('新增地址成功', 1000)
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);
          }
          else {
            setTimeout(function () {
              showToast('请求错误', 1000)
            }, 5000);
          }
        })
      }
    }



    // console.log(flag);

    // this.setData({
    //   campusIndex: campusName,
    //   detailedAddress: detailedAddress,
    //   name: name,
    //   phoneNumber: phoneNumber
    // })
    // 
    // else {
    //   if (id != null) {
    //     let item = info.addressList[id]
    //     if (this.data.campusIndex != null) {
    //       item.campus = this.data.campus[this.data.campusIndex].name
    //     }
    //     item.detailedAddress = this.data.detailedAddress
    //     item.name = this.data.name
    //     item.sex = this.data.sex
    //     item.phoneNumber = this.data.phoneNumber
    //     prevPage.setData({
    //       addressList: prevPage.data.addressList,
    //     })
    //     wx.showToast({
    //       title: '修改成功',
    //     });
    //   }
    //   else {
    //     let that = this.data
    //     let campusName = that.campus[that.campusIndex].name
    //     const newAddress = {
    //       campus: campusName,
    //       detailedAddress: that.detailedAddress,
    //       name: that.name,
    //       sex: that.sex,
    //       phoneNumber: that.phoneNumber
    //     }
    //     info.addressList.push(newAddress)
    //     prevPage.setData({
    //       addressList: prevPage.data.addressList,
    //     })
    //     wx.showToast({
    //       title: '新增地址成功',
    //     });
    //   }
    //   setTimeout(function () {
    //     wx.navigateBack({
    //       delta: 1
    //     });
    //   }, 1000);
    // app.globalData.addressList = Object.assign({}, addressMsg);
    // console.log( app.globalData.addressList);
    // this.setData({
    //   campusName,
    //   detailedAddress,
    //   name,
    //   phoneNumber
    // })
  },

  // 删除地址
  deleteAdd: function () {
    let receiveId = this.data.addressMsg.receiveId
    deleteAddress(receiveId).then((res) => {
      loadingOff()
      if (res.data.code === STATECODE_SUCCESS || res.data.code === STATECODE_deleteAddress_SUCCESS) {
        showToast('删除地址成功', 1000)
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      }
      else {
        showToast('请求出错', 2000)
      }
    })
  },
  // 初始化页面数据
  setAddressMsg(data) {
    loadingOn('加载中')
    const addressMsg = JSON.parse(data)
    // 判断是否为默认地址
    let flag = true
    if (!addressMsg.isDefault) {
      flag = false
    }
    else {
      flag = true
    }
    // 判断性别
    let sexCode = true
    if (!addressMsg.sex) {
      sexCode = false
    }
    else {
      sexCode = true
    }
    this.setData({
      addressMsg: addressMsg,
      isDefault: flag,
      sexChecked: sexCode,
      isEmpty: false
    })
    setTimeout(function () {
      loadingOff()
    }, 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (Object.keys(options).length !== 0) {
      this.setAddressMsg(options.item)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})