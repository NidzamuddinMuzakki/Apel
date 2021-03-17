function ChangeSelectedRow(data){
   
    return {
        type: "SelectedRow",
        payload: {
            data
        }
    }
      
}
function ChangePagingTable(data){
   
    return {
        type: "PagingTable",
        payload: {
            data
        }
    }
      
}
function ChangeRowPageTable(data){
   
    return {
        type: "RowPageTable",
        payload: {
            data
        }
    }
      
}
export {ChangeSelectedRow, ChangeRowPageTable, ChangePagingTable}