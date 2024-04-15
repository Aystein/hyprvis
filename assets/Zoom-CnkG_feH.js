import{j as n}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as s}from"./index-z5U8iC57.js";import{d as r}from"./index-CkHUze1f.js";import{Wheel as m,ControlledWheel as c}from"./Wheel.stories-D8bpEiYL.js";import"./index-BBkUAzwr.js";import"./iframe-C2ogUlyR.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-Dkj0J1ds.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";import"./useUncontrolled-Bi52Fxjv.js";function t(e){const o={code:"code",h2:"h2",p:"p",pre:"pre",...s(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(o.h2,{id:"zoom",children:"Zoom"}),`
`,n.jsxs(o.p,{children:["The ",n.jsx(o.code,{children:"useZoom"})," hook returns a zoom transform that can be used to scale elements."]}),`
`,n.jsx(r,{of:m}),`
`,n.jsx(o.h2,{id:"uncontrolled",children:"Uncontrolled"}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`import { useZoom } from 'hyprvis';

function UncontrolledZoom() {
  const ref = useRef();
  const { zoom } = useZoom(ref);

  return (
    <div ref={ref}>
      {/* Content goes here */}
    </div>
  );
}
`})}),`
`,n.jsx(o.h2,{id:"controlled",children:"Controlled"}),`
`,n.jsx(o.pre,{children:n.jsx(o.code,{className:"language-tsx",children:`import { useZoom } from 'hyprvis';

function UncontrolledZoom() {
  const ref = useRef();
  const [zoom, setZoom] = useState({ k: 1, x: 0, y: 0 });

  useZoom(ref, {
    value: zoom,
    onChange: setZoom
  });

  return (
    <div ref={ref}>
      {/* Content goes here */}
    </div>
  );
}
`})}),`
`,n.jsx(r,{of:c})]})}function C(e={}){const{wrapper:o}={...s(),...e.components};return o?n.jsx(o,{...e,children:n.jsx(t,{...e})}):t(e)}export{C as default};
