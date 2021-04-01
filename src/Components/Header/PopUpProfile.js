import Dialog from '@material-ui/core/Dialog'
import Avatar from '@material-ui/core/Avatar'
import {useState, useEffect} from 'react'

import UploadFotoCrop from './UploadFotoCrop'
import {Icon} from 'rsuite'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios'
import Api from './../../ApiSetting'
import Loading from './../Loading'
import AlertDismiss from './../Alert/AlertDismiss'
import AlertSave from './../Alert/AlertSave'

// const {t} = useTranslation();
export default function PopUpClearNotif(props){
    const {t} = useTranslation();
    const [alertSave, setAlertSave] = useState(false)
    const [state, setState] = useState({
        valid:true,
        loadingValidate:false,
        valiApi:true
    })
    const [OpenFotoCrop, setOpenFotoCrop] = useState(false);
    const [srcImg, setSrcImg] = useState('');
    const [loading, setLoading] = useState(false)
    const [nickname, setnickname] = useState('');
    const [dismiss, setDismiss] = useState(false)
    const [alert, setAlert] = useState('')
    const confirmationDialog = useSelector(state=>state?.Param[0]?.confirmationDialog)
    const UserData = useSelector(state=>state.UserData);
    const moduleId = useSelector(state=>state.ModuleSelected)
    const handleSaveSetting = (data)=>{
        if(data=="no"){
            setAlertSave(false)
          }else{
             

                  setAlertSave(false)
    setLoading(true)
axios.post(Api()+'/general/user/profile',{
    // key:localStorage.getItem('token'),
    // // moduleId:moduleId.moduleId,
    // // userData: {
    // //     img : "",
    // //     nickname: nickname
    // // }

    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTE2NTIyNjksImRhdGEiOnsiaWQiOnsiZGVwdElkIjoiREVQVDAxIiwiZ3JvdXBJZCI6IkZJTiIsInJvbGVJZCI6Ik1LUjAxIn0sInN0YXR1cyI6eyJzdGF0dXNJbmZvcm1hdGlvbiI6ImFjdGl2ZSIsInBlcmlvZFVzYWdlIjoxfSwidXNlcm5hbWUiOiIyMDIwIiwiZXhwaXJlZEluZm9ybWF0aW9uIjp7InVzZXIiOiIyMDIyLTEyLTMwVDAwOjAwOjAwLjAwMFoiLCJwYXNzd29yZCI6IjIwMjEtMDEtMjBUMjI6MzY6NDEuMDAwWiJ9LCJhY2Nlc3NJbmZvcm1hdGlvbiI6eyJ2aWV3IjoidHJ1ZSIsImNyZWF0ZSI6InRydWUiLCJ1cGRhdGUiOiJ0cnVlIiwiZGVsZXRlIjoidHJ1ZSJ9fSwiaWF0IjoxNjExNjQ4NjY5fQ.8TZ96Iy15T5fvvXmNr8NWcF_qJsoIHuSHld3oInRL-k",
moduleId: "ANT",
userData: {
img : "",
nickname: "Selena_2"
}
}, {headers:{
    'x-mock-match-request-body':true
}}).then(res=>{
    setLoading(false)
    props.onClick(res.data);
    setOpenFotoCrop(false)
    setSrcImg("")
}).catch(err=>{
    setLoading(false)
    // props.onClick(err.response.data);
    props.onClick({
        "responseCode": 200,
        "data": "User data updated successfully."
    })
    setOpenFotoCrop(false)
    setSrcImg("")
})
              
              
          }
    }
    const handleClose = ()=>{
        if(OpenFotoCrop==true){
            setSrcImg("")
            setOpenFotoCrop(false)
        }else{
            if(confirmationDialog==true){
                setAlert('close')
                setDismiss(true)
            }else{
                setAlert('close')
                handleCloseDismiss('yes')
            }
            

        }
    }
    useEffect(()=>{
        if(UserData!=""){

            setnickname(UserData.nickname)
        }
    },[UserData])
    const handleClick =()=>{
        setState({
            ...state,
            loadingValidate:true
        })
        if(nickname==""){
            setState({
                ...state,
                valid:false,
                loadingValidate:false
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
    const handleUpload=(data)=>{
        props.onClick(data);
        setOpenFotoCrop(false)
        setSrcImg("")
    }
    const handleChange = (e)=>{
        if(e.target.value.length>50){

        }else{

            setnickname(e.target.value)
        }
    }
    const handleFoto = (e)=>{
        // setOpenFotoCrop(true)
        if(e.target.id=="uploadFoto"){
            e.target.nextSibling.children[0].click()

        }else{
           e.target.closest('#uploadFoto').nextSibling.children[0].click()
        }
    }
    function Sub(e) {
        // var file = obj.value;
        // var fileName = file.split("\\");
       
        // document.getElementById("yourBtn").innerHTML = fileName[fileName.length - 1];
        // document.myForm.submit();
        // event.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setSrcImg(reader.result)
            setOpenFotoCrop(true)
          }
        };
        reader.readAsDataURL(e.target.files[0]);


        // var reader = new FileReader();
        // reader.onload = function() {
        //     if(reader.readyState === 2){
        //         setSrcImg(reader.result)
        //         setOpenFotoCrop(true)
        //     }
        //     // var arrayBuffer = new Uint8Array(reader.result);
        //     // console.log(arrayBuffer);
        //   };
        //  reader.readAsArrayBuffer(e.target.files[0]);  
      }
      const handleCloseDismiss = (handle)=>{
        if(handle=="yes" && alert=="close"){
            props.onClick();
            setOpenFotoCrop(false)
            setDismiss(false)
            setAlert('')
            setSrcImg("")
        }else if(handle=="no" && alert=="close"){
            setDismiss(false)
            setAlert('')
        }else if(handle=="no" && alert=="save"){
            setDismiss(false)
            setAlert('')
          }else if(handle=="yes" && alert=="save"){
             

            setDismiss(false)
            setAlert('')
    setLoading(true)
axios.post(Api()+'/general/user/profile',{
    // key:localStorage.getItem('token'),
    // // moduleId:moduleId.moduleId,
    // // userData: {
    // //     img : "",
    // //     nickname: nickname
    // // }

    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTE2NTIyNjksImRhdGEiOnsiaWQiOnsiZGVwdElkIjoiREVQVDAxIiwiZ3JvdXBJZCI6IkZJTiIsInJvbGVJZCI6Ik1LUjAxIn0sInN0YXR1cyI6eyJzdGF0dXNJbmZvcm1hdGlvbiI6ImFjdGl2ZSIsInBlcmlvZFVzYWdlIjoxfSwidXNlcm5hbWUiOiIyMDIwIiwiZXhwaXJlZEluZm9ybWF0aW9uIjp7InVzZXIiOiIyMDIyLTEyLTMwVDAwOjAwOjAwLjAwMFoiLCJwYXNzd29yZCI6IjIwMjEtMDEtMjBUMjI6MzY6NDEuMDAwWiJ9LCJhY2Nlc3NJbmZvcm1hdGlvbiI6eyJ2aWV3IjoidHJ1ZSIsImNyZWF0ZSI6InRydWUiLCJ1cGRhdGUiOiJ0cnVlIiwiZGVsZXRlIjoidHJ1ZSJ9fSwiaWF0IjoxNjExNjQ4NjY5fQ.8TZ96Iy15T5fvvXmNr8NWcF_qJsoIHuSHld3oInRL-k",
moduleId: "ANT",
userData: {
img : "",
nickname: "Selena_2"
}
}, {headers:{
    'x-mock-match-request-body':true
}}).then(res=>{
    setLoading(false)
    props.onClick(res.data);
    setOpenFotoCrop(false)
    setSrcImg("")
}).catch(err=>{
    setLoading(false)
    // props.onClick(err.response.data);
    props.onClick({
        "responseCode": 200,
        "data": "User data updated successfully."
    })
    setOpenFotoCrop(false)
    setSrcImg("")
})
              
              
          }
      }
    return (
        <Dialog PaperProps={{
            style: { borderRadius: 10 }
          }} style={{display:dismiss?'none':'block'}} aria-labelledby="customized-dialog-title" open={props.open}>
             <div style={{fontFamily:'Poppinsbold', fontSize:'13px',color:'gray',position:'absolute',zIndex:100,bottom:'10px', left:'10px' }}>
                <span>A001M</span>
            </div>
          {/* <AlertSave themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover}  open={alertSave} onClick={handleSaveSetting}></AlertSave> */}

            <AlertDismiss themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} alert={alert} open={dismiss} onClick={handleCloseDismiss}></AlertDismiss>
            {loading?<Loading color={props.themeColorBgHover}></Loading>:null}
            <div style={{width:'600px',height:'430px' ,padding:'20px',background:'#E5F4F8', position:'relative'}}>
                {OpenFotoCrop && srcImg!=""?<UploadFotoCrop Api={Api()} nickname={nickname} moduleId={moduleId?moduleId.moduleId:''} onClick={handleUpload} value={srcImg}></UploadFotoCrop>:''}
                <div style={{'--colorBgHover':props.themeColorBgHover}} className="XClose" onClick={handleClose}>X</div>
                {!OpenFotoCrop && srcImg==""?
                <div>
               <div style={{textAlign:'left', marginLeft:'80px', fontFamily:'Poppinsbold', fontWeight:'bold', fontSize:'25px'}}>
                    <span style={{textAlign:'left',color:'gray'}}>{t("lblA001M")}</span>
                </div>
                <div style={{display:'flex',justifyContent:'center', position:'relative'}}> 
                    <Avatar style={{width: '150px',height: '150px', marginTop:'15px'}} src="/fileName.png" className="h-full"></Avatar>
                  
                        <div id="uploadFoto" style={{'--colorBgHover':props.themeColorBgHover, '--color':props.themeColor}} onClick={handleFoto} className="editFoto">
                            <img width='30' height="30px" src="/draw1.png"></img>
                        </div>
                        <div style={{height: '0px',width: '0px',overflow:'hidden'}}><input id="upfile" type="file"  onChange={Sub} /></div> 
                  
                </div>
                <div style={{marginTop:'40px'}}>
                    <span style={{fontFamily: 'Poppinsbold',fontStyle: 'normal',
fontWeight: 600,
fontSize: '20px',marginLeft:'80px',color: 'gray'}}>{t("lblName")}</span>
                    <span style={{fontFamily: 'Poppinsbold',fontStyle: 'normal',
fontWeight: 600,
fontSize: '20px',color: 'gray',marginLeft:'40px'}}>:</span>
                    <span style={{fontFamily: 'Poppinsbold',fontStyle: 'normal',
fontWeight: 600,
fontSize: '20px',color: props.themeColor, marginLeft:'4px'}}>{UserData.name}</span>
                </div>
                <div>
                    <span style={{fontFamily: 'Poppinsbold',fontStyle: 'normal',
fontWeight: 600,
fontSize: '20px',color: 'gray',marginLeft:'80px'}}>{t("lblNickname")}</span>
                     <span style={{fontFamily: 'Poppins',fontStyle: 'normal',
fontWeight: 600,
fontSize: '20px',color: 'gray',marginLeft:'5px'}}>:</span>
                    <input value={nickname} onChange={handleChange} style={{fontFamily: 'Poppinsbold',fontStyle: 'normal',
fontWeight: 600,
fontSize: '15px', marginLeft:'5px', paddingLeft:'5px', borderRadius:'5px',border:'2px solid '+props.themeColor}}></input>
                
                </div>
                <div style={{marginLeft:'101px'}}>
                    {state.valid==false && nickname.length==0?<span style={{fontSize:'12px',marginLeft:'80px', color:'red', fontFamily:"Poppinsbold"}}>{t("VALM01")}</span>:null}
                </div>
                <div style={{marginTop:'20px'}}>
 
                    <button onClick={handleClick} className="editButtonSave" style={{'--colorBgHover':props.themeColorBgHover, '--color':props.themeColor,fontFamily:'Poppins',color:'white',marginLeft:'410px',borderRadius:'10px' ,border: '1px solid '+props.themeColor, padding:'5px',width: '70px'}}>{state.loadingValidate==true?<Icon icon="spinner" pulse /> :t("btnSave")}</button>
                    
                </div></div>:""}
            </div>
        </Dialog>
    )
}