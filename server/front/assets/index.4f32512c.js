import{_ as k,B as $,e as h,f as b}from"./index.ed3e6edb.js";import{d as C,O as x,j as g,u as B,m as I,q as P,r as f,c as o,b as v,a as s,F as _,I as u,o as n,G as i,w as S,p as j,f as w}from"./vendor.3a2e8e53.js";const q=C({name:"category",components:{Banner:$},setup(){const e=x(),l=g([]),d=g([]),p=B(),m=I(()=>p.state.banners.order_3);return P(()=>{const a=e.query.name;p.dispatch("getAllPosts").then(c=>{d.value=h(c),h(c).forEach(t=>{l.value.push(t)})}).then(()=>{a&&b(a)}).catch(c=>console.log(c))}),{category:l,posts:d,anchorPoint:a=>{b(a)},banner:m}}}),E=e=>(j("data-v-69595b1e"),e=e(),w(),e),F={class:"category"},N={class:"content pt-20"},V={class:"list"},z=["onClick"],A=["id"],D={class:"cate fs-24 pt-10 pb-20"},G=E(()=>s("i",{class:"iconfont icon-tag"},null,-1)),L={class:"fs-18 pb-15 text-ellipsis"},M={class:"fs-14 text-ellipsis"};function O(e,l,d,p,m,y){const a=f("banner"),c=f("router-link");return n(),o("div",F,[v(a,{title:e.banner.title,image:e.banner.banner,desc:e.banner.desc},null,8,["title","image","desc"]),s("div",N,[s("ul",V,[(n(!0),o(_,null,u(e.category,t=>(n(),o("li",{key:t.category.id,onClick:r=>e.anchorPoint(`cate_${t.category.name}`)},i(t.category.name),9,z))),128))]),(n(!0),o(_,null,u(e.posts,t=>(n(),o("div",{key:t.category.id,id:`cate_${t.category.name}`,class:"posts box-sizing"},[s("div",D,[G,s("span",null,i(t.category.name),1)]),s("ul",null,[(n(!0),o(_,null,u(t.posts,r=>(n(),o("li",{key:r.id,class:"pl-20 pb-20 mb-20 border-b-f3"},[v(c,{to:{path:`/post/${r.id}`}},{default:S(()=>[s("div",L,i(r.title),1),s("div",M,i(r.description),1)]),_:2},1032,["to"])]))),128))])],8,A))),128))])])}var J=k(q,[["render",O],["__scopeId","data-v-69595b1e"]]);export{J as default};
