# 构建

1. yarn install
2. cordova plugin install

# 技术栈

* cordova
* react
* redux
* react-redux
* redux-thunk
* jquery
* jquery-mobile

# State Structure
```
{
    deviceReady:false
    currentPage:"home_page",
    mindMap:[
        {id:0, content:"node1", children:[1, 2, 3], uid:someuid, parent:-1},
        {id:1, content:"node1", children:[], parent:0},
        {id:2, content:"node1", children:[4, 5], parent:0},
        {id:3, content:"node1", children:[6], parent:0},
        {id:4, content:"node1", children:[], parent:2},
        {id:5, content:"node1", children:[], parent:2},
        {id:6, content:"node1", children:[], parent:3},
    ],
    allMap:[{id:0, mapData}, {id:1, mapData}],    //mapdata = mindMap
    focusNode:id_num,
    editNode:id_num,
    editMap:id_num
}
```
# TODO

* 文件存储
    * 原始数据（节点数组，没有清理无效节点） done
    * KityMind 格式（节点 ID 需要在读取时重新生成） done
    * 用时间戳生成文件 ID（现在用第一个节点内容作标题和文件名） done
    * android 存储在外部 done
    * 集成云存储
        * 百度云
        * dropbox
        * 坚果云
* 旋转
* 更多节点
* 使用 immutableJS
* KityMind 预览
* 备注
* 图标
* 复制/粘贴
* 美化（Theme）
* 滚动
* 暂停/恢复