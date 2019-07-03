const listener = require("./eventListener")


exports.socketController = function(url){
    let that = {};
    // 与指定端口建立连接
    let socket = io(url);
    // 回调函数列表
    let callbackMap = {};
    let callbackIndex = 1;
    //客户端的进口港
    socket.on("S->C",function(packet){
        let msg = JSON.parse(packet);
        cc.log(msg)
        // 拿到回复的类型
        let type = msg.type;
        // 拿到数据
        let data = msg.data;
        // 拿到回调函数编号
        let callbackIndex = msg.callbackIndex;
        // 如果有回调函数的编号
        if(callbackIndex){
            // 根据回回调函数编号拿到对应回调函数
            let callback = callbackMap[callbackIndex];
            // 调用回调函数回传数据
            if(data.err){
                callback(data.err)
            }else{
                callback(null,data.res)
            }
        }else{
            listener.emit(type,data)
        }
    })
    
    
    // 客户端的离岸港口
    let sentMsg = function(packet){  // {type:"目的"，data：{发给数据}，回调函数(err,data){}  }
        socket.emit("C->S",JSON.stringify(packet));

    } 
    // 序列化回调函数
    let serialize = function(type,res,callback){
        callbackMap[callbackIndex] = callback;
        // 发送前的组包
        sentMsg({type:type,data:res,callbackIndex:callbackIndex});
        callbackIndex += 1;
    }
    // ++++++++++++++++++++++++++++请求类 +++++++++++++++++++++++++++++++++++++++
    // 加入房间的请求
    that.enterRoom = function(data,callback){
        serialize(cc.vv.protocol.REQUEST_ENTER_ROOM,data,callback)
    },
    // 进入房间的请求
    that.joinRoom = function(data,callback){
        serialize(cc.vv.protocol.REQUEST_JOIN_ROOM,data,callback)
    },
    // 登录大厅请求
    that.enterHall = function(data,callback){
        serialize(cc.vv.protocol.REQUEST_ENTER_HALL,data,callback)
    }
    // 登录请求
    that.requestLogin  = function(data,callback){
        serialize(cc.vv.protocol.REQUEST_LOGIN,data,callback)
    }
    that.requestRegister = function(data,callback){
        serialize(cc.vv.protocol.REQUEST_REGISTER,data,callback)
    }
    that.test = function(data,callback){
        serialize("test",data,callback);
    }
    // ---------------------------监听类------------------------------------
    // 玩家加入大厅
    that.onPlayerJoinRoom = function(cb){
        listener.on(cc.vv.protocol.ON_PLAYER_JOIN_ROOM,cb);
    }
    // 玩家离开房间
    that.onPlayerLeaveRoom = function(cb){
        listener.on(cc.vv.protocol.ON_PLAYER_LEAVE_ROOM,cb);
    }

    return that;
}
