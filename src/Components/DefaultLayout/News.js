import axios from 'axios';
import Api from './../../ApiSetting'
import useSWR from 'swr'
export default function News(props){
    const {data, error} = useSWR(Api()+"/general/news/footer", url=>axios.get(url), {revalidateOnFocus:false,refreshInterval:'360000'})
    if(data){
        props.onChange(false)
    }
    if(error){
        props.onChange(true)
    }
    return(
        <div style={{width:'100%'}}>
        <style >{`
            .news{
                font-family: Poppinsbold;
                font-style: normal;
                font-weight: normal;
                font-size: 18px;
                overflow:hidden;
                color: #3BBAD6;
                width:100%;
                height:30px;
                display:flex;
            }
            .span{
                transform: translateX(-100%);
                animation: marquee 15s linear ;
            }
            @keyframes marquee {
                0% {
                    transform: translateX(1150%);
                  }
                100% {
                    transform: translateX(-100%);
                  }
              }
            
        `}</style>
            <div className="news">
                {/* <span className="span"> This is News</span> */}
                <marquee>
           {/* {theArray.map(theElement => theElement.toString())} */}
           {data?.data?.data.map(theelement=>
            <span>{theelement.newsDatetime+" | "+theelement.newsText} &nbsp;&nbsp;&nbsp;</span>
            )}
           
         </marquee>
         
            </div>

        </div>
    )
}