
cc.Class({
    extends: cc.Component,

    properties: {
        roomNumber:cc.Label,
        headPortraitTop:cc.Node,
        headPortraitBot:cc.Node,
    },


    // onLoad () {},

    start () {
        this.index = 0;
    },
    init(roomNumber){
        this.roomNumber.string = roomNumber+1;
    },
    onButtonClick(){
        
    }
    // update (dt) {},
});
