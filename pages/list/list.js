// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    page: 0,
    type: '',
    hasMore: true,
    isfixTop:false,
  },  // 回到顶部
  gotoTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    // 讲来显示加载中
    wx.showLoading({
      title: '加载中'
    });
    let {
      type,
      title
    } = options;
    this.setData({
      type
    })
    // 动态修改导航标题
    wx.setNavigationBarTitle({
      title
    })
    // 展示歌曲
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      data: {
        method: "baidu.ting.billboard.billList",
        type,
        size: 10,
        offset: 0
      },
      success: (res) => {
        let songList = res.data.song_list;
        // console.log(songList)
        this.setData({
          songList,
        });
        // 数据加载成功后隐藏
        setTimeout(function() {
          wx.hideLoading()
        }, 500)

      },
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
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  // 监听页面混动距离
  onPageScroll: function (res) {
    // console.log(res.scrollTop)
    if (res.scrollTop > 100){
      this.setData({
        isfixTop:true
      })
    }else{
      this.setData({
        isfixTop: false
      })
    }
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
  onReachBottom() {
    if (this.data.hasMore) {
      wx.showLoading({
        title: '玩命加载中'
      });
      let page = this.data.page + 1;
      let size = 10;
      let offset = (page - 1) * size;
      wx.request({
        url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
        data: {
          method: "baidu.ting.billboard.billList",
          type: this.data.type,
          size,
          offset,
        },
        success: (res) => {
          let newSong = res.data.song_list;
          let songList = [...this.data.songList, ...newSong]
          this.setData({
            page,
            songList,
            // 判断是否还有歌曲数据
            hasMore: newSong.length < size ? false : true,
          });
          // 隐藏加载中
          wx.hideLoading();
        }
      })
    }else{
      wx.showToast({
        title: '已经加载全部',
      });
      setTimeout(function(){
          wx.hideToast();
      },2000)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})