import {Icon} from 'rsuite';
import './../../style/overflow.css';

export default function Loading(props){
    return(
        <div style={{position:'fixed', background:'rgba(0,0,0,0.2)',zIndex:100000,top:0,left:0,bottom:0,right:0,zIndex:100, display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Icon icon="spinner" style={{color:props.color, fontSize:'100px'}} pulse></Icon>
        </div>
    )
}