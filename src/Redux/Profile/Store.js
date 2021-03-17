function RoleData(state = '', action){
    switch(action.type){
        case "RoleData":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
       default:
           return state  
        }
    }
function MenuData(state = '', action){
    switch(action.type){
        case "MenuData":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }    
function BranchData(state = '', action){
    switch(action.type){
        case "BranchData":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function DateData(state = '', action){
    switch(action.type){
        case "DateData":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    } 
function PeriodData(state = '', action){
    switch(action.type){
        case "PeriodData":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function UserData(state = '', action){
    switch(action.type){
        case "UserData":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }        
function UserSetting(state = '', action){
    switch(action.type){
        case "UserSetting":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function RoleSelected(state = '', action){
    switch(action.type){
        case "RoleSelected":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function ModuleSelected(state = '', action){
    switch(action.type){
        case "ModuleSelected":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function BranchSelected(state = '', action){
    switch(action.type){
        case "BranchSelected":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function PeriodSelected(state = '', action){
    switch(action.type){
        case "PeriodSelected":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function DateSelected(state = '', action){
    switch(action.type){
        case "DateSelected":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function Param(state = '', action){
    switch(action.type){
        case "Param":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    
    }
function ColorTheme(state = '', action){
    switch(action.type){
        case "ColorTheme":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function LoveMenu(state = false, action){
    switch(action.type){
        case "LoveMenu":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }                                     
export {LoveMenu,ColorTheme,Param,RoleSelected,ModuleSelected,BranchSelected,PeriodSelected,DateSelected ,RoleData, MenuData, PeriodData, UserData,UserSetting,BranchData,DateData};  