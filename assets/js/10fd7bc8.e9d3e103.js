"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[152],{3462:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>m,contentTitle:()=>u,default:()=>f,frontMatter:()=>h,metadata:()=>x,toc:()=>p});var o=s(4848),t=s(8453),i=s(6540),r=s(2992),a=s(7058),c=s(9851),l=s(9292);function d(){const e=(0,i.useRef)(),{value:n}=(0,a.x3)(e,{constraint:e=>e}),s=(0,i.useMemo)((()=>(0,r.A)().domain(c.b8).range([0,300])),[]),t=(0,i.useMemo)((()=>(0,r.A)().domain(c.iK).range([300,0])),[]);return(0,o.jsx)(l.o,{children:(0,o.jsx)(a.Pg,{ref:e,children:(0,o.jsx)(c.fB,{xScale:(0,a.QW)(n,s),yScale:(0,a.Vg)(n,t),selection:[]})})})}const h={},u=void 0,x={id:"hooks/usePan",title:"usePan",description:"Demo",source:"@site/docs/hooks/usePan.mdx",sourceDirName:"hooks",slug:"/hooks/usePan",permalink:"/hyprvis/hooks/usePan",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useLasso",permalink:"/hyprvis/hooks/useLasso"},next:{title:"useZoom",permalink:"/hyprvis/hooks/useZoom"}},m={},p=[{value:"Demo",id:"demo",level:3},{value:"Usage",id:"usage",level:3},{value:"API",id:"api",level:3},{value:"<code>value</code>",id:"value",level:4},{value:"<code>onChange</code>",id:"onchange",level:4},{value:"<code>direction</code>",id:"direction",level:4},{value:"<code>constraint</code>",id:"constraint",level:4}];function j(e){const n={code:"code",h3:"h3",h4:"h4",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h3,{id:"demo",children:"Demo"}),"\n",(0,o.jsx)(n.p,{children:"Use the mouse to move the datasaurus."}),"\n",(0,o.jsx)(d,{}),"\n",(0,o.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"export function PanUsage () {\n    const interactionRef = useRef();\n    const { zoom } = usePan(interactionRef, {});\n\n    return <Center>\n        <Brushable ref={interactionRef}>\n            <TransformTester zoom={zoom} />\n        </Brushable>\n    </Center>\n}\n"})}),"\n",(0,o.jsx)(n.h3,{id:"api",children:"API"}),"\n",(0,o.jsx)(n.h4,{id:"value",children:(0,o.jsx)(n.code,{children:"value"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"value?: ZoomTransform\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Optional value that can be used to control the ",(0,o.jsx)(n.code,{children:"usePan"})," hook in conjunction with ",(0,o.jsx)(n.code,{children:"onChange"}),"."]}),"\n",(0,o.jsx)(n.h4,{id:"onchange",children:(0,o.jsx)(n.code,{children:"onChange"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"onChange?: (value: ZoomTransform) => void\n"})}),"\n",(0,o.jsx)(n.p,{children:"Event that is fired whenever the pan changes. This is useful for controlling the state of this hook."}),"\n",(0,o.jsx)(n.h4,{id:"direction",children:(0,o.jsx)(n.code,{children:"direction"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"direction?: 'x' | 'y' | 'xy'\n"})}),"\n",(0,o.jsx)(n.p,{children:"Restricts the orientation of the pan to the given axis. Useful when zooming on scales for instance."}),"\n",(0,o.jsx)(n.h4,{id:"constraint",children:(0,o.jsx)(n.code,{children:"constraint"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"constraint?: (transform: ZoomTransform) => ZoomTransform\n"})}),"\n",(0,o.jsx)(n.p,{children:"The constraint that is applied on the transform. The default constraint will force it to be withing the extent (width, height)."})]})}function f(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(j,{...e})}):j(e)}},9292:(e,n,s)=>{s.d(n,{o:()=>t});var o=s(4848);function t(e){let{children:n}=e;return(0,o.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:16},children:n})}}}]);