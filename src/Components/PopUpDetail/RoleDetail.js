import Api from './../../ApiSetting'
import {Icon} from 'rsuite'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Loading from './../../Components/Loading'
import DataGrid from './../Table/DataGrid'
import Menu from './Menu'
export default function RoleDetail(props){
    const [dataDetail, setDataDetail] = useState();
    const [state, setState]= useState({
        roleid:'',rolename:"", createdTime:'',createdUser:'', pending:'',
        selected:[], option:[]
    })
    const [dataSelected, setDataSelected] =useState([])
    const [dataSelectedMenu, setDataSelectedMenu] =useState([])
    const [loading, setLoading] = useState(false)
    const [dataWal, setDatawal] = useState([]);
    const [selectedMenuAwal, setSelectedMenuAwal] = useState(); 
    const [dataFlat, setdataFlat] = useState();
  useEffect(()=>{
      if(state.option?.length>0){
          let kepala = getFlat(state.option)
          setdataFlat(kepala)

      }
  },[state.option])
  useEffect(()=>{
    setLoading(true)
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
        let oya = JSON.parse(JSON.stringify(response.data.data.menu.selected))
        setDatawal(oya)
        setSelectedMenuAwal(response.data.data.menu.selected)
        setLoading(false)
        setState({
            roleid:response.data.data.role.roleId,
            rolename:response.data.data.role.roleName, 
            createdTime:response.data.data.role.createdTime,
            createdUser:response.data.data.role.createdUser,
            pending:response.data.data.role.pending,
            selected:response.data.data.menu.selected,
            option:response.data.data.menu.option

        })
        
      })
      .catch(function (error) {
        setLoading(false)
        console.log(error);
      });
    
},[])
  function getFlat(array){
    var out = []
    for(let i in array){
      out.push(array[i])
      var children = getFlat(array[i].menuChildren)
      for(let cuy of children){
        out.push(cuy)
      }
    }
    
    return out
  }
    const [disable,setDisable] = useState()
    
    const handleDragTask = (ev)=>{
       
        if(ev.target.draggable==true){
            
            
            if(!ev.target.id){
            
                ev.dataTransfer.setData("srcId", ev.target.parentNode.id);

            }else{
               
                ev.dataTransfer.setData("srcId", ev.target.id);
            }
        }else{

            console.log('asas')
        }
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
            ev.preventDefault();
           
           
          
    
    
          
            let droppable  = ev.target.classList.contains('drag_box1');
            let droppable1  = ev.target.classList.contains('drag_box2');
            if(droppable==false){
                let cuy  = ev.target.closest('.drag_box1')
                if(cuy){
                    if(state.selected.findIndex(cuy=>cuy.menuId == srcId)==-1){
                       let lala = state.selected;
                      
                    
                        let coco = dataWal.filter(cuya=>cuya.menuId==srcId)
                   
                       let hmm =dataFlat.filter(cuy=>cuy.menuId==srcId)
                       
                      if(coco){
                        lala.push(coco[0]);
                        setState({
                            ...state,
                            selected:lala
                        })

                      }else{
                        lala.push(hmm[0]);
                        setState({
                            ...state,
                            selected:lala
                        })
                      }

                    }
                }
            }
            else if(droppable1==true){
                let sel = state.selected.findIndex(cuy=>cuy.menuId==srcId)
                    let hmm = state.selected;
                    hmm.splice(sel,1)
                    setState({
                        ...state,
                        selected:hmm
                    })
            }
            if (droppable1==false) {
                let cuy  = ev.target.closest('.drag_box2')
                
                if(cuy){
                    let sel = state.selected.findIndex(cuy=>cuy.menuId==srcId)
                    let hmm = state.selected;
                    hmm.splice(sel,1)
                    setState({
                        ...state,
                        selected:hmm
                    })
                }
                   
            }
        }
           
        //     console.log(droppable1, droppable)
        //     let cek = srcId.split('|')
            
        //     let udahAda = document.getElementById(cek[0])?.classList?.contains("drag_task");
          
        //     if (droppable1) {
        //        let sel = state.selected.findIndex(cuy=>cuy.menuId==srcId)
        //         let hmm = state.selected;
        //         hmm.splice(sel,1)
        //         setState({
        //             ...state,
        //             selected:hmm
        //         })
        //         // let nodeCopy = document.getElementById(srcId).cloneNode(true)
                
        //         // nodeCopy.id= "copy|"+srcId
        //         // nodeCopy.ondragstart = function(ev) {
        //         //    handleDragTask(ev)
        //         // }
               
        //         // ev.target.appendChild(nodeCopy);
                
          
        //         // document.getElementById(srcId).setAttribute('draggable','false');
        //         // document.getElementById(srcId).setAttribute('ondragstart',null);
        //         // document.getElementById(srcId).ondragstart = function(){
        //         //     return false
        //         // }
               
        //         // document.getElementById(srcId).classList?.add('drag_passif')
        //         // document.getElementById(srcId).classList?.remove('drag_task')
                
              
           
        //     }else if(droppable){
        //         alert('hay')
        //     }
            
        // }
        
    }
    const handleAllLeft= ()=>{
        setState({
            ...state,
            selected:[]
        })
        setDataSelected([]);
    }
    const handleAllRight= ()=>{
        let hmm =dataFlat.filter(cuy=>cuy.menuUrl!="")
       
        setState({
            ...state,
            selected:hmm
        })
        setDataSelectedMenu([])
    }
    const handleRight = ()=>{
        if(dataSelectedMenu.length==0){
            alert("no data Selected")
        }else{
            for(const cuya of dataSelectedMenu){
                    let sel = dataFlat.filter(cuy=>cuy.menuId==cuya)
                    
                    let hmm = state.selected;
                    hmm.push(sel[0])
                    setState({
                        ...state,
                        selected:hmm
                    })
            }
            setDataSelectedMenu([])
        }
    }
    const handleLeft = ()=>{
        if(dataSelected.length==0){
            alert("no data Selected")
        }else{
            for(const cuya of dataSelected){
                    let sel = state.selected.findIndex(cuy=>cuy.menuId==cuya)
                    
                    let hmm = state.selected;
                    hmm.splice(sel,1)
                    setState({
                        ...state,
                        selected:hmm
                    })
            }
            setDataSelected([])
        }
    }
    const handleClose = (data)=>{
        props.onClick(data)
    }
    const handleChangeSelectedMenu = (data)=>{
        console.log(data)
        let hmm  = dataSelectedMenu.findIndex(cuy=>cuy==data)
        if(hmm==-1){
            let cuya = dataSelectedMenu;
            cuya.push(data)
            setDataSelectedMenu(cuya)
        }else{
            dataSelectedMenu.splice(hmm,1)
        }
        
    }
    const handleChangeSelected = (data)=>{
        setDataSelected(data)
        
    }
    const handleReset=()=>{
        let ouya = JSON.parse(JSON.stringify(dataWal))
        setState({
            ...state,
            selected:ouya
        })
        console.log(dataWal)
    }
    const handleSave= ()=>{
        setLoading(true)
        var data = JSON.stringify({
            "id": 1,
            "selected": [
              {
                "menuId": "001",
                "selected": "inc"
              },
              {
                "menuId": "002",
                "selected": "inc"
              },
              {
                "menuId": "003",
                "selected": "yes"
              }
            ]
          });
          
          var config = {
            method: 'post',
            url: 'https://api.adapro.tech/credential/role/mapping?Authorization=Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg',
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
            console.log(error);
          });
    }
    return (
        <div style={{position:'fixed',background:"rgba(0,0,0,0.5)",display:"flex",zIndex:100, justifyContent:'center', alignItems:'center',top:0,bottom:0,left:0,right:0}}> 
            {loading?<Loading color={props.themeColorBgHover}></Loading>:null}
            <div style={{boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',position:"relative",background:'white', borderRadius:'10px', height:'600px', width:'1000px'}}>
              
                <div onClick={e =>handleClose('close')} style={{cursor:"pointer",position:'absolute', top:"10px", right:"20px"}}>
                    <Icon icon="close"></Icon>
                </div>
                <div style={{padding:'10px', marginLeft:"20px", marginTop:"10px", display:'flex', alignItems:'center'}}>
                    <div style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',border:"1px solid #3bbad6",background:'#e5f4f8', width:'50px', display:'flex', justifyContent:'center', alignItems:'center', padding:'10px', borderRadius:"50%"}}>
                  
                        <img src="/add.png" width='25'></img>
                        
                    </div>
                    <div style={{}}>
                        <span style={{marginLeft:'20px', fontFamily:'Poppinsbold',color:'#3bbad6', fontWeight:'bold', fontSize:"20px"}}>DETAIL ROLE</span>
                        {state.pending=="yes"? 
                        <div>
                            <span style={{marginLeft:'20px', fontFamily:'Poppinsbold',color:'#3bbad6', fontWeight:'bold', fontSize:"10px"}}></span>

                        </div>:null}
                       
                       

                    </div>
                </div>
                <div style={{padding:'20px',marginTop:'-30px', width:'800px', height:'150px',  borderRadius:'5px'}}>
                        <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px',fontWeight:"bold"}}>
                            <label style={{marginTop:"10px"}}>Role Id <span style={{color:'red'}}>*</span></label>
                        
                            <span style={{position:'absolute', right:"430px"}}>:</span>

                    
                            <input readOnly value={state.roleid} name="roleid"  style={{width:'400px', height:'50px',background: '#CCCCCC', borderRadius:'10px',border:"1px solid #3bbad6", paddingLeft:'5px', paddingRight:'5px'}}></input>
                        </div>
          
                        <div style={{position:'relative',marginTop:'10px',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px',fontWeight:"bold"}}>
                            <label style={{marginTop:"10px"}}>Role Name <span style={{color:'red'}}>*</span></label>
                        
                            <span style={{position:'absolute', right:"430px"}}>:</span>

                    
                            <input readOnly value={state.rolename} name="rolename"  style={{width:'400px', background: '#CCCCCC',height:'50px', borderRadius:'10px',border:"1px solid #3bbad6",paddingLeft:'5px', paddingRight:'5px'}}></input>
                        </div>
                        <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between',fontFamily:'Poppinsbold', color:'#575757', fontSize:'20px', fontWeight:"bold"}}>
                            <label >Menu Access</label>
                        
                            <span style={{position:'absolute', right:"430px"}}>:</span>

                    
                            <span style={{width:'400px'}}>{state.selected?state.selected.length:0} Selected</span>
                        </div>
                </div>
                <div style={{background:"#cccccc",border:'1px solid #3bbad6' ,margin:'auto 20px',marginTop:"20px",width:"95%", height:"330px", borderRadius:"20px"}}>
                        <div onDragOver={handleDragOver} onDrop={handleDropTarget} style={{display:'flex'}}>
                                <div >
                                    <div style={{fontFamily:'Poppinsbold',fontWeight:'bold',color:'#575757',marginTop:"20px" ,marginLeft:'30px', fontSize:"20px"}}>
                                      <span >List of Menu : </span>          
                                    </div>
                                    <div className={"drag_box"}  style={{width:'300px',overflow:'auto',borderRadius:"20px", height:'240px', background:'#e5f4f8',marginTop:"20px" ,marginLeft:'20px',}}>
                                                <Menu dataSelected={dataSelectedMenu} onClick={handleChangeSelectedMenu} selected={state.selected}  option={state.option}></Menu>
                                               
                                               
                                    
                                    </div>
                                   
                                </div>
                                <div style={{width:'30px',marginLeft:'-20px', height:'320px',paddingTop:'70px' ,textAlign:'center'}}>
                                        
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
                                
                                   
                                    <div className="drag_box1"  style={{width:'570px',borderRadius:"20px", height:'310px', background:'#e5f4f8',marginTop:"10px" ,marginLeft:'5px',}}>
                                    
                                    {state?.selected?.length>0?<DataGrid onDragOver={handleDragOver} onDrop={handleDropTarget} onClick={handleChangeSelected} data={state.selected} dataSelected={dataSelected} ></DataGrid>:null}
                                           
                                               
                                         
                                           
                                        

                                    </div>
                                   
                                
                        </div>
                </div>
                <div style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                    <div onClick={handleReset} style={{borderRadius:"10px", display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid #3bbad6',cursor:'pointer', fontWeight:'bold',fontFamily:'Poppinsbold', color:'#3bbad6', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px', marginTop:'5px', marginRight:'10px'}}>
                        <span>Reset</span>
                    </div>
                    <div onClick={handleSave} style={{borderRadius:"10px", border:'2px solid #3bbad6',cursor:'pointer',fontWeight:'bold', fontFamily:'Poppinsbold', background:'#3bbad6', color:'white', paddingLeft:'5px', paddingRight:'5px', paddingTop:'5px', paddingBottom:'5px', marginTop:'5px', marginRight:'20px'}}>
                        <span>Save</span>
                    </div>
                   
                </div>
            </div>
            
        </div>
    )
}