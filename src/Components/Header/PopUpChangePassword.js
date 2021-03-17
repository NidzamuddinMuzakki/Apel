import Dialog from '@material-ui/core/Dialog'

import { useTranslation } from 'react-i18next';
// const {t} = useTranslation();
export default function PopUpClearNotif(props){
  const {t} = useTranslation();
    const handleClose = ()=>{
        
        props.onClick();
    }
    return (
        <Dialog style={{}} onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            
            <div style={{width:'600px',height:'430px' ,padding:'20px',background:'#E5F4F8', position:'relative'}}>
            <div className="XClose" style={{'--colorBgHover':props.themeColorBgHover}} onClick={handleClose}>X</div>
                <div style={{textAlign:'left', marginLeft:'80px',marginBottom:'30px' ,fontFamily:'Poppins', fontWeight:'bold', fontSize:'25px'}}>
                    <span style={{textAlign:'left',color:'gray'}}>{t("A002M.LA01")}</span>
                </div>
                <div style={{display:'flex',justifyContent:'center', position:'relative'}}> 
                   
                </div>
               <div style={{marginLeft:'80px' ,fontFamily:'Poppins', fontSize:'18px'}}>
                    <label htmlFor="oldpassword">{t("A002M.LA02")}</label>
               </div>
                <div style={{display:'flex', position:'relative', justifyContent:'center',width:'400px',margin:'auto' }}>
                    <input style={{paddingLeft:"5px",borderRadius:'5px', border:'1px solid '+props.themeColor,width:'100%'}} type="password" name="oldpassword"></input>
                    <div></div>
                </div>
                <div style={{marginLeft:'80px', fontFamily:'Poppins', fontSize:'18px'}}>
                    <label htmlFor="oldpassword">{t("A002M.LA03")}</label>
               </div>
                <div style={{display:'flex', position:'relative',width:'400px',margin:'auto' }}>
                    <input style={{paddingLeft:"5px",borderRadius:'5px', border:'1px solid '+props.themeColor,width:'100%'}} type="password" name="oldpassword"></input>
                    <div></div>
                </div>
                <div style={{marginLeft:'80px', fontFamily:'Poppins', fontSize:'18px'}}>
                    <label htmlFor="oldpassword">{t("A002M.LA04")}</label>
               </div>
                <div style={{display:'flex', position:'relative', justifyContent:'center',width:'400px',margin:'auto' }}>
                    <input style={{paddingLeft:"5px",borderRadius:'5px', border:'1px solid '+props.themeColor,width:'100%'}} type="password" name="oldpassword"></input>
                    <div></div>
                </div>
                <div style={{marginTop:'30px'}}>
 
                    <button onClick={handleClose} className="editButtonSave" style={{'--colorBgHover':props.themeColorBgHover, '--color':props.themeColor,fontFamily:'Poppins',color:'white',marginLeft:'410px',borderRadius:'10px' ,border: `1px solid ${props.themeColor}`, padding:'5px',width: '70px'}}>{t("Global.BT01")}</button>
                    
                </div>
            </div>
        </Dialog>
    )
}