function Player(socket,info){
    // 用户基本信息保存
    this.accountID = info.accountID;
    this.nickName = info.nickName;
    this.avatarURL = info.avatarURL;
    this.goldCount = info.goldCount;
    this.gameWon = info.gameWon;
    this.gameLost = info.gameLost;
    this.room = null;
    this.seatIndex = null;
    this.socket = socket;
    this.isReady =  false;
    let that = this
    // 监听对应客户端的消息
    socket.on("C->S",packet =>{
        let msg = JSON.parse(packet);
        let type = msg.type;
        if(type == GM.protocol.REQUEST_LOGIN || type == GM.protocol.REQUEST_REGISTER ){
            return
        }
        // 处理请求类的协议
        msg.data = that[msg.type](msg.data);
        if(msg.callbackIndex){
            // console.log("发包-----" ,msg)
            socket.emit("S->C",JSON.stringify(msg))
        }
    })
    // 断线监听
    socket.on("disconnect",()=>{
        GM.MANAGER.removePlayer(this);
    })
}
Player.prototype.request_game_ready = function(packet){
    this.isReady = !this.isReady;
    packet.res["isReady"] = this.isReady;
    this.room.boardCastInRoom(GM.protocol.ON_PLAYER_READY,packet,this);
    return packet;
}
Player.prototype.request_chat = function(data){
    // console.log(data)
    // console.log("..............聊天的......................data.........")
    this.room.ChatInRoom(GM.protocol.ON_PLAYER_CHAT,data,this)
    return {err:null,res:data};
}
Player.prototype.request_enter_hall = function(pack){
    let list = GM.MANAGER.getAllPlayerInRoom();
    let info = [];
    list.forEach(element => {
        let data = {
            avatarURL: element.avatarURL,
            room:element.room.ID,
            seatIndex:element.seatIndex,
            nickName:element.nickName,
        }
        info.push(data)
    });
    let data = {
        res:info
    }
    return data;
}
Player.prototype.request_leave_room = function(data){
    GM.MANAGER.outRoom(this);
    return data
}
// 申请进入房间
Player.prototype.request_join_room  =function(packet){
    // console.log(this)
    // console.log("申请进入房间的this+++++++++++++++++++++++++++++++++++++++++++++")
    let data = {}
    let res = GM.MANAGER.creatRoom(packet,this) ;
    data = {
        res:res
    }
    return data
}
// 进入房间
Player.prototype.request_enter_room= function(packet){
    // console.log(this)
    // console.log("进入房间的this+++++++++++++++++++++++++++++++++++++++++++++")
    let res = GM.MANAGER.assignRoom(this);
    let data = {
        res:res
    }
    return data
},
// 主动通知客户端
Player.prototype.sentMsg =function(type,data){
    let packet = {type:type ,data:data}
    this.socket.emit("S->C",JSON.stringify(packet))
}    
module.exports = Player;

