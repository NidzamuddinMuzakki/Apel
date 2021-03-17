function LoginAttempt(state = 0, action){
    switch(action.type){
        case "LoginAttempt":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.LoginAttempt;
            }
            return stateuser
       default:
           return state  
        }
    }

export {LoginAttempt};  