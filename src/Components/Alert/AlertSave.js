


import Dialog from "@material-ui/core/Dialog"
export default function AlertSave(props){
   
    const handleClose = (data)=>{
        
        props.onClick(data);
    }
    return (
        <Dialog style={{}} onClose={e=>handleClose('no')} aria-labelledby="asasasas" open={props.open}>
            <div style={{width:'600px', height:'450px'}}>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'70px'}}>
                    <img src="/question.png" width='150'></img>

                </div>
                <div style={{textAlign:'center', color: props.themeColor, fontWeight:600, fontFamily:'Poppins-bold', fontSize:'25px', marginTop:'20px'}}>Do You Want To Save It?</div>
                <div style={{textAlign:'center', color: '#C4C4C4', fontWeight:600, fontFamily:'Poppins-bold', fontSize:'15px', marginTop:'15px'}}>Please Check Information Before Submiting</div>

                <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'50px'}}>
                    
                    <button style={{fontFamily:'Poppins-bold',color:props.themeColor,fontWeight:600,background: '#FFFFFF',border: '1px solid '+props.themeColor,boxSizing: 'border-box',borderRadius: '40px 0px 0px 40px',width: '150px',height: '42px'}}  onClick={e=>handleClose('no')}>No</button>
                    <button style={{fontFamily:'Poppins-bold',color:'white',fontWeight:600,border: '1px solid'+props.themeColor,boxSizing: 'border-box',borderRadius: '0px 40px 40px 0px',width: '150px',height: '42px', '--color':props.themeColor,'--colorBgHover':props.themeColorBgHover}} className="editButtonSave"  onClick={e=>handleClose('yes')}>Yes</button>
                    
                </div>
            </div>
        </Dialog>
    )
}