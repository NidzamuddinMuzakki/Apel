import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact";

export default function Corousel(props){
  
  return (
    <MDBContainer >
      <MDBCarousel
        activeItem={1}
        length={props.data?.length}
        interval={3000}
        showControls={true}
        showIndicators={true}
        style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
      >
        <MDBCarouselInner>
          {props.data?.map((cuy, index)=>(

          <MDBCarouselItem key={index} itemId={index+1}>
            <MDBView >
              <img
                className="d-block"
                style={{width:'100%', height:'300px', border:'3px solid white'}}
                src={cuy.newsImage.imgUrl}
                alt={cuy.newsTitle}
              />
            </MDBView>
          </MDBCarouselItem>
          ))}
          
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>
  );
}

