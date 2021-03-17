import Table from './../../Components/Table/Table'
import useSWR from 'swr';
import axios from 'axios';
import Api from './../../ApiSetting'
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {Icon} from 'rsuite';
import PopUPSaveAs from '../../Components/PopUp/SaveAs';
import PopUP from '../../Components/PopUp/Role'
import DetailRole from './../../Components/PopUpDetail/RoleDetail'
import ThemeColor from './../../Theme.json'
import RoleDetail from './../../Components/PopUpDetail/RoleDetail';
import Loading from './../../Components/Loading';
import Filter from '../../Components/Filter/Filter'
export default function Role(props){
    const [data, setData] = useState();
    const [stateName, setStateName] = useState();
    const selectedRow = useSelector(state=>state.SelectedRow)
    const [schema, setSchema] = useState();
    const [jumlahdata, setJumlahData] = useState();
    const [judul, setJudul] = useState()
    const [tab, setTab] = useState('all');
    const [PopUp,setPopUp]  = useState(false);
    const [loading, setLoading]= useState(false);
    const ColorTheme = useSelector(state=>state.ColorTheme)
    const [DetailRolePopUp, setDetailRolePopUp] = useState(false);
    const [id, setId] = useState();
    const [rename, setRename] = useState(false);
    const [stateRename, setStateRename]= useState();

    const [filterShow, setFilterShow] = useState(false)
    const [filterData, setFilterData] = useState();
    const [dataFilter, setDataFilter] = useState([]);
    const [fill, setFill] = useState();
    const [filll, setFilll] = useState(false)
    const [fillll, setFillll] = useState(false)
    const [popUpSaveAs, setPopUpSaveAs] = useState(false)
    const [dataFilterX, setDataFilterX] = useState()
    const [dataFilterXawal, setDataFilterXawal] = useState()
    const [beda, setBeda] = useState(false)
    const [dataKirimFilter, setDataKirimFilter] = useState()
    const handleClosePopUpRoleDetail = (data)=>{
        if(data=="close"){
            setPopUpSaveAs(false)
            setDetailRolePopUp(false)
        }else{
            setDetailRolePopUp(false)
            setPopUpSaveAs(false)
            
            props.onClick(data)
            getData();
        }
    }
    const getDataFilter = ()=>{
        axios.get(Api()+"/general/user/filter",{
            headers:{
                "Authorization":"Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg"
            }
        }).then(response=>{
            setDataFilter(response.data.data)
           
        }).catch(error=>{

        })
    }
    const handleClosePopUp = (data, id=0)=>{
        if(data=="close"){
            setPopUpSaveAs(false)
            setPopUp(false)
        }else{
           
            if(id==1){  
                setFilterShow(false)
                setFilll(true)
            }
            setPopUp(false)
            setPopUpSaveAs(false)

            
           


            props.onClick(data)
            getData();
        }
    }
    useEffect(()=>{
        setJudul(localStorage.getItem('judul'))
    },[localStorage.getItem('judul')])
    const getData = ()=>{
        setLoading(true)
        axios.get(Api()+"/credential/role?moduleId=ANT&ordertype=asc&orderby=roleName&perpage=10&page=1&filter=roleName like '%01'",{
            headers:{
                "Authorization":"Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg"
            }
        }).then(res=>{
            setLoading(false)
            setData(res.data.data)
            setSchema(Object.keys(res.data.data[0]))
            setFilterData(res.data.filter)
            setJumlahData(res.data.info.allrec)
            console.log(res.data.data)
        }).catch(err=>{
            setLoading(false)
        })
    }
    useEffect(()=>{
        getData();
        getDataFilter()
    },[])
    const handleTambah = (data)=>{
        setStateName(data)
        setPopUp(true)
    }
    const handleChangeTab= (data)=>{
        setTab(data)
    }
    const handleDetailRole = ()=>{
      
        setDetailRolePopUp(true)
    }
    const handleHapus = ()=>{
        setLoading(true)
            var config = {
                method: 'delete',
                url: Api()+'/credential/role/detail?moduleId=ANT&rowId[0]=1&rowId[1]=2',
                headers: { }
              };
              
              axios(config)
              .then(function (response) {
                setLoading(false)
                console.log(JSON.stringify(response.data));
                props.onClick(response.data)
                getData();
              })
              .catch(function (error) {
                console.log(error);
                setLoading(false)
                props.onClick(error.response.data)
                getData();
              });
    }
    const handleTable = (data, id)=>{
        if(data=="EDIT"){
            setStateName("EDIT ROLE")
            setId(id)
            setPopUp(true)
        }else if(data=="DELETE"){
            setLoading(true)
            var config = {
                method: 'delete',
                url: Api()+'/credential/role/detail?moduleId=ANT&rowId[0]=1&rowId[1]=2',
                headers: { }
              };
              
              axios(config)
              .then(function (response) {
                setLoading(false)
                console.log(JSON.stringify(response.data));
                props.onClick(response.data)
                getData();
              })
              .catch(function (error) {
                console.log(error);
                setLoading(false)
                props.onClick(error.response.data)
                getData();
              });
        }
    }
    const handleShowFilter = ()=>{
        setFilll(true)
        setFillll(!fillll)
        setFilterShow(false)
        setRename(false)
       
     }
     const handleCloseFilter = ()=>{
         setFilterShow(false)
         setFilll(true)
         setRename(false)



         setDataFilterX(JSON.parse(JSON.stringify(dataFilterXawal)))
     }
     const handleSetFilter=(e)=>{
         setDataFilterX(dataFilter.filter(cuy=>cuy.id==e.target.id))
         setDataFilterXawal(JSON.parse(JSON.stringify(dataFilter.filter(cuy=>cuy.id==e.target.id))))
         // setFilterShow(true)
         // setFilll(false)
     }
     const handleEditFilter = ()=>{
         setFilterShow(true)
         setRename(false)
         setFilll(false)
     }
     const handleDeleteFilter = ()=>{
         setLoading(true)
         
         axios.delete(Api()+'/general/user/filter?id=1',{
 
         }).then(resss=>{
             setLoading(false)
             
             props.onClick(resss.data)
         }).catch(errrr=>{
           
             setLoading(false)
         })
     }
     const handleSearchFilter = ()=>{
         
         getData(dataFilterX[0].filterSql)
     }
     const handleNewFilter = ()=>{
         setFilterShow(true)
         setRename(false)
         setFilll(false)
         setDataFilterX()
     }
     const handleSaveFilter = ()=>{
         setLoading(true)
         axios.post(Api()+'/general/user/filter?id=1',{
 
         }).then(resSave=>{
             setLoading(false)
             props.onClick(resSave.data)
         }).catch(errSave=>{
             setLoading(false)
         })
     }
     const handleSaveAsFilter = ()=>{
         setPopUpSaveAs(true)
     }
     const handleRename = (data)=>{
        setRename(true)
        setStateRename(data)
    }
    const handleChangeRename = (e)=>{
        setStateRename(e.target.value)
    }
    const handleRenameCancel = ()=>{
        setStateRename(dataFilterX[0].filterName)
        setRename(false)
    }
    const handleRenameSave = ()=>{
        let dada = dataFilterX;
        dada[0].filterName = stateRename;
        setDataFilterX(dada);
        if(dada!=dataFilterXawal){
            setBeda(true)
        }
        setRename(false)
    }
    const handleResetFilter= ()=>{
        setDataFilterX(JSON.parse(JSON.stringify(dataFilterXawal)))
        setBeda(false)
    }
    const handleFilterData = (data)=>{
        
        
        if(dataFilterX){
            let dada = dataFilterX;
            dada[0].uiJson = data;
            setDataFilterX(dada);
            if(dada!=dataFilterXawal){
                setBeda(true)
            }

        }else{
            setDataKirimFilter(data)
        }
        
    }
    return (
        <div>
            {loading?<Loading color={ThemeColor[ColorTheme][3]}></Loading>:null}
            
            <div style={{background:'white', color:'black', fontFamily:'Poppinsbold'}}>
            
                <div style={{paddingTop:'20px', paddingBottom:"20px"}}>
                    <span style={{fontSize:"25px", marginLeft:'20px'}}>
                        {judul}
                    </span>
                   
                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>

                    <div style={{marginLeft:'20px', fontFamily:"Poppinsbold", display:"flex"}}>
                        <span onClick={e=>handleChangeTab('all')} style={{cursor:'pointer',borderBottom:tab=="all"?"5px solid #3BBAD6":null,color:tab=="all"?"black":'gray', borderBottomLeftRadius:'2px',borderBottomRightRadius:'2px'}}>All Roles</span>
                        <span onClick={e=>handleChangeTab('workflow')} style={{cursor:'pointer',borderBottom:tab=="workflow"?"5px solid #3BBAD6":null,marginLeft:'20px',color:tab=="workflow"?"black":'gray'}}>Workflow Status</span>
                        <span onClick={e=>handleChangeTab('todolist')} style={{cursor:'pointer',borderBottom:tab=="todolist"?"5px solid #3BBAD6":null,marginLeft:'20px',color:tab=="todolist"?"black":'gray',}}>To Do List</span>

                    </div>
                    <div style={{display:'flex'}}>
                        <div onClick={handleShowFilter}  style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',background:"#C4C4C4", padding:'5px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon style={{fontSize:"20px"}} icon="filter"></Icon>
                        </div>
                       
                        <div onClick={e=>handleTambah('ADD ROLE')} style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',marginLeft:'5px',background:"#3BBAD6",color:'white',padding:'2px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon style={{fontSize:"20px"}} icon="plus"></Icon>
                        </div>
                        {selectedRow?.length==1?<div onClick={handleDetailRole} style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',marginLeft:'5px',background:"#3BBAD6",color:'white',padding:'2px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon style={{fontSize:"20px"}} icon="key"></Icon>
                        </div>:null}
                        {selectedRow?.length==1?<div onClick={e=>handleTambah('EDIT ROLE')} style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',marginLeft:'5px',background:"#3BBAD6",color:'white',padding:'2px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon style={{fontSize:"20px"}} icon="pencil-square"></Icon>
                        </div>:null}
                        {selectedRow?.length>0?<div onClick={handleHapus} style={{cursor:'pointer',display:'flex',alignItems:'center', justifyContent:'center',marginLeft:'5px',background:"#3BBAD6",color:'white',padding:'2px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon style={{fontSize:"20px"}} icon="trash"></Icon>
                        </div>:null}
                       
                        <div style={{cursor:'pointer',display:'flex', justifyContent:"center",alignItems:"center",marginLeft:'5px',marginRight:"10px",background:"#3BBAD6",color:'white',padding:'5px',width:"100px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon icon="cloud-download"></Icon>
                            <span style={{marginLeft:"5px"}}>Download</span>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div>
                {popUpSaveAs==true?<PopUPSaveAs themeColor={ThemeColor[ColorTheme][0]} themeColorBgHover={ThemeColor[ColorTheme][3]} onClick={handleClosePopUp}></PopUPSaveAs>:null}
            </div>
            {DetailRolePopUp==true?<RoleDetail id={selectedRow[0]}  themeColor={ThemeColor[ColorTheme][0]} themeColorBgHover={ThemeColor[ColorTheme][3]} onClick={handleClosePopUpRoleDetail}></RoleDetail>:null}
            <div>
            {fillll==true?<div style={{position:'relative', background:'white', marginTop:'5px',marginLeft:'10px', marginRight:'10px',borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
                        <div onClick={handleShowFilter}  style={{cursor:'pointer',position:'absolute',top:5,right:5,display:'flex',alignItems:'center', justifyContent:'center',padding:'5px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
                            <Icon style={{fontSize:"10px"}} icon="close"></Icon>
                        </div>
                    <div style={{display:'flex', alignItems:'center',background:'#e5f4f8',borderTopLeftRadius:"10px",borderTopRightRadius:"10px", paddingTop:'5px', paddingBottom:'5px'}}>
                        <span style={{marginLeft:'20px',color:'black', fontFamily:'Poppinsbold'}}>Source Filter</span>
                        {filll==true?<span onClick={handleNewFilter} style={{marginLeft:'20px',background:'#3bbad6',color:'white',padding:'5px',borderRadius:"5px",cursor:'pointer' ,margin:'5px',fontFamily:'Poppinsbold'}}>New Filter</span>:null}
                        {filterShow==true && rename==false?<span onClick={dataFilterX?e=>handleRename(dataFilterX[0].filterName):null} style={{display:'flex',alignItems:'center',marginLeft:'20px',background:'#3bbad6',color:'white',padding:'5px',borderRadius:"5px",cursor:'pointer' ,margin:'5px',fontFamily:'Poppinsbold'}}>{dataFilterX?dataFilterX[0].filterName:'Untitlte'} {dataFilterX?<Icon style={{fontSize:"20px", marginLeft:'10px'}} icon="pencil-square"></Icon>:null}</span>:null}
                        {rename?<input value={stateRename} onChange={handleChangeRename} style={{marginLeft:'20px',background:'#3bbad6',color:'white',padding:'5px',borderRadius:"5px",cursor:'pointer' ,margin:'5px',fontFamily:'Poppinsbold'}}></input>:null}
                        {rename?<span onClick={handleRenameCancel} style={{marginLeft:'20px',background:'#3bbad6',color:'white',padding:'5px',borderRadius:"5px",cursor:'pointer' ,margin:'5px',fontFamily:'Poppinsbold'}}>cancel</span>:null}
                        {rename?<span onClick={handleRenameSave}  style={{marginLeft:'20px',background:'#3bbad6',color:'white',padding:'5px',borderRadius:"5px",cursor:'pointer' ,margin:'5px',fontFamily:'Poppinsbold'}}>save</span>:null}

                       
                    </div>
                    <div style={{paddingBottom:'5px'}}>
                    {filll==true?<div style={{background:'#e5f4f8', margin:'10px', padding:'10px'}}>
                            {dataFilter?.map((row,index)=>{
                                
                                return(<span id={row.id} onClick={handleSetFilter} style={{borderRadius:'10px', background:dataFilterX?dataFilterX[0].id==row.id?'#3bbad6':'gray':'gray',color:dataFilterX?dataFilterX[0].id==row.id?'white':'#c4c4c4':'#c4c4c4' ,marginLeft:'5px',cursor:'pointer',fontFamily:'Poppinsbold', padding:'5px'}}>{row.filterName}</span>)

                            })}
                        </div>:null}
                        {filterShow==true?<Filter data={filterData} filter={dataFilterX} onChange={handleFilterData}></Filter>:null}
                       
                    </div>
                    {dataFilterX && filll? <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center', marginTop:"-10px"}}>
                        <div onClick={handleEditFilter} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px', marginBottom:'5px', marginRight:'5px'}}>
                            <span>Edit</span>
                        </div>
                        <div onClick={handleDeleteFilter}  style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px', marginBottom:'5px', marginRight:'5px'}}>
                            <span>Delete</span>
                        </div>
                        <div onClick={handleSearchFilter} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer',fontWeight:'bold', fontFamily:'Poppinsbold', background:'#3bbad6', color:'white', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px',marginBottom:'5px', marginRight:'20px'}}>
                            <span>Search</span>
                        </div>
                    
                    </div>:null}
                    {filterShow? <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center', marginTop:"-10px"}}>
                    
                        <div onClick={handleCloseFilter} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px', marginBottom:'5px', marginRight:'5px'}}>
                            <span>Close</span>
                        </div>
                        {dataFilterX && beda?<div onClick={handleResetFilter}  style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px', marginBottom:'5px', marginRight:'5px'}}>
                            <span>Reset</span>
                        </div>:null}
                        <div onClick={handleSaveAsFilter} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer',fontWeight:'bold', fontFamily:'Poppinsbold', background:'#3bbad6', color:'white', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px',marginBottom:'5px', marginRight:'5px'}}>
                            <span>Save As</span>
                        </div>
                        {dataFilterX && beda?<div onClick={handleSaveFilter} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer',fontWeight:'bold', fontFamily:'Poppinsbold', background:'#3bbad6', color:'white', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px',marginBottom:'5px', marginRight:'20px'}}>
                            <span>Save</span>
                        </div>:null}
                    
                    </div>:null}
                   
                </div>
            :null}
            </div>
            <div>
                {PopUp==true?<PopUP name={stateName} id={id}  themeColor={ThemeColor[ColorTheme][0]} themeColorBgHover={ThemeColor[ColorTheme][3]} onClick={handleClosePopUp}></PopUP>:null}
            </div>
            <div style={{marginLeft:'10px',marginRight:'10px',marginTop:'10px'}}>
                {data?.length>0 && schema?.length>0  && jumlahdata?<Table data={data} schema={schema} jumlahdata={jumlahdata} onClick={handleTable}></Table>:null}
            </div>
        </div>
    )
}