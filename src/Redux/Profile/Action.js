function ChangeRoleSelected(data){
   
    return {
        type: "RoleSelected",
        payload: {
            data
        }
    }
      
}
function ChangeLove(data){
   
    return {
        type: "LoveMenu",
        payload: {
            data
        }
    }
      
}
function ChangeBranchSelected(data){
   
    return {
        type: "BranchSelected",
        payload: {
            data
        }
    }
      
}
function ChangePeriodSelected(data){
   
    return {
        type: "PeriodSelected",
        payload: {
            data
        }
    }
      
}
function ChangeDateSelected(data){
   
    return {
        type: "DateSelected",
        payload: {
            data
        }
    }
      
}
function ChangeModuleSelected(data){
   
    return {
        type: "ModuleSelected",
        payload: {
            data
        }
    }
      
}
function RoleData(data){
   
    return {
        type: "RoleData",
        payload: {
            data
        }
    }
      
}
function BranchData(data){
   
    return {
        type: "BranchData",
        payload: {
            data
        }
    }
      
}
function DateData(data){
   
    return {
        type: "DateData",
        payload: {
            data
        }
    }
      
}
function MenuData(data){
   
    return {
        type: "MenuData",
        payload: {
            data
        }
    }
      
}  
function UserData(data){
   
    return {
        type: "UserData",
        payload: {
            data
        }
    }
      
}  
function UserSetting(data){
   
    return {
        type: "UserSetting",
        payload: {
            data
        }
    }
      
}
function PeriodData(data){
   
    return {
        type: "PeriodData",
        payload: {
            data
        }
    }
      
}
function Param(data){
   
    return {
        type: "Param",
        payload: {
            data
        }
    }
      
}
function ChangeColorTheme(data){
   
    return {
        type: "ColorTheme",
        payload: {
            data
        }
    }
      
}
export {ChangeLove,ChangeColorTheme,Param,PeriodData,RoleData,MenuData,UserData,UserSetting,BranchData, DateData ,ChangeRoleSelected,ChangeModuleSelected, ChangeDateSelected,
    ChangePeriodSelected,ChangeBranchSelected}