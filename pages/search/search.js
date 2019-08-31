// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: true,
    inputVal: "",
    album:[],
    songItem: [],
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false,
      songItem: [],
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: "",
      songItem: [],
    });
  },
  inputTyping: function(e) {
    // this.setData({
    //   inputVal: e.detail.value
    // });
    // console.log(e)
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      data: {
        method: "baidu.ting.search.catalogSug",
        query: e.detail.value
      },
      success: ({
        data
      }) => {
        let {
          song
        } = data;
       
        if (song) {
          if (song.length > 8) {
            song.length = 8
          }
          let songItem = song.map((item) => {
            return {
              title: item.songname + ' ' + item.artistname,
              albumid: item.songid
            }
          })
          // console.log(songItem)
          this.setData({
            songItem,
            inputVal: e.detail.value
          })
        }else{
          this.setData({
            songItem:[],
          })
        }
      },
    })

  },
  gotoDetail(e){
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //发送请求
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      data: {
        method: "baidu.ting.search.catalogSug",
        query: options.keyword
      },
      success: ({data}) => {
        let {
          song
        } = data;
        let songItem = song.map((item) => {
          return {
            title: item.songname + ' ' + item.artistname,
            albumid: item.songid
          }
        });
        this.setData({
          songItem,
          inputVal: options.keyword,
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})