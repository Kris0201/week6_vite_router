import{_ as a,o,c as s,a as n,t as c,b as _}from"./index-a747412a.js";const r={data(){return{data:{}}},mounted(){console.log("正式環境"),this.$http.get("https://randomuser.me/api/").then(t=>{console.log(t),this.data=t.data.results[0]})}},i={class:"about"},d=_("h1",null,"This is an about page",-1);function l(t,u,p,h,e,m){return o(),s("div",i,[d,n(" "+c(e.data),1)])}const g=a(r,[["render",l]]);export{g as default};
