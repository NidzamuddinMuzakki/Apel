import {useState} from 'react';
export default function PercentageClear(props){
    const [state, setState] = useState(0);
    const onChange = (e)=>{
        setState(e.target.value)
        props.onChange(e.target.value)
    }
    const onClick= ()=>{
        console.log(props)
        props.onClick();
    }
    return (
        <div className="percantageParent">  
            <div className="percentageDiv">
            
                    <input type="range" style={{cursor:'pointer'}}  onChange={onChange} value={state}></input>
            
                <div style={{marginTop:'-10px','--color':props.themeColor,'--colorBgHover':props.themeColorBgHover}}><button onClick={onClick}  className="buttonClearNotif">Clear</button></div>
            </div>
        </div>
    )
}