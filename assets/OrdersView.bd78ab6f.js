import{a as p,aG as f,ac as m,o as l,c as s,b as n,V,w as o,e as d,f as y,F as _,aH as h,d as t,af as i}from"./index.a0c66284.js";import{V as w}from"./VTable.9c5691d2.js";const x={id:"orders"},D=t("h1",{class:"text-center"},"\u8A02\u55AE",-1),g=t("thead",null,[t("tr",null,[t("th",null,"ID"),t("th",null,"\u65E5\u671F"),t("th",null,"\u91D1\u984D"),t("th",null,"\u5546\u54C1")])],-1),k=t("tbody",null,null,-1),S={__name:"OrdersView",setup(b){const c=p([]);return(async()=>{try{const{data:u}=await f.get("/orders");c.push(...u.result.map(r=>(r.totalPrice=r.products.reduce((e,a)=>e+a.p_id.price*a.quantity,0),r)))}catch{m.fire({icon:"error",title:"\u5931\u6557",text:"\u53D6\u5F97\u8A02\u55AE\u5931\u6557"})}})(),(u,r)=>(l(),s("div",x,[n(V),n(d,{cols:"12"},{default:o(()=>[D]),_:1}),n(y),n(d,{cols:"12"},{default:o(()=>[n(w,null,{default:o(()=>[g,k,(l(!0),s(_,null,h(c,e=>(l(),s("tr",{key:e._id},[t("td",null,i(e._id),1),t("td",null,i(new Date(e.date).toLocaleDateString()),1),t("td",null,i(e.totalPrice),1),t("td",null,[t("ul",null,[(l(!0),s(_,null,h(e.products,a=>(l(),s("li",{key:a._id},i(a.quantity+" \u500B "+a.p_id.name),1))),128))])])]))),128))]),_:1})]),_:1})]))}};export{S as default};