import { useEffect, useState } from 'react'
import {Icon} from 'rsuite'
import AlertSave  from './../Alert/AlertSave';
import Api from './../../ApiSetting';
import axios from 'axios';
import Loading from './../Loading';

export default function Edit(props){
    
    const [state, setState] = useState({
        roleid:'', rolename:''
    })
    const [stateaWal, setStateaWal] = useState({
        roleid:'', rolename:''
    })
    const [loading, setLoading] = useState(false);
    const [stateError, setStateError] = useState({
        roleid:'', rolename:''
    })
    useEffect(()=>{
        if(props.name=="EDIT BRANCH"){
            setLoading(true)
            var config = {
                method: 'get',
                url: Api()+'/credential/branch/detail?rowId=1',
                headers: { }
            };

            axios(config).then(function (response) {
                setLoading(false)
                setState({
                    roleid:response.data.data.branchId,
                    rolename:response.data.data.branchName
                })
                setStateaWal({
                    roleid:response.data.data.branchId,
                    rolename:response.data.data.branchName
                })
            })
            .catch(function (error) {
                setLoading(false)
                console.log(error);
            });
            }
    },[props.name])
    const [save, setSave] = useState(false);
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleClose = (data)=>{
        props.onClick(data)
    }
    const handleReset = ()=>{
        setState({
            roleid:stateaWal.roleid,
            rolename:stateaWal.rolename
        })
    }
    const handleCloseSave = (data)=>{
        if(data=="no"){
            setSave(false)
        }else if(data=="yes"){
            setSave(false)
            setLoading(true)
            if(props.name=="EDIT BRANCH"){
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
            }else if(props.name=="ADD BRANCH"){
            
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
        if(state.roleid==""){
            errorId = "Kosong"
        }
        if(state.rolename==""){
            errorName = "Kosong"
        }
        if(state.roleid=="" || state.rolename==""){
            setStateError({
                roleid:errorId,
                rolename:errorName
            })
        }else{

            setSave(true)
        }
    }
    return(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center',position:'fixed',zIndex:100, top:0, bottom:0, left:0, right:0, background:'rgba(0,0,0,0.3)'}}>
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
                    <span style={{marginLeft:'20px', fontFamily:'Poppinsbold',color:'#3bbad6', fontWeight:'bold', fontSize:"20px"}}>{props.name} REPORT</span>
                </div>
                <div style={{boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',padding:'20px',margin:'auto', width:'650px', height:'170px', background:'#e5f4f8', border:'1px solid gray', borderRadius:'5px'}}>
                    <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px'}}>
                        <label >Branch Id <span style={{color:'red'}}>*</span></label>
                       
                        <span style={{position:'absolute', right:"430px"}}>:</span>

                   
                        <input  value={state.roleid} name="roleid"  onChange={handleChange} style={{ width:'400px', height:'50px', borderRadius:'10px',border:"1px solid #3bbad6", paddingLeft:'5px', paddingRight:'5px'}}></input>
                    </div>
                    <br></br>
                    <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px'}}>
                        <label >Branch Name <span style={{color:'red'}}>*</span></label>
                       
                        <span style={{position:'absolute', right:"430px"}}>:</span>

                   
                        <input value={state.rolename} name="rolename" onChange={handleChange} style={{width:'400px', height:'50px', borderRadius:'10px',border:"1px solid #3bbad6",paddingLeft:'5px', paddingRight:'5px'}}></input>
                    </div>
                </div>

                <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                    <div onClick={handleReset} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', marginTop:'10px', marginRight:'20px'}}>
                        <span>Reset</span>
                    </div>
                    <div onClick={handleSave} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer',fontWeight:'bold', fontFamily:'Poppinsbold', background:'#3bbad6', color:'white', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', marginTop:'10px', marginRight:'20px'}}>
                        <span>Save</span>
                    </div>
                   
                </div>
            </div>
        </div>  
    )
}