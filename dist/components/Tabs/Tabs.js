// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // list:[
    //   {
    //     id:0,
    //     name:"首页",
    //     inActive:true
    //   },
    //   {
    //     id:1,
    //     name:"原创",
    //     inActive:false
    //   },
    //   {
    //     id:2,
    //     name:"分类",
    //     inActive:false
    //   },
    //   {
    //     id:3,
    //     name:"关于",
    //     inActive:false
    //   }
    // ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleitemchange(e){
     const {index}=e.currentTarget.dataset;
     this.triggerEvent('itemchange',{index})
    //  const {list}=this.data;
    //  list.forEach((v,i)=>
    //    i===index?v.inActive=true:v.inActive=false
    //  )
    //  this.setData({
    //    list
    //  })
    }
  }
})
