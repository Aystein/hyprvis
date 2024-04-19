import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as s}from"./index-z5U8iC57.js";import{r as i}from"./index-BBkUAzwr.js";import{C as a}from"./Center-DuSRiu9E.js";import{T as c}from"./TransformTester-RHYhutx2.js";import{B as h}from"./Brushable-C-Nt9MTs.js";import{u as d}from"./useZoom-VqVyRuhW.js";import"./useControlledUncontrolled-BegJw1Lv.js";function t(){const o=i.useRef(),{value:n}=d(o);return e.jsx(a,{children:e.jsx(h,{ref:o,children:e.jsx(c,{zoom:n})})})}t.__docgenInfo={description:"",methods:[],displayName:"ZoomUsage"};function r(o){const n={code:"code",h3:"h3",h4:"h4",p:"p",pre:"pre",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h3,{id:"demo",children:"Demo"}),`
`,e.jsx(t,{}),`
`,e.jsx(n.h3,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { useRef } from "react";
import { Center } from "../Center";
import { TransformTester } from "../TransformTester";
import { Brushable } from "../Brushable";
import { useZoom } from "hyprvis";

export function ZoomUsage () {
    const interactionRef = useRef();
    const { value } = useZoom(interactionRef);

    return <Center>
        <Brushable ref={interactionRef}>
            <TransformTester zoom={value} />
        </Brushable>
    </Center>
}
`})}),`
`,e.jsx(n.h3,{id:"api",children:"API"}),`
`,e.jsx(n.h4,{id:"value",children:e.jsx(n.code,{children:"value"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`value?: ZoomTransform
`})}),`
`,e.jsxs(n.p,{children:["Optional value that can be used to control the ",e.jsx(n.code,{children:"useZoom"})," hook in conjunction with ",e.jsx(n.code,{children:"onChange"}),"."]}),`
`,e.jsx(n.h4,{id:"onchange",children:e.jsx(n.code,{children:"onChange"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`onChange?: (value: ZoomTransform) => void
`})}),`
`,e.jsx(n.p,{children:"Event that is fired whenever the zoom changes. This is useful for controlling the state of this hook."}),`
`,e.jsx(n.h4,{id:"direction",children:e.jsx(n.code,{children:"direction"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`direction?: 'x' | 'y' | 'xy'
`})}),`
`,e.jsx(n.p,{children:"Restricts the orientation of the zoom to the given axis. Useful when zooming on scales for instance."}),`
`,e.jsx(n.h4,{id:"constraint",children:e.jsx(n.code,{children:"constraint"})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`constraint?: (transform: ZoomTransform) => ZoomTransform
`})}),`
`,e.jsx(n.p,{children:"The constraint that is applied on the transform. The default constraint will force it to be withing the extent (width, height)."})]})}function T(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(r,{...o})}):r(o)}export{T as default};
