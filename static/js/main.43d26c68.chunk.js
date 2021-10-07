(this["webpackJsonptest-for-mango"]=this["webpackJsonptest-for-mango"]||[]).push([[0],{51:function(e,n,t){e.exports=t(87)},56:function(e,n,t){},84:function(e,n,t){},87:function(e,n,t){"use strict";t.r(n);var a=t(0),i=t.n(a),o=t(20),r=t.n(o),c=(t(56),t(49)),l=t(3),s=t(9),u=t(16),d=t(10),m=t(38),b=t(39),f=t(40),v=t.n(f),p=new(function(){function e(){Object(m.a)(this,e),this.api=void 0,this.api=v.a.create({baseURL:"http://demo8192803.mockable.io/"})}return Object(b.a)(e,[{key:"getExercise1Options",value:function(){return this.api.get("/exercise1")}},{key:"getExercise2Options",value:function(){return this.api.get("/exercise2")}}]),e}()),x=Object(u.b)({name:"exercise1",initialState:{isLoading:!1},reducers:{loadExercise1OptionsStart:function(e){e.isLoading=!0},loadExercise1OptionsSuccess:function(e,n){var t=n.payload;e.isLoading=!1,e.options=t.options,e.error=void 0},loadExercise1OptionsFailure:function(e,n){var t=n.payload;e.isLoading=!1,e.error=t.error}}}),g=x.reducer,h=x.actions,E=h.loadExercise1OptionsStart,O=h.loadExercise1OptionsSuccess,j=h.loadExercise1OptionsFailure,M=Object(u.b)({name:"exercise2",initialState:{isLoading:!1},reducers:{loadExercise2OptionsStart:function(e){e.isLoading=!0},loadExercise2OptionsSuccess:function(e,n){var t=n.payload;e.isLoading=!1,e.options=t.options,e.error=void 0},loadExercise2OptionsFailure:function(e,n){var t=n.payload;e.isLoading=!1,e.error=t.error}}}),w=M.reducer,N=M.actions,L=N.loadExercise2OptionsStart,y=N.loadExercise2OptionsSuccess,S=N.loadExercise2OptionsFailure,A=Object(d.b)({exercise1:g,exercise2:w}),C=Object(u.a)({reducer:A});var _,V,P,k,F=t(12),I=t(100),X=t(23),T=t(4),z=t(18),B=t(19),D=B.a.div(_||(_=Object(z.a)(["\n  .span-input {\n    border: none;\n    display: inline;\n    font-family: inherit;\n    font-size: inherit;\n    padding: 0;\n    width: 100%;\n    min-width: 1.5ch;\n    transition: width 0.5s;\n\n    & {\n      -moz-appearance: textfield;\n    }\n    &::-webkit-inner-spin-button,\n    &::-webkit-outer-spin-button {\n      -webkit-appearance: none;\n      margin: 0;\n    }\n\n    &:disabled {\n      color: inherit;\n    }\n\n    &:focus {\n      border: none;\n      outline: none;\n    }\n  }\n"]))),U=function(e){var n=e.value,t=e.unit,o=e.onChange,r=e.disabled,c=e.ariaLabel,l=Object(a.useState)(n.toString()),s=Object(F.a)(l,2),u=s[0],d=s[1];Object(a.useEffect)((function(){d(n.toString())}),[n]);var m=function(e){d(e.target.value),isNaN(e.target.valueAsNumber)||o&&o(e)};return i.a.createElement(D,null,i.a.createElement("input",{className:"span-input",type:"number",value:u,"aria-label":c,onChange:function(e){return m(e)},onBlur:function(e){d(n.toString())},style:{width:"".concat(u.toString().length,"ch")},disabled:r}),i.a.createElement("span",null,t))};function J(e){var n=Object(X.a)(e).sort((function(e,n){return e-n})),t=100/(n[n.length-1]-n[0]);return n.map((function(e){return{value:e,percent:(e-n[0])*t}}))}function R(e,n){return n.reduce((function(n,t){return Math.abs(t.percent-e)<Math.abs(n.percent-e)?t:n}))}function W(e,n){return n.reduce((function(n,t){return Math.abs(t.value-e)<Math.abs(n.value-e)?t:n}))}!function(e){e[e.MIN=0]="MIN",e[e.MAX=1]="MAX"}(k||(k={}));var q,G=B.a.div(V||(V=Object(z.a)(["\n  .range {\n    display: flex;\n    user-select: none;\n    padding: 1em 0;\n\n    &.m-disabled {\n      position: relative;\n      opacity: 0.6;\n\n      &::before {\n        content: '';\n        position: absolute;\n        z-index: 2;\n        cursor: not-allowed;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n      }\n\n      & > * {\n        pointer-events: none;\n      }\n    }\n\n    &__boundaries {\n      max-width: 100%;\n    }\n\n    &__bar {\n      flex-grow: 1;\n      position: relative;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      margin: 0 1em;\n      min-width: 100px;\n\n      &__control {\n        position: absolute;\n      }\n\n      &__rail {\n        border-radius: 5px;\n        height: 5px;\n        background-color: #000;\n      }\n    }\n  }\n"]))),H=B.a.div(P||(P=Object(z.a)(["\n  cursor: grab;\n  width: 1.25em;\n  height: 1.25em;\n  border-radius: 100%;\n  background-color: #000;\n  transform: translate(-50%, 0);\n  transition: width 0.25s, height 0.25s;\n  touch-action: none;\n\n  &:hover {\n    width: 2.25em;\n    height: 2.25em;\n  }\n\n  &:active {\n    cursor: grabbing;\n  }\n"]))),K=function(e){var n=e.options,t=e.value,o=e.onChange,r=e.unit,c=e.disabled,l=Object(a.useRef)(null),s=Object(a.useState)({inputEditable:!0,limitMin:0,limitMax:0,options:[],released:!0,minPos:0,maxPos:100,disabled:!1,minVal:0,maxVal:0,lastActiveControl:void 0}),u=Object(F.a)(s,2),d=u[0],m=u[1];Object(a.useEffect)((function(){var e,a=!1;if(n){if(Array.isArray(n))a=!1,e=J(n);else{if(!n||isNaN(null===n||void 0===n?void 0:n.max)||isNaN(null===n||void 0===n?void 0:n.min))throw new Error("options must be number[] or {min: number, max: number}");for(var i=Math.min(n.min,n.max),o=Math.max(n.min,n.max),r=[],l=i;l<=o;l++)r=[].concat(Object(X.a)(r),[l]);a=!0,e=J(r)}if(e){var s,u,d,b,f=null===(s=e[0])||void 0===s?void 0:s.value,v=null===(u=e[e.length-1])||void 0===u?void 0:u.value,p=null!==(d=null===t||void 0===t?void 0:t.min)&&void 0!==d?d:f,x=null!==(b=null===t||void 0===t?void 0:t.max)&&void 0!==b?b:v;m((function(n){return Object(T.a)(Object(T.a)({},n),{},{limitMin:f,limitMax:v,minVal:p,maxVal:x,maxPos:W(x,e).percent,minPos:W(p,e).percent,inputEditable:a,options:e,disabled:!!c})}))}}else m((function(e){return Object(T.a)(Object(T.a)({},e),{},{disabled:!0,inputEditable:!1})}))}),[n,t,c]);var b=function(e){m((function(n){return Object(T.a)(Object(T.a)({},n),{},{released:!1,lastActiveControl:e})}))},f=function(e){if(!d.released&&l.current){var n=l.current.offsetLeft,t=100/(l.current.clientWidth/((e.nativeEvent instanceof TouchEvent?e.touches[0].clientX:e.nativeEvent instanceof MouseEvent?e.clientX:0)-n)),a=t;if(t>100?a=100:t<0&&(a=0),d.lastActiveControl===k.MIN){a>d.maxPos&&(a=d.maxPos);var i=R(a,d.options);m((function(e){return Object(T.a)(Object(T.a)({},e),{},{minPos:a,lastActiveControl:k.MIN,minVal:i.value})}))}else if(d.lastActiveControl===k.MAX){a<d.minPos&&(a=d.minPos);var o=R(a,d.options);m((function(e){return Object(T.a)(Object(T.a)({},e),{},{maxPos:a,lastActiveControl:k.MAX,maxVal:o.value})}))}}},v=function(){if(!d.released){var e=R(d.minPos,d.options),n=R(d.maxPos,d.options);m((function(t){return Object(T.a)(Object(T.a)({},t),{},{released:!0,minPos:e.percent,maxPos:n.percent,minVal:e.value,maxVal:n.value})})),p({min:e.value,max:n.value})}};!function(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Object(a.useEffect)((function(){return window.addEventListener(e,n,t),function(){window.removeEventListener(e,n)}}))}("mouseup",v);var p=function(e){o&&o(e)};return i.a.createElement(G,null,i.a.createElement("div",{className:"range ".concat(d.disabled?"m-disabled":""),onMouseMove:function(e){f(e)},onTouchMove:function(e){f(e)},onTouchEnd:v,onTouchCancel:v,"aria-label":"range-selector"},i.a.createElement(U,{value:d.minVal,onChange:function(e){var n=e.target.valueAsNumber;n>d.maxVal&&(n=d.maxVal);var t=W(n,d.options);m((function(e){return Object(T.a)(Object(T.a)({},e),{},{minPos:t.percent,minVal:t.value,lastActiveControl:k.MIN})})),p({max:d.maxVal,min:t.value})},unit:r,disabled:!d.inputEditable||c,ariaLabel:"range input min"}),i.a.createElement("div",{className:"range__bar",ref:l},i.a.createElement(H,{"aria-label":"range control min",onMouseDown:function(){b(k.MIN)},onTouchStart:function(){b(k.MIN)},className:"range__bar__control m-min",style:{zIndex:d.lastActiveControl===k.MIN?1:0,left:"".concat(d.minPos,"%")}}),i.a.createElement(H,{"aria-label":"range control max",onMouseDown:function(){b(k.MAX)},onTouchStart:function(){b(k.MAX)},className:"range__bar__control m-max",style:{zIndex:d.lastActiveControl===k.MAX?1:0,left:"".concat(d.maxPos,"%")}}),i.a.createElement("div",{className:"range__bar__rail"})),i.a.createElement(U,{value:d.maxVal,onChange:function(e){var n=e.target.valueAsNumber;n<d.minVal&&(n=d.minVal);var t=W(n,d.options);m((function(e){return Object(T.a)(Object(T.a)({},e),{},{maxPos:t.percent,maxVal:t.value,lastActiveControl:k.MAX})})),p({max:t.value,min:d.minVal})},unit:r,disabled:!d.inputEditable||c,ariaLabel:"range input max"})))},Q=t(44),Y=t.n(Q),Z=t(99),$=Object(Z.a)({alert:{color:"#FFFFF",padding:"0.5em 0.5em 0.3em"},error:{backgroundColor:"#ff4444",boxShadow:"0 8px red"},info:{backgroundColor:"cornflowerblue",boxShadow:"0 8px blue"}});!function(e){e.error="error",e.info="info"}(q||(q={}));var ee=function(e){var n=e.children,t=e.type,a=$();return n?i.a.createElement("div",{className:Y()(alert,a[t])},n):null},ne=function(e){return{options:e.exercise1.options,isLoading:e.exercise1.isLoading,error:e.exercise1.error}},te=function(){Object(I.a)().t;var e=Object(a.useState)(),n=Object(F.a)(e,2),t=n[0],o=n[1],r=Object(s.b)(),c=Object(s.c)(ne);return Object(a.useEffect)((function(){r((function(e){return e(E()),p.getExercise1Options().then((function(n){return e(O({options:n.data}))})).catch((function(n){return e(j({error:n.message||"Unknown error"}))}))}))}),[r]),i.a.createElement("div",{className:"exercise1"},i.a.createElement("span",null,"Exercise 1"),i.a.createElement(K,{options:c.options,value:t,onChange:function(e){o(e)},unit:"\u20ac"}),i.a.createElement(ee,{type:"error"},c.error),i.a.createElement(ee,{type:"info"},c.isLoading?"Loading...":null),void 0!==t&&i.a.createElement("p",null,"Values: ",null===t||void 0===t?void 0:t.min," - ",null===t||void 0===t?void 0:t.max))},ae=function(e){return{options:e.exercise2.options,isLoading:e.exercise2.isLoading,error:e.exercise2.error}},ie=function(){var e=Object(a.useState)(),n=Object(F.a)(e,2),t=n[0],o=n[1],r=Object(s.b)(),c=Object(s.c)(ae);return Object(a.useEffect)((function(){r((function(e){return e(L()),p.getExercise2Options().then((function(n){return e(y({options:n.data.rangeValues}))})).catch((function(n){return e(S({error:n.message||"Unknown error"}))}))}))}),[r]),i.a.createElement("div",{className:"exercise2"},i.a.createElement("span",null,"Exercise 2"),i.a.createElement(ee,{type:"error"},c.error),i.a.createElement(ee,{type:"info"},c.isLoading?"Loading...":null),i.a.createElement(K,{options:c.options,value:t,onChange:function(e){o(e)},unit:"\u20ac"}),void 0!==t&&i.a.createElement("p",null,"Values: ",null===t||void 0===t?void 0:t.min," - ",null===t||void 0===t?void 0:t.max))};t(84);var oe=function(){return i.a.createElement(s.a,{store:C},i.a.createElement(c.a,null,i.a.createElement(l.d,null,i.a.createElement(l.b,{exact:!0,path:"/"},i.a.createElement(l.a,{to:{pathname:"/exercise1"}})),i.a.createElement(l.b,{exact:!0,path:"/exercise1",component:te}),i.a.createElement(l.b,{exact:!0,path:"/exercise2",component:ie}),i.a.createElement(l.b,{path:"*",component:function(){return i.a.createElement("span",null,"404")}}))))},re=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,101)).then((function(n){var t=n.getCLS,a=n.getFID,i=n.getFCP,o=n.getLCP,r=n.getTTFB;t(e),a(e),i(e),o(e),r(e)}))};r.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(oe,null)),document.getElementById("root")),re()}},[[51,1,2]]]);
//# sourceMappingURL=main.43d26c68.chunk.js.map