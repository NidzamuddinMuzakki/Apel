(this.webpackJsonpadapro=this.webpackJsonpadapro||[]).push([[5],{292:function(e,t,n){"use strict";n.d(t,"a",(function(){return K}));var a=n(91),i=n(115),r=n(84),o=n(86),c=n(860),l=n(87),d=n.n(l),s=n(0),p=n.n(s),b=n(99),u=(n(116),n(78),n(377)),x=n(100),j=n(841),h=n(842),g=n(838),f=n(840),O=n(836),m=n(837),y=(n(839),n(827)),v=n(445),S=n(388),I=n.n(S),C=n(387),k=n.n(C),w=n(386),T=n.n(w),R=n(4);function z(e,t,n,a,i){return{name:e,calories:t,fat:n,carbs:a,protein:i}}var L=[z("Cupcake",305,3.7,67,4.3),z("Donut",452,25,51,4.9),z("Eclair",262,16,24,6),z("Frozen yoghurt",159,6,24,4),z("Gingerbread",356,16,49,3.9),z("Honeycomb",408,3.2,87,6.5),z("Ice cream sandwich",237,9,37,4.3),z("Jelly Bean",375,0,94,0),z("KitKat",518,26,65,7),z("Lollipop",392,.2,98,0),z("Marshmallow",318,0,81,2),z("Nougat",360,19,9,37),z("Oreo",437,18,63,4)];var N=[{id:"Selected",numeric:!1,disablePadding:!1,label:"Selected"},{id:"View",numeric:!1,disablePadding:!1,label:"view"},{id:"create",numeric:!1,disablePadding:!1,label:"create"},{id:"update",numeric:!1,disablePadding:!1,label:"update"},{id:"delete",numeric:!1,disablePadding:!1,label:"delete"},{id:"created date",numeric:!1,disablePadding:!1,label:"created date"},{id:"created by",numeric:!1,disablePadding:!1,label:"created by"},{id:"updated date",numeric:!1,disablePadding:!1,label:"updated date"},{id:"updated by",numeric:!1,disablePadding:!1,label:"updated by"}];function F(e){e.classes;var t=e.onSelectAllClick,n=e.order,a=e.orderBy,i=e.numSelected,r=e.rowCount;e.onRequestSort;return Object(R.jsx)(O.a,{children:Object(R.jsxs)(m.a,{children:[Object(R.jsx)(g.a,{style:{boxShadow:"rgba(0, 0, 0, 0.04) 0px 10px 10px",position:"sticky",top:0,background:"#033444",color:"white",zIndex:20},padding:"checkbox",children:Object(R.jsx)(v.a,{style:{color:"white",fontFamily:"Poppinsbold"},indeterminateIcon:Object(R.jsx)(T.a,{}),icon:Object(R.jsx)(k.a,{}),checkedIcon:Object(R.jsx)(I.a,{}),indeterminate:i>0&&i<r,checked:r>0&&i===r,onChange:t,inputProps:{"aria-label":"select all desserts"}})}),N.map((function(e){return Object(R.jsx)(g.a,{style:{fontFamily:"Poppinsbold",boxShadow:"rgba(0, 0, 0, 0.04) 0px 10px 10px",zIndex:20,position:"sticky",top:0,background:"#033444",color:"white",fontWeight:"bold"},align:e.numeric?"right":"left",padding:e.disablePadding?"none":"default",sortDirection:a===e.id&&n,children:e.label},e.id)}))]})})}Object(u.a)((function(e){return{root:{paddingLeft:e.spacing(2),paddingRight:e.spacing(1)},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(x.i)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},title:{flex:"1 1 100%"}}}));var U=Object(u.a)((function(e){return{root:{width:"100%",height:"310px"},paper:{width:"100%",position:"relative",overflow:"auto",height:"310px",marginBottom:e.spacing(2)},sort:{"&$selected":{}},table:{minWidth:750},tableRow:{"&$selected":{backgroundColor:"rgba(204, 219, 232,0.5)"},"&$selected:hover":{boxShadow:"rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"},"&$hover:hover":{backgroundColor:"white",boxShadow:"rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"},"&$hover:hover td:nth-child(2) span  ":{display:"none !important"},"&$hover:hover td:nth-child(1) span  ":{display:"block !important"},"&$hover:hover td:nth-child(2) div  ":{display:"flex !important"}},someTextField:{height:20,width:"100%",textAlign:"center"},changeRow:{position:"absolute",left:5,bottom:10,fontSize:10,fontWeight:"bold","&:hover":{boxShadow:"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}},changeRowButton:{fontSize:10,fontWeight:"bold","&:hover":{boxShadow:"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"}},icon:{"&:hover":{color:"black"}},hover:{},selected:{},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1}}}));function _(e){var t=U(),n=p.a.useState("asc"),a=Object(r.a)(n,2),i=a[0],o=a[1],c=p.a.useState("calories"),l=Object(r.a)(c,2),d=l[0],b=l[1],u=p.a.useState([]),x=Object(r.a)(u,2),O=x[0],S=x[1],C=p.a.useState(0),w=Object(r.a)(C,2),T=w[0],z=(w[1],p.a.useState(!1)),N=Object(r.a)(z,2),_=N[0],B=(N[1],p.a.useState(5)),P=Object(r.a)(B,2),J=P[0];P[1];Object(s.useEffect)((function(){S(e.dataSelected)}),[e.dataSelected]);var D=function(e){1==e.target.draggable?e.target.id?e.dataTransfer.setData("srcId",e.target.id):e.dataTransfer.setData("srcId",e.target.parentNode.id):console.log("asas")},M=J-Math.min(J,L.length-T*J);return Object(R.jsx)(y.a,{className:t.paper+" drag_box1",children:Object(R.jsx)(f.a,{className:t.paper,children:Object(R.jsxs)(j.a,{className:t.table,"aria-labelledby":"tableTitle",size:"small","aria-label":"enhanced table",children:[Object(R.jsx)(F,{classes:t,style:{position:"sticky"},numSelected:O.length,order:i,orderBy:d,onSelectAllClick:function(e){if(e.target.checked){var t=L.map((function(e){return e.name}));S(t)}else S([])},onRequestSort:function(e,t){o(d===t&&"asc"===i?"desc":"asc"),b(t)},rowCount:L.length}),Object(R.jsxs)(h.a,{children:[e.data.map((function(n,a){var i,r=(i=n.menuId,-1!==O.indexOf(i)),o="enhanced-table-checkbox-".concat(a);return Object(R.jsxs)(m.a,{draggable:"true",hover:!0,onDragStart:D,style:{cursor:"pointer"},className:t.tableRow,classes:{hover:t.hover,selected:t.selected},onClick:function(t){return function(t,n){var a=O.indexOf(n),i=[];-1===a?i=i.concat(O,n):0===a?i=i.concat(O.slice(1)):a===O.length-1?i=i.concat(O.slice(0,-1)):a>0&&(i=i.concat(O.slice(0,a),O.slice(a+1))),e.onClick(i),S(i)}(0,n.menuId)},role:"checkbox","aria-checked":r,tabIndex:-1,id:n.menuId,selected:r,children:[Object(R.jsx)(g.a,{padding:"checkbox",children:Object(R.jsx)(v.a,{checked:r,icon:Object(R.jsx)(k.a,{}),checkedIcon:Object(R.jsx)(I.a,{}),color:"primary",inputProps:{"aria-labelledby":o}})}),Object(R.jsx)(g.a,{component:"th",id:o,scope:"row",padding:"none",children:n.menuDesc}),Object(R.jsx)(g.a,{align:"right",children:n.accessView}),Object(R.jsx)(g.a,{align:"right",children:n.accessCreate}),Object(R.jsx)(g.a,{align:"right",children:n.accessUpdate}),Object(R.jsx)(g.a,{align:"right",children:n.accessDelete}),Object(R.jsx)(g.a,{align:"right",children:n.createdTime}),Object(R.jsx)(g.a,{align:"right",children:n.createdUser}),Object(R.jsx)(g.a,{align:"right",children:n.updatedTime}),Object(R.jsx)(g.a,{align:"right",children:n.updatedUser})]},n.menuId)})),M>0&&Object(R.jsx)(m.a,{style:{height:(_?33:53)*M},children:Object(R.jsx)(g.a,{colSpan:6})})]})]})})})}var B=n(232),P=n(33),J=n(833),D=n(831),M=n(834),A=n(207),W=n.n(A),E=n(210),q=n.n(E),H=n(832),Q=n(382),V=n.n(Q),G=(n(161),n(127)),$=(n(117),n(2));function X(e){var t=e.depthStep,n=void 0===t?10:t,i=e.depth,o=void 0===i?0:i,l=e.selected,d=e.dataSelected,b=(e.expanded,e.onClick),u=e.item,x=(e.theme,Object(B.a)(e,["depthStep","depth","selected","dataSelected","expanded","onClick","item","theme"])),j=p.a.useState(!1),h=Object(r.a)(j,2),g=h[0],f=(h[1],Object(P.useSelector)((function(e){return e.ColorTheme})));var O=Object(s.useState)(),m=Object(r.a)(O,2),y=m[0],v=m[1];Object(s.useEffect)((function(){v(d)}),[d]);Object($.f)();var S=Object(s.useState)(!1),I=Object(r.a)(S,2),C=(I[0],I[1],Object(P.useSelector)((function(e){return e.LoveMenu})),Object(P.useSelector)((function(e){return e.MenuData})),Object(P.useDispatch)(),Object(P.useSelector)((function(e){return e.RoleSelected})),u.menuDesc),k=u.menuUrl,w=u.menuId,T=u.menuChildren,z=(u.fav,u.menuIcon,u.menuType,u.menuParent);var L;return console.log(w,-1!==d.findIndex((function(e){return e==w}))),L=Array.isArray(T)&&T.length?g?Object(R.jsx)(W.a,{style:{color:"white"},className:V.a.sidebar_item_expand_arrow}):Object(R.jsx)(q.a,{style:{color:"white !important"},className:"".concat(V.a.sidebar_item_expand_arrow," ").concat(V.a.sidebar_item_expand_arrow_expanded)}):Object(R.jsx)("div",{style:{width:"55px",height:"100%"}}),Object(R.jsxs)(R.Fragment,{children:[Object(R.jsx)(D.a,Object(a.a)(Object(a.a)({className:"".concat(V.a.sidebar_item),onClick:function(e){""!=k&&-1==l.findIndex((function(e){return e.menuId==w}))&&b(w)},button:!0,id:w,draggable:""!=k?"true":"false",onDragStart:""!=k?function(e){1==e.target.draggable&&(e.target.id?e.dataTransfer.setData("srcId",e.target.id):e.dataTransfer.setData("srcId",e.target.parentNode.id))}:null},x),{},{children:Object(R.jsxs)("div",{style:{paddingLeft:o*n,background:-1!==l.findIndex((function(e){return e.menuId==w}))?"gray":-1!==(null===y||void 0===y?void 0:y.findIndex((function(e){return e==w})))?"blue":null,color:-1!==l.findIndex((function(e){return e.menuId==w}))?"#c4c4c4":null},className:V.a.sidebar_item_content,children:[T&&""==z?Object(R.jsx)(c.a,{icon:"dashboard",style:{fontSize:"25px"},className:V.a.sidebar_item_icon}):null,T&&""!=z?Object(R.jsx)("div",{style:{width:"30px",height:"100%"}}):null,L,Object(R.jsx)("div",{className:V.a.sidebar_item_text,children:C})]})})),Object(R.jsx)(H.a,{in:!g,timeout:"auto",unmountOnExit:!0,children:Array.isArray(T)?Object(R.jsx)(J.a,{disablePadding:!0,dense:!0,children:T.map((function(e,t){return Object(R.jsx)(p.a.Fragment,{children:"divider"===e?Object(R.jsx)(M.a,{style:{margin:"6px 0"}}):Object(R.jsx)("div",{style:{marginLeft:"15px"},children:Object(R.jsx)(X,{dataSelected:d,onClick:b,style:{color:"white","--color":f?G[f][0]:"","--colorSelected":f?G[f][2]:"","--colorBgHover":f?G[f][3]:"","--colorBgMenu":f?G[f][4]:""},className:V.a.hover,selected:l,item:e})})},"".concat(e.name).concat(t))}))}):null})]})}var Y=function(e){var t=e.expanded,n=e.option,a=e.selected,i=e.dataSelected,o=e.onClick,l=Object(s.useState)(!1),d=Object(r.a)(l,2),b=d[0],u=(d[1],Object(P.useSelector)((function(e){return e.ColorTheme}))),x=(Object(P.useSelector)((function(e){return e.MenuData})),Object(P.useSelector)((function(e){return e.RoleSelected})),Object(s.useState)()),j=Object(r.a)(x,2),h=j[0],g=j[1];Object(s.useEffect)((function(){g(i)}),[i]);var f=Object(s.useState)([]),O=Object(r.a)(f,2),m=(O[0],O[1],Object(s.useState)(!1)),y=Object(r.a)(m,2),v=y[0],S=y[1];return Object(P.useSelector)((function(e){return e.LoveMenu})),Object($.f)(),Object(R.jsx)(R.Fragment,{children:Object(R.jsxs)("div",{style:{height:"240px",overflow:b?null:"auto",minWidth:b?"40px":"300px",maxWidth:b?"40px":"450px","--colorBgMenu":u?G[u][4]:"","--color":u?G[u][0]:"",width:b?"40px":"300px"},className:"".concat(V.a.sidebar)+" drag_box2",children:[Object(R.jsxs)("div",{style:{display:b?"block":"none"},children:[Object(R.jsxs)("div",{style:{textAlign:"center"},children:[Object(R.jsx)("div",{onClick:function(e){S(!1)},style:{color:v?u?G[u][2]:"":"white",cursor:"pointer",margin:"auto",marginTop:"5px",marginBottom:"5px",width:"50%","--colorBgMenu":u?G[u][4]:"","--color":u?G[u][0]:"","--colorBgMenuAll":u?G[u][2]:""},children:Object(R.jsx)("span",{children:"All"})}),Object(R.jsx)("div",{onClick:function(e){S(!0)},style:{cursor:"pointer",margin:"auto",marginTop:"5px",marginBottom:"5px",width:"50%","--colorBgMenu":u?G[u][4]:"","--color":u?G[u][0]:"","--colorBgMenuAll":u?G[u][2]:""},children:Object(R.jsx)(c.a,{classname:V.a.heart,style:{color:"red",fontSize:"20px"},icon:v?"heart":"heart-o"})})]}),Object(R.jsx)("div",{children:Object(R.jsxs)("ul",{children:[Object(R.jsx)("li",{children:Object(R.jsx)(c.a,{style:{fontSize:"25px"},icon:"dashboard"})}),Object(R.jsx)("li",{children:Object(R.jsx)(c.a,{style:{fontSize:"25px"},icon:"dashboard"})}),Object(R.jsx)("li",{children:Object(R.jsx)(c.a,{style:{fontSize:"25px"},icon:"dashboard"})})]})})]}),Object(R.jsx)("div",{style:{display:b?"none":"block"},children:Object(R.jsx)(J.a,{disablePadding:!0,dense:!0,children:n.map((function(e,n){return Object(R.jsx)(p.a.Fragment,{children:"divider"===e?null:Object(R.jsx)(X,{onClick:o,dataSelected:h,style:{"--color":u?G[u][0]:"","--colorBgHover":u?G[u][3]:"","--colorBgMenu":u?G[u][4]:""},selected:a,className:V.a.hover,theme:u?G[u][4]:"",expanded:t,item:e})},"".concat(e.menuDesc).concat(n))}))})})]})})};function K(e){var t=Object(s.useState)(),n=Object(r.a)(t,2),l=(n[0],n[1],Object(s.useState)({roleid:"",rolename:"",createdTime:"",createdUser:"",pending:"",selected:[],option:[]})),p=Object(r.a)(l,2),u=p[0],x=p[1],j=Object(s.useState)([]),h=Object(r.a)(j,2),g=h[0],f=h[1],O=Object(s.useState)([]),m=Object(r.a)(O,2),y=m[0],v=m[1],S=Object(s.useState)(!1),I=Object(r.a)(S,2),C=I[0],k=I[1],w=Object(s.useState)([]),T=Object(r.a)(w,2),z=T[0],L=T[1],N=Object(s.useState)(),F=Object(r.a)(N,2),U=(F[0],F[1]),B=Object(s.useState)(),P=Object(r.a)(B,2),J=P[0],D=P[1];function M(e){var t=[];for(var n in e){t.push(e[n]);var a,r=M(e[n].menuChildren),o=Object(i.a)(r);try{for(o.s();!(a=o.n()).done;){var c=a.value;t.push(c)}}catch(l){o.e(l)}finally{o.f()}}return t}Object(s.useEffect)((function(){var e;if((null===(e=u.option)||void 0===e?void 0:e.length)>0){var t=M(u.option);D(t)}}),[u.option]),Object(s.useEffect)((function(){k(!0);var e={method:"get",url:Object(o.a)()+"/credential/role/detail?rowId=1&moduleId=ANT",headers:{"Content-Type":"application/json",Authorization:"Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg"}};d()(e).then((function(e){var t=JSON.parse(JSON.stringify(e.data.data.menu.selected));L(t),U(e.data.data.menu.selected),k(!1),x({roleid:e.data.data.role.roleId,rolename:e.data.data.role.roleName,createdTime:e.data.data.role.createdTime,createdUser:e.data.data.role.createdUser,pending:e.data.data.role.pending,selected:e.data.data.menu.selected,option:e.data.data.menu.option})})).catch((function(e){k(!1),console.log(e)}))}),[]);var A=Object(s.useState)(),W=Object(r.a)(A,2),E=(W[0],W[1],function(e){e.preventDefault()}),q=function(e){var t=e.dataTransfer.getData("srcId");if(!t)return!1;if(t){e.preventDefault();var n=e.target.classList.contains("drag_box1"),i=e.target.classList.contains("drag_box2");if(0==n){if(e.target.closest(".drag_box1")&&-1==u.selected.findIndex((function(e){return e.menuId==t}))){var r=u.selected,o=z.filter((function(e){return e.menuId==t})),c=J.filter((function(e){return e.menuId==t}));o?(r.push(o[0]),x(Object(a.a)(Object(a.a)({},u),{},{selected:r}))):(r.push(c[0]),x(Object(a.a)(Object(a.a)({},u),{},{selected:r})))}}else if(1==i){var l=u.selected.findIndex((function(e){return e.menuId==t})),d=u.selected;d.splice(l,1),x(Object(a.a)(Object(a.a)({},u),{},{selected:d}))}if(0==i)if(e.target.closest(".drag_box2")){var s=u.selected.findIndex((function(e){return e.menuId==t})),p=u.selected;p.splice(s,1),x(Object(a.a)(Object(a.a)({},u),{},{selected:p}))}}};return Object(R.jsxs)("div",{style:{position:"fixed",background:"rgba(0,0,0,0.5)",display:"flex",zIndex:100,justifyContent:"center",alignItems:"center",top:0,bottom:0,left:0,right:0},children:[C?Object(R.jsx)(b.a,{color:e.themeColorBgHover}):null,Object(R.jsxs)("div",{style:{boxShadow:"rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",position:"relative",background:"white",borderRadius:"10px",height:"600px",width:"1000px"},children:[Object(R.jsx)("div",{onClick:function(t){return n="close",void e.onClick(n);var n},style:{cursor:"pointer",position:"absolute",top:"10px",right:"20px"},children:Object(R.jsx)(c.a,{icon:"close"})}),Object(R.jsxs)("div",{style:{padding:"10px",marginLeft:"20px",marginTop:"10px",display:"flex",alignItems:"center"},children:[Object(R.jsx)("div",{style:{boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",border:"1px solid #3bbad6",background:"#e5f4f8",width:"50px",display:"flex",justifyContent:"center",alignItems:"center",padding:"10px",borderRadius:"50%"},children:Object(R.jsx)("img",{src:"/add.png",width:"25"})}),Object(R.jsxs)("div",{style:{},children:[Object(R.jsx)("span",{style:{marginLeft:"20px",fontFamily:"Poppinsbold",color:"#3bbad6",fontWeight:"bold",fontSize:"20px"},children:"DETAIL ROLE"}),"yes"==u.pending?Object(R.jsx)("div",{children:Object(R.jsx)("span",{style:{marginLeft:"20px",fontFamily:"Poppinsbold",color:"#3bbad6",fontWeight:"bold",fontSize:"10px"}})}):null]})]}),Object(R.jsxs)("div",{style:{padding:"20px",marginTop:"-30px",width:"800px",height:"150px",borderRadius:"5px"},children:[Object(R.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"Poppinsbold",color:"#575757",fontSize:"20px",fontWeight:"bold"},children:[Object(R.jsxs)("label",{style:{marginTop:"10px"},children:["Role Id ",Object(R.jsx)("span",{style:{color:"red"},children:"*"})]}),Object(R.jsx)("span",{style:{position:"absolute",right:"430px"},children:":"}),Object(R.jsx)("input",{readOnly:!0,value:u.roleid,name:"roleid",style:{width:"400px",height:"50px",background:"#CCCCCC",borderRadius:"10px",border:"1px solid #3bbad6",paddingLeft:"5px",paddingRight:"5px"}})]}),Object(R.jsxs)("div",{style:{position:"relative",marginTop:"10px",display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"Poppinsbold",color:"#575757",fontSize:"20px",fontWeight:"bold"},children:[Object(R.jsxs)("label",{style:{marginTop:"10px"},children:["Role Name ",Object(R.jsx)("span",{style:{color:"red"},children:"*"})]}),Object(R.jsx)("span",{style:{position:"absolute",right:"430px"},children:":"}),Object(R.jsx)("input",{readOnly:!0,value:u.rolename,name:"rolename",style:{width:"400px",background:"#CCCCCC",height:"50px",borderRadius:"10px",border:"1px solid #3bbad6",paddingLeft:"5px",paddingRight:"5px"}})]}),Object(R.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"Poppinsbold",color:"#575757",fontSize:"20px",fontWeight:"bold"},children:[Object(R.jsx)("label",{children:"Menu Access"}),Object(R.jsx)("span",{style:{position:"absolute",right:"430px"},children:":"}),Object(R.jsxs)("span",{style:{width:"400px"},children:[u.selected?u.selected.length:0," Selected"]})]})]}),Object(R.jsx)("div",{style:{background:"#cccccc",border:"1px solid #3bbad6",margin:"auto 20px",marginTop:"20px",width:"95%",height:"330px",borderRadius:"20px"},children:Object(R.jsxs)("div",{onDragOver:E,onDrop:q,style:{display:"flex"},children:[Object(R.jsxs)("div",{children:[Object(R.jsx)("div",{style:{fontFamily:"Poppinsbold",fontWeight:"bold",color:"#575757",marginTop:"20px",marginLeft:"30px",fontSize:"20px"},children:Object(R.jsx)("span",{children:"List of Menu : "})}),Object(R.jsx)("div",{className:"drag_box",style:{width:"300px",overflow:"auto",borderRadius:"20px",height:"240px",background:"#e5f4f8",marginTop:"20px",marginLeft:"20px"},children:Object(R.jsx)(Y,{dataSelected:y,onClick:function(e){console.log(e);var t=y.findIndex((function(t){return t==e}));if(-1==t){var n=y;n.push(e),v(n)}else y.splice(t,1)},selected:u.selected,option:u.option})})]}),Object(R.jsxs)("div",{style:{width:"30px",marginLeft:"-20px",height:"320px",paddingTop:"70px",textAlign:"center"},children:[Object(R.jsx)("div",{onClick:function(){x(Object(a.a)(Object(a.a)({},u),{},{selected:[]})),f([])},style:{cursor:"pointer",marginTop:"20px",background:"#3bbad6",display:"flex",alignItems:"center",justifyContent:"center",color:"white",border:"1px solid white",borderRadius:"10px",width:"30px",height:"30px"},children:Object(R.jsx)(c.a,{style:{fontSize:"25px"},icon:"angle-double-left"})}),Object(R.jsx)("div",{onClick:function(){if(0==g.length)alert("no data Selected");else{var e,t=Object(i.a)(g);try{var n=function(){var t=e.value,n=u.selected.findIndex((function(e){return e.menuId==t})),i=u.selected;i.splice(n,1),x(Object(a.a)(Object(a.a)({},u),{},{selected:i}))};for(t.s();!(e=t.n()).done;)n()}catch(r){t.e(r)}finally{t.f()}f([])}},style:{cursor:"pointer",marginTop:"20px",background:"#3bbad6",display:"flex",alignItems:"center",justifyContent:"center",color:"white",border:"1px solid white",borderRadius:"10px",width:"30px",height:"30px"},children:Object(R.jsx)(c.a,{style:{fontSize:"25px"},icon:"angle-left"})}),Object(R.jsx)("div",{onClick:function(){if(0==y.length)alert("no data Selected");else{var e,t=Object(i.a)(y);try{var n=function(){var t=e.value,n=J.filter((function(e){return e.menuId==t})),i=u.selected;i.push(n[0]),x(Object(a.a)(Object(a.a)({},u),{},{selected:i}))};for(t.s();!(e=t.n()).done;)n()}catch(r){t.e(r)}finally{t.f()}v([])}},style:{cursor:"pointer",marginTop:"20px",background:"#3bbad6",display:"flex",alignItems:"center",justifyContent:"center",color:"white",border:"1px solid white",borderRadius:"10px",width:"30px",height:"30px"},children:Object(R.jsx)(c.a,{style:{fontSize:"25px"},icon:"angle-right"})}),Object(R.jsx)("div",{onClick:function(){var e=J.filter((function(e){return""!=e.menuUrl}));x(Object(a.a)(Object(a.a)({},u),{},{selected:e})),v([])},style:{cursor:"pointer",marginTop:"20px",background:"#3bbad6",display:"flex",alignItems:"center",justifyContent:"center",color:"white",border:"1px solid white",borderRadius:"10px",width:"30px",height:"30px"},children:Object(R.jsx)(c.a,{style:{fontSize:"25px"},icon:"angle-double-right"})})]}),Object(R.jsx)("div",{className:"drag_box1",style:{width:"570px",borderRadius:"20px",height:"310px",background:"#e5f4f8",marginTop:"10px",marginLeft:"5px"},children:Object(R.jsx)(_,{onDragOver:E,onDrop:q,onClick:function(e){f(e)},data:u.selected,dataSelected:g})})]})}),Object(R.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center"},children:[Object(R.jsx)("div",{onClick:function(){var e=JSON.parse(JSON.stringify(z));x(Object(a.a)(Object(a.a)({},u),{},{selected:e})),console.log(z)},style:{borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid #3bbad6",cursor:"pointer",fontWeight:"bold",fontFamily:"Poppinsbold",color:"#3bbad6",paddingLeft:"5px",paddingRight:"5px",paddingTop:"5px",paddingBottom:"5px",marginTop:"5px",marginRight:"10px"},children:Object(R.jsx)("span",{children:"Reset"})}),Object(R.jsx)("div",{onClick:function(){k(!0);var t={method:"post",url:"https://api.adapro.tech/credential/role/mapping?Authorization=Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg",headers:{"Content-Type":"application/json"},data:JSON.stringify({id:1,selected:[{menuId:"001",selected:"inc"},{menuId:"002",selected:"inc"},{menuId:"003",selected:"yes"}]})};d()(t).then((function(t){k(!1),e.onClick(t.data),console.log(JSON.stringify(t.data))})).catch((function(e){k(!1),console.log(e)}))},style:{borderRadius:"10px",border:"2px solid #3bbad6",cursor:"pointer",fontWeight:"bold",fontFamily:"Poppinsbold",background:"#3bbad6",color:"white",paddingLeft:"5px",paddingRight:"5px",paddingTop:"5px",paddingBottom:"5px",marginTop:"5px",marginRight:"20px"},children:Object(R.jsx)("span",{children:"Save"})})]})]})]})}},396:function(e,t,n){"use strict";n.d(t,"a",(function(){return b}));var a=n(84),i=n(860),r=n(0),o=n(168),c=n(99),l=n(87),d=n.n(l),s=n(86),p=n(4);function b(e){var t=Object(r.useState)(!1),n=Object(a.a)(t,2),l=n[0],b=n[1],u=Object(r.useState)(""),x=Object(a.a)(u,2),j=x[0],h=x[1],g=Object(r.useState)(!1),f=Object(a.a)(g,2),O=f[0],m=f[1];return Object(p.jsxs)("div",{style:{background:"rgba(0,0,0,0.3)",zIndex:100,display:"flex",justifyContent:"center",alignItems:"center",position:"fixed",top:0,left:0,right:0,bottom:0},children:[O?Object(p.jsx)(c.a,{color:e.themeColorBgHover}):null,Object(p.jsx)(o.a,{themeColor:e.themeColor,themeColorBgHover:e.themeColorBgHover,open:l,onClick:function(t){if("no"==t)b(!1);else if("yes"==t){b(!1),m(!0);var n={method:"put",url:Object(s.a)()+"/general/user/filter",headers:{"Content-Type":"application/json",Authorization:"Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTQ3MzY0NDUsImlzcyI6Ik5vbmUiLCJ1c2VybmFtZSI6ImFkbWluIn0.kpa0UQiOVOm1tG8ROCIzfi3iQUTeulf9fd8z0t_6fsJXmjO2eEujShFstjqSc85blXmz-BlEx6GFO5KIAE--pg"}};d()(n).then((function(t){m(!1),e.onClick(t.data,1),console.log(JSON.stringify(t.data))})).catch((function(t){m(!1),e.onClick(t.response.data,1),console.log(t)}))}}}),Object(p.jsxs)("div",{style:{position:"relative",background:"white",borderRadius:"15px",width:"600px",height:"300px"},children:[Object(p.jsx)("div",{onClick:function(t){return n="close",void e.onClick(n);var n},style:{fontFamily:"Poppinsbold",cursor:"pointer",position:"absolute",top:"5px",right:"30px",fontSize:"30px"},children:Object(p.jsx)(i.a,{icon:"close"})}),Object(p.jsxs)("div",{style:{padding:"10px",marginLeft:"20px",marginTop:"10px",display:"flex",alignItems:"center"},children:[Object(p.jsx)("div",{style:{boxShadow:"rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",border:"1px solid #3bbad6",background:"#e5f4f8",width:"50px",display:"flex",justifyContent:"center",alignItems:"center",padding:"10px",borderRadius:"50%"},children:Object(p.jsx)("img",{src:"/network.png",width:"25"})}),Object(p.jsxs)("span",{style:{marginLeft:"20px",fontFamily:"Poppinsbold",color:"#3bbad6",fontWeight:"bold",fontSize:"20px"},children:[e.name," Save As"]})]}),Object(p.jsxs)("div",{style:{background:"#e5f4f8",marginTop:"20px",marginLeft:"20px",marginRight:"20px",height:"120px",border:"1px solid #c4c4c4"},children:[Object(p.jsx)("label",{style:{fontFamily:"Poppinsbold",fontSize:"20px",marginLeft:"20px",marginTop:"20px"},children:"Nama Filter"}),Object(p.jsx)("br",{}),Object(p.jsx)("input",{onChange:function(e){h(e.target.value)},value:j,style:{fontFamily:"Poppinsbold",fontSize:"20px",marginLeft:"20px",marginTop:"0px",width:"530px",height:"40px",borderRadius:"10px",border:"1px solid #3bbad6"}})]}),Object(p.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center"},children:[Object(p.jsx)("div",{onClick:function(){h("")},style:{borderRadius:"10px",border:"2px solid #3bbad6",cursor:"pointer",fontWeight:"bold",fontFamily:"Poppinsbold",color:"#3bbad6",paddingLeft:"20px",paddingRight:"20px",paddingTop:"10px",paddingBottom:"10px",marginTop:"10px",marginRight:"20px"},children:Object(p.jsx)("span",{children:"Reset"})}),Object(p.jsx)("div",{onClick:function(){""==j||b(!0)},style:{borderRadius:"10px",border:"2px solid #3bbad6",cursor:"pointer",fontWeight:"bold",fontFamily:"Poppinsbold",background:"#3bbad6",color:"white",paddingLeft:"20px",paddingRight:"20px",paddingTop:"10px",paddingBottom:"10px",marginTop:"10px",marginRight:"20px"},children:Object(p.jsx)("span",{children:"Save"})})]})]})]})}},397:function(e,t,n){"use strict";var a=n(115),i=n(166),r=n(167),o=n(182),c=n(181),l=n(91),d=n(0),s=n(567),p=n(705),b=n.n(p),u=(n(398),n(755),n(776),n(777),n(4));b.a.operators.is_empty.label="Is Null",b.a.operators.is_empty.sqlOp="IS NULL",b.a.operators.is_not_empty.label="Is Not Null",b.a.operators.is_not_empty.sqlOp="IS NOT NULL",delete b.a.operators.proximity;var x=b.a,j=Object(l.a)(Object(l.a)({},x),{},{funcs:{LOWER:{label:"Lowercase",mongoFunc:"$toLower",jsonLogic:function(e){return{method:[e.str,"toLowerCase"]}},returnType:"text",args:{str:{label:"String",type:"text",valueSources:["value"]}}},MONTH:{label:"Month",mongoFunc:"$Month",sqlFunc:"MONTH",jsonLogic:function(e){return{method:[e.str,"toLowerCase"]}},returnType:"date",args:{str:{label:"String",type:"date",valueSources:["value"]}}},DAY:{label:"Day",sqlFunc:"DAY",returnType:"date",args:{str:{label:"String",type:"date",valueSources:["value"]}}},YEAR:{label:"Year",mongoFunc:"$Month",sqlFunc:"Year",jsonLogic:function(e){return{method:[e.str,"toLowerCase"]}},returnType:"date",args:{str:{label:"String",type:"date",valueSources:["value"]}}}},fields:{qty:{label:"Qty",type:"number",fieldSettings:{min:0},valueSources:["value"],preferWidgets:["number"]},price:{label:"Price",type:"number",valueSources:["value"],fieldSettings:{min:10,max:100},preferWidgets:["slider","rangeslider"]},color:{label:"Color",type:"select",valueSources:["value"],fieldSettings:{listValues:[{value:"yellow",title:"Yellow"},{value:"green",title:"Green"},{value:"orange",title:"Orange"}]}},is_promotion:{label:"Promo?",type:"boolean",operators:["equal"],valueSources:["value"]}}}),h={id:s.Utils.uuid(),type:"group"},g=function(e){Object(o.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={tree:s.Utils.checkTree(s.Utils.loadTree(h),j),config:j},e.render=function(){return Object(u.jsxs)("div",{children:[Object(u.jsx)(s.Query,Object(l.a)(Object(l.a)({},j),{},{value:e.state.tree,onChange:e.onChange,renderBuilder:e.renderBuilder})),e.renderResult(e.state)]})},e.renderBuilder=function(e){return Object(u.jsx)("div",{className:"query-builder-container",style:{padding:"10px"},children:Object(u.jsx)("div",{className:"query-builder  ",children:Object(u.jsx)(s.Builder,Object(l.a)({},e))})})},e.renderResult=function(e){var t=e.tree,n=e.config;return Object(u.jsx)("div",{className:"query-builder-result",children:Object(u.jsxs)("div",{children:["SQL where: ",Object(u.jsx)("pre",{children:JSON.stringify(s.Utils.sqlFormat(t,n))})]})})},e.onChange=function(t,n){e.setState({tree:t,config:n});var a=s.Utils.getTree(t);e.props.onChange(a)},e}return Object(r.a)(n,[{key:"componentWillMount",value:function(){var e,t={},n=Object(a.a)(this.props.data);try{for(n.s();!(e=n.n()).done;){var i=e.value;t[i.fieldName]={label:i.fieldDesc,type:"text",valueSources:["value"]}}}catch(o){n.e(o)}finally{n.f()}var r=this.state.config;r.fields=t,this.props.filter?this.setState(Object(l.a)(Object(l.a)({},this.state),{},{tree:s.Utils.checkTree(s.Utils.loadTree(JSON.parse(this.props.filter[0].uiJson)),r),config:r})):this.setState(Object(l.a)(Object(l.a)({},this.state),{},{tree:s.Utils.checkTree(s.Utils.loadTree(h),r),config:r}))}}]),n}(d.Component);t.a=g},776:function(e,t,n){}}]);
//# sourceMappingURL=5.1fa47946.chunk.js.map