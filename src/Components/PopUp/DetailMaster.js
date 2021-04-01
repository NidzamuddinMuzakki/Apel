import { useEffect, useState } from 'react'
import {Icon} from 'rsuite'
import {useSelector, useDispatch} from 'react-redux'
import AlertSave  from '../Alert/AlertSave';
import AlertDismiss  from '../Alert/AlertDismiss';
import Api from '../../ApiSetting';
import axios from 'axios';
import Loading from '../Loading';
import {useTranslation} from 'react-i18next'
import {ChangeSelectedRow} from './../../Redux/Table/Action'
export default function Edit(props){
    const [stateName, setStateName] = useState(props.name)
    const [alert, setAlert] = useState();
    const dispatch = useDispatch();
    const [dismiss, setDismiss] = useState(false)
    const confirmationDialog = useSelector(state=>state?.Param[0]?.confirmationDialog)
    const {t} = useTranslation();
    useEffect(()=>{
        
        let cuy = stateName;
       
        let haha = cuy.split(" ")
      
        let lulu = haha[1].split(/(?=[A-Z])/)
      
       let hmm = haha[0]+" "+lulu[0]+" "+lulu[1]
     
        setStateName(hmm.toLocaleUpperCase())
    },[])
    const [state, setState] = useState({
        id:'', name:'', createdTime:'', createdUser:''
    })
    const [stateaWal, setStateaWal] = useState({
        id:'', name:'',createdTime:'', createdUser:''
    })
  
    const [loading, setLoading] = useState(false);
    const [stateError, setStateError] = useState({
        id:'', name:''
    })
    useEffect(()=>{
        
        if(stateName=="EDIT MASTER BRANCH" ){
            setLoading(true)
            var config = {
                method: 'get',
                url: Api()+'/credential/branch/detail?rowId=1',
                headers: { }
            };

            axios(config).then(function (response) {
              dispatch(ChangeSelectedRow([]))
                setLoading(false)
                setState({
                    id:response.data.data.branchId,
                    name:response.data.data.branchName,
                    createdUser:response.data.data.createdUser,
                    createdTime:response.data.data.createdTime
                })
                setStateaWal({
                    id:response.data.data.branchId,
                    name:response.data.data.branchName,
                    createdUser:response.data.data.createdUser,
                    createdTime:response.data.data.createdTime
                })
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error);
                dispatch(ChangeSelectedRow([]))
            });
            }else if(stateName=="EDIT MASTER ROLE" || props.name=="DETAIL BRANCH"){
                setLoading(true)
                var config = {
                    method: 'get',
                    url: Api()+'/credential/role/detail?rowId=1&moduleId=ANT',
                    headers: { 
                      'Content-Type': 'application/json', 
                      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
                    }
                  };
                  
    
                axios(config).then(function (response) {
                    setLoading(false)
                    setState({
                        id:response.data.data.role.roleId,
                        name:response.data.data.role.roleName,
                        createdUser:response.data.data.createdUser,
                        createdTime:response.data.data.createdTime
                    })
                    setStateaWal({
                        id:response.data.data.role.roleId,
                        name:response.data.data.role.roleName,
                        createdUser:response.data.data.createdUser,
                        createdTime:response.data.data.createdTime
                    })
                    dispatch(ChangeSelectedRow([]))
                })
                .catch(function (error) {
                    setLoading(false)
                    console.log(error);
                    dispatch(ChangeSelectedRow([]))
                });
                }
    },[stateName])
    const [save, setSave] = useState(false);
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleClose = (data)=>{
        if(confirmationDialog==true){
          setAlert('close')
          setDismiss(true)
        }else{
          setAlert('close')
          handleCloseDismiss('yes')
        }

        
    }
    const handleCloseDismiss = (handle)=>{
      if(handle=="no" && alert=="close"){
        setAlert('')
        setDismiss(false)
      }else if(handle=="yes" && alert=="close"){
        setAlert('')
        setDismiss(false)
        props.onClick('close')
      }else if(handle=="no" && alert=="reset"){
        setAlert('')
        setDismiss(false)
      }else if(handle=="yes" && alert=="reset"){
        setAlert('')
        setDismiss(false)
        setState({
          id:stateaWal.id,
          name:stateaWal.name
      })
      }
    }
    const handleReset = ()=>{
      setAlert('reset')
      setDismiss(true)
        
    }
    const handleCloseSave = (data)=>{
        if(data=="no"){
            setSave(false)
        }else if(data=="yes"){
            setSave(false)
            setLoading(true)
            if(stateName=="EDIT MASTER ROLE"){
                var data = JSON.stringify({
                    "id": 1,
                    "roleId": "MKR01",
                    "roleName": "Maker"
                  });
                  
                  var config = {
                    method: 'post',
                    url: Api()+'/credential/role/detail',
                    headers: { 
                      'Content-Type': 'application/json', 
                      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
                    },
                    data : data
                  };
                  
                  axios(config)
                  .then(function (response) {
                    setLoading(false)
                    props.onClick(response.data)
                    console.log(JSON.stringify(response.data));
                  })
                  .catch(function (error) {
                    setLoading(false)
                    props.onClick(error.response.data)
                    console.log(error);
                  });
            }
            else if(stateName=="ADD MASTER ROLE"){
                var data = JSON.stringify({
                    "id": 1,
                    "roleId": "MKR02",
                    "roleName": "Maker 2",
                    "selected": [
                      {
                        "menuId": "001",
                        "accessView": null,
                        "accessCreate": null,
                        "accessUpdate": null,
                        "accessDelete": null,
                        "createdUser": "maker01",
                        "createdTime": "2021-02-26 05:36:45.480",
                        "updatedUser": "",
                        "updatedTime": null,
                        "selected": "inc"
                      },
                      {
                        "menuId": "002",
                        "accessView": null,
                        "accessCreate": null,
                        "accessUpdate": null,
                        "accessDelete": null,
                        "createdUser": "maker01",
                        "createdTime": "2021-02-26 05:36:45.480",
                        "updatedUser": "",
                        "updatedTime": null,
                        "selected": "inc"
                      },
                      {
                        "menuId": "003",
                        "accessView": 1,
                        "accessCreate": 1,
                        "accessUpdate": 1,
                        "accessDelete": 1,
                        "createdUser": "maker01",
                        "createdTime": "2021-02-26 05:36:45.480",
                        "updatedUser": "",
                        "updatedTime": null,
                        "selected": "yes"
                      }
                    ]
                  });
                  
                  var config = {
                    method: 'put',
                    url: Api()+'/credential/role/detail',
                    headers: { 
                      'Content-Type': 'application/json', 
                      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
                    },
                    data : data
                  };
                  axios(config)
                  .then(function (response) {
                    setLoading(false)
                    props.onClick(response.data)
                    console.log(JSON.stringify(response.data));
                  })
                  .catch(function (error) {
                    setLoading(false)
                    props.onClick(error.response.data)
                    console.log(error);
                  });
            }
            
            else if(stateName=="ADD MASTER BRANCH"){
            
                  var data = JSON.stringify({
                    "moduleId": "ANT",
                    "branchId": "001-2",
                    "branchName": "Jakarta aja"
                  });
                  
                  var config = {
                    method: 'put',
                    url: Api()+'/credential/branch/detail',
                    headers: { 
                      'Content-Type': 'application/json', 
                      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
                    },
                    data : data
                  };
                  
                  axios(config)
                  .then(function (response) {
                    setLoading(false)
                    props.onClick(response.data)
                    console.log(JSON.stringify(response.data));
                  })
                  .catch(function (error) {
                    setLoading(false)
                    props.onClick(error.response.data)
                    console.log(error);
                  });
            }
            else if(stateName=="EDIT MASTER BRANCH"){
            
                var data = JSON.stringify({
                    "moduleId": "ANT",
                    "id": 1,
                    "branchId": "001-2",
                    "branchName": "Jakarta aja"
                  });
                  
                  var config = {
                    method: 'post',
                    url: Api()+'/credential/branch/detail',
                    headers: { 
                      'Content-Type': 'application/json'
                    },
                    data : data
                  };
                
                axios(config)
                .then(function (response) {
                  setLoading(false)
                  props.onClick(response.data)
                  console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                  setLoading(false)
                  props.onClick(error.response.data)
                  console.log(error);
                });
          }
            // axios.put(Api()+'/credential/role/detail',{
            //     moduleId:"ANT",
            //     roleId:state.roleid,
            //     roleName:state.rolename,
            // },{
            //     headers:{
            //         'Content-Type':'application/json'
            //     }
            // }).then(res=>{
            //     setLoading(false)
               
            //     console.log(res.data)
            // }).catch(err=>{
            //     setLoading(false)
            //     console.log(err)
            // })
            
        }
    }
    const handleSave = ()=>{
        let errorId = ''
        let errorName = ''
        if(state.id==""){
            errorId = "Kosong"
        }
        if(state.name==""){
            errorName = "Kosong"
        }
        if(state.id=="" || state.name==""){
            setStateError({
                id:errorId,
                name:errorName
            })
        }else{
          if(confirmationDialog==true){
            setSave(true)
            
          }else{
            handleCloseSave("yes")
           
          }
            
        }
    }
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',position:'fixed',zIndex:100, top:0, bottom:0, left:0, right:0, background:'rgba(0,0,0,0.3)'}}>
            <AlertDismiss themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} alert={alert} open={dismiss} onClick={handleCloseDismiss}></AlertDismiss>
            {loading?<Loading color={props.themeColorBgHover}></Loading>:null}
            <AlertSave themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} open={save} onClick={handleCloseSave}></AlertSave>
            <div style={{position:'relative',background:'white',textAlign:'center', width:"700px", height:"315px", borderRadius:'10px'}}>
                <div onClick={e=>handleClose('close')} style={{fontFamily:'Poppinsbold',cursor:'pointer',position:'absolute', top:'5px', right:'30px', fontSize:"30px"}}>
                    <Icon icon="close"></Icon>
                </div>
                <div style={{padding:'10px', marginLeft:"20px", marginTop:"10px", display:'flex', alignItems:'center'}}>
                    <div style={{boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',border:"1px solid #3bbad6",background:'#e5f4f8', width:'50px', display:'flex', justifyContent:'center', alignItems:'center', padding:'10px', borderRadius:"50%"}}>
                  
                        <img src="/network.png" width='25'></img>
                        
                    </div>
                    <span style={{marginLeft:'20px', fontFamily:'Poppinsbold',color:'#3bbad6', fontWeight:'bold', fontSize:"20px"}}>{props.judulSekarang=="005" && stateName.split(" ")[0]=="ADD"?t("lblA006P"):props.judulSekarang=="005" && stateName.split(" ")[0]=="EDIT"?t("lblA007P"):props.judulSekarang=="006"?t("lblA011P"):''} </span>
                    {/* {props.name=="DETAIL BRANCH"?<div style={{marginLeft:'-231px', marginTop:'20px'}}><br></br><span style={{ fontFamily:'Poppinsbold',color:'#3bbad6', fontWeight:'bold', fontSize:"12px"}}>Edit by {state.createdUser+" "+state.createdTime}</span></div>:null} */}
                </div>
                <div style={{boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',padding:'20px',margin:'auto', width:'650px', height:'170px', background:'#e5f4f8', border:'1px solid gray', borderRadius:'5px'}}>
                    <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px'}}>
                        <label >{props.judulSekarang=="005"?t("lblRoleID"):props.judulSekarang=="006"?t("lblBranchID"):''}<span style={{color:'red'}}>*</span></label>
                       
                        <span style={{position:'absolute', right:"430px"}}>:</span>

                   
                        <input readOnly={stateName=="ADD MASTER BRANCH" || stateName=="ADD MASTER ROLE"?false:true} value={state.id} name="id"  onChange={handleChange} style={{background:stateName=="ADD MASTER BRANCH" || stateName=="ADD MASTER ROLE"?"white":"#c4c4c4" ,width:'400px', height:'50px', borderRadius:'10px',border:"1px solid #3bbad6", paddingLeft:'5px', paddingRight:'5px'}}></input>
                    </div>
                    <br></br>
                    <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px'}}>
                        <label >{props.judulSekarang=="005"?t("lblRoleName"):props.judulSekarang=="006"?t("lblBranchName"):''}<span style={{color:'red'}}>*</span></label>
                       
                        <span style={{position:'absolute', right:"430px"}}>:</span>

                   
                        <input readOnly={props.name=="DETAIL BRANCH"?true:false} value={state.name} name="name" onChange={handleChange} style={{background:props.name=="DETAIL BRANCH"?"#c4c4c4":"white",width:'400px', height:'50px', borderRadius:'10px',border:"1px solid #3bbad6",paddingLeft:'5px', paddingRight:'5px'}}></input>
                    </div>
                </div>

                {props.name=="DETAIL BRANCH"?null:<div style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                    <div onClick={handleReset} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', marginTop:'10px', marginRight:'20px'}}>
                        <span>{t("btnReset")}</span>
                    </div>
                    <div onClick={handleSave} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer',fontWeight:'bold', fontFamily:'Poppinsbold', background:'#3bbad6', color:'white', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', marginTop:'10px', marginRight:'20px'}}>
                        <span>{t("btnSave")}</span>
                    </div>
                   
                </div>}
            </div>
        </div>  
    )
}