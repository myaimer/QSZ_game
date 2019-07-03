const post = "http://192.168.2.145:3000";


cc.vv =  cc.vv || {};
// 集成协议模块
cc.vv.protocol = require("protocol").protocol

// 集成通讯模块
cc.vv.socketController = require("socketController").socketController(post)
// 登录界面的指向
cc.vv.LOGIN = null;
// 游戏大厅的指向
cc.vv.LOBBY = null;
// 登录的玩家信息
cc.vv.PlayerInfo = {
    nickName  : null,
    avatarURL : null,
    goldCount : 0,
    gameWon   : 0,
    gameLost  : 0,
}
// 本地游戏提示语
cc.vv.GAME_HINT = {
    ["信息缺失"] : "信息输入不完整",
    ["重复密码"] :"两次密码输入不符",
    ["格式错误"] :"格式错误。请确认输入的内容中不包含特殊或者敏感字符",

}
cc.vv.res = {
    "pic_1" :{url:"cartoon/1",          type:cc.SpriteFrame},
    "pic_2" :{url:"cartoon/2",          type:cc.SpriteFrame},
    "pic_3" :{url:"cartoon/3",          type:cc.SpriteFrame},
    "pic_4" :{url:"cartoon/4",          type:cc.SpriteFrame},
    "pic_5" :{url:"cartoon/5",          type:cc.SpriteFrame},
    "pic_6" :{url:"cartoon/6",          type:cc.SpriteFrame},
    "pic_7" :{url:"cartoon/7",          type:cc.SpriteFrame},
    "pic_8" :{url:"cartoon/8",          type:cc.SpriteFrame},
    ["AAAA"] :{url:"bg",                type:cc.Prefab},
}
// 敏感字符
cc.vv.REG_ILLEGAL_CHAR = /[\\\(\)\{\}\/\,\|\*\+\-\.\?\^\n\r\t\v\0\b]|装逼|草泥马|特么的|撕逼|玛拉戈壁|爆菊|JB|呆逼|本屌|齐B短裙|法克鱿|丢你老母|达菲鸡|装13|逼格|蛋疼|傻逼|绿茶婊|你妈的|表砸|屌爆了|买了个婊|已撸|吉跋猫|妈蛋|逗比|我靠|碧莲|碧池|然并卵|日了狗|屁民|吃翔|XX狗|淫家|你妹|浮尸国|滚粗/g;
// 创建提示框
cc.vv.showHint = function(info){
    let hint = cc.instantiate(cc.vv.res["AAAA"])
    hint.getChildByName("提示文字").getComponent(cc.Label).string = info;
    cc.find("Canvas").addChild(hint);
    setTimeout(() =>{
        hint.destroy();
    },1000);
}
cc.vv.checkInput  =  function(parNode){
    // 初始化验证结果
    let errInfo = "";
    // 获取传入的父节点的所有子节点
    let children = parNode.children;
    for (let i = 0; i < children.length; i++) {
        let n = children[i];
        //筛选出所有的输入框
        if(n.name.indexOf("输入") >-1){
            let type = n.name.split("输入")[0];
            let str = n.getComponent(cc.EditBox).string;
            // 校验完整度
            if(!str){
                errInfo = cc.vv.GAME_HINT["信息缺失"];
                break;
            }
            if(str.match(cc.vv.REG_ILLEGAL_CHAR)){
                errInfo = cc.vv.GAME_HINT["格式错误"];
                break;
            }
            if(n.name.indexOf("再次") > -1){
                // cc.log(parNode.getChildrenByName())
                let password1 =  parNode.getChildByName("密码输入").getComponent(cc.EditBox).string;
                let password2 =  parNode.getChildByName("密码再次输入").getComponent(cc.EditBox).string;
                if(password1 != password2){
                    errInfo = cc.vv.GAME_HINT["重复密码"];
                    break;
                }
            }       
        } 
    }
    return errInfo;
}

// 头像路径
cc.vv.HEAD_PORTRAIT_URL = [
    {"url":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1511559533,3259179204&fm=27&gp=0.jpg"},
    {"url":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1511559533,3259179204&fm=27&gp=0.jpg"},
    {"url":"http://01.imgmini.eastday.com/mobile/20180528/20180528152045_3595aede32985f558764db3b5227d85a_2.jpeg"},
    {"url":"http://01.imgmini.eastday.com/mobile/20180528/20180528152045_3595aede32985f558764db3b5227d85a_11.jpeg"},
    {"url":"http://01.imgmini.eastday.com/mobile/20180528/20180528152045_3595aede32985f558764db3b5227d85a_19.jpeg"},
    {"url":"http://01.imgmini.eastday.com/mobile/20180528/20180528152045_3595aede32985f558764db3b5227d85a_21.jpeg"},
    {"url":"http://n.sinaimg.cn/games/crawl/20170317/rZ9D-fycnyhk8303202.jpg"},
] 