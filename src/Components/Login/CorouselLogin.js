import { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import axios from 'axios'
import Api from './../../ApiSetting'
const AutoplaySlider = withAutoplay(AwesomeSlider);

export default function SliderCuy(props) {
    
    const [data, setData] = useState([])
    async function getData() {
        const cuy = await axios.get(Api()+"/general/news/login").then(res=>res);
        setData(cuy.data.data)
    }
    useEffect(()=>{
        getData()

    },[])
    
    return (
<>

    <AutoplaySlider
        play={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={3000}
    >
        {data?data.map(
        (cuy, index)=>(
       
            <div key={index}  data-src={"./news/"+cuy.newsImage.imgUrl} />
        )):''}
        
    </AutoplaySlider>
 </>   
  )
  };
