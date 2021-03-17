import {Icon} from 'rsuite'
import {useState} from 'react'
import AlertSave  from './../Alert/AlertSave';
import Loading from './../Loading';
import axios from 'axios';
import Api from './../../ApiSetting'
export default function SaveAs(props){
    const handleClose = (data)=>{
        props.onClick(data)
    }
    const [save, setSave] = useState(false);
    const [nameFilter, setNameFilter] = useState("");
    const handleChange = (e)=>{
        setNameFilter(e.target.value)
    }
    const [loading, setLoading] = useState(false);
    const handleReset = ()=>{
        setNameFilter('')
    }
    const handleSave = ()=>{
        if(nameFilter==""){

        }else{
            setSave(true)

        }
    }
    const handleCloseSave = (data)=>{

        if(data=="no"){
            setSave(false)
            
        }else if(data=="yes"){
            setSave(false)
            setLoading(true)
              var config = {
                method: 'put',
                url: Api()+'/general/user/filter',
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg'
                },
                
              };
              
              axios(config)
              .then(function (response) {
                setLoading(false)
                props.onClick(response.data,1)
                console.log(JSON.stringify(response.data));
              })
              .catch(function (error) {
                setLoading(false)
                props.onClick(error.response.data,1)
                console.log(error);
              });
            
        }
    }
    return(
        <div style={{background:'rgba(0,0,0,0.3)',zIndex:100,display:'flex',justifyContent:'center',alignItems:'center' ,position:'fixed', top:0,left:0, right:0,bottom:0}}>
            {loading?<Loading color={props.themeColorBgHover}></Loading>:null}
            <AlertSave themeColor={props.themeColor} themeColorBgHover={props.themeColorBgHover} open={save} onClick={handleCloseSave}></AlertSave>            
            <div style={{position:'relative',background:'white', borderRadius:'15px', width:'600px', height:"300px"}}>
                <div onClick={e=>handleClose('close')} style={{fontFamily:'Poppinsbold',cursor:'pointer',position:'absolute', top:'5px', right:'30px', fontSize:"30px"}}>
                    <Icon icon="close"></Icon>
                </div>
                <div style={{padding:'10px', marginLeft:"20px", marginTop:"10px", display:'flex', alignItems:'center'}}>
                    <div style={{boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',border:"1px solid #3bbad6",background:'#e5f4f8', width:'50px', display:'flex', justifyContent:'center', alignItems:'center', padding:'10px', borderRadius:"50%"}}>
                  
                        <img src="/network.png" width='25'></img>
                        
                    </div>
                    <span style={{marginLeft:'20px', fontFamily:'Poppinsbold',color:'#3bbad6', fontWeight:'bold', fontSize:"20px"}}>{props.name} Save As</span>
                </div>
                <div style={{background:'#e5f4f8', marginTop:'20px', marginLeft:'20px', marginRight:'20px', height:'120px', border:'1px solid #c4c4c4'}}>
                        <label style={{fontFamily:'Poppinsbold', fontSize:'20px',marginLeft:'20px',marginTop:'20px'}}>Nama Filter</label>
                        <br></br>
                        <input onChange={handleChange} value={nameFilter} style={{fontFamily:'Poppinsbold', fontSize:'20px',marginLeft:'20px',marginTop:'0px',width:'530px',height:'40px', borderRadius:'10px', border:'1px solid #3bbad6'}}></input>
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