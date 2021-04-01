


import Dialog from "@material-ui/core/Dialog"
export default function AlertSave(props){
   
    const handleClose = (data)=>{
        props.onClick(data);
    }
    return (
        <Dialog PaperProps={{
            style: { borderRadius: 10 }
          }} style={{}}  aria-labelledby="asasasas" open={props.open}>
            <div style={{width:'400px', padding:'20px'}}>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <img src={props.alert=="delete"?"./remove.png":"/question.png"} width='100'></img>

                </div>
                <div style={{textAlign:'center', color:props.alert=="delete"?"red":props.themeColor, fontWeight:600, fontFamily:'Poppinsbold', fontSize:'25px', marginTop:'20px'}}>{props.alert=="save"?"Do You Want To Save It?":'Are You Sure?'}</div>
                <div style={{textAlign:'center', color: '#C4C4C4', fontWeight:600, fontFamily:'Poppinsbold', fontSize:'15px', marginTop:'15px'}}>{props.alert=="save"?"Please Check Information Before Submiting":props.alert=="delete"?"Do you really want to delete  these record? the process cannot be undone.":"Do you want " +props.alert+ " the view?"}</div>

                <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'20px'}}>
                    
                    <button style={{fontFamily:'Poppinsbold',color:props.alert=="delete"?"red":props.themeColor,fontWeight:600,background: '#FFFFFF',border:props.alert=="delete"? '1px solid red': '1px solid '+props.themeColor,boxSizing: 'border-box',borderRadius: '40px 0px 0px 40px',width: '150px',height: '42px'}}  onClick={e=>handleClose('no')}>{props.alert=="delete"?"Cancel":"No"}</button>
                    <button style={{fontFamily:'Poppinsbold',color:'white',fontWeight:600,border: '1px solid '+props.alert=="delete"?"#F01414":props.themeColor,boxSizing: 'border-box',borderRadius: '0px 40px 40px 0px',width: '150px',height: '42px', '--color':props.alert=="delete"?"#F01414":props.themeColor,'--colorBgHover':props.alert=="delete"?"#F01414":props.themeColorBgHover}} className="editButtonSave"  onClick={e=>handleClose('yes')}>Yes</button>
                    
                </div>
            </div>
        </Dialog>
    )
}