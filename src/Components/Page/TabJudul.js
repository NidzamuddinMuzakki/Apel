import { useState } from 'react'
import { useSelector } from 'react-redux'
import {Icon} from 'rsuite'
import axios from 'axios'
import Api from './../../ApiSetting'
import Tooltip from '@material-ui/core/Tooltip';
import {useTranslation} from 'react-i18next'
import { RiEditLine } from "react-icons/ri";
import {MdPlaylistAdd} from "react-icons/md";
import { VscSourceControl } from "react-icons/vsc";
export default function TabJudul(props){
    const selectedRow = useSelector(state=>state.SelectedRow)
    const [tab, setTab] = useState('all')
    const {t}  = useTranslation()
    const handleShowFilter = ()=>{
        props.onClick('filter')
    }
    const handleChangeTab = (data)=>{
        setTab(data)
        props.onClick(data)
    }
    const handleTambah =(data)=>{
           
            props.onClick(data)
        
    }
    const handleDetail = ()=>{
        if(props.judul=="MasterRole"){
            props.onClick("DETAIL")

        }
    }
    const handleHapus = ()=>{
       props.onClick("DELETE")
    }
    return (
        <div style={{display:'flex', justifyContent:'space-between'}}>

                    <div style={{marginLeft:'20px', fontFamily:"Poppinsbold", display:"flex"}}>
                        <span onClick={e=>handleChangeTab('all')} style={{position:'relative',cursor:'pointer',color:tab=="all"?"black":'gray'}}>{props.judulSekarang=="003"?t("btnAllUser"):props.judulSekarang=="004"?t("btnAllUser"):props.judulSekarang=="005"?t("btnAllRole"):props.judulSekarang=="006"?t("btnAllBranch"):""}  <span style={{width:'100%', position:'absolute',bottom:0,left:0,right:0,borderTop:tab=="all"?"5px solid #3BBAD6":null,borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}></span></span>
                        <span onClick={e=>handleChangeTab('workflow')} style={{position:'relative',cursor:'pointer',marginLeft:'20px',color:tab=="workflow"?"black":'gray'}}>{t("btnWorkFlowStatus")} <span style={{width:'100%', position:'absolute',bottom:0,left:0,right:0,borderTop:tab=="workflow"?"5px solid #3BBAD6":null,borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}></span></span>
                        <span onClick={e=>handleChangeTab('todolist')} style={{position:'relative',cursor:'pointer',marginLeft:'20px',color:tab=="todolist"?"black":'gray',}}>{t("btnToDoList")}{props?.data?<span style={{position:'absolute', top:-10, right:-13, background:'red',fontSize:'10px',display:'flex',justifyContent:'center', alignItems:'center',fontFamily:'Poppinsbold', color:'white' ,borderRadius:'50%',width:'15px', height:'15px'}}>{props?.data}</span>:null}<span style={{width:'100%', position:'absolute',bottom:0,left:0,right:0,borderTop:tab=="todolist"?"5px solid #3BBAD6":null,borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}></span></span>

                    </div>
                    <div style={{display:'flex'}}>
                        <Tooltip title={t("btnFilter")} placement="top" aria-label="add" arrow>     
                        <div onClick={handleShowFilter}  style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',background:"#C4C4C4", padding:'5px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon style={{fontSize:"20px"}} icon="filter"></Icon>
                        </div>
                        </Tooltip>
                       
                        {props.judul!="UserRole" && props.judul!="UserBranch"?
                        <Tooltip title={t("btnAdd")} placement="top" aria-label="add" arrow>  
                        <div onClick={e=>handleTambah('ADD '+props.judul)} style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',marginLeft:'5px',background:"#3BBAD6",color:'white',padding:'2px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            {/* <Icon  icon="plus"></Icon> */}
                            <MdPlaylistAdd style={{fontSize:'20px',marginLeft:'5px'}}></MdPlaylistAdd>
                            {/* <CgPlayListAdd style={{fontSize:"25px", fontWeight:'bold'}}></CgPlayListAdd> */}
                        </div>
                        </Tooltip>    
                        :null}
                        {selectedRow?.length==1 && props.judul!="UserRole" && props.judul!="UserBranch" && props.judul!="MasterBranch" ?
                        <Tooltip placement="top" title={t("btnEditMapping")} aria-label="add" arrow> 
                        <div onClick={e=>handleTambah(props.judul=="MasterRole"?'EDIT ROLE '+props.judul:null)} style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',marginLeft:'5px',background:"#3BBAD6",color:'white',padding:'2px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            {/* <Icon style={{fontSize:"15px"}} icon="key"></Icon> */}
                            <VscSourceControl style={{fontSize:'20px'}}></VscSourceControl>
                        </div>
                            </Tooltip>
                        :null}
                        {selectedRow?.length==1?
                        <Tooltip placement="top" title={t("btnEdit")} aria-label="add" arrow>
                        <div onClick={e=>handleTambah('EDIT '+props.judul)} style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',marginLeft:'5px',background:"#3BBAD6",color:'white',padding:'2px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <RiEditLine style={{fontSize:"20px"}}></RiEditLine>
                           
                        </div>
                        </Tooltip>
                        :null}
                        {selectedRow?.length>0 && props.judul!="UserRole" && props.judul!="UserBranch"?
                        <Tooltip placement="top" title={t("btnDelete")} aria-label="add" arrow>
                        <div onClick={handleHapus} style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',marginLeft:'5px',background:"#3BBAD6",color:'white',padding:'2px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon style={{fontSize:"20px"}} icon="trash"></Icon>
                        </div>
                        </Tooltip>
                        :null}
                       
                        <Tooltip placement="top" title={t("btnDownload")} aria-label="add" arrow>
                        <div style={{cursor:'pointer',display:'flex', justifyContent:"center",alignItems:"center",marginLeft:'5px',marginRight:"10px",background:"#3BBAD6",color:'white',padding:'5px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon icon="cloud-download"></Icon>
        
                            
                        </div>
                        </Tooltip>
                        
                    </div>
                </div>
    )
}