// date:  2019-6-27
// AUTHOR: ZHANG
// DESCRIPTION : 服务器的管家

exports.gameManager = (function(){
    let that = {};
    // 服务器所有的玩家列表
    let allPlayerList = [];
    // 所有的房间列表
    let roomList  = [];
    for(let i = 1 ; i <=30 ; i++){
        let room = new GM.Room(i);
        roomList.push(room);
    }
    // 大厅内的广播
    function boardCastInHall(type,data){
        allPlayerList.forEach(p=>{
            // console.log(data)
            // console.log("大厅的data++++++++++++++++++++++++++++++")
            if(p.room){
                // console.log(p)
                // console.log("datingde p +++++++++++++++++++++++++++++++++++++++++")
                if(p.room.ID === data.room){
                    p.sentMsg(type,data)
                }
            }
            if(!p.room){
                // 通知各自的客户端
                p.sentMsg(type,data)
            }
        })
    }
    // 添加玩家
    that.addPlayer = function(player){
        allPlayerList.push(player) 
    }
    // 删除玩家
    that.removePlayer = function(player){
        that.outRoom(player);
        player.room = null;
        player.seatIndex = null;
        let index = allPlayerList.indexOf(player);
        allPlayerList.splice(index,1)
    }
    that.outRoom = function(player){
        // console.log(player)
        if(player.room){
            let  data = {
                avatarURL:player.avatarURL,
                nickName:player.nickName,
                room:player.room.ID,
                seatIndex:player.seatIndex
            }
            // 通知大厅有人掉线了
            boardCastInHall(GM.protocol.ON_PLAYER_LEAVE_ROOM,data)
            // 从房间中移除玩家
            player.room.removePlayer(player);
            player.room = null;
            player.seatIndex = null;
            player.isReady = false;
        }
    }

    // 创建房间
    that.creatRoom = function(packet,player){
        let result = null; 
        let roomID  = packet.roomID;
        // console.log(packet.roomID)
        // console.log("packet.roomID++++++++++++++++++++++++++++++++++++++++++++++++++++")
        let seatIndex = packet.seatIndex;
            for(let i = 0; i< roomList.length; i++){
            if(roomList[i].ID === roomID){
                if(roomList[i].playerList.length <2){
                    player.room  = roomList[i];
                    player.seatIndex = seatIndex;
                    roomList[i].addPlayer(player);
                    result = {res:{room:roomID,seatIndex:seatIndex}};
                        let  data = {
                            avatarURL:player.avatarURL,
                            nickName:player.nickName,
                            room:player.room.ID,
                            seatIndex:player.seatIndex,
                            goldCount:player.goldCount,
                            gameWon: player.gameWon,
                            gameLost: player.gameLost,
                            accountID:player.accountID,
                            isReady:player.isReady
                        }
                         // 通知大厅有人进入游戏
                        boardCastInHall(GM.protocol.ON_PLAYER_JOIN_ROOM,data)
                }else{
                    result = {err:GM.GAME_HINT.LOCKED_ROOM}
                } 
            }
        }
        return result;
    }
    // 给玩家分配房间
    that.assignRoom = function(player){
        // console.log(player)
        // console.log("player++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        let result = []
            for (let i = 0; i < roomList.length; i++) {
                    if(roomList[i].ID === player.room.ID){
                       for (let j = 0; j < roomList[i].playerList.length; j++) {
                            let  p = roomList[i].playerList[j];
                            // console.log(p)
                            // console.log("p+++++++++++++++++++++++++++++++++++++")
                            let data = {
                                accountID:p.accountID,
                                avatarURL:p.avatarURL,
                                nickName:p.nickName,
                                goldCount:p.goldCount,
                                gameWon: p.gameWon,
                                gameLost: p.gameLost,
                                room:player.room.ID,
                                seatIndex:p.seatIndex,
                                isReady:p.isReady
                            }
                            result.push(data)
                       }
                    }
                }
        return result;
    }
    that.getAllPlayerInRoom = function(){
        let result  = [] ;
        for (let i = 0; i < allPlayerList.length; i++) {
            let element = allPlayerList[i];
            if(element.room){
                result.push(element);
            }
        }
        return result;
    }
    return that;
})()
