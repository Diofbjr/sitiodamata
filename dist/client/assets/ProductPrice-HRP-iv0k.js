import{r as o,j as e}from"./components-7YnbHHm3.js";import{M as i}from"./Money-DPx7cSxV.js";function x({children:s,heading:n,type:a}){const{type:t,close:r}=j(),d=a===t;return o.useEffect(()=>{const c=new AbortController;return d&&document.addEventListener("keydown",function(u){u.key==="Escape"&&r()},{signal:c.signal}),()=>c.abort()},[r,d]),e.jsxs("div",{"aria-modal":!0,className:`overlay ${d?"expanded":""}`,role:"dialog",children:[e.jsx("button",{className:"close-outside",onClick:r}),e.jsxs("aside",{children:[e.jsxs("header",{children:[e.jsx("h3",{children:n}),e.jsx("button",{className:"close reset",onClick:r,children:"×"})]}),e.jsx("main",{children:s})]})]})}const l=o.createContext(null);x.Provider=function({children:n}){const[a,t]=o.useState("closed");return e.jsx(l.Provider,{value:{type:a,open:t,close:()=>t("closed")},children:n})};function j(){const s=o.useContext(l);if(!s)throw new Error("useAside must be used within an AsideProvider");return s}function f({price:s,compareAtPrice:n}){return e.jsx("div",{className:"product-price",children:n?e.jsxs("div",{className:"product-price-on-sale",children:[s?e.jsx(i,{data:s}):null,e.jsx("s",{children:e.jsx(i,{data:n})})]}):s?e.jsx(i,{data:s}):e.jsx("span",{children:" "})})}export{x as A,f as P,j as u};
