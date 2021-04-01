import { useEffect, useState } from 'react';
import { Steps } from 'rsuite';
const styles = {
    width: '200px',
    display: 'inline-table',
    
    verticalAlign: 'top'
  };
  
  export default function Step(props) {
      console.log(props)
      const [data, setData] = useState()
      const [current, setCurrent] = useState(0)
      useEffect(()=>{
        if(props?.data){
            setData(props.data)
            let i = 0;
            for(const lala of props.data){
                if(lala.stepDate==null){
                    setCurrent(i)
                    break
                }
                i++;
            }
        }
      },[props])
return(
    <div>
  
      <Steps current={current} vertical style={styles}>
          
        {data?data.map((row, index)=>(
                <Steps.Item style={{fontFamily:'Poppinsbold', fontSize:'10px'}} title={row.stepName} description={row.stepDate} />
            
                

        )):null}
        
      </Steps>
    </div>
  );
    
}