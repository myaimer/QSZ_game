exports.protocol = {
    /* -----------------------请求类--------------------------------*/
    //登录
    REQUEST_LOGIN : "request_login",
    //注册
    REQUEST_REGISTER:"request_register",
    //加入
    REQUEST_JOIN_ROOM : "request_join_room",
    //进入
    REQUEST_ENTER_ROOM: "request_enter_room",
    //进入
    REQUEST_LEAVE_ROOM: "request_leave_room",
    //进入大厅
    REQUEST_ENTER_HALL : "request_enter_hall",
    //请求准备
    REQUEST_GAME_READY : "request_game_ready",
    //请求聊天
    REQUEST_CHAT : "request_chat",
    /*---------------------监听类------------------------ */
    //玩家加入房间（大厅视角）
    ON_PLAYER_JOIN_ROOM:"on_player_join_room",
     //玩家离开房间（大厅视角）
    ON_PLAYER_LEAVE_ROOM:"on_player_leave_room",
     //玩家准备
     ON_PLAYER_READY : "on_player_ready",
     //取消准备
     ON_PLAYER_CANCEL_READY : "on_player_cancel_ready",
     //传递聊天消息
     ON_PLAYER_CHAT : "on_player_chat",
    //游戏开始的通知
    ON_PLAYER_GAME:"on_player_game"
}