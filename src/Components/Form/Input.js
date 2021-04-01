import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useState } from 'react';
export default function Input(props){
    const [stateVisible, setStateVisible] = useState(false)
    const [stateColor, setStateColor] = useState(false)
    const handleOver=()=>{
        setStateColor(true)
    }
    const handleLeave = () =>{
        setStateColor(false)
}
    const handleVisible = (handle)=>{
        setStateVisible(handle)
        setStateColor(false)
    }
   
    return(
        <div style={props.style}  >
            <input onChange={props.onChange} style={{borderRadius:'5px', width:'100%', paddingLeft:"5px"}} name={props.name} type={props.judul=="password" && stateVisible==true?"text":props.type}></input>
            {props.judul=="password"?<div style={{position:'absolute', right:'0px', top:'-1px'}}> 
                {stateVisible==false?<VisibilityIcon onMouseOver={handleOver} onMouseLeave={handleLeave} onClick={e=>handleVisible(true)} style={{color:stateColor==false?'#c4c4c4':"black", cursor:'pointer', marginRight:'10px'}}></VisibilityIcon>:
                <VisibilityOffIcon onMouseOver={handleOver} onMouseLeave={handleLeave}  onClick={e=>handleVisible(false)}  style={{color:stateColor==false?'#c4c4c4':"black", cursor:'pointer', marginRight:'10px'}}></VisibilityOffIcon>}
            </div>:null}
        </div>
    )
}