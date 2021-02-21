// pages/WCH/express/express.js
const app = getApp()
import {
  selectExpressAgentPrice,
  submitNewForm,
  selectUserOrder
} from '../../../service/express'
import { H_config } from '../../../service/config'
import {
  showToast
} from '../../../utils/util'

Page({
  data: {
    TabIndex: 0,
    showEnd: false,
    tabTitleList: ['提交订单', '订单历史'],
    toBottom: null,
    flagBottom: null,
    express: [
      {
        addresseeName: 'aaa',
        addresseePhone: '11111111111',
        pickUpAddress: '广工西区7号蜂巢柜',
        pickUpType: '蜂巢柜',
        serviceAddress: '西三433',
        pickUpCode: '123456',
        expressType: '顺丰',
        expressName: '电瓶车',
        status: 0,
        deliverPhone: '22222222222'
      },
      {
        addresseeName: 'aaa',
        addresseePhone: '11111111111',
        pickUpAddress: '广工西区7号蜂巢柜',
        pickUpType: '蜂巢柜',
        serviceAddress: '西三433',
        pickUpCode: '123456',
        expressType: '顺丰',
        expressName: '',
        status: 2,
        deliverPhone: '22222222222'
      },
    ],
    pickUpTypeList: ['蜂巢柜', '菜鸟驿站', '摆摊'],
    index: 0,
    specList: [],
    specificationsList: [],
    idx: 0,
    currentPage: 1,
    totalPages: 1,
    addresseeName: '',
    addresseePhone: '',
    campus: wx.getStorageSync('address'),
    distributionFee: '',
    expressContent: '',
    expressType: '',
    pickUpAddress: '',
    pickUpCode: '',
    pickUpType: '',
    serviceAddress: '',
    specifications: '',
    userId: wx.getStorageSync('userId'),
  },
  onLoad: function (options) {
    wx.createSelectorQuery().select('.nav').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      this.setData({
        toBottom: res[0].bottom * 2
      })
    })
    wx.createSelectorQuery().select('.flag').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      this.setData({
        flagBottom: res[0].bottom * 2
      })
    })

    selectExpressAgentPrice().then(res => {
      wx.hideLoading()
      if(res.data.code === H_config.STATECODE_express_SUCCESS) {
        console.log(res);
        for(let item of res.data.data) {
          this.data.specificationsList.push(item.specifications)
        }
        this.setData({
          distributionFee: res.data.data[0].price,
          specifications: res.data.data[0].specifications,
          specList: res.data.data,
          specificationsList: this.data.specificationsList,
          pickUpType: this.data.pickUpTypeList[0]
        })
      } else {
        showToast('加载失败')
      }
    })
  },
  onShow: function () {

  },
  tapTabIndex(e) {
    const id = e.currentTarget.dataset.id
    id === 1 ? this._selectUserOrder() : ''
    this.setData({
      TabIndex: id
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value,
      pickUpType: this.data.pickUpTypeList[e.detail.value]
    })
  },
  specificationsChange(e) {
    this.setData({
      idx: e.detail.value,
      specifications: this.data.specificationsList[e.detail.value],
      distributionFee: this.data.specList[e.detail.value].price
    })
  },
  submitOrder() {
    const expressAgent = {
      addresseeName: this.data.addresseeName,
      addresseePhone: this.data.addresseePhone,
      campus: wx.getStorageSync('address'),
      distributionFee: this.data.distributionFee,
      expressContent: this.data.expressContent,
      expressType: this.data.expressType,
      pickUpAddress: this.data.pickUpAddress,
      pickUpCode: this.data.pickUpCode,
      pickUpType: this.data.pickUpType,
      serviceAddress: this.data.serviceAddress,
      specifications: this.data.specifications,
      userId: wx.getStorageSync('userId')
    }
    if(Object.values(expressAgent).indexOf('') !== -1) {
      showToast('内容不能为空')
    } else {
      submitNewForm(expressAgent).then(res => {
        if(res.data.code === H_config.STATECODE_express_SUCCESS) {
          wx.showToast({
            title: '提交成功',
          })
        } else {
          showToast('提交失败')
        }
      })
    }
  },
  _selectUserOrder() {
    selectUserOrder({
      id: wx.getStorageSync('userId'),
      pageNumber: this.data.currentPage,
      pageSize: 5
    }).then(res => {
      console.log(res);
      wx.hideLoading()
      if(res.data.code === H_config.STATECODE_express_SUCCESS) {
        this.setData({
          express: res.data.data.list,
          totalPages: res.data.data.pages
        })
      }
    })
  },
  expressDetails(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/WCH/expressDetails/expressDetails',
      success: res => {
        res.eventChannel.emit('expressDetails', {item})
      }
    })
  }
})