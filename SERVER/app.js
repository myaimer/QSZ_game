// 游戏模块集成
require("./gameController");
const socket = require("socket.io");
const app = socket(3000);
app.on("connection",function(socket){
    console.log(socket["conn"]["remoteAddress"].split("::ffff:")[1])
    socket.on("C->S", function(packet){
        let msg = JSON.parse(packet);
        let type  = msg.type;
        if(type == GM.protocol.REQUEST_LOGIN){
            msg.data =login(socket,msg.data)
            socket.emit('S->C',JSON.stringify(msg));
        }
        if(type === GM.protocol.REQUEST_REGISTER){
            msg.data =register(msg.data)
            socket.emit('S->C',JSON.stringify(msg));
        } 
    })
})
// 登录密码验证
function login (socket,input){
    // console.log(input)
    let data = {};
    let info =GM.DB.searchUserInfo(input.accountID);
    if(info && info.password === input.password){
        let {nickName,avatarURL,goldCount,gameWon,gameLost} = info;
        data = {err:null,res:{nickName,avatarURL,goldCount,gameWon,gameLost}};
        //登录创建成功后，立即创建服务器端玩家，并将其加入服务器玩家列表
        let player = new GM.Player(socket,info)
        GM.MANAGER.addPlayer(player);
    }else{
        if(info){
            data = {err:GM.GAME_HINT.ACCOUNT_WRONG}
        }else{
            data = {err:GM.GAME_HINT.ACCOUNT_NOACCOUNTID}
        }
    }
    return data;
}
// 注册
function register(msg){
    let data = {};
    let info = GM.DB.searchUserInfo(msg.data);
    if(info){
        data = {err:GM.GAME_HINT.LOCKED_ACCOUNT};
    }else{
        GM.DB.addUserInfo(msg);
        data = {err:null,res :GM.GAME_HINT.REGISTER_SUCCESS}
    }
    return data
}

