import Filter from './Filter'
import {Icon} from 'rsuite'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Api from './../../ApiSetting'
import Loading from './../Loading'
import AlertSave from './../Alert/AlertSave'
import PopUPSaveAs from './../PopUp/SaveAs'
export default function FilterParent(props){

    const [filll, setFilll] = useState(true)
    const [fillll, setFillll] = useState(false)
    const [dataFilterX, setDataFilterX] = useState()
    const [dataFilterXawal, setDataFilterXawal] = useState()
    const [dataFilter, setDataFilter] = useState([]);
    const [rename, setRename] = useState(false);
    const [stateRename, setStateRename]= useState();
    const [loading, setLoading] = useState(false)
    const [save, setSave] =useState(false)
    const [popUpSaveAs, setPopUpSaveAs] = useState(false)
    useEffect(()=>{
       setDataFilter(props.dataFilterBackend)
      
    },[props])
    const [filterShow, setFilterShow] = useState(false)
    const [filterData, setFilterData] = useState();
    const [Reset, setReset] = useState(false)
    const [beda, setBeda] = useState(false)
    const [dataKirimFilter, setDataKirimFilter] = useState()
    const [Cuy, setCuy] = useState(0)
    const handleCloseFilter = (data)=>{
        if(data=="close filter"){

            setFilterShow(false)
            setFilll(true)
            setRename(false)
        }else if(data=="close"){
            props.onClick(data)

        }
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
        
        props.onClick(dataFilterX[0].filterSql, 'filter')
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
   const handleCuy = ()=>{
       setCuy(Cuy+1)
   }
   const handleResetFilter= ()=>{
       setReset(true)
       let hmm = JSON.parse(JSON.stringify(dataFilterXawal))
       let huhu = dataFilterX;
       huhu[0].filterJson = dataFilterXawal[0].filterJson
       huhu[0].filterName = dataFilterXawal[0].filterName
       huhu[0].filterSql = dataFilterXawal[0].filterSql
       huhu[0].uiJson = dataFilterXawal[0].uiJson
       setDataFilterX(huhu)
       handleCuy();
      
   }
   console.log(dataFilterX)
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
   const handleCloseSave = (data)=>{
    alert(data)
   }
   const handleClosePopUp = (data)=>{
        if(data=="close"){
            setPopUpSaveAs(false)
        }else{
            setPopUpSaveAs(false)
            props.onClick(data)
        }
   }
   const handleTrue = ()=>{
       setReset(false)
   }
    return(
        
            <div style={{position:'relative', background:'white', marginTop:'5px',marginLeft:'10px', marginRight:'10px',borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
                          {popUpSaveAs==true?<PopUPSaveAs themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} onClick={handleClosePopUp}></PopUPSaveAs>:null}
                        {loading?<Loading color={props.colorThemeBgHover}></Loading>:null}
                         <AlertSave themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} open={save} onClick={handleCloseSave}></AlertSave>
                        <div onClick={e=>handleCloseFilter('close')}  style={{cursor:'pointer',position:'absolute',top:5,right:5,display:'flex',alignItems:'center', justifyContent:'center',padding:'5px',width:"30px", textAlign:'center', borderRadius:'2px'}}>  
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
                        {filterShow==true?<Filter onClick={handleTrue} reset={Reset} data={props.dataFilter} filter={dataFilterX} onChange={handleFilterData}></Filter>:null}
                       
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
                    <span style={{display:"none"}}>{Cuy}</span>
                    {filterShow? <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center', marginTop:"-10px"}}>
                    
                        <div onClick={(e=>handleCloseFilter('close filter'))} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px', marginBottom:'5px', marginRight:'5px'}}>
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
          
        
    )
}