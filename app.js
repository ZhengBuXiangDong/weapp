//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    typeList: [{
      type: 1,
      value: '新歌',
      index: 0,
      title: '新歌榜'
    }, {
      type: 16,
      value: '流行',
      index: 1,
      title: '新歌音乐'
    }, {
      type: 21,
      value: '欧美',
      index: 2,
      title: '欧美金曲榜'
    }, {
      type: 25,
      value: '网络',
      index: 3,
      title: '网络歌曲榜'
    }, {
      type: 11,
      value: '摇滚',
      index: 4,
      title: '摇滚榜'
    }]
  },
  getData(data){
    return new Promise((res,rej)=>{
      wx.request({
        url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
        data,
        success: ({data}) => {
          res(data);
        }
      });
    })
  }
})