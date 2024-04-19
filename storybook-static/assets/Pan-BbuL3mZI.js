import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as m}from"./index-z5U8iC57.js";import{r as u}from"./index-BBkUAzwr.js";import{C as f}from"./Center-DuSRiu9E.js";import{T as l}from"./TransformTester-RHYhutx2.js";import{u as d}from"./useInteractions-fLLa9C_C.js";import{u as p}from"./useControlledUncontrolled-BegJw1Lv.js";import{B as x}from"./Brushable-C-Nt9MTs.js";function h(o,n={}){const[i,t]=p({value:n.value,defaultValue:n.defaultValue||{x:0,y:0,k:1},onChange:n.onChange});return d(o,{onDrag:s=>{t(r=>({x:r.x+s.movementX,y:r.y+s.movementY,k:r.k}))}}),{zoom:i,setZoom:t}}function c(){const o=u.useRef(),{zoom:n}=h(o,{});return e.jsx(f,{children:e.jsx(x,{ref:o,children:e.jsx(l,{zoom:n})})})}c.__docgenInfo={description:"",methods:[],displayName:"Demo1"};function a(o){const n={code:"code",p:"p",pre:"pre",...m(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsxs(n.p,{children:[e.jsx(n.code,{children:"usePan"})," controls the panning interaction and can be both controlled and uncontrolled."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { useRef } from "react";
import { usePan } from "hyprvis";

export function Demo1 () {
    const ref = useRef();
    const { zoom } = usePan(interactionRef);

    return <div ref={ref}>
      {/* Apply zoom transform on elements here */}
    </div>
}
`})}),`
`,e.jsx(c,{})]})}function M(o={}){const{wrapper:n}={...m(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(a,{...o})}):a(o)}export{M as default};
