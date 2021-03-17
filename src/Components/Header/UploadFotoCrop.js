// import React,{useState} from 'react'
// import Slider from '@material-ui/core/Slider'
// import Cropper from 'react-easy-crop'

// export default function Foto(props) {
//   const [state,setState] = useState({
//     imageSrc:props.value,
//     crop: { x: 0, y: 0 },
//     zoom: 1,
//     aspect: 1,
//   })
//   console.log(state.imageSrc)
//   const onCropChange = crop => {
//     setState({...state,crop:crop })
//   }

//   const onCropComplete = (croppedArea, croppedAreaPixels) => {
//     console.log(croppedAreaPixels.width / croppedAreaPixels.height)
//   }

//   const onZoomChange = zoom => {
//     setState({...state,zoom:zoom })
//   }

 
//     return (
//       <div className="App">
//         <style jsx>{`
//         .App {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// }

// .crop-container {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 80px;
// }

// .controls {
//   position: absolute;
//   bottom: 0;
//   left: 50%;
//   width: 50%;
//   transform: translateX(-50%);
//   height: 80px;
//   display: flex;
//   align-items: center;
// }

// .slider {
//   padding: 22px 0px;
// }

// `}</style>
//         <div className="crop-container">
//           <Cropper
//             image={state.imageSrc}
//             crop={state.crop}
//             zoom={state.zoom}
//             aspect={state.aspect}
//             cropShape="round"
//             onCropChange={onCropChange}
//             onCropComplete={onCropComplete}
//             onZoomChange={onZoomChange}
//           />
//         </div>
//         <div className="controls">
//           <Slider
//             value={state.zoom}
//             min={1}
//             max={3}
//             step={0.1}
//             aria-labelledby="Zoom"
//             onChange={(e, zoom) => onZoomChange(zoom)}
//             classes={{ container: 'slider' }}
//           />
//         </div>
//       </div>
//     )
//   }

import React from 'react'
import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'
import {generateDownload, getCroppedImg} from './../../utils/fotoCrop'
import axios from 'axios'

class App extends React.Component {
  state = {
    imageSrc:'',
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
    Value:0,
    TampilFoto:false,
    cropsArea:null,
    Foto:null
  }
  componentDidMount(){
    this.setState({
      ...this.state, imageSrc:this.props.value
    })
  }
  onCropChange = crop => {
    this.setState({ crop })
  }
  
  onCropComplete = (croppedArea, croppedAreaPixels) => {
    this.setState({
      ...this.state,cropsArea:croppedAreaPixels
    })
    // console.log(croppedAreaPixels.width / croppedAreaPixels.height)
  }
  CancelFoto = (e)=>{
    this.setState({...this.state, TampilFoto:false,cropsArea:null,
      Foto:null})
  }
  SaveFoto = async (e)=>{
    if(this.state.TampilFoto){
      var BASE64_MARKER = ';base64,';

      function convertDataURIToBinary(dataURI) {
        var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        var base64 = dataURI.substring(base64Index);
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));

        for(let i = 0; i < rawLength; i++) {
          array[i] = raw.charCodeAt(i);
        }
        return array;
      }
      var uintArray = convertDataURIToBinary(this.state.Foto);  
      
      console.log(uintArray)
    
      this.setState({...this.state, Foto:
        URL.createObjectURL(
          new Blob([uintArray.buffer], { type: 'image/jpeg' } /* (1) */)
        )})
      
      const config = {
        onUploadProgress: progressEvent =>{
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          this.setState({...this.state,Value:percentCompleted})
        }
      }
      axios.post(this.props.Api+'/general/user/profile',{
        key:localStorage.getItem('token'),
        moduleId:this.props.moduleId,
        userData: {
            img : new Buffer.from(uintArray),
            nickname: this.props.nickname
        }
    },config).then(res=>{
        // this.props.onClick(res.data);
        this.props.onClick({
          "responseCode": 200,
          "data": "User data updated successfully."
      })
        
    }).catch(err=>{
      
        this.props.onClick(err.response.data);
       
    })
      
      // axios.post('http://localhost:5000/upload',{data: new Buffer.from(uintArray)},config);       
      
    }else{
        const data = await getCroppedImg(this.state.imageSrc, this.state.cropsArea);
        if(data){
          
          if(e.target.id=="save"){

          // e.target.parentNode.children[0].children[0].src=data
            this.setState({...this.state, TampilFoto:true, Foto:data})
          }else{
            // e.target.closest('#save').parentNode.children[0].children[0].src=data
            this.setState({...this.state, TampilFoto:true,Foto:data})
          }
        }

    }
  }
  onZoomChange = zoom => {
    this.setState({ zoom })
    
  }

  render() {
    return (
      <div className="App">
         <style >{`
        .App {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.crop-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
}

.controls {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 50%;
  transform: translateX(-50%);
  height: 80px;
  display: flex;
  align-items: center;
}

.slider {
  padding: 22px 0px;
}
.save{
  position:absolute;
  bottom:10px;
  right:10px;
  background: #3BBAD6;
  color:white;
  padding:5px;
  border-radius:10px;
  border:2px solid white;
}
.save1{
  position:absolute;
  bottom:10px;
  left:130px;
  width:350px;
  color:#3BBAD6;
  padding:5px;
  border-radius:10px;
  border:2px solid white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.save:hover{
  background: #188299;
}
.cancel{
  position:absolute;
  bottom:10px;
  left:10px;
  background: #3BBAD6;
  color:white;
  padding:5px;
  border-radius:10px;
  border:2px solid white;
}
.cancel:hover{
  background: #188299;
}
.cuy{
  border-radius:50%;
  display:flex;
  width:300px;
  height:300px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin:auto;
  tranform:translateY(50%);
  border:2px solid white;
  justify-content:center;
  align-items:center;
}
`}</style>
        
        <div id="cuy" style={{marginTop:'30px'}} >
            <img style={{display:!this.state.TampilFoto?'none':'block'}} className="cuy" src={this.state.Foto} ></img>
        </div>
        {this.state.TampilFoto?'':<div>
        <div key="container" className="crop-container">
          <Cropper
            image={this.state.imageSrc}
            crop={this.state.crop}
            zoom={this.state.zoom}
            aspect={this.state.aspect}
            cropSize={{width: 200, height: 200}}
            cropShape="round"
            showGrid={true}
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
          />
        </div>
        <div className="controls">
          <Slider
            value={this.state.zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => this.onZoomChange(zoom)}
            // classes={{ container: 'slider' }}
          />
        </div>
        </div>}
        {!this.state.TampilFoto?'':<div id="cancel" className="cancel" onClick={this.CancelFoto}><button>Cancel</button></div>}
        {!this.state.TampilFoto?'':<div className="save1">
          <input style={{width:'100%'}} value={this.state.Value} type="range"></input>
          <span>{this.state.Value}%</span>
        </div>}
        <div id="save" className="save" onClick={this.SaveFoto}><button>{this.state.TampilFoto?'Upload':'Save'}</button></div>
      </div>
    )
  }
}

export default App;



