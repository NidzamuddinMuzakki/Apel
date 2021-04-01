
import Judul from './Judul'
import TabJudul from './TabJudul'
import Table from './../Table/Table'
import Loading from './../Loading'
import { useEffect, useState } from 'react'
import DetailMapping from './../PopUp/DetailMapping'
import {useSelector,useDispatch} from 'react-redux'
import Theme from './../../Theme.json';
import {ChangeSelectedRow} from './../../Redux/Table/Action'
import FilterParent from './../Filter/FilterParent'
import axios from 'axios'
import Api from './../../ApiSetting'
import DetailMaster from './../PopUp/DetailMaster';
import DetailRole from './../PopUpDetail/RoleDetail'
import TableHeader from './../../HeaderTable.json'
import DetailWorkFlow from './../PopUp/DetailWorkFlow'
export default function Page1(props){
    const [loading, setLoading] = useState(true);
    const [schema, setSchema] = useState();
    const [stateTab, setStateTab] = useState('all');
    const [Cuy, setCuy] = useState(0)
    const [detailWorkFlow, setDetailWorkflow] = useState(false)
    const RoleSelected = useSelector(state=>state.RoleSelected) 
    const MenuData = useSelector(state=>state.MenuData)
    const [data, setData] = useState()
    const [dataJudul] = useState(localStorage.getItem('judul'))
    const [jumlahdata, setJumlahData] = useState();
    const [detailMapping, setDetailMaping] = useState(false)
    const [detailMaster, setDetailMaster] = useState(false)
    const [detailRole, setDetailRole] = useState(false);
    const [showFilter, setShowFilter] = useState(false)
    const [dataFilter, setDataFilter] = useState([])
    const ColorTheme = useSelector(state=>state.ColorTheme)
    const [dataFilterBackend, setDataFilterBackend] = useState([])
    const [namaJudul, setNameJudul] = useState();
    const [judulSekarang, setJudulSekarang] = useState();
    const [stateId, setStateId] = useState()
    const dispatch = useDispatch();
    const [dataTodoList, setDataTodoList]= useState();
    
    const getFlat= (array)=>{
        var out = []
        for(let i in array){
          out.push(array[i])
          var children = getFlat(array[i].menuChildren)
          for(let cuy of children){
            out.push(cuy)
          }
        }
        for(let k in out){
          if(out[k].menuChildren){
            out[k].menuChildren="";
          }
        }
        return out
      }
      useEffect(()=>{
        if(RoleSelected && MenuData){
            for(const lala of MenuData){
                if(lala.roleId == RoleSelected.roleId){
                    
                    for(const hmm of getFlat(JSON.parse(JSON.stringify(lala.menu)) )){
                        
                        if(hmm.menuUrl==localStorage.getItem('Route')){
                            setJudulSekarang(hmm.menuId)
                            break
                        }
                    }
                }
            }
        }
    },[RoleSelected])
    useEffect(()=>{
        setLoading(true)
        var config = {
            method: 'get',
            url: Api()+'/workflow/todo?moduleId=ANT&menuId=003&username=user01&ordertype=asc&orderby=reqUsername&perpage=10&page=1&filter=reqUsername like \'%01\'',
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            setLoading(false)
            
            
            setDataTodoList(response.data.info.allrec)
           
            
          })
          .catch(function (error) {
            setLoading(false)
            console.log(error);
          });


        axios.get(Api()+'/general/user/filter').then((res)=>{
            setDataFilterBackend(res.data.data)
        })
        if(stateTab=="all"){
            handleCuy()
            if(props?.data?.length>0){
                
                setLoading(false)
                setSchema(Object.keys(props?.data[0]))
                setData(props.data)
                
                
            }
            if(props.filter){
                setDataFilter(props.filter)
            }
            if(props?.info?.allrec){
                setJumlahData(props.info.allrec)
            }

        }else if(stateTab=="workflow"){
            let  hmm = judulSekarang
            if(judulSekarang=='003' || judulSekarang=="004"){
                hmm = "003"
            }
            handleCuy()
            let config = {
                method: 'get',
                url:  Api()+'/workflow/status?moduleId=ANT&menuId='+hmm+'&username=user01&ordertype=asc&orderby=id&perpage=10&page=1',
                headers: { }
              };
           
               
            
           

              axios(config)
              .then(function (response) {
                setLoading(false)
                setData(response.data.data)
                setSchema(Object.keys(response.data.data[0]))
                setJumlahData(response.data.info.allrec)
                setDataFilter(response.data.filter)
                console.log(response.data.data)
              })
              .catch(function (error) {
                setLoading(false)
                console.log(error);
              });
            
        }
        else if(stateTab=="todolist"){
            let  hmm = judulSekarang
            if(judulSekarang=='003' || judulSekarang=="004"){
                hmm = "003"
            }
            var config = {
                method: 'get',
                url: Api()+'/workflow/todo?moduleId=ANT&menuId='+hmm+'&username=user01&ordertype=asc&orderby=id&perpage=10&page=1',
                headers: { }
              };
              
              axios(config)
              .then(function (response) {
                setLoading(false)
                setSchema(Object.keys(response.data.data[0]))
                setData(response.data.data)
                setJumlahData(response.data.info.allrec)
                setDataFilter(response.data.filter)
                
              })
              .catch(function (error) {
                setLoading(false)
                console.log(error);
              });
            
        }
    },[props, stateTab])
    const handleCuy =()=>{
        setCuy(cuy=>cuy+1)
    }
    const handleClickTabJudul = (handle)=>{
       
        if(handle=="EDIT UserBranch" || handle=="EDIT UserRole" || handle=="EDIT ROLE MasterRole" ){
            setDetailMaping(true)
        }else if(handle=='filter'){
            setShowFilter(!showFilter)
        }else if(handle=="EDIT MasterRole" || handle=="EDIT MasterBranch" || handle=="ADD MasterRole" || handle=="ADD MasterBranch"){
            setDetailMaster(true)
            setNameJudul(handle)
        }else if(handle=="DELETE"){
            setLoading(true)
            
            if(props.judul=="MasterBranch"){
                var config = {
                    method: 'delete',
                    url: Api()+'/credential/branch/detail?rowId='+stateId,
                    headers: { 
                      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
                    }
                  };
                  
                  axios(config)
                  .then(function (response) {
                    setLoading(false)
                    props.onClick(response.data)
                  })
                  .catch(function (error) {
                    setLoading(false)
                    props.onClick(error.response.data)
                  });
            }
            else{
                var config = {
                    method: 'delete',
                    url: Api()+'/credential/role/detail?moduleId=ANT&rowId='+stateId,
                    headers: { }
                  };
                  
                  axios(config)
                  .then(function (response) {
                    setLoading(false)
                    props.onClick(response.data)
                  })
                  .catch(function (error) 
                  {
                    setLoading(false)
                    props.onClick(error.response.data)
                  });
            }
        }
        else if(handle=="DETAIL"){
           setDetailRole(true)
        }else if(handle=="workflow"){
            setStateTab(handle)
        }else if(handle=="all"){
            setStateTab(handle)
        }else if(handle=="todolist"){
            setStateTab(handle)
        }
    }
    const handleCloseDetailMaster = (data)=>{
        if(data=="close"){
            setDetailMaster(false)

        }else{
            setDetailMaster(false)
            props.onClick(data)
        }
    }
    
    const handleCloseDetailMaping = (data)=>{
        
        if(data=="close"){
            setDetailMaping(false)

        }else{
            setDetailMaping(false)
            props.onClick(data)
        }
    }
    const handleClickTable = (handle, id)=>{
        
        if(handle=="EDIT" && (props.judul=="UserBranch" || props.judul=="UserRole")){
            setDetailMaping(true)
            let hmm = [];
            hmm.push(id)
            dispatch(ChangeSelectedRow(id))
        }else if(handle=="DETAIL" && (judulSekarang=="003" || judulSekarang=="004" || judulSekarang=="005" || judulSekarang=="006")){
            setDetailWorkflow(true)
            let hmm = [];
            hmm.push(id)
            setStateId(id)
        }
        else if(handle=="EDIT" && (props.judul=="MasterBranch" || props.judul=="MasterRole")){
            setDetailMaster(true)
            let hmm = [];
            hmm.push(id)
            setNameJudul(handle+" "+props.judul)
            dispatch(ChangeSelectedRow(id))
        }
        else if(handle=="DELETE" && (props.judul=="MasterBranch" || props.judul=="MasterRole")){
            setLoading(true)
            let hmm = [];
            hmm.push(id)
            
            if(props.judul=="MasterBranch"){
                var config = {
                    method: 'delete',
                    url: Api()+'/credential/branch/detail?rowId[0]=1',
                    headers: { 
                      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
                    }
                  };
                  
                  axios(config)
                  .then(function (response) {
                    setLoading(false)
                    props.onClick(response.data)
                  })
                  .catch(function (error) {
                    setLoading(false)
                    props.onClick(error.response.data)
                  });
            }else{
                var config = {
                    method: 'delete',
                    url: Api()+'/credential/role/detail?moduleId=ANT&rowId[0]=1&rowId[1]=2',
                    headers: { }
                  };
                  
                  axios(config)
                  .then(function (response) {
                    setLoading(false)
                    props.onClick(response.data)
                  })
                  .catch(function (error) 
                  {
                    setLoading(false)
                    props.onClick(error.response.data)
                  });
            }
            dispatch(ChangeSelectedRow([]))
        }else if(handle=="order"){
            props.onClick("order")
        }else if(handle=="VIEW"){
            setStateId(id)
            setDetailWorkflow(true)
        }else if(handle=="ACTION"){
            setStateId(id)
            setDetailWorkflow(true)
        }
        else if(handle=="DetailView"){
            window.alert(handle, id)
        }
    }
    
    const handleCloseFilter = (data, name)=>{
        
        if(data=="close"){
            setShowFilter(false)
        }else if(name=="filter"){
         
            props.onClick(data,name)
        }
        else{
            
            props.onClick(data)
        }
    }
    const handleCloseDetailRole =(data)=>{
        if(data=="close"){
            setDetailRole(false)
        }
    }
    const handleCloseDetailWorkflow = (handle)=>{
        if(handle=="close"){
            setDetailWorkflow(false)
        }else{
            setDetailWorkflow(false)
            props.onClick(handle)
        }
    }
    return(
    <div style={{position:'relative', height:'83vh'}}>
        <div style={{position:'absolute', bottom:0, left:5, fontSize:'13px', fontFamily:'Poppinsbold', color:'gray'}}>
            
            
            {dataJudul=="User Role Mapping"?"A004M":dataJudul=="User Branch Mapping"?"A007M":dataJudul=="Master Role" && stateTab=="all"?"A010M":dataJudul=="Master Branch" && stateTab=="all"?"A013M":dataJudul=="Master Branch" && stateTab=="workflow"?"A014M":dataJudul=="Master Branch" && stateTab=="todolist"?"A015M":dataJudul=="Master Role" && stateTab=="workflow"?"A011M":dataJudul=="Master Role" && stateTab=="todolist"?"A012M":""}
        </div>
        <div style={{display:'none'}}>{Cuy}</div>
        {detailWorkFlow?<DetailWorkFlow id={stateId}  themeColor={Theme[ColorTheme][0]} themeColorBgHover={Theme[ColorTheme][3]} tab={stateTab} judulSekarang={judulSekarang} open={detailWorkFlow} onClick={handleCloseDetailWorkflow}></DetailWorkFlow>:null}
        {loading?<Loading color={Theme[ColorTheme][3]}></Loading>:null}
        {detailRole==true?<DetailRole themeColor={Theme[ColorTheme][0]} themeColorBgHover={Theme[ColorTheme][3]} onClick={handleCloseDetailRole}></DetailRole>:null}
        {detailMaster==true?<DetailMaster judulSekarang={judulSekarang} name={namaJudul} themeColor={Theme[ColorTheme][0]} themeColorBgHover={Theme[ColorTheme][3]} onClick={handleCloseDetailMaster}></DetailMaster>:null}
        {detailMapping==true?<DetailMapping judulSekarang={judulSekarang} judul={props.judul} themeColor={Theme[ColorTheme][0]} themeColorBgHover={Theme[ColorTheme][3]} onClick={handleCloseDetailMaping}></DetailMapping>:null}
        <div style={{background:'white', color:'black', fontFamily:'Poppinsbold'}}>
            <Judul judulSekarang={judulSekarang}></Judul>
            <TabJudul judulSekarang={judulSekarang} data={dataTodoList} onClick={handleClickTabJudul} judul={props.judul}></TabJudul>
            {showFilter==true?<FilterParent dataFilter={dataFilter} onClick={handleCloseFilter} themeColor={Theme[ColorTheme][0]} themeColorBgHover={Theme[ColorTheme][3]} dataFilterBackend={dataFilterBackend}></FilterParent>:null}
        </div>
            <div style={{marginLeft:'10px',marginTop:'10px' ,marginRight:'10px'}}>

                {data?.length>0 && schema?.length>0 && jumlahdata?<Table themeColor={Theme[ColorTheme][0]} themeColorBgHover={Theme[ColorTheme][3]} tab={stateTab} judulSekarang={judulSekarang} judul={props.judul} themeColor={Theme[ColorTheme][0]} themeColorBgHover={Theme[ColorTheme][3]} data={data} schema={schema} schemaHeader={TableHeader[judulSekarang+stateTab]} jumlahdata={jumlahdata} onClick={handleClickTable}></Table>:null}
            </div>
    </div>    
    )
}