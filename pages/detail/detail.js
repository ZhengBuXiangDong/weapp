// pages/detail/detail.js
let app = getApp(); //获取全局数据
Page({
  /**
   * 页面的初始数据
   */
  data: {
    songinfo: {},
    bitrate: {},
    paused: true, //暂停状态

  },
  // 下載歌曲
  downloadSong() {
    wx.showToast({
      title: '开始下载',
      icon: 'loading',
      duration: 500,
      player: null
    })
    // 数据加载成功后隐藏
    setTimeout(function() {
      wx.hideToast()
    }, 500)
    let url = this.data.bitrate.file_link;
    // 下載
    wx.downloadFile({
      url,
      success(res) {
        wx.showToast({
          title: '下载成功,文件地址：' + res.tempFilePath,
          icon: 'none'
        })
        // 数据加载成功后隐藏
        setTimeout(function() {
          wx.hideToast()
        }, 2000)
        // console.log('下載成功'+res.tempFilePath)
      }
    })
  },
  // 播放歌曲
  playSong() {
    let paused = this.data.paused;
    let player = this.data.player;
    if (!player) {
      player = wx.createInnerAudioContext();
      player.src = this.data.bitrate.file_link;
      this.setData({
        player
      })
    }
    // 查看播放状态
    if (paused) {
      // 暂停播放
      player.play();
    } else {
      player.pause();
    }
    // 更改
    // console.log(player.paused)
    this.setData({
      paused: !paused
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    id
  }) {
    //根据歌曲id获取歌曲信息
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      data: {
        method: 'baidu.ting.song.play',
        songid: id,
      },
      success: ({
        data
      }) => {
        let {
          songinfo,
          bitrate
        } = data;
        // console.log(data);
        this.setData({
          songinfo,
          bitrate
        })

      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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