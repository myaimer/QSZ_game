
global.GM = global.GM || {};

// 集成通讯协议模块
GM.protocol = require("./protocol").protocol;
// 集成数据管理模块
GM.DB = require("./userInfo").myDatabase
// 集成玩家模块
GM.Player = require("./player")
// 集成房间模块
GM.Room = require("./room")
// 集成服务器大管家模块
GM.MANAGER = require("./gameManager").gameManager

// 游戏提示语
GM.GAME_HINT = {
    ACCOUNT_WRONG :"账号或密码错误",
    LOCKED_ACCOUNT : "用户已经存在",
    REGISTER_SUCCESS:"注册成功",
    ACCOUNT_NOACCOUNTID:"用户不存在，请检查用户名是否输入正确",
    LOCKED_ROOM:"换个房间吧，这个房间已经满了哦"
}
// 新用户游戏初始数据
GM.DEFAULT_DATA = {
    goldCount : 1000,
    gameWon : 0,
    gameLost:0
}