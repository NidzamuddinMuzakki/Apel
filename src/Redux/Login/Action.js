function ChangeLoginAttempt(data){
   
    return {
        type: "LoginAttempt",
        payload: {
            LoginAttempt:data
        }
    }
      
}    
export {ChangeLoginAttempt}