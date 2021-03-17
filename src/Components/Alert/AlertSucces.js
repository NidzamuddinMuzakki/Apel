


import Dialog from "@material-ui/core/Dialog"
export default function AlertSuccess(props){
 
    const handleClose = ()=>{
        
        props.onClick();
    }
    return (
        <Dialog style={{}} onClose={e=>handleClose()} aria-labelledby="asasasas" open={props.open}>
            <div style={{width:'600px', height:'450px'}}>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'70px'}}>
                    <img src="/question.png" width='150'></img>

                </div>
                <div style={{textAlign:'center', color: '#3BBAD6', fontWeight:600, fontFamily:'Poppins-bold', fontSize:'50px', marginTop:'50px'}}>Sucess</div>
               

                <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'50px'}}>
                    
                    {/* <button style={{fontFamily:'Poppins-bold',color:'#3BBAD6',fontWeight:600,background: '#FFFFFF',border: '1px solid #3BBAD6',boxSizing: 'border-box',borderRadius: '40px',width: '150px',height: '42px'}}  onClick={e=>handleClose()}>Oke</button> */}
                    
                    
                </div>
            </div>
        </Dialog>
    )
}