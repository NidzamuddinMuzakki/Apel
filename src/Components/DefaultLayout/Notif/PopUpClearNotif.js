import Dialog from '@material-ui/core/Dialog'
import axios from 'axios';
import Api from './../../../ApiSetting'
import {useState} from 'react'

export default function PopUpClearNotif(props){
  
    const handleClose = ()=>{
        
        props.onClick();
    }
    const handleClear = ()=>{
        props.onClick('clear');
    }
    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
            <div style={{width:'500px',height:'350px' ,padding:'20px', textAlign:'center'}}>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <img src="/question.png" width="150" height="150"></img>
                </div>
                <div>
                    <span style={{fontFamily: 'Poppins',fontStyle: 'normal',
fontWeight: 600,
fontSize: '30px',color: '#3BBAD6'}}>Are You Sure?</span>
                    <br/>
                    <span style={{fontFamily: 'Poppins',fontStyle: 'normal',
fontWeight: 600,
fontSize: '20px',color: '#C4C4C4'}}>Do you want clear {props.value}% notitification?</span>
                </div>
                <div style={{marginTop:'10px'}}>
                    <button onClick={handleClose} style={{fontFamily:'Poppins',color: '#3BBAD6',borderBottomLeftRadius:'10px',borderTopLeftRadius:'10px' ,border: '1px solid #3BBAD6', padding:'5px',width: '150px'}}>Cancel</button>
                    <button onClick={handleClear} style={{fontFamily:'Poppins',color:'white',background: '#3BBAD6',borderBottomRightRadius:'10px',borderTopRightRadius:'10px' ,border: '1px solid #3BBAD6', padding:'5px',width: '150px'}}>Clear</button>
                    
                </div>
            </div>
        </Dialog>
    )
}