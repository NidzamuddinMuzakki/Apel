import Dialog from '@material-ui/core/Dialog'
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import axios from 'axios'
import {Icon} from 'rsuite'
import Api from './../../ApiSetting'
import { useTranslation } from 'react-i18next';
import AlertDismiss from './../Alert/AlertDismiss'
import AlertSave from './../Alert/AlertSave'
// const {t} = useTranslation();
import Loading from './../Loading'
import Input from './../Form/Input'
import { SatelliteSharp } from '@material-ui/icons';
export default function PopUpClearNotif(props){
    const {t} = useTranslation();
    const [dismiss, setDismiss] = useState(false)
    const [alertSave, setAlertSave] = useState(false)
    const confirmationDialog = useSelector(state=>state?.Param[0]?.confirmationDialog)
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        oldpassword:'', newpassword:'', confirmpassword:'',
        valid:true, loadingValidate:false, validApi:true 
    })
    const [gasama, setGasama] = useState(false)
    useEffect(()=>{
        setState({
            ...state,
            oldpassword:'', newpassword:'', confirmpassword:'',
            valid:true, loadingValidate:false, validApi:true 
        })
    },[props.open])
    const handleChange = (e)=>{
        if(e.target.value.length>50){

        }else{
            setState({
                ...state,
                [e.target.name]:e.target.value
            })
            if(e.target.name=="confirmpassword" && e.target.value!=state.newpassword){
                setGasama(true)
            }else if(e.target.name=="newpassword" && state.confirmpassword!=""){
                if(e.target.value!=state.confirmpassword){
                    setGasama(true)
                }else{
                    setGasama(false)
                }
            }else if(e.target.name=="confirmpassword" && e.target.value==state.newpassword){
                setGasama(false)
            }
           
        }
    }
    const handleSaveSetting = (data)=>{
        if(data=="no"){
            setAlertSave(false)
           
          }else{
            
           
          
                setLoading(true)
                setAlertSave(false)
                var data = JSON.stringify({
                    "oldPassword": "abcabc",
                    "newPassword": "123123"
                  });
                var config = {
                    method: 'post',
                    url: Api()+'/master/auth/changepassword',
                    headers: { 
                      'Content-Type': 'application/json'
                    },
                    data : data
                  };
                  
                  axios(config)
                  .then(function (response) {
                    props.onClick(response.data);
                    setDismiss(false)
                    setLoading(false)
                    setAlert('')
                    setGasama(false)
                    
                    setState({
                        oldpassword:'', newpassword:'', confirmpassword:''
                    })
                  })
                  .catch(function (error) {
                    props.onClick(error.response.data);
                    setDismiss(false)
                    setAlert('')
                    setLoading(false)
                    setGasama(false)
                    
                    setState({
                        oldpassword:'', newpassword:'', confirmpassword:''
                    })
                  });
                
                

            
          }
    }
    const [alert, setAlert] = useState('')  
  const handleClose = ()=>{
    if(confirmationDialog==true){

        setAlert('close')
        setDismiss(true)
      }else{
        setAlert('close')
        handleCloseDismiss('yes')
      }   
    }
    const handleCloseDismiss = (handle)=>{
        if(handle=="yes" && alert=="close"){
          
            props.onClick();
            setDismiss(false)
            setGasama(false)
            setAlert('')
            
        }else if(handle=="no" && alert=="close"){
            setDismiss(false)
            setAlert('')
        }else if(handle=="no" && alert=="save"){
            setDismiss(false)
            setAlert('')
        }else if(handle=="yes" && alert=="save"){
            setLoading(true)
            setDismiss(false)
            var data = JSON.stringify({
                "oldPassword": "abcabc",
                "newPassword": "123123"
              });
            var config = {
                method: 'post',
                url: Api()+'/master/auth/changepassword',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios(config)
              .then(function (response) {
                props.onClick(response.data);
               
                setLoading(false)
                setAlert('')
                setGasama(false)
                
                setState({
                    oldpassword:'', newpassword:'', confirmpassword:''
                })
              })
              .catch(function (error) {
                props.onClick(error.response.data);
               
                setAlert('')
                setLoading(false)
                setGasama(false)
                
                setState({
                    oldpassword:'', newpassword:'', confirmpassword:''
                })
              });
            
            

        
      
        }
      }
      const handleSave = ()=>{
          setState({
              ...state,
              loadingValidate:true
          })
        if(state.oldpassword=="" || state.newpassword=="" || state.confirmpassword==""){
            setState({
                ...state,
                loadingValidate:false,
                valid:false
            })
        }else{
            setState({
                ...state,
                loadingValidate:false
            })
            if(confirmationDialog==true){
                setAlert('save')
                setDismiss(true)
              }else{
                setAlert('save')
                handleCloseDismiss('yes')
              }

        }

          
      }
    return (
        <Dialog PaperProps={{
            style: { borderRadius: 10 }
          }} style={{display:dismiss?'none':'block', borderRadius:'20px'}} aria-labelledby="customized-dialog-title" open={props.open}>
            {loading?<Loading color={props.themeColorBgHover}></Loading>:null} 
            <div style={{fontFamily:'Poppinsbold',paddingBottom:'20px' ,fontSize:'13px',color:'gray',position:'absolute',zIndex:100,bottom:'0px', left:'55px' }}>
                <span>A002M</span>
            </div>
            <AlertDismiss themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} alert={alert} open={dismiss} onClick={handleCloseDismiss}></AlertDismiss>
            {/* <AlertSave themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover}  open={alertSave} onClick={handleSaveSetting}></AlertSave> */}
            <div style={{display:dismiss?'none':'block',width:'500px',padding:'20px',background:'#E5F4F8',borderRadius:'10px', position:'relative'}}>
            <div className="XClose" style={{'--colorBgHover':props.themeColorBgHover, position:'absolute', top:-5, right:5}} onClick={handleClose}><Icon icon="close"></Icon></div>
                <div style={{textAlign:'left', marginLeft:'30px',marginBottom:'10px' ,fontFamily:'Poppinsbold', fontWeight:'bold', fontSize:'25px'}}>
                    <span style={{textAlign:'left',color:'#575757'}}>{t("lblA002M")}</span>
                </div>
                <div style={{display:'flex',justifyContent:'center', position:'relative'}}> 
                   
                </div>
               <div style={{marginLeft:'30px' ,fontFamily:'Poppinsbold', fontSize:'15px'}}>
                    <label htmlFor="oldpassword">{t("lblOldPassword")}</label>
               </div>
                <div style={{display:'flex', position:'relative', justifyContent:'center',width:'400px',margin:'auto', marginTop:'-10px',marginBottom:'5px' }}>
                    {/* <input style={{paddingLeft:"5px",borderRadius:'5px', border:'1px solid '+props.themeColor,width:'100%'}} type="password" name="oldpassword"></input> */}
                    <Input onChange={handleChange} value={state.oldpassword} style={{borderRadius:'5px', border:state.valid==false && state.oldpassword.length==0?"1px solid red":'1px solid '+props.themeColor,width:'100%'}} type="password" judul="password"  name="oldpassword"></Input>
                    <div></div>
                </div>
                {state.valid==false && state.oldpassword.length==0?<div style={{marginTop:'-10px'}}><span style={{fontSize:'10px',marginLeft:'30px', color:'red', fontFamily:"Poppinsbold"}}>{t("VALM01")}</span></div>:null}


                <div style={{marginLeft:'30px', fontFamily:'Poppinsbold', fontSize:'15px'}}>
                    <label htmlFor="oldpassword">{t("lblNewPassword")}</label>
               </div>
                <div style={{display:'flex', position:'relative',width:'400px',margin:'auto', marginTop:'-10px',marginBottom:'5px' }}>
                    {/* <input style={{paddingLeft:"5px",borderRadius:'5px', border:'1px solid '+props.themeColor,width:'100%'}} type="password" name="oldpassword"></input> */}
                    <Input onChange={handleChange} value={state.newpassword} style={{borderRadius:'5px', border:state.valid==false && state.newpassword.length==0?"1px solid red":'1px solid '+props.themeColor,width:'100%'}} type="password" judul="password" name="newpassword"></Input>
                    
                    <div></div>
                </div>
                {state.valid==false && state.newpassword.length==0?<div style={{marginTop:'-10px'}}><span style={{fontSize:'10px',marginLeft:'30px', color:'red', fontFamily:"Poppinsbold"}}>{t("VALM01")}</span></div>:null}

                <div style={{marginLeft:'30px', fontFamily:'Poppinsbold', fontSize:'15px'}}>
                    <label htmlFor="oldpassword">{t("lblConfirmNewPassword")}</label>
               </div>
                <div style={{display:'flex', position:'relative', justifyContent:'center', marginTop:'-10px',marginBottom:'5px',width:'400px',margin:'auto' }}>
                    {/* <input style={{paddingLeft:"5px",borderRadius:'5px', border:'1px solid '+props.themeColor,width:'100%'}} type="password" name="oldpassword"></input> */}
                    <Input onChange={handleChange} value={state.confirmpassword} style={{borderRadius:'5px',border:state.valid==false && state.confirmpassword.length==0?"1px solid red":'1px solid '+props.themeColor,width:'100%'}} type="password" judul="password" name="confirmpassword"></Input>
                    
                    <div></div>
                
                </div>
                {gasama==true?<div style={{marginTop:'-5px'}}><span style={{marginLeft:'30px',fontSize:'10px' ,color:'red', fontFamily:"Poppinsbold"}}>{t("VALM03")}</span><br></br></div>:null}
                {state.valid==false && state.confirmpassword.length==0?<div style={{marginTop:'-5px'}}><span style={{fontSize:'10px',marginLeft:'30px', color:'red', fontFamily:"Poppinsbold"}}>{t("VALM01")}</span></div>:null}
                
                <div style={{marginTop:'30px'}}>
 
                    <button onClick={gasama==true?null:handleSave} className="editButtonSave" style={{'--colorBgHover':props.themeColorBgHover, '--color':props.themeColor,fontFamily:'Poppinsbold',color:'white',marginLeft:'360px',borderRadius:'10px' ,border: `1px solid ${props.themeColor}`, padding:'5px',width: '70px'}}>{state.loadingValidate==true?<Icon icon="spinner" pulse /> :t("btnSave")}</button>
                    
                </div>
            </div>
        </Dialog>
    )
}