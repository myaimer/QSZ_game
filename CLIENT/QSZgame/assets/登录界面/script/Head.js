
cc.Class({
    extends: cc.Component,

    properties: {
        headPortrait:cc.Node,
    },


    // onLoad () {},

    start () {
    },
    
    init(data){
        this.frame1 = null;
        this.spriteFrame = data;
        let  that =  this;
        cc.loader.load(data.url,function(err,texure){
            if(err){
                alert("头像加载失败")
            }
            let frame = new cc.SpriteFrame(texure);
            that.headPortrait.getComponent(cc.Sprite).spriteFrame = frame;
            that.frame1 = frame;
            // cc.log(that.frame1)
        })
    },
    onClick(){
        // cc.log(this.frame1)
        cc.vv.LOGIN.defaultHeadPortrait.getComponent(cc.Sprite).spriteFrame = this.frame1;
        cc.vv.LOGIN.getSpriteFrame(this.spriteFrame);
    }
    // update (dt) {},
});
