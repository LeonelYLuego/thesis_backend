import{a as M}from"./chunk-BTF3FD7C.js";import{a as E,c as j,f as O}from"./chunk-XGZPP6NI.js";import{a as N}from"./chunk-7TJT32UP.js";import{a as F}from"./chunk-PXZJHLGB.js";import{a as P,b as k}from"./chunk-ZD5KF6KB.js";import{$ as f,Aa as o,Ba as c,Ca as y,Fa as S,Ha as x,Ia as u,Ka as s,La as I,Na as b,Q as g,Qa as C,V as _,X as w,Zb as V,aa as h,c as l,fb as T,gb as A,oa as m,ob as R,pa as a,xa as d,za as v}from"./chunk-TTSPFW42.js";var q=(()=>{let t=class t{constructor(e){this.http=e}accept(e){return l(this,null,function*(){return yield this.http.get(P.PAGES.ACCEPT(e))})}};t.\u0275fac=function(r){return new(r||t)(_(k))},t.\u0275prov=g({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();function H(i,t){i&1&&(o(0,"div",3)(1,"div",4),y(2,"img",5),o(3,"p",6),s(4," Ups!, P\xE1gina no encontrada "),c()()())}function z(i,t){if(i&1){let n=S();o(0,"div",7)(1,"div",8)(2,"p",9),s(3,"MASCE"),c(),o(4,"h1",10),s(5),c(),o(6,"p",11),s(7),c(),o(8,"div",12)(9,"button",13),x("click",function(){f(n);let r=u(2);return h(r.cancel())}),s(10," Cancelar "),c(),o(11,"button",14),x("click",function(){f(n);let r=u(2);return h(r.accept())}),s(12," Iniciar sesi\xF3n "),c()()()()}if(i&2){let n=u(2);m(5),b(" ",n.account==null?null:n.account.firstName," ",n.account==null?null:n.account.lastName,", la siguiente cuenta quiere iniciar sesi\xF3n: "),m(2),I(n.page==null?null:n.page.name)}}function J(i,t){if(i&1&&(o(0,"div"),v(1,H,5,0,"div",1)(2,z,13,3,"div",2),c()),i&2){let n=u();m(1),d("ngIf",n.invalid),m(1),d("ngIf",!n.invalid)}}var D=(()=>{let t=class t{constructor(e,r,p,B,K,U){this.route=e,this.authService=r,this.pagesService=p,this.router=B,this.OAuthService=K,this.accountsService=U,this.loading=!0,this.invalid=!1}ngOnInit(){return l(this,null,function*(){let e=this.route.snapshot.queryParams.id;if(this.redirectTo=this.route.snapshot.queryParams.redirectTo,e&&this.redirectTo)try{if(this.page=yield this.pagesService.findOneByPublicKey(e),this.redirectTo.indexOf(this.page.url)!=-1)try{if(this.account=yield this.authService.logged(),yield this.accountsService.checkIfPageRegistered(this.page.id)){yield this.accept();return}this.loading=!1;return}catch{this.router.navigate(["/","auth","log-in"],{queryParams:{publicKey:e,redirectTo:this.redirectTo}});return}}catch{}this.invalid=!0,this.loading=!1})}cancel(){window.location.href=this.redirectTo}accept(){return l(this,null,function*(){let e=(yield this.OAuthService.accept(this.page.id)).value;window.location.href=`${this.redirectTo}?encrypted=${encodeURIComponent(e)}`})}};t.\u0275fac=function(r){return new(r||t)(a(E),a(M),a(N),a(j),a(q),a(F))},t.\u0275cmp=w({type:t,selectors:[["app-oauth"]],standalone:!0,features:[C],decls:1,vars:1,consts:[[4,"ngIf"],["class","w-full h-96 flex flex-row justify-center items-center",4,"ngIf"],["class","flex flex-row items-center justify-center h-screen",4,"ngIf"],[1,"w-full","h-96","flex","flex-row","justify-center","items-center"],[1,"flex","flex-col","items-center"],["src","assets/images/not-found.svg",1,"w-80","mb-4"],[1,"text-2xl","font-bold","text-primary","mb-4"],[1,"flex","flex-row","items-center","justify-center","h-screen"],[1,"bg-neutral-800","rounded-md","shadow-md","p-3","w-full","max-w-lg","m-4"],[1,"text-3xl","font-bold","text-primary","mb-4","text-center"],[1,"text-xl","font-bold","text-primary","mb-4"],[1,"w-full","text-center","text-lg","font-bold","mb-4"],[1,"flex","flex-row-reverse"],["mat-flat-button","",1,"ms-2",3,"click"],["mat-raised-button","","color","primary",1,"ms-2",3,"click"]],template:function(r,p){r&1&&v(0,J,3,2,"div",0),r&2&&d("ngIf",!p.loading)},dependencies:[A,T,V,R,O]});let i=t;return i})();var L=[{path:"",component:D}],mt=L;export{mt as default};