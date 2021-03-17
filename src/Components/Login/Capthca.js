import CheckIcon from '@material-ui/icons/Check';
import { useState } from 'react';
import PopUpCap from './PopUpCap'
export default function Capthca(props){
    const [clone,setClone] = useState(false);
    const [pop,setPop] = useState(false);
    function Cuy(e){
       
        
    }
    function handleChange(data){
        if(data==true){
            setClone(true)
            setPop(false)
            props.onChange(true)
        }
    }
    function handlePop(e){
        setPop(true)
    }
    return (
       <div>
            <div style={{height:'50px', width:'210px',background:'#f2f2f2', marginTop:'-5px', marginBottom:'10px'}} className="flex justify-center items-center shadow-md rounded-md">
                <div className="flex justify-center items-center">
                    <input  onClick={clone?null:handlePop}  className={clone?"check1":"check"}  name="check"></input>
                    <CheckIcon className={clone?"icon1":"icon"}></CheckIcon>
                    <label className={"label"} htmlFor="check">I'm Not Robot</label>
                </div>
            <div className="ml-3" style={{height:"30px"}}>
                <img src="/capcha.png" width="30" height="30"></img>
            </div>
            
            </div>
            {pop?<PopUpCap value={pop} onChange={handleChange}></PopUpCap>:''}
       </div> 
        )
}