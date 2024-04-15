import{j as n}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as c}from"./index-z5U8iC57.js";import{r as u}from"./index-BBkUAzwr.js";import{u as f}from"./useInteractions-I9HJ-Vea.js";import{u as p}from"./useUncontrolled-Bi52Fxjv.js";function a({children:e}){return n.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:16},children:e})}a.__docgenInfo={description:"",methods:[],displayName:"Center",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function d({zoom:e}){return n.jsx(n.Fragment,{children:n.jsx("div",{style:{width:150,height:150,left:75*e.k,top:75*e.k,position:"absolute",border:"1px solid black",transform:`translate(${e.x}px, ${e.y}px) scale(${e.k})`,transformOrigin:"0 0",display:"flex",justifyContent:"center",alignItems:"center"},children:n.jsxs("div",{style:{display:"flex",flexDirection:"column",userSelect:"none"},children:[n.jsxs("div",{children:["k: ",e.k.toPrecision(2)]}),n.jsxs("div",{children:["x: ",e.x.toPrecision(2)]}),n.jsxs("div",{children:["y: ",e.y.toPrecision(2)]})]})})})}d.__docgenInfo={description:"",methods:[],displayName:"TransformTester",props:{zoom:{required:!0,tsType:{name:"ZoomTransform"},description:""}}};function x(e,t={}){const[m,o]=p({value:t.value,defaultValue:t.defaultValue||{x:0,y:0,k:1},onChange:t.onChange});return f(e,{onDrag:s=>{o(r=>({x:r.x+s.movementX,y:r.y+s.movementY,k:r.k}))}}),{zoom:m,setZoom:o}}function l(){const e=u.useRef(),{zoom:t}=x(e,{});return n.jsx(a,{children:n.jsx("div",{ref:e,style:{position:"relative",width:300,height:300,overflow:"hidden",border:"1px dashed black"},children:n.jsx(d,{zoom:t})})})}l.__docgenInfo={description:"",methods:[],displayName:"Demo1"};function i(e){const t={code:"code",p:"p",pre:"pre",...c(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsxs(t.p,{children:[n.jsx(t.code,{children:"usePan"})," controls the panning interaction and can be both controlled and uncontrolled."]}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-tsx",children:`import { useRef } from "react";
import { usePan } from "hyprvis";

export function Demo1 () {
    const ref = useRef();
    const { zoom } = usePan(interactionRef);

    return <div ref={ref}>
      {/* Apply zoom transform on elements here */}
    </div>
}
`})}),`
`,n.jsx(l,{})]})}function k(e={}){const{wrapper:t}={...c(),...e.components};return t?n.jsx(t,{...e,children:n.jsx(i,{...e})}):i(e)}export{k as default};
