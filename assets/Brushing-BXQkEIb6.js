import{j as r}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as o}from"./index-z5U8iC57.js";import{d as s}from"./index-CkHUze1f.js";import{BothBrush as h,VerticalBrush as i}from"./Brush.stories-Dj8m5GPA.js";import"./index-BBkUAzwr.js";import"./iframe-C2ogUlyR.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-Dkj0J1ds.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";import"./useInteractions-I9HJ-Vea.js";import"./util-co6UzHBn.js";function t(e){const n={code:"code",h2:"h2",p:"p",pre:"pre",...o(),...e.components};return r.jsxs(r.Fragment,{children:[r.jsx(n.h2,{id:"brush",children:"Brush"}),`
`,r.jsxs(n.p,{children:["The ",r.jsx(n.code,{children:"useBrush"})," hook makes the given element brushable."]}),`
`,r.jsx(s,{of:h}),`
`,r.jsx(n.pre,{children:r.jsx(n.code,{className:"language-tsx",children:`import { useBrush } from 'hyprvis';

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
`,r.jsx(n.h2,{id:"direction",children:"Direction"}),`
`,r.jsxs(n.p,{children:["The ",r.jsx(n.code,{children:"direction"})," prop can control if the brush is only vertical or horizontal, filling the other axis completely."]}),`
`,r.jsx(s,{of:i}),`
`,r.jsx(n.pre,{children:r.jsx(n.code,{className:"language-tsx",children:`import { useBrush } from 'hyprvis';

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
`})})]})}function v(e={}){const{wrapper:n}={...o(),...e.components};return n?r.jsx(n,{...e,children:r.jsx(t,{...e})}):t(e)}export{v as default};
