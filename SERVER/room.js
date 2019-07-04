function Room(ID){
    this.ID = ID;
    this.playerList = [];
}
Room.prototype.addPlayer = function(player){
    this.playerList.push(player)
}
Room.prototype.removePlayer = function(player){
    let index = this.playerList.indexOf(player);
    if(index >=0){
        this.playerList.splice(index,1);
        // console.log("我出去了")
    }
}
Room.prototype.boardCastInRoom=  function(type,data,player){
    this.playerList.forEach(element => {
        if(element.nickName != player.nickName){
            element.sentMsg(type,data);
            if(element.isReady){
                this.playerList.forEach(p =>{
                    let packet = {
                        res:true
                    }
                    p.sentMsg(GM.protocol.ON_PLAYER_GAME,packet)
                })
            }
        }
        
    });
    
}
Room.prototype.ChatInRoom = function(type,packet,player){
    this.playerList.forEach(element => {
        let data = {
            nickName:player.nickName,
            res:packet.res
        }
        element.sentMsg(type,data)
});
}
module.exports = Room;