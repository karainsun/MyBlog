import{_ as $,B as y,h as m,f}from"./index.ed3e6edb.js";import{d as x,O as B,j as g,u as C,m as I,q as P,r as b,c as n,b as v,a as t,F as p,I as u,o,G as r,w as S,p as j,f as w}from"./vendor.3a2e8e53.js";const q=x({name:"tags",components:{Banner:y},setup(){const e=B(),d=g([]),l=g([]),_=C(),h=I(()=>_.state.banners.order_4);return P(()=>{const a=e.query.name;_.dispatch("getAllPosts").then(i=>{l.value=m(i),m(i).forEach(s=>{d.value.push(s.tag)})}).then(()=>{a&&f(a)}).catch(i=>console.log(i))}),{tags:d,posts:l,anchorPoint:a=>{f(a)},banner:h}}}),E=e=>(j("data-v-422c7daa"),e=e(),w(),e),F={class:"tags"},N={class:"content pt-20"},V={class:"list"},z=["onClick"],A=["id"],D={class:"cate fs-24 pt-10 pb-20"},G=E(()=>t("i",{class:"iconfont icon-tag"},null,-1)),L={class:"pl-20 pb-20 mb-20 border-b-f3"},M={class:"fs-18 pb-15 text-ellipsis"},O={class:"fs-14 text-ellipsis"};function R(e,d,l,_,h,k){const a=b("banner"),i=b("router-link");return o(),n("div",F,[v(a,{title:e.banner.title,image:e.banner.banner,desc:e.banner.desc},null,8,["title","image","desc"]),t("div",N,[t("ul",V,[(o(!0),n(p,null,u(e.tags,s=>(o(),n("li",{key:s.id,onClick:c=>e.anchorPoint(`tag_${s.name}`)},r(s.name),9,z))),128))]),(o(!0),n(p,null,u(e.posts,s=>(o(),n("div",{key:s.tag.id,id:`tag_${s.tag.name}`,class:"posts box-sizing"},[t("div",D,[G,t("span",null,r(s.tag.name),1)]),(o(!0),n(p,null,u(s.posts,c=>(o(),n("ul",{key:c.id},[t("li",L,[v(i,{to:{path:`/post/${c.id}`}},{default:S(()=>[t("div",M,r(c.title),1),t("div",O,r(c.description),1)]),_:2},1032,["to"])])]))),128))],8,A))),128))])])}var J=$(q,[["render",R],["__scopeId","data-v-422c7daa"]]);export{J as default};
