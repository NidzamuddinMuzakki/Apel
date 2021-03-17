function SelectedRow(state = [], action){
    switch(action.type){
        case "SelectedRow":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
       default:
           return state  
        }
    }
function Paging(state = 0, action){
    switch(action.type){
        case "PagingTable":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }
function SelectedRowPage(state = 0, action){
    switch(action.type){
        case "RowPageTable":
            let stateuser = state
            if(action.payload){
                stateuser = action.payload.data;
            }
            return stateuser
        default:
            return state  
        }
    }         


export {SelectedRow, Paging,SelectedRowPage}    