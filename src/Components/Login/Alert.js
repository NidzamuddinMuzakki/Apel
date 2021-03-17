import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default function TransitionsSnackbar(props) {
    const [state, setState] = React.useState({
      open: props.open,
     
    });
    useEffect(()=>{
        
        setState({
            open:props.open,
            
        })
    },[props.open])
  
  
    const handleClose = () => {
      props.onClose(state.open)
      setState({
        ...state,
        open: false,
      
      });
    };
  
    return (
      <div>
        {/* <Button onClick={handleClick(GrowTransition)}>Grow Transition</Button>
        <Button onClick={handleClick(Fade)}>Fade Transition</Button>
        <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button> */}
      <Snackbar open={state.open} 
          autoHideDuration={2000} 
        
          onClose={handleClose}>
        <Alert onClose={handleClose} severity={"error"}>
          {props.message}
        </Alert>
      </Snackbar> 
       
      </div>
    );
  }