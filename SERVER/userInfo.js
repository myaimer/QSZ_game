// 引入表格操作模块
const XLSX = require("xlsx")

exports.myDatabase = (function(){
    let that = {};
    let workbook = XLSX.readFile("userInfo.xlsx")
    // 获取所有工作铺的表名
    let sheetName = workbook.SheetNames;     //[sheet1,sheet2]
    // 获取我们要操作的工作表
    let worksheet = workbook.Sheets[sheetName[0]]
    // 获取所有的用户数据
    getAllUserInfo = function(){  
        // 将工作表中的内容转化成json数组  
        return XLSX.utils.sheet_to_json(worksheet);
    };
    // 添加用户
    that.addUserInfo = function(info){ 
        //1. 获取所有的表格信息
        let allInfo = getAllUserInfo();
        // 合并对象
        Object.assign(info,GM.DEFAULT_DATA)
        // 2.将新用户信息放进去
        allInfo.push(info)
        // 3.刷新工作表
        XLSX.utils.sheet_add_json(worksheet,allInfo);
        // 4. 刷新工作蒲
        XLSX.writeFile(workbook,"userInfo.xlsx")
    },
//  修改用户信息
    that.modifyUserInfo = function(accountID,cfg){
        let allInfo = getAllUserInfo();
        for (let i = 0; i < allInfo.length; i++) {
            if(accountID === allInfo[i].accountID){
                let info = allInfo[i];
                for (const key in cfg) {
                    info[key] = cfg[key];
                }
                break;
            }
        }
         // 刷新工作表
         XLSX.utils.sheet_add_json(worksheet,allInfo);
         //  刷新工作蒲
         XLSX.writeFile(workbook,"userInfo.xlsx")
    },
    // 查找用户信息
    that.searchUserInfo = function(accountID){
        let result = null;
        let allInfo = getAllUserInfo();
        for (let i = 0; i < allInfo.length; i++) {
            if(accountID == allInfo[i].accountID){
                result = allInfo[i];
                break;
            }
        }
        return result;
    },
    // 删除用户信息
    that.removeUserInfo = function(data){
        let accountID = data.accountID;
        // 获取所有的信息
        let allInfo  = getAllUserInfo();
        for (let i = 0; i < allInfo.length; i++) {
            if(accountID == allInfo[i].accountID){
                allInfo.splice(i,1);
                break;
            }
        }
          // 3.刷新工作表
          XLSX.utils.sheet_add_json(worksheet,allInfo);
          // 4. 刷新工作蒲
          XLSX.writeFile(workbook,"userInfo.xlsx")
    }
    that.getRankList3 = function(){
        let result = [];
        // 获取所有的信息
        let allInfo  = getAllUserInfo();
        allInfo.sort((a,b)=>{
            return b.accountID - a.accountID;
        })
        result = allInfo.splice(0,3);
        return result;
    }
    return that;
})()