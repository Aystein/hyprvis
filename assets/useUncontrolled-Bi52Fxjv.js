import{r as l}from"./index-BBkUAzwr.js";function i({value:r,defaultValue:s,onChange:t=()=>{}}){const[u,o]=l.useState(s);if(r!==void 0)return[r,t];const c=l.useCallback(e=>{o(e),t==null||t(e)},[]);return[u,c]}export{i as u};