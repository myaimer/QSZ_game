import { join } from "path";

cc.Class({
    extends: cc.Component,

    properties: {
        room:cc.Prefab,
        theGameArea:cc.Node,
        headPortrait:cc.Sprite,
        nickName:cc.Label,
        goldNum:cc.Label,
        victory:cc.Label,
        lostGame:cc.Label,
    },


    // onLoad () {},

    start () {
        cc.vv.LOBBY = this
        cc.log(cc.vv.PlayerInfo);
        this.createRoom();
        this.init();
        this.updateTheAvatar(cc.vv.PlayerInfo.avatarURL);
        // 监听玩家进入房间
        cc.vv.socketController.onPlayerJoinRoom(function(data){
            cc.log(data)
            // todo  绘制在座子玩家
        })
        cc.vv.socketController.onPlayerLeaveRoom(function(data){
            cc.log(data)
            // todo  绘制在座子玩家
        })
        
        // 返回大厅
        cc.vv.socketController.enterHall(null,function(err,res){
            if(err){
                cc.log(err)
                cc.vv.showHint(err)
            }else{
                cc.log(res)
            }
        })
    },
    init(){
       this.nickName.string = cc.vv.PlayerInfo.nickName;
       this.goldNum.string = cc.vv.PlayerInfo.goldCount;
       this.victory.string = "胜场:" + cc.vv.PlayerInfo.gameWon;
       this.lostGame.string = "败场:"+ cc.vv.PlayerInfo.gameLost
    },
    updateTheAvatar(data){
        let  that =  this;
        cc.loader.load(data,function(err,texure){
            if(err){
                cc.log(err)
            }
            let frame = new cc.SpriteFrame(texure);
            that.headPortrait.spriteFrame = frame;
        })
    },
    createRoom(){
        for (let i = 0; i < 30; i++) {
            let room = cc.instantiate(this.room);
            room.getComponent("room").init(i);
            this.theGameArea.addChild(room);          
        }
    },
    joinRoom(){

    }
    // update (dt) {},
});
