//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    keyword: '',
    activeNum:'0',
    typeList:[{
      type:1,
      value:'新歌',
      index:0,
    }, {
        type: 16,
        value: '流行',
        index: 1,
      }, {
        type: 21,
        value: '欧美',
        index: 2,
      }, {
        type: 25,
        value: '网络',
        index: 3,
      }, {
        type: 11,
        value: '摇滚',
        index: 4,
      }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  cilck(e){
    console.log(e)
  },
  onLoad: function() {
    //发送请求
    wx.request({
      url: "http://tingapi.ting.baidu.com/v1/restserver/ting",
      data: {
        method: "baidu.ting.billboard.billList",
        type: 2,
        size: 10,
        offset: 0
      },
      success:(res)=>{
        //获取当前最热门歌曲（排序）
        let hot = [...res.data.song_list];
         hot.sort((a, b) => {
          return b.hot - a.hot
        });
        // 改变原有data
        this.setData({
          keyword:hot[0].title
        })
        
      },
    })
  },
  //跳转搜索页
  goSearch() {
    wx.navigateTo({
      url: '../search/search?keyword=' + this.data.keyword
    })
  },
  changeType(e){
    let {active,type} = e.currentTarget.dataset;
    e.target.className="active";
    this.setData({
      activeNum:active
    })
    console.log( type)
  },
  changeActive(e){
    // console.log(e.target);
    console.log(this.data.activeNum);
  }

})