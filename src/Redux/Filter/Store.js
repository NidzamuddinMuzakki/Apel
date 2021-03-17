function ChangeFilterRedux(state = '', action){
    switch(action.type){
        case "FilterRedux":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
       default:
           return state  
        }
    }
export { ChangeFilterRedux}   