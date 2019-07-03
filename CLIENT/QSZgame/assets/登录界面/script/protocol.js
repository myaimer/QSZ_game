exports.protocol = {
    // 请求类协议.......................................
    // 登录
    REQUEST_LOGIN :"request_login",
    // 注册
    REQUEST_REGISTER: "request_register",
    // 加入房间
    REQUEST_JOIN_ROOM: "request_join_room",
    // 进入房间
    REQUEST_ENTER_ROOM:"request_enter_room",
        // 进入大厅
    REQUEST_ENTER_HALL:"request_enter_hall",

    // 通知类协议.....................................
    // 玩家加入房间（大厅视角）
    ON_PLAYER_JOIN_ROOM: "on_player_join_room",

    ON_PLAYER_LEAVE_ROOM: "on_player_leave_room",

    // 玩家在房间
    // 玩家准备
    ON_PLAYER_READY :"on_player_ready",
    // 玩家取消准备
    ON_PLAYER_CANCEL_READY :"on_player_cancel"   

}