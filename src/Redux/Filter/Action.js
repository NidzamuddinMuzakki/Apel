function FilterRedux(data){
   
    return {
        type: "FilterRedux",
        payload: {
            data
        }
    }
      
}
export {FilterRedux}