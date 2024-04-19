import{j as n}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as C}from"./index-z5U8iC57.js";import{r as y}from"./index-BBkUAzwr.js";import{C as k}from"./Center-DuSRiu9E.js";import{u as v}from"./useInteractions-fLLa9C_C.js";import{c as a}from"./util-co6UzHBn.js";import{u as I}from"./useControlledUncontrolled-BegJw1Lv.js";import{B as D}from"./Brushable-C-Nt9MTs.js";function $(o,e={}){const[u,m]=I({value:e.value,onChange:e.onChange,defaultValue:e.defaultValue}),f=y.useRef(e);return f.current=e,v(o,{onDrag:t=>{var l,c;const x=o.current.getBoundingClientRect(),s={x1:Math.min(t.anchor.x,t.end.x),y1:Math.min(t.anchor.y,t.end.y),x2:Math.max(t.anchor.x,t.end.x),y2:Math.max(t.anchor.y,t.end.y)};e.direction==="horizontal"?(s.y1=0,s.y2=x.height):e.direction==="vertical"&&(s.x1=0,s.x2=x.width),s.x1=a(s.x1,0,x.width),s.y1=a(s.y1,0,x.height),s.x2=a(s.x2,0,x.width),s.y2=a(s.y2,0,x.height),m(s),(c=(l=f.current).onChange)==null||c.call(l,s)}}),{brush:u,setBrush:m}}const r=6,d="transparent",h=8,g=1;function j({parent:o,brush:e,direction:u="both",onChange:m}){const f=y.useRef(void 0),t=y.useId(),x=y.useRef({onChange:m});return x.current={onChange:m},v(f,{onClick:()=>{var s,l;(l=(s=x.current).onChange)==null||l.call(s,null)},onDrag:s=>{var w,B;const l=o.current.getBoundingClientRect(),c={x:s.clientX-l.left,y:s.clientY-l.top},i={...e};switch(s.target.id){case t:{const _=e.x2-e.x1,E=e.y2-e.y1;i.x1=a(c.x-s.anchor.x,0,l.width-_),i.y1=a(c.y-s.anchor.y,0,l.height-E),i.x2=i.x1+e.x2-e.x1,i.y2=i.y1+e.y2-e.y1;break}case`${t}-west`:i.x1=a(c.x,0,e.x2-h);break;case`${t}-ost`:i.x2=a(c.x,e.x1+h,l.width);break;case`${t}-north`:i.y1=a(c.y,0,e.y2-h);break;case`${t}-south`:i.y2=a(c.y,e.y1+h,l.height);break;case`${t}-northwest`:i.x1=a(c.x,0,e.x2-h),i.y1=a(c.y,0,e.y2-h);break;case`${t}-northeast`:i.x2=a(c.x,e.x1+h,l.width),i.y1=a(c.y,0,e.y2-h);break;case`${t}-southwest`:i.x1=a(c.x,0,e.x2-h),i.y2=a(c.y,e.y1+h,l.height);break;case`${t}-southeast`:i.x2=a(c.x,e.x1+h,l.width),i.y2=a(c.y,e.y1+h,l.height);break}(i.x1!==e.x1||i.x2!==e.x2||i.y1!==e.y1||i.y2!==e.y2)&&((B=(w=x.current).onChange)==null||B.call(w,i))}}),n.jsxs("g",{ref:f,children:[n.jsx("rect",{id:t,x:e.x1+g,y:e.y1+g,width:e.x2-e.x1-g*2,height:e.y2-e.y1-g*2,stroke:"#24292e",fill:"#24292e",fillOpacity:.1,strokeDasharray:3,cursor:"move"}),u!=="horizontal"?n.jsxs(n.Fragment,{children:[n.jsx("rect",{id:`${t}-south`,x:e.x1,y:e.y2-r/2,width:e.x2-e.x1,height:r,fill:d,cursor:"ns-resize"}),n.jsx("rect",{id:`${t}-north`,x:e.x1,y:e.y1-r/2,width:e.x2-e.x1,height:r,fill:d,cursor:"ns-resize"})]}):null,u!=="vertical"?n.jsxs(n.Fragment,{children:[n.jsx("rect",{id:`${t}-west`,x:e.x1-r/2,y:e.y1,width:r,height:e.y2-e.y1,fill:d,cursor:"ew-resize"}),n.jsx("rect",{id:`${t}-ost`,x:e.x2-r/2,y:e.y1,width:r,height:e.y2-e.y1,fill:d,cursor:"ew-resize"})]}):null,u==="both"?n.jsxs(n.Fragment,{children:[n.jsx("rect",{id:`${t}-northwest`,x:e.x1-r/2,y:e.y1-r/2,width:r,height:r,cursor:"nwse-resize",fill:d}),n.jsx("rect",{id:`${t}-northeast`,x:e.x2-r/2,y:e.y1-r/2,width:r,height:r,cursor:"nesw-resize",fill:d}),n.jsx("rect",{id:`${t}-southwest`,x:e.x1-r/2,y:e.y2-r/2,width:r,height:r,cursor:"nesw-resize",fill:d}),n.jsx("rect",{id:`${t}-southeast`,x:e.x2-r/2,y:e.y2-r/2,width:r,height:r,cursor:"nwse-resize",fill:d})]}):null]})}j.__docgenInfo={description:"Brush with draggable borders",methods:[],displayName:"BrushRect",props:{brush:{required:!0,tsType:{name:"Brush"},description:""},direction:{required:!1,tsType:{name:"union",raw:'"horizontal" | "vertical" | "both"',elements:[{name:"literal",value:'"horizontal"'},{name:"literal",value:'"vertical"'},{name:"literal",value:'"both"'}]},description:"",defaultValue:{value:"'both'",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(brush: { x1: number, y1: number, x2: number, y2: number }) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ x1: number, y1: number, x2: number, y2: number }",signature:{properties:[{key:"x1",value:{name:"number",required:!0}},{key:"y1",value:{name:"number",required:!0}},{key:"x2",value:{name:"number",required:!0}},{key:"y2",value:{name:"number",required:!0}}]}},name:"brush"}],return:{name:"void"}}},description:""},parent:{required:!0,tsType:{name:"ReactRefObject",raw:"React.RefObject<SVGSVGElement>",elements:[{name:"SVGSVGElement"}]},description:""}}};function z(){const o=y.useRef(),{brush:e,setBrush:u}=$(o);return n.jsx(k,{children:n.jsx(D,{ref:o,children:e?n.jsx(j,{parent:o,brush:e,direction:"both",onChange:u}):null})})}z.__docgenInfo={description:"",methods:[],displayName:"Demo1"};function p(){const o=y.useRef(),[e,u]=y.useState(null);return $(o,{value:e,onChange:u}),n.jsx(k,{children:n.jsx(D,{ref:o,children:e?n.jsx(j,{parent:o,brush:e,direction:"both",onChange:u}):null})})}p.__docgenInfo={description:"",methods:[],displayName:"Demo2"};function R(o){const e={code:"code",h2:"h2",p:"p",pre:"pre",...C(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(e.h2,{id:"brush",children:"Brush"}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"useBrush"})," hook makes the given element brushable."]}),`
`,n.jsx(z,{}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useBrush } from 'hyprvis';

function BrushDemo() {
    const ref = useRef();
    const { brush, setBrush } = useBrush(ref);

    return <svg ref={ref}>
        {
            brush ? <BrushRect parent={ref} direction="both" onChange={(brush) => {
            setBrush(brush)
        }} brush={brush} /> : null }
    </svg>
}
`})}),`
`,n.jsx(e.h2,{id:"direction",children:"Direction"}),`
`,n.jsxs(e.p,{children:["The ",n.jsx(e.code,{children:"direction"})," prop can control if the brush is only vertical or horizontal, filling the other axis completely."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-tsx",children:`import { useBrush } from 'hyprvis';

function BrushDemo() {
    const ref = useRef();
    const { brush, setBrush } = useBrush(ref);

    return <svg ref={ref}>
        {
            brush ? <BrushRect parent={ref} direction="vertical" onChange={(brush) => {
            setBrush(brush)
        }} brush={brush} /> : null }
    </svg>
}
`})}),`
`,n.jsx(e.h2,{id:"controlled",children:"Controlled"}),`
`,n.jsx(p,{}),`
`,n.jsx(p,{})]})}function G(o={}){const{wrapper:e}={...C(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(R,{...o})}):R(o)}export{G as default};
