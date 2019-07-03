
cc.Class({
    extends: cc.Component,

    properties: {
        // 登录界面
        loginInterface:cc.Node,
        // 注册界面
        registerForm:cc.Node,
        // 注册账号ID
        accountID:cc.EditBox,
        // 昵称
        nickName:cc.EditBox,
        // 注册时的密码
        password:cc.EditBox,
        // 再次输入的密码
        passwordAgain:cc.EditBox,
        // 头像
        headPortrait:cc.Prefab,
        // 滚动视图内容区
        content:cc.Node,
        // 登录账号
        loginID:cc.EditBox,
        // 登录密码
        loginPassword:cc.EditBox,
        // 默认头像
        defaultHeadPortrait:cc.Node
    },

    // onLoad () {},

    start () {
        this.spriteFrame = null;
        cc.vv.socketController.test("连接测试",function(err,res){
            if(err){
                cc.log("错误")
            }else{
                cc.log("测试正确");
            }
        })
        cc.vv.LOGIN = this;
        this.drawHeadPortrait(); 
    },
    // 画头像的滚动视图
    drawHeadPortrait(){
        for (let i = 0; i < cc.vv.HEAD_PORTRAIT_URL.length; i++) {
            let headPortrait = cc.instantiate(this.headPortrait);
            headPortrait.setPosition(0,0);
            headPortrait.getComponent("Head").init(cc.vv.HEAD_PORTRAIT_URL[i])
            this.content.addChild(headPortrait);
        }
    },
    getSpriteFrame(spriteFrame){
        this.spriteFrame = spriteFrame;
    },
    // 按钮的回调事件
    onButtonClick(event,customData){
        this[customData]();
    },
    // 登录
    login(){
        let errInfo = cc.vv.checkInput(this.loginInterface);
            if(errInfo){
                cc.vv.showHint(errInfo)
            }else{
                let data = this.getLoginInfo(this.loginID.string,this.loginPassword.string)
                cc.vv.socketController.requestLogin(data,function(err,res){
                    if(err){
                        cc.log(err)
                        cc.vv.showHint(err)
                    }else{
                        cc.vv.PlayerInfo = res;
                        cc.director.loadScene("lobby");
                    }
                })
            }

    },
    // 登录界面的注册
    register(){
        this.loginInterface.active =  !this.loginInterface.active;
        this.registerForm.active = !this.registerForm.active
    },
    // 注册界面的注册
    register1(){
        let errInfo = cc.vv.checkInput(this.registerForm);
        let self = this;
        if(errInfo){
            cc.vv.showHint(errInfo)
        }else{
                let data = this.getRegisterInfo(this.accountID.string,this.nickName.string,this.spriteFrame,this.password.string)
                cc.vv.socketController.requestRegister(data,function(err,res){
                    if(err){
                        cc.log("注册失败，请稍后再试")
                    }else{
                        cc.log("注册成功，赶紧登陆把")
                        this.back();
                    }
                })
            }
    },
    getLoginInfo(accountID,password){
        let data = {};
        data.accountID = accountID;
        data.password = password;
        return data
    },
    getRegisterInfo(accountID,nickName,avatarURL,password){
        let data = {};
        data.accountID = accountID;
        data.nickName = nickName;
        data.avatarURL = avatarURL;
        data.password = password;
        return data;
    },
    // 输入账号验证
    accountIDVerify(){
        if(this.accountID.string){
            let user=this.accountID.string;
            var reg=/^[a-zA-Z][a-zA-Z0-9]{3,15}$/;    
              if(reg.test(user)==false){
                alert("用户名不正确");
              return false;
                }
                // alert("输入正确")
        }else{
            alert("请输入正确的账号")
        }
    },
    // 输入昵称验证
    nicknameVerify(){
        if(this.nickName.string){
            let reg = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/
            if(reg.test(this.nickName.string)){
                // alert("昵称正常");
            }else{
                alert("昵称非法");
            }
        }else{
            alert("请输入正确的昵称")
        }
    },
    // 输入密码验证
    passwordVerify(){
        if(this.password.string){
            let pwd=this.password.string;
            var reg=/^[a-zA-Z0-9]{4,10}$/;    
              if(reg.test(pwd)==false){
                alert("密码不能含有非法字符，长度在4-10之间");
              return false;
                }
                // alert("输入正确")
        }else{
            alert("请输入正确的密码")
        }
    },
    // 再次输入密码验证
    passwordAgainVerify(){
        if(this.password.string === this.passwordAgain.string){
            // alert("输入正确")
        }else{
            alert("2次输入的密码不一致")
        }
    },
    back(){
        this.loginInterface.active =  !this.loginInterface.active;
        this.registerForm.active = !this.registerForm.active
        this.accountID.string = "";
        this.nickname.string = "";
        this.password.string = "";
        this.passwordAgain.string = "";  
    }
    // update (dt) {},
});
