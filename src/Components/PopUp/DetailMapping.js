
import axios from 'axios'
import Api from './../../ApiSetting'
import {Icon} from 'rsuite'
import styled from 'styled-components'
import AlertDismiss from './../Alert/AlertDismiss'
import AlertSave from './../Alert/AlertSave'
import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Loading from './../Loading'
import {ChangeSelectedRow} from './../../Redux/Table/Action'
import List from './List'
import Table from './Table'
import { filter } from 'lodash'
import { Checkbox } from '@material-ui/core'
import Menu from './../PopUpDetail/Menu'
const DivIcon = styled.div`
    color:black;
    position:absolute;
    top:10px;
    right:20px;
    cursor:pointer;
   
    &:hover{
        color:#c4c4c4;
    }
`

export default function(props){
    const dispatch = useDispatch();
    const [stateCheck, setStateCheck] = useState({
        view:true,create:true,update:true, delete:true
    })
    const [stateRole, setStateRole] = useState({
        id:'', name:''
    })
    const [selected, setSelected] = useState();
    const [selectedAwal, setSelectedAwal] = useState();
    const [list, setList] = useState();
    const [data, setData] =useState();
    const [schema, setSchema] = useState();
    const [save, setSave] = useState(false)
    const [loading, setLoading]= useState(false)
    const selectedRow =useSelector(state=>state.SelectedRow)
    const [listSchema, setListSchema] = useState();
    const [selectedSchema, setSelectedSchema] = useState();
    const [dataSelectedMenu, setDataSelectedMenu] = useState();
    const [headerSchema, setHeaderSchema] = useState()
    const [selectedList, setSelectedList] = useState([]);
    const [selectedTable, setSelectedTable] = useState([]);
    const [dataselected, setDataSelected] = useState()
    const confirmationDialog = useSelector(state=>state?.Param[0]?.confirmationDialog)
    useEffect(()=>{
        setLoading(true)
        if(selectedRow.length==1){
            if(props.judul.split(/(?=[A-Z])/)[1]=="Branch"){
                    var config = {
                        method: 'get',
                        url: Api()+'/credential/user/detail/branch?username=user01',
                        headers: { }
                    };
                    
                    axios(config)
                    .then(function (response) {
                        
                        setSchema(Object.keys(response.data.data.user))
                        setSelected(JSON.parse(JSON.stringify(response.data.data.branches.selected)))
                        setSelectedAwal(JSON.parse(JSON.stringify(response.data.data.branches.selected)))
                        setList(JSON.parse(JSON.stringify(response.data.data.branches.selection)))
                        setListSchema(Object.keys(JSON.parse(JSON.stringify(response.data.data.branches.selection[0]))))
                        setSelectedSchema(Object.keys(JSON.parse(JSON.stringify(response.data.data.branches.selected[0]))))
                        setData(JSON.parse(JSON.stringify(response.data.data)))
                        setLoading(false)
                    })
                    .catch(function (error) {
                        setLoading(false)
                    });
                }else if(props.judul.split(/(?=[A-Z])/)[1]=="Role" && props.judul.split(/(?=[A-Z])/)[0]=="User"){
                    var config = {
                        method: 'get',
                        url: Api()+'/credential/user/detail/role?username=user01',
                        headers: { }
                      };
                      
                      axios(config)
                      .then(function (response) {
                        setSchema(Object.keys(response.data.data.user))
                        
                        setSelected(JSON.parse(JSON.stringify(response.data.data.roles.selected)))
                        setSelectedAwal(JSON.parse(JSON.stringify(response.data.data.roles.selected)))
                        setList(JSON.parse(JSON.stringify(response.data.data.roles.selection)))
                        setListSchema(Object.keys(JSON.parse(JSON.stringify(response.data.data.roles.selection[0]))))
                        setSelectedSchema(Object.keys(JSON.parse(JSON.stringify(response.data.data.roles.selected[0]))))
                        setData(JSON.parse(JSON.stringify(response.data.data)))
                        setLoading(false)
                      })
                      .catch(function (error) {
                        setLoading(false)
                      });
                }else if(props.judul.split(/(?=[A-Z])/)[1]=="Role" && props.judul.split(/(?=[A-Z])/)[0]=="Master"){
                    var config = {
                        method: 'get',
                        url: Api()+'/credential/role/detail?rowId=1&moduleId=ANT',
                        headers: { 
                          'Content-Type': 'application/json', 
                          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
                        }
                      };
                      
                      axios(config)
                      .then(function (response) {
                        // setSchema(Object.keys(response.data.data.role))
                        console.log(response.data)
                        setStateRole({
                            id:response.data.data.role.roleId,
                            name:response.data.data.role.roleName
                        })
                        setSelected(JSON.parse(JSON.stringify(response.data.data.menu.selected)))
                        setSelectedAwal(JSON.parse(JSON.stringify(response.data.data.menu.selected)))
                        setList(JSON.parse(JSON.stringify(response.data.data.menu.option)))
                        setListSchema(Object.keys(JSON.parse(JSON.stringify(response.data.data.menu.option[0]))))
                        setSelectedSchema(Object.keys(JSON.parse(JSON.stringify(response.data.data.menu.selected[0]))))
                        setData(JSON.parse(JSON.stringify(response.data.data)))
                        setLoading(false)
                        console.log((response.data.data));
                      })
                      .catch(function (error) {
                        setLoading(false)
                        console.log(error);
                      });
                }

            }
    },[selectedRow])
    const [dismiss, setDismiss] = useState(false)
    const [alert, setAlert] = useState()
    const [Cuy, setCuy] = useState(0)
    const handleClose= (handle)=>{
        if(handle=="close"){
            if(confirmationDialog==true){
                setDismiss(true)
                setAlert('dismiss')
            }else{
                setAlert('dismiss')
                handleCloseDismiss("yes")
            }
            
            
        }else if(handle=="reset"){
            
            if(confirmationDialog==true){
                setDismiss(true)
                setAlert('reset')
            }else{
                setAlert('reset')
                handleCloseDismiss("yes")
            }
        }else if(handle=="save"){
            
            
            if(confirmationDialog==true){
                setSave(true)
                setAlert('save')
            }else{
                setAlert('save')
                handleCloseDismiss("yes")
            }
        }
    }
    const handleCloseDismiss= (handle)=>{
        
        if(handle=="no" && alert=="dismiss"){
            setDismiss(false)
        }else if(handle=="yes" && alert=="dismiss"){
            dispatch(ChangeSelectedRow([]))
            setDismiss(false)
            props.onClick('close')

        }else if(handle=="no" && alert=="reset"){
           
            setDismiss(false)
           
        }else if(handle=="yes" && alert=="reset"){
            setSelected(JSON.parse(JSON.stringify(selectedAwal)))
            // console.log(data)
         
            setDismiss(false)
           
        }else if(handle=="yes" && alert=="save" && props.judul=="UserBranch"){
           setSave(false)
           setLoading(true)
           var data1 = JSON.stringify({
            "user": {
              "id": 2,
              "username": "user01",
              "email": "user@adapro-nd.co.id",
              "fullname": "User01",
              "createdTime": "2021-03-03T10:19:22.273Z",
              "createdUser": "SYSTEM",
              "updatedTime": null,
              "updatedUser": null
            },
            "branches": {
              "selection": [
                {
                  "branchId": "001",
                  "branchName": "Jakarta"
                },
                {
                  "branchId": "002",
                  "branchName": "Palembang"
                },
                {
                  "branchId": "003",
                  "branchName": "Jayapura"
                }
              ],
              "selected": [
                {
                  "branchId": "001",
                  "branchName": "Jakarta",
                  "createdUser": "user01",
                  "createdTime": "2021-02-26 05:36:45.490",
                  "updatedUser": "",
                  "updatedTime": null
                },
                {
                  "branchId": "002",
                  "branchName": "Palembang",
                  "createdUser": "user01",
                  "createdTime": "2021-02-26 05:36:45.490",
                  "updatedUser": "",
                  "updatedTime": null
                }
              ]
            }
          });
          
          var config = {
            method: 'post',
            url: Api()+'/credential/user/detail/branch',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data1
          };
          
          axios(config)
          .then(function (response) {
            props.onClick(response.data)
            setLoading(false)
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false)
          });
        }else if(handle=="yes" && alert=="save" && props.judul=="UserRole"){
            var data = JSON.stringify({
                "user": {
                  "id": 2,
                  "username": "user01",
                  "email": "user@adapro-nd.co.id",
                  "fullname": "User01",
                  "createdTime": "2021-03-03T10:19:22.273Z",
                  "createdUser": "SYSTEM",
                  "updatedTime": null,
                  "updatedUser": null
                },
                "access": {
                  "view": 1,
                  "create": 1,
                  "update": 1,
                  "delete": 1
                },
                "roles": {
                  "selected": [
                    {
                      "roleId": "MKR01",
                      "roleName": "Maker",
                      "createdUser": "user01",
                      "createdTime": "2021-02-26 05:36:45.490",
                      "updatedUser": "",
                      "updatedTime": null
                    },
                    {
                      "roleId": "CHK01",
                      "roleName": "Checker",
                      "createdUser": "user01",
                      "createdTime": "2021-02-26 05:36:45.490",
                      "updatedUser": "",
                      "updatedTime": null
                    }
                  ]
                }
              });
              
              var config = {
                method: 'post',
                url: Api()+'/credential/user/detail/role',
                headers: { 
                  'Content-Type': 'application/json'
                },
                data : data
              };
              
              axios(config)
              .then(function (response) {
                props.onClick(response.data)
                setLoading(false)
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        else if(handle=="no" && alert=="save"){
            setSave(false)
            
         }
    }
    const handleChangeSelectedMenu = ()=>{

    }
    const handleAllLeft = ()=>{
        setSelected([])
        setSelectedList([])
        setSelectedTable([])
        handleCuy()
    }
    const handleAllRight = ()=>{
        

            let humua = JSON.parse(JSON.stringify(list))
            humua = getFlat(humua)
            
           for(const cuyu of props.judul=="MasterRole"?humua:list){
             
               let cekVicek = selected.findIndex(cuy=>cuy[selectedSchema[0]]==cuyu[selectedSchema[0]])
               if(cekVicek==-1){

                   let hm = selectedAwal.filter(cuy=>cuy[selectedSchema[0]]==cuyu[selectedSchema[0]])
                   if(hm?.length>0){
                       let hum = selected;
                       hum.push(hm[0])
                       setSelected(hum)
                   }else{
                       let hmm = {}
                       for(const nenew of selectedSchema){
                           hmm.nenew = null
                       }
                       let oioi = props.judul=="MasterRole"?humua.filter(cuy=>(cuy[selectedSchema[0]]==cuyu[selectedSchema[0]] && cuy.menuType=="child")):list.filter(cuy=>cuy[selectedSchema[0]]==cuyu[selectedSchema[0]])
                       for(const col of listSchema){
                           hmm[col] = oioi[0][col]
                       }
                       let k = selected;
                       k.push(hmm)
                       setSelected(k)
                   }
                }
                setSelectedList([])
                setSelectedTable([])
                handleCuy();
           }
       
    }
    const handleLeft = ()=>{
        let dacuy = selected;
        for(const lala of selectedTable){
            let hmm = selected.findIndex(cuy=>cuy[selectedSchema[0]]==lala)
            dacuy.splice(hmm,1)
        }
        handleCuy();
        setSelected(dacuy)
       
        setSelectedList([])
        setSelectedTable([])
    }
    const handleRight = ()=>{
        if(selectedList?.length>0){
            let huhu = getFlat(JSON.parse(JSON.stringify(list)))
            for(const cuyu of selectedList){
                let hm = selectedAwal.filter(cuy=>cuy[selectedSchema[0]]==cuyu)
                if(hm?.length>0){
                    let hum = selected;
                    hum.push(hm[0])
                    setSelected(hum)
                }else{
                    let hmm = {}
                    
                    for(const nenew of selectedSchema){
                        hmm.nenew = null
                    }
                    let oioi = props.judul=="MasterRole"?huhu.filter(cuy=>cuy[selectedSchema[0]]==cuyu) :list.filter(cuy=>cuy[selectedSchema[0]]==cuyu)
                    for(const col of listSchema){
                        hmm[col] = oioi[0][col]
                    }
                    let k = selected;
                    k.push(hmm)
                    setSelected(k)
                }
                setSelectedList([])
                setSelectedTable([])
                handleCuy();
            }
        }else{
            window.alert("Not Selected List")
        }
    }
    const handleChangeSelected= (id)=>{
        setSelectedTable(id)
    }   
    const handleDragOver = (ev)=>{
        ev.preventDefault(); 
       
       
     }
     
    const handleDropTarget = (ev)=>{
        
         let srcId = ev.dataTransfer.getData("srcId");
        
         if(!srcId){
             return false
         }
         if(srcId){
            setSelectedList([])
            setSelectedTable([])
            srcId = srcId.split("|")
            console.log(srcId)
            ev.preventDefault();
            let draboxList  = ev.target.classList.contains('dragboxList')
            let draboxTable  = ev.target.classList.contains('dragboxTable')
            if(draboxList==true){
                let cuy = selected.findIndex(cuy=>cuy[selectedSchema[0]]==srcId[1])
                let ambil = selected;
               
                if(cuy!=-1 && srcId[0]=="target"){

                    ambil.splice(cuy,1)
                    setSelected(ambil)
                    console.log(selected)
                }
            }else if(draboxTable){
                let ambil = JSON.parse(JSON.stringify(selectedAwal))
                let valid = selected.findIndex(cuy=>cuy[selectedSchema[0]]==srcId[1])
                let cek = ambil.filter(cuy=>cuy[selectedSchema[0]]==srcId[1]);
                // window.alert(srcId[1])
                if(cek?.length>0 && valid==-1){
                    let mengambil = selected;
                    mengambil.push(cek[0])
                    setSelected(mengambil)
                } else if(valid==-1){
                    let hmm = {}
                    let i=0
                    if(props.judul=="UserBranch"){
                        for(const nenew of selectedSchema){
                            hmm.nenew = null
                        }
                        let oioi = list.filter(cuy=>cuy[selectedSchema[0]]==srcId[1])
                        for(const col of listSchema){
                            hmm[col] = oioi[0][col]
                        }
                        let k = selected;
                        k.push(hmm)
                        setSelected(k)
                    }else if(props.judul=="UserRole"){
                        
                            for(const nenew of selectedSchema){
                                hmm.nenew = null
                            }
                            let oioi = list.filter(cuy=>cuy[selectedSchema[0]]==srcId[1])
                            for(const col of listSchema){
                                hmm[col] = oioi[0][col]
                            }
                            let k = selected;
                            k.push(hmm)
                            setSelected(k)
                        
                    }else if(props.judul=="MasterRole"){
                        window.alert('cuy')
                    }
                    
                }
            }
            else if(draboxList==false || draboxTable==false){
               let hmm = ev.target.closest('.dragboxList')
               let hmm1 = ev.target.closest('.dragboxTable')
               if(hmm){
                   setCuy(Cuy+1)
                let cuy = selected.findIndex(cuy=>cuy[selectedSchema[0]]==srcId[1])
                let ambil = selected;
                
                if(cuy!=-1 && srcId[0]=="target"){

                    ambil.splice(cuy,1)
                    setSelected(ambil)
                    
                   
                }
               }
               if(hmm1){
                let ambil = JSON.parse(JSON.stringify(selectedAwal))
                let cek = ambil.filter(cuy=>cuy[selectedSchema[0]]==srcId[1]);
                let valid = selected.findIndex(cuy=>cuy[selectedSchema[0]]==srcId[1])
              
                if(cek?.length>0 && valid==-1){
                        
                        let mengambil = selected;
                        mengambil.push(cek[0])
                        setSelected(mengambil)

                    
                }
                else if(valid==-1){
                    // window.alert(props.judul)
                    let hmm = {}
                    let i=0
                    if(props.judul=="UserBranch"){
                        for(const nenew of selectedSchema){
                            hmm.nenew = null
                        }
                        let oioi = list.filter(cuy=>cuy[selectedSchema[0]]==srcId[1])
                        for(const col of listSchema){
                            hmm[col] = oioi[0][col]
                        }
                        let k = selected;
                        k.push(hmm)
                        setSelected(k)
                    }
                    else if(props.judul=="UserRole"){
                        
                        for(const nenew of selectedSchema){
                            hmm.nenew = null
                        }
                        let oioi = list.filter(cuy=>cuy[selectedSchema[0]]==srcId[1])
                        for(const col of listSchema){
                            hmm[col] = oioi[0][col]
                        }
                        let k = selected;
                        k.push(hmm)
                        setSelected(k)
                    
                    }else if(props.judul=="MasterRole"){
                        for(const nenew of selectedSchema){
                            hmm.nenew = null
                        }
                        let baru = getFlat(JSON.parse(JSON.stringify(list)))
                        let oioi = baru.filter(cuy=>cuy[selectedSchema[0]]==srcId[1])
                        for(const col of listSchema){
                            hmm[col] = oioi[0][col]
                        }
                        hmm['accessView'] = 1
                        hmm['accessCreate'] =1 
                        hmm['accessUpdate'] = 1
                        hmm['accessDelete'] = 1
                        let k = selected;
                        k.push(hmm)
                        setSelected(k)





                    }
                }
               }
            }
           
         }
           
     
     
           
            
        }

        
        const getFlat = (array)=>{
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
        const handleCuy = ()=>{
            setCuy(Cuy+1)
        }
        const handleSelecteList = (id)=>{
            let hmm = selectedList?.length>0?selectedList:[];
            let cek  =hmm.findIndex(cuy=>cuy==id)
            if(cek==-1){
                hmm.push(id)
                handleCuy()
                setSelectedList(hmm)
                
            }else{
                hmm.splice(cek,1)
                handleCuy()
                setSelectedList(hmm)
            }
        }
        const handleChangeCheckboxTable= (name, id,result)=>{
            let hmm = selected
            let cuy = hmm.findIndex(cuy=>cuy[selectedSchema[0]]==id)
            hmm[cuy][name] = result?1:null
           setSelected(hmm)
        }
        const handleChangeCheck = (e)=>{
            handleCuy();
                setStateCheck({
                    ...stateCheck,
                    [e.target.name]:e.target.checked
                })
                
        }
    return (
        <div style={{position:'fixed',display:'flex',justifyContent:'center', alignItems:'center',zIndex:100 ,left:0, right:0,top:0,bottom:0, background:'rgba(0,0,0,0.5)'}}>
              {loading?<Loading color={props.themeColorBgHover}></Loading>:null}
            
            <AlertDismiss themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} alert={alert} open={dismiss} onClick={handleCloseDismiss}></AlertDismiss>
            <AlertSave themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover}  open={save} onClick={handleCloseDismiss}></AlertSave>
            <div style={{overflow:'auto',boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',borderRadius:'20px',overflow:"auto",position:'relative',width:'80vw', background:"white",height:"95vh"}}>
                <DivIcon onClick={e=>handleClose('close')}><Icon style={{ fontSize:'20px'}} icon="close"></Icon></DivIcon>
                <div style={{display:'flex',alignItems:'center',height:'60px', width:'100%'}}>
                        <div style={{height:'50px',width:'50px',boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',background:'#e5f4f8',marginLeft:'20px',marginTop:'20px' ,padding:'10px', display:'flex',alignItems:'center', justifyContent:'center', borderRadius:'50%', border:'1px solid black'}}>
                            <img style={{width:'35px'}} src="./Mapping.png" ></img>

                        </div>
                        <div style={{marginLeft:'20px',marginTop:'20px',display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <span style={{color:props.themeColor,fontSize:'25px',fontFamily:'Poppinsbold', fontWeight:'bold'}}>{"Edit "+props.judul.split(/(?=[A-Z])/)[0]+" "+props.judul.split(/(?=[A-Z])/)[1]+" Mapping"}</span>
                           
                        </div>
                        
                </div>
                <div style={{background:"#e5f4f8",paddingBottom:"10px",boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', height:'auto',marginTop:'20px' ,marginLeft:'20px', marginRight:'20px'}}>
                    <div style={{marginLeft:'20px', marginRight:'20px',marginTop:'10px', }}>
                        <br></br>
                        {schema?.map((row, index)=>{
                            if(row!='id' && data?.user[row]!=null){
                                return(
                                    <div key={index} style={{marginLeft:'20px',marginTop:'10px',fontFamily:'Poppinsbold', fontSize:'15px',display:'flex', alignItems:'center'}}>
                                        <span style={{width:'200px'}}>{row}</span>
                                        <span>:</span>
                                        <span style={{marginLeft:'10px'}}>{data?.user[row]}</span>
                                    </div>
                                )
                            }

                        })}
                        {props.judul=="MasterRole"?<div style={{padding:'20px', width:'675px', height:'170px', background:'#e5f4f8',  borderRadius:'5px'}}>
                    <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px'}}>
                        <label >Role Id <span style={{color:'red'}}>*</span></label>
                       
                        <span style={{position:'absolute', right:"420px"}}>:</span>

                   
                        <input readOnly value={stateRole.id} name="id"   style={{background:"#c4c4c4" ,width:'400px', height:'50px', borderRadius:'10px',border:"1px solid #3bbad6", paddingLeft:'5px', paddingRight:'5px'}}></input>
                    </div>
                    <br></br>
                    <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px'}}>
                        <label >Role Name <span style={{color:'red'}}>*</span></label>
                       
                        <span style={{position:'absolute', right:"430px"}}>:</span>

                   
                        <input readOnly value={stateRole.name} name="name"  style={{background:"#c4c4c4",width:'400px', height:'50px', borderRadius:'10px',border:"1px solid #3bbad6",paddingLeft:'5px', paddingRight:'5px'}}></input>
                    </div>
                </div>
:null}
                        {props.judul=="UserRole"?<div  style={{marginLeft:'20px',marginTop:'10px',fontFamily:'Poppinsbold', fontSize:'15px',display:'flex', alignItems:'center'}}>
                                        <span style={{width:'200px'}}>Access Right </span>
                                        <span>:</span>
                                        <div style={{color:props.themeColor,marginLeft:'10px',display:'flex',alignItems:'center'}}>
                                            <div>
                                                <Checkbox value={stateCheck.view} style={{color:props.themeColor}} name="view" onChange={handleChangeCheck} checked={stateCheck.view}></Checkbox>
                                                <br></br>
                                                <span style={{color:props.themeColor,fontFamily:'Poppinsbold'}}>View</span>
                                            </div>
                                            <div style={{marginLeft:'20px'}}>
                                                <Checkbox value={stateCheck.create} style={{color:props.themeColor}} name="create" onChange={handleChangeCheck} checked={stateCheck.create}></Checkbox>
                                                <br></br>
                                                <span style={{color:props.themeColor,fontFamily:'Poppinsbold'}}>Create</span>
                                            </div>
                                            <div style={{marginLeft:'20px'}}> 
                                                <Checkbox value={stateCheck.update} style={{color:props.themeColor}} name="update" onChange={handleChangeCheck} checked={stateCheck.update}></Checkbox>
                                                <br></br>
                                                <span style={{fontFamily:'Poppinsbold'}}>Update</span>
                                            </div>
                                            <div style={{marginLeft:'20px'}}>
                                                <Checkbox value={stateCheck.delete} style={{color:props.themeColor}} name="delete" onChange={handleChangeCheck} checked={stateCheck.delete}></Checkbox>
                                                <br></br>
                                                <span style={{fontFamily:'Poppinsbold'}}>Delete</span>
                                            </div>
                                        </div>
                        </div>:null}
                         <div  style={{marginLeft:'20px',color:props.judul=="MasterRole"?'#575757':null,marginTop:props.judul=="MasterRole"?'0px':'10px',fontFamily:'Poppinsbold', fontSize:'15px',display:'flex', alignItems:'center'}}>
                                        <span style={{width:'200px', fontSize:props.judul=="MasterRole"?'20px':null}}>{"Selected"} </span>
                                        <span>:</span>
                                        <span style={{marginLeft:props.judul=="MasterRole"?"35px":'10px'}}>{selected?.length}</span>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:'10px',marginRight:'10px', marginTop:'10px',background:"white",border:'2px solid '+props.themeColor, borderRadius:'20px' ,height:'400px'}}>
                        <div style={{padding:'10px', width:'300px', }} onDragOver={handleDragOver}  onDrop={handleDropTarget}>
                            <span style={{marginLeft:'20px', fontFamily:'Poppinsbold',fontWeight:'bold', color:'black'}}> List of {props.judul.split(/(?=[A-Z])/)[1]} :</span>
                            <div className={"dragboxList"} style={{background:'#e5f4f8', padding:'10px', borderRadius:'20px', overflow:'auto', height:'350px'}}>
                                {props.judul!="MasterRole" && list?.length>0 && listSchema?.length>0?<List onDragEnd={handleCuy} onClick={handleSelecteList} selectedList={selectedList} data={list} schema={listSchema} selected={selected} themeColor={props.themeColor} ></List>:null}
                                {props.judul=="MasterRole"?<Menu Data={list} onDragEnd={handleCuy} selectedList={selectedList} selected={selected} onClick={handleSelecteList}></Menu>:null }
                            </div>
                            
                        </div>
                        
                            <div style={{width:'30px',marginLeft:'10px', marginRight:'10px', height:'320px',paddingTop:'70px' ,textAlign:'center'}}>
                                        
                                        <div onClick={handleAllLeft} style={{cursor:'pointer',marginTop:"20px",background:'#3bbad6',display:'flex', alignItems:'center',justifyContent:"center", color:'white', border:'1px solid white', borderRadius:'10px',width:"30px", height:"30px" }}>
                                            <Icon style={{fontSize:'25px'}} icon="angle-double-left"></Icon>
                                        </div>
                                        <div onClick={handleLeft} style={{cursor:'pointer',marginTop:"20px",background:'#3bbad6',display:'flex', alignItems:'center',justifyContent:"center", color:'white', border:'1px solid white', borderRadius:'10px',width:"30px", height:"30px" }}>
                                            <Icon style={{fontSize:'25px'}} icon="angle-left"></Icon>
                                        </div>
                                        <div  onClick={handleRight}  style={{cursor:'pointer',marginTop:"20px",background:'#3bbad6',display:'flex', alignItems:'center',justifyContent:"center", color:'white', border:'1px solid white', borderRadius:'10px',width:"30px", height:"30px" }}>
                                            <Icon style={{fontSize:'25px'}} icon="angle-right"></Icon>
                                        </div>
                                        <div onClick={handleAllRight} style={{cursor:'pointer',marginTop:"20px",background:'#3bbad6',display:'flex', alignItems:'center',justifyContent:"center", color:'white', border:'1px solid white', borderRadius:'10px',width:"30px", height:"30px" }}>
                                            <Icon style={{fontSize:'25px'}} icon="angle-double-right"></Icon>
                                        </div>
                                </div>
                            
                            <div style={{padding:'10px', width:'700px' }}>
                               
                                <div className="dragboxTable" onDragOver={handleDragOver} onDrop={handleDropTarget} style={{background:'#e5f4f8', padding:'10px', borderRadius:'20px', overflow:'auto', height:'380px'}}>
                                    {selected?.length>0 && selectedSchema?.length>0?<Table onDragEnd={handleCuy} onChange={handleChangeCheckboxTable} onDragOver={handleDragOver} onDrop={handleDropTarget} onClick={handleChangeSelected} data={selected} schema={selectedSchema} selectedTable={selectedTable} ></Table>:
                                    <div style={{height:'100%', width:'100%', display:'flex', justifyContent:"center", alignItems:'center'}}><div style={{width:'200xp',height:"100px",border:'2px dashed black', fontSize:'30px', fontFamily:"Poppinsbold", fontWeight:'bold', display:'flex', justifyContent:'center', alignItems:'center', padding:'10px'}}><span>Drop List</span></div></div>}
                                </div>
                            
                        </div>
                            </div>
                </div>
                <span onClick={handleCuy} style={{display:'none'}}>{Cuy}</span>
                <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                        <div onClick={e=>handleClose('reset')} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', marginTop:'10px',marginBottom:'10px', marginRight:'20px'}}>
                            <span>Reset</span>
                        </div>
                        <div onClick={e=>handleClose("save")} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer',fontWeight:'bold', fontFamily:'Poppinsbold', background:'#3bbad6', color:'white', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px',marginBottom:'10px', marginTop:'10px', marginRight:'20px'}}>
                            <span>Save</span>
                        </div>
                   
                    </div>
            </div>
            
        </div>
    )
}