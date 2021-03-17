import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';

export default function DemoCarousel(){
    
        return (
        <div style={{width:'100%'}}>    
            <Carousel autoPlay showArrows={true}>
                <div>
                    <img styl={{width:'100%'}} src="https://images.unsplash.com/photo-1546188994-07c34f6e5e1b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZnV0dXJlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                
            </Carousel>
        </div>    
        );
    
};

