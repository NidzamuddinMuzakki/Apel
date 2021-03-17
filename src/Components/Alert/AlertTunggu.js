



import Dialog from "@material-ui/core/Dialog"
import { useEffect, useState } from "react";
export default function AlertTunggu(props){
    const [waktu, setWaktu] = useState(60);

    useEffect(()=>{
        if(props.open==true){

            const interval = setInterval(() => {
               
                    setWaktu(waktu => waktu - 1);
                
              }, 1000);
          
              return () => {
                clearInterval(interval);
              };
        }
        
    },[props.open])
    useEffect(()=>{
        if(waktu<1){
            setWaktu(60)
            handleClose('yes')
        }
    },[waktu])
    const handleClose = (data)=>{
        setWaktu(60)
        props.onClick(data);
    }
    return (
        <Dialog style={{}} onClose={e=>handleClose('no')} aria-labelledby="asasasas" open={props.open}>
            <div style={{width:'600px', height:'450px'}}>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'70px'}}>
                    <img src="/clock.png" width='150'></img>

                </div>
                <div style={{textAlign:'center', color: "red", fontWeight:600, fontFamily:'Poppinsbold', fontSize:'25px', marginTop:'20px'}}>Login time is running up!</div>
                <div style={{textAlign:'center', color: '#C4C4C4', fontWeight:600, fontFamily:'Poppinsbold', fontSize:'15px', marginTop:'5px'}}>Do you want to Logout?</div>

                <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:'50px'}}>
                    
                    <button style={{fontFamily:'Poppins-bold',color:'white',fontWeight:600,background: 'red',border: '1px solid red',boxSizing: 'border-box',borderRadius: '40px 0px 0px 40px',width: '150px',height: '42px'}}  onClick={e=>{
                        if(waktu>1){handleClose('no')}
                        }}>Batal {waktu}</button>
                    <button style={{fontFamily:'Poppins-bold',color:'red',fontWeight:600,border: '1px solid red',boxSizing: 'border-box',borderRadius: '0px 40px 40px 0px',width: '150px',height: '42px', '--color':props.themeColor,'--colorBgHover':props.themeColorBgHover}} className="editButtonSave"  onClick={e=>handleClose('yes')}>Logout</button>
                    
                </div>
            </div>
        </Dialog>
    )
}