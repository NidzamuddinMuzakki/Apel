import axios from 'axios'
import Api from './../../ApiSetting'
import {Icon} from 'rsuite'
import { useEffect, useState } from 'react'
import Loading from './../Loading/LoadingAbsolute'
import {useTranslation} from 'react-i18next'
import Checkbox from '@material-ui/core/Checkbox'
import Table from './../PopUp/Table'
import Menu from './../PopUpDetail/Menu'
import List from './../PopUp/List'
import Step from './Step'
import {useSelector, useDispatch} from 'react-redux'
import SelectCustom from './../PopUp/SelectCustom'
import { Avatar } from '@material-ui/core'
import AlertDismiss from './../Alert/AlertDismiss'
export default function DetailWorkFlow(props){
    const [data, setData] = useState();
    const [schema, setSchema] = useState();
    const [DataUser, setDataUser] = useState()
    const [dataAwal, setDataAwal] = useState();
    const [selectedList, setSelectedList]= useState([])
    const [dataAfter, setDataAfter] = useState();
    const [dataId, setDataId] = useState()
    const [workflowNotes, setWorkflowNotes] = useState();
    const [workflowStep, setWorkflowStep] = useState();
    const [list, setList] = useState();
    const [listSchema, setListSchema] = useState();
    const {t}  = useTranslation()
    const [workflowAction, setWorkflowAction] = useState();
    const [judul, setJudul] = useState()
    const [menu, setMenu] = useState();
    const [dataMaster, setDataMaster] = useState()
    const [dataMasterNew, setDataMasterNew] = useState()
    const [dataMasterSchema, setDataMasterSchema] = useState()
    const [dataMasterNewSchema, setDataMasterNewSchema] = useState()
    const [selectedNew, setSelectedNew] = useState()
    const [selected, setSelected] = useState()
    const confirmationDialog = useSelector(state=>state?.Param[0]?.confirmationDialog)
    const [selectedSchema, setSelectedSchema] = useState()
    const [selectedNewSchema, setSelectedNewSchema] = useState()
    const [selectedTable, setSelectedTable] = useState([])
    const [stateComment, setStateComment] = useState('');
    const [actionComment, setActionComment] = useState();
    const [alert, setAlert] = useState()
    const [loading, setLoading] = useState(false)
    const [dismiss, setDismiss] = useState(false)
    const [stateCheck, setStateCheck] = useState({
        view:false, update:false, delete:false, create:false
    })
    const [stateCheckSelected, setStateCheckSelected] = useState({
        view:false, update:false, delete:false, create:false
    })
    const handleChangeCheck = (e)=>{
       
    }
    const handleChangeAction=(id)=>{
        setActionComment(id)
    }
    const handleChangeComment = (e)=>{
        
        setStateComment(e.target.value)
    }
    const handleReset=()=>{
        if(confirmationDialog==true){
            setDismiss(true)
            setAlert('reset')
        }else{
            setAlert('reset')
            handleCloseDismiss("yes")
        }
       
    }
    const handleSave=()=>{
        if(confirmationDialog==true){
            setDismiss(true)
            setAlert('save')
        }else{
            setAlert('save')
            handleCloseDismiss("yes")
        }
        
    }
    useEffect(()=>{
        if(props?.id){
            let config = {
                method: 'get',
                url: Api()+"/workflow/detail?id=1",
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
            setLoading(true)
            if(props.judulSekarang=="003"){
                setJudul(t("lblA001P")+"")
                
            }else if(props.judulSekarang=="004"){
                setJudul(t("lblDetail")+" "+t("lblRole")+"")
                config.url = Api()+'/workflow/detail?id=2';
            }else if(props.judulSekarang=="006"){
                setJudul(t("lblDetail")+" "+t("lblReportingBranch")+"")
                config.url = Api()+'/workflow/detail?id=5';
            }else if(props.judulSekarang=="005"){
                setJudul(t("lblDetail")+" "+t("lblRole")+"")
                config.url = Api()+'/workflow/detail?id=3';
            }
            else if(props.judulSekarang=="003" && props.tab=="todolist"){
                config.url = Api()+"/workflow/detail?id=1"
            }


              axios(config)
              .then(function (response) {
                  setLoading(false)
                  setWorkflowStep(response.data.data.workflowStep)
                  setWorkflowNotes(response.data.data.workflowNotes)
                  setWorkflowAction(response.data.data.workflowAction)
                  setActionComment(response.data.data.workflowAction[0].actionId)
                  if(props.judulSekarang=="003"){
                      setSchema(Object.keys(response.data.data.menuData.user))
                      setData(response.data.data)
                      setSelectedSchema(Object.keys(response.data.data.menuData.roles.selected[0]))
                     
                      console.log(response.data.data.menuDataNew)
                   
                      setSelectedNewSchema(Object.keys(response.data.data.menuDataNew.roles.selected[0]))
                      setDataUser(response.data.data.menuData.user)
                    
                      setDataAwal(response.data.data.menuData)
                      setSelected(response.data.data.menuData.roles.selected)
                      setSelectedNew(response.data.data.menuDataNew.roles.selected)
                      setDataAfter(response.data.data.menuDataNew)
                   

                      setList(response.data.data.menuData.roles.selection)
                  setListSchema(Object.keys(response.data.data.menuData.roles.selection[0]))
                  setStateCheck({
                      view:response.data.data.menuData.access.view,
                      update:response.data.data.menuData.access.update,
                      create:response.data.data.menuData.access.create,
                      delete:response.data.data.menuData.access.delete,
                  })
                  setStateCheckSelected({
                    view:response.data.data.menuDataNew.access.view,
                    update:response.data.data.menuDataNew.access.update,
                    create:response.data.data.menuDataNew.access.create,
                    delete:response.data.data.menuDataNew.access.delete,
                  })

                  }else if(props.judulSekarang=="004"){
                    setSchema(Object.keys(response.data.data.menuData.user))
                    setData(response.data.data)
                    setSelectedSchema(Object.keys(response.data.data.menuData.branches.selected[0]))
                   
                    console.log(response.data.data.menuDataNew)
                    
                    setSelectedNewSchema(Object.keys(response.data.data.menuDataNew.branches.selected[0]))
                    setDataUser(response.data.data.menuData.user)
                    setList(response.data.data.menuData.branches.selection)
                    setListSchema(Object.keys(response.data.data.menuData.branches.selection[0]))
                    setDataAwal(response.data.data.menuData)
                    setSelected(response.data.data.menuData.branches.selected)
                    setSelectedNew(response.data.data.menuDataNew.branches.selected)
                    setDataAfter(response.data.data.menuDataNew)
                    
                  }else if(props.judulSekarang=="006"){
                    setData(response.data.data)
                    setSchema(Object.keys(response.data.data))


                    setDataMaster(response.data.data.menuData)
                    setDataMasterNew(response.data.data.menuDataNew)
                    setDataMasterSchema(Object.keys(response.data.data.menuData))
                    setDataMasterNewSchema(Object.keys(response.data.data.menuDataNew))
                    
                  
                  }else if(props.judulSekarang=="005"){
                    setData(response.data.data)
                    setSchema(Object.keys(response.data.data))

                    if(response.data.data.menuData?.role){
                        setJudul(t("lblA001P"))
                        setDataMaster(response.data.data.menuData.role)
                        setDataMasterNew(response.data.data.menuDataNew.role)
                        setDataMasterSchema(Object.keys(response.data.data.menuData.role))
                        setDataMasterNewSchema(Object.keys(response.data.data.menuDataNew.role))
                       
                        setMenu(response.data.data.menuData.menu.option)
                        setList(response.data.data.menuData.menu.option)
                       
                        setSelected(response.data.data.menuData.menu.selected)
                        setSelectedNew(response.data.data.menuDataNew.menu.selected)
                        setSelectedSchema(Object.keys(response.data.data.menuData.menu.selected[0]))
                        setSelectedNewSchema(Object.keys(response.data.data.menuDataNew.menu.selected[0]))

                    }else{
                        setDataMaster(response.data.data.menuData)
                        setDataMasterNew(response.data.data.menuDataNew)
                        setDataMasterSchema(Object.keys(response.data.data.menuData))
                        setDataMasterNewSchema(Object.keys(response.data.data.menuDataNew))
                    }
                  
                  }
                    // setDataId(response.data.data.menuId)
              })
              .catch(function (error) {
                setLoading(false)
                console.log(error);
              });
        }
    },[props.open])
    const handleClick = (handle)=>{
        
        if(confirmationDialog==true){
            setDismiss(true)
            setAlert('close')
        }else{
            setAlert('close')
            handleCloseDismiss("yes")
        }
    }
   const handleCloseDismiss = (handle)=>{
        if(alert=="close" && handle=="yes"){
            setDismiss(false)
            setAlert('')
            props.onClick('close')
        }else if(alert=="close" && handle=="no"){
            setDismiss(false)
            setAlert('')
        }else if(alert=="reset" && handle=="no"){
            setDismiss(false)
            setAlert('')
        }else if(alert=="reset" && handle=="yes"){
            setDismiss(false)
            setAlert('')
            setStateComment('');
            setActionComment(workflowAction[0]?.actionId);
        }else if(alert=="save" && handle=="yes"){
            setLoading(true)
            setDismiss(false)
            setAlert('')
            var data = JSON.stringify({
                "id": 1,
                "actionId": "STP-APR",
                "userComment": "Great Job!!"
              });
              
              var config = {
                method: 'post',
                url: Api()+'/workflow/detail',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios(config)
              .then(function (response) {
                  setLoading(false)
                props.onClick(response.data)
              })
              .catch(function (error) {
                setLoading(false)
                console.log(error);
              });
            
        }else if(alert=="save" && handle=="no"){
            setDismiss(false)
            setAlert('')
        }



   }
   
    console.log(workflowStep)

    return(
        <div style={{position:'fixed',display:'flex', justifyContent:'center', alignItems:'center',background:'rgba(0,0,0, 0.4)',zIndex:100 ,top:0, left:0, bottom:0, right:0}}>
            <AlertDismiss themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} alert={alert} open={dismiss} onClick={handleCloseDismiss}></AlertDismiss>
            <div style={{top:100,paddingBottom:'20px',boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px' ,left:150,top:10 ,right:150,borderRadius:'10px',marginRight:'30px',background:"white" ,height:'600px', position:'absolute',overflowX:'hidden', overflowY:'auto'}}>
            {loading?<Loading color={props.themeColorBgHover}></Loading>:null}        
                    <div style={{position:'absolute',paddingLeft:'10px', top:0, borderTopRightRadius:'10px', borderTopLeftRadius:"10px",right:-2, left:-1, width:'100.2%', background:'#3bbad6'}}>
                        <span style={{color:'white', fontFamily:'Poppinsbold', fontSize:'12px' }}>{judul+" | "+t("lblNoRequest")+" : #"+data?.reqNo+" | "+t("lblRequestDate")+" : "+data?.reqDate +" | "+t("lblRequestBy")+" : "+data?.reqSender}</span>
                        <div onClick={e=>handleClick('close')} style={{cursor:'pointer',position:'absolute', right:10, top:0}}>
                            <Icon style={{color:'white'}} icon="close"></Icon>
                        </div>
                    </div>
                    <div style={{paddingBottom:"10px",background:"#e5f4f8",boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', height:'auto',marginTop:'30px' ,marginLeft:'20px', marginRight:'20px', overflowX:'auto',paddingBottom:'20px', overflowY:'hidden'}}>
                            <div style={{marginLeft:'0px', marginRight:'20px',marginTop:'10px', }}>
                                                               {props.judulSekarang=="003" || props.judulSekarang=="004"? schema?.map((row, index)=>{
                                    if(row!='id' && data?.menuData?.user!=null){
                                        return(
                                            <div key={index} style={{marginLeft:'20px',marginTop:'2px',fontFamily:'Poppinsbold', fontSize:'11px',display:'flex', alignItems:'center'}}>
                                                <span style={{width:'200px'}}>{t(row)}</span>
                                                <span>:</span>
                                                <span style={{marginLeft:'10px'}}>{data?.menuData?.user[row]}</span>
                                            </div>
                                        )
                                    }

                                }):
                                        <div style={{marginLeft:'20px',}}>

<div style={{position:'relative',display:'flex',alignItems:'center',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px'}}>
                    <label style={{width:'200px'}}>{props.judulSekarang=="005"?t("lblRoleID"):props.judulSekarang=="006"?t("lblBranchID"):''}<span style={{color:'red'}}>*</span></label>
                   
                    <span style={{marginRight:'10px'}}>:</span>

               
                    <input readOnly={true}  name="id" value={props.judulSekarang=="006"?dataMaster?.branchId:dataMaster?.roleId}   style={{marginRight:'10px',background:"#c4c4c4" ,width:'200px', height:'50px', borderRadius:'10px',border:"1px solid #3bbad6", paddingLeft:'5px', paddingRight:'5px'}}></input>
                
                </div>
                <br></br>
                <div style={{position:'relative',display:'flex',alignItems:'center',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px'}}>
                    <label style={{width:'200px'}}>{props.judulSekarang=="005"?t("lblRoleName"):props.judulSekarang=="006"?t("lblBranchName"):''}<span style={{color:'red'}}>*</span></label>
                   
                    <span style={{marginRight:'10px'}}>:</span>
               
                    <input readOnly={false}  name="name" value={props.judulSekarang=="006"?dataMaster?.branchName:dataMaster?.roleName} style={{marginRight:'10px',background:"#c4c4c4",width:'200px', height:'50px', borderRadius:'10px',border:"1px solid #3bbad6",paddingLeft:'5px', paddingRight:'5px'}}></input>
                    {props.judulSekarang=="006" && dataMasterNew?.branchName || props.judulSekarang=="005" && dataMasterNew?.roleName?<input readOnly={false}  name="name" value={props.judulSekarang=="006"?dataMasterNew?.branchName:dataMasterNew?.roleName} style={{background:"#c4c4c4",width:'200px', height:'50px', borderRadius:'10px',border:"1px solid #3bbad6",paddingLeft:'5px', paddingRight:'5px'}}></input>:null}
                                
                </div>
                                        </div>
                                    
                                }
                               
                    {props.judulSekarang=="003"?<div  style={{marginLeft:'20px',marginTop:'-5px',fontFamily:'Poppinsbold', fontSize:'11px',display:'flex', alignItems:'center'}}>
                                        <span style={{width:'200px'}}>Access Right </span>
                                        <span>:</span>
                                        <div>

                                        </div>
                                        <div style={{color:props.themeColor,marginLeft:'0px',display:'flex',alignItems:'center'}}>
                                            
                                            <div style={{textAlign:'center'}}>
                                                <Checkbox value={stateCheck.view} style={{color:props.themeColor}} name="view" onChange={handleChangeCheck} checked={stateCheck.view}></Checkbox>
                                                <div style={{marginTop:'-12px'}}>

                                                <span style={{color:props.themeColor,fontFamily:'Poppinsbold'}}>{t("lblView")}</span>
                                                </div>
                                            </div>
                                            <div style={{marginLeft:'20px',textAlign:'center'}}>
                                                <Checkbox value={stateCheck.create} style={{color:props.themeColor}} name="create" onChange={handleChangeCheck} checked={stateCheck.create}></Checkbox>
                                                <div style={{marginTop:'-12px'}}>
                                                <span style={{color:props.themeColor,fontFamily:'Poppinsbold'}}>{t("lblCreate")}</span>

                                                </div>
                                            </div>
                                            <div style={{marginLeft:'20px',textAlign:'center'}}> 
                                                <Checkbox value={stateCheck.update} style={{color:props.themeColor}} name="update" onChange={handleChangeCheck} checked={stateCheck.update}></Checkbox>
                                                <div style={{marginTop:'-12px'}}>

                                                <span style={{fontFamily:'Poppinsbold'}}>{t("lblUpdate")}</span>
                                                </div>
                                            </div>
                                            <div style={{marginLeft:'20px',textAlign:'center'}}>
                                                <Checkbox value={stateCheck.delete} style={{color:props.themeColor}} name="delete" onChange={handleChangeCheck} checked={stateCheck.delete}></Checkbox>
                                               <div style={{marginTop:'-12px'}}>
                                                <span style={{fontFamily:'Poppinsbold'}}>{t("lblDelete")}</span>

                                               </div>
                                            </div>




                                            <div style={{textAlign:'center', marginLeft:'80px'}}>
                                                <Checkbox value={stateCheck.view} style={{color:props.themeColor}} name="view" onChange={handleChangeCheck} checked={stateCheckSelected.view}></Checkbox>
                                                <div style={{marginTop:'-12px'}}>

                                                <span style={{color:props.themeColor,fontFamily:'Poppinsbold'}}>{t("lblView")}</span>
                                                </div>
                                            </div>
                                            <div style={{marginLeft:'20px',textAlign:'center'}}>
                                                <Checkbox value={stateCheck.create} style={{color:props.themeColor}} name="create" onChange={handleChangeCheck} checked={stateCheckSelected.create}></Checkbox>
                                                <div style={{marginTop:'-12px'}}>
                                                <span style={{color:props.themeColor,fontFamily:'Poppinsbold'}}>{t("lblCreate")}</span>

                                                </div>
                                            </div>
                                            <div style={{marginLeft:'20px',textAlign:'center'}}> 
                                                <Checkbox value={stateCheck.update} style={{color:props.themeColor}} name="update" onChange={handleChangeCheck} checked={stateCheckSelected.update}></Checkbox>
                                                <div style={{marginTop:'-12px'}}>

                                                <span style={{fontFamily:'Poppinsbold'}}>{t("lblUpdate")}</span>
                                                </div>
                                            </div>
                                            <div style={{marginLeft:'20px',textAlign:'center'}}>
                                                <Checkbox value={stateCheck.delete} style={{color:props.themeColor}} name="delete" onChange={handleChangeCheck} checked={stateCheckSelected.delete}></Checkbox>
                                               <div style={{marginTop:'-12px'}}>
                                                <span style={{fontFamily:'Poppinsbold'}}>{t("lblDelete")}</span>

                                               </div>
                                            </div>



                                            
                                        </div>
                        </div>:null} 
                        {props.judulSekarang=="003" || props.judulSekarang=="004"?<div  style={{marginLeft:'20px',marginTop:props.judulSekarang=="003"?'0px':'10px',fontFamily:'Poppinsbold', fontSize:'11px',display:'flex', alignItems:'center'}}>
                                        <span style={{width:'200px', fontSize:props.judulSekarang=="003"?'11px':null}}>{t("lblRole")} </span>
                                        <span>:</span>
                                        <span style={{marginLeft:'10px'}}>{selectedNew?.length + props.judulSekarang=="003"?t("lblSelected")+ " "+t("lblRole"):props.judulSekarang=="004"?t("lblSelected")+ " "+t("lblReportingBranch"):null}</span>
                        </div>:null}
                        {props.judulSekarang=="004" || props.judulSekarang=="003" || (props.judulSekarang=="005" && list)?<div style={{marginLeft:'20px', marginRight:'0px', width:'860px',background:'#c4c4c4', borderRadius:'10px',border:'1px solid #3bbad6', padding:'0px' ,display:'flex',marginTop:'10px', height:'338px'}}>
                        <div style={{padding:'10px', width:'300px', }} >
                            <span style={{marginLeft:'20px', fontFamily:'Poppinsbold',fontWeight:'bold', color:'black'}}> {props.judulSekarang=="004"?t("lblListofBranch"):props.judulSekarang=="003"?t("lblListofRole"):t("lblListofMenu")} :</span>
                            <div className={"dragboxList"} style={{background:'#e5f4f8', padding:'10px', borderRadius:'20px', overflow:'auto',width:"200px" ,height:'300px'}}>
                                {props.judulSekarang!="005" && list?.length>0 && listSchema?.length>0?<List    data={list} schema={listSchema} selected={selectedNew} themeColor={props.themeColor} ></List>:null}
                                {props.judulSekarang=="005" && list?.length>0?<Menu Data={list} selectedList={selectedList}  selected={selectedNew}></Menu>:null }
                            </div>
                            
                        </div>
                        
                            <div style={{width:'30px',marginLeft:'0px', marginRight:'10px', height:'330px',paddingTop:'70px' ,textAlign:'center'}}>
                                        
                                        <div  style={{cursor:'pointer',marginTop:"20px",background:'#3bbad6',display:'flex', alignItems:'center',justifyContent:"center", color:'white', border:'1px solid white', borderRadius:'10px',width:"30px", height:"30px" }}>
                                            <Icon style={{fontSize:'25px'}} icon="angle-double-left"></Icon>
                                        </div>
                                        <div  style={{cursor:'pointer',marginTop:"20px",background:'#3bbad6',display:'flex', alignItems:'center',justifyContent:"center", color:'white', border:'1px solid white', borderRadius:'10px',width:"30px", height:"30px" }}>
                                            <Icon style={{fontSize:'25px'}} icon="angle-left"></Icon>
                                        </div>
                                        <div    style={{cursor:'pointer',marginTop:"20px",background:'#3bbad6',display:'flex', alignItems:'center',justifyContent:"center", color:'white', border:'1px solid white', borderRadius:'10px',width:"30px", height:"30px" }}>
                                            <Icon style={{fontSize:'25px'}} icon="angle-right"></Icon>
                                        </div>
                                        <div  style={{cursor:'pointer',marginTop:"20px",background:'#3bbad6',display:'flex', alignItems:'center',justifyContent:"center", color:'white', border:'1px solid white', borderRadius:'10px',width:"30px", height:"30px" }}>
                                            <Icon style={{fontSize:'25px'}} icon="angle-double-right"></Icon>
                                        </div>
                                </div>
                            
                            <div style={{padding:'10px',marginLeft:'-15px', width:'600px', }}>
                               
                                <div className="dragboxTable" style={{background:'#e5f4f8', padding:'0px', borderRadius:'20px', height:'300px'}}>
                                    {selectedNew?.length>0 && selectedNewSchema?.length>0?<Table  data={selectedNew} schema={selectedNewSchema} selectedTable={selectedTable} ></Table>:
                                    
                                    <div style={{height:'100%', width:'100%', display:'flex', justifyContent:"center", alignItems:'center'}}><div style={{width:'200xp',height:"100px",border:'2px dashed black', fontSize:'30px', fontFamily:"Poppinsbold", fontWeight:'bold', display:'flex', justifyContent:'center', alignItems:'center', padding:'10px'}}><span>Drop List</span></div></div>}
                                </div>
                            
                        </div>
                                <div style={{marginLeft:'20px', marginTop:'10px'}}>
                                {selected?.length>0 && selectedSchema?.length>0?<Table  data={selected} schema={selectedSchema} selectedTable={selectedTable} ></Table>:null}

                                </div>

                        </div>
                            :null}
                            </div>
                    </div>
                    <div style={{fontSize:"15px", marginTop:'10px', marginBottom:"10px",marginLeft:'20px',color:'#3bbad6', fontFamily:'Poppinsbold'}}>
                        <span>Workflow Step Information</span>
                    </div>

                    <div style={{background:"#e5f4f8",display:'flex',boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',marginLeft:'20px', marginRight:'20px',height:"300px",  overflowY:'auto'}}>
                        <div style={{marginLeft:'10px', marginTop:'10px'}}>
                        <span style={{fontFamily:'Poppinsbold', color:'#575757'}}>Step Track</span>
                            <Step  data={workflowStep}></Step>
                        </div>
                        <div style={{marginTop:'10px'}}>
                            <span style={{fontFamily:'Poppinsbold', color:'#575757'}}>TimeLine</span>
                            <div style={{background:"rgb(235,235,235)", width:"650px",paddingTop:'2px', paddingRight:'20px', paddingLeft:'20px', paddingBottom:'20px'}}>
                                {workflowNotes?workflowNotes.map((row, index)=>(

                                <div key={index} style={{display:'flex',borderRadius:"10px",boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'  ,border:'1px solid #dfdfdf',marginTop:'10px', background:'white'}}>
                                    <div style={{marginLeft:'10px', marginTop:'10px'}}>
                                        <Avatar width="150"></Avatar>

                                    </div>
                                    <div style={{paddingLeft:'10px'}}>
                                        <div >
                                            <span style={{color:"black", fontSize:'15px', fontFamily:'Poppinsbold'}}>{row.userFullname}</span>
                                        </div>
                                        <div  style={{background:'#338302',width:'100px' ,display:'flex', justifyContent:'center', alignItems:'center', paddingLeft:'5px',paddingRight:'5px', paddingTop:'2px', paddingBottom:'2px'}}>
                                            <span style={{color:'white', fontFamily:'Poppinsbold', fontSize:'12px'}}>{row.userAction}</span>
                                        </div>
                                        <div style={{marginTop:'10px', width:'540px',marginBottom:'10px',borderRadius:'6px',background:"#c4c4c4", fontFamily:"Poppinsbold", fontSize:'12px', paddingLeft:'10px', paddingRight:'10px'}}>
                                            <span>Comment :</span>
                                            <div>
                                            <span style={{marginLeft:'20px'}}>{row.userComment}</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )):null}
                            </div>
                        </div>
                    </div>

                    {props.tab=="todolist"?<div style={{fontSize:"15px", marginTop:'10px', marginBottom:"10px",marginLeft:'20px',color:'#3bbad6', fontFamily:'Poppinsbold'}}>
                        <span>Action</span>
                    </div>:null}
                    {props.tab=="todolist"?<div style={{background:"#e5f4f8",boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',marginLeft:'20px', marginRight:'20px',height:"230px",  overflowY:'auto'}}>
                        <div style={{marginTop:'10px',}}></div>
                        <span style={{marginLeft:'20px', fontFamily:"Poppinsbold", color:'#575757'}}>Comment:</span>
                        <div style={{marginLeft:'20px'}}>
                            <textarea onChange={handleChangeComment}  value={stateComment} style={{paddingLeft:'10px',fontFamily:'Poppinsbold', color:'#575757',background:'white',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'   ,margin:'auto',width:'96%', borderRadius:"10px" ,height:'80px'}}></textarea>
                        </div>
                        <div style={{display:'flex', alignItems:'center', fontFamily:'Poppinsbold', fontSize:'15px', marginLeft:'20px', color:"#575757", marginTop:'20px'}}>
                            <div>
                            <span>Move To: </span>

                            </div>
                                
                           
                            <div style={{marginLeft:"10px"}}>
                                {workflowAction && actionComment?<SelectCustom onChange={handleChangeAction} data={workflowAction} selected={actionComment} themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover}></SelectCustom>:null}
                            </div>

                        </div>
                    </div>:null}
                    {props.tab=="todolist"?<div style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                        <div onClick={handleReset} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', marginTop:'10px', marginRight:'20px'}}>
                            <span>{t("btnReset")}</span>
                        </div>
                        <div onClick={handleSave} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer',fontWeight:'bold', fontFamily:'Poppinsbold', background:'#3bbad6', color:'white', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', marginTop:'10px', marginRight:'20px'}}>
                            <span>{t("btnSave")}</span>
                        </div>
                   
                    </div>:null}

            </div>
        </div>
    )
}    