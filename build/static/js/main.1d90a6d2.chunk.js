(this.webpackJsonpsnufkin=this.webpackJsonpsnufkin||[]).push([[0],{102:function(e,t,a){e.exports=a(185)},107:function(e,t,a){},184:function(e,t,a){},185:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(16),c=a.n(o),l=(a(107),a(21)),s=a(31);function r(e){var t=e>1e3?100:10;return Math.round(parseInt(e,10)/t*t).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function u(e){function t(e,t,a){return((e?e+" years":"")+(t?" "+t+" months":"")+(a?" "+a+" days":"")).trim()}if(e>36*30.4368499){var a=Math.floor(e/365.2421988),n=Math.floor((e-365.2421988*a)/30.4368499);return t(a,n,Math.round(e-365.2421988*a-30.4368499*n))}if(e>61){var i=Math.floor(e/30.4368499);return t(0,i,Math.round(e-30.4368499*i))}return t(0,0,e)}var m=function(e,t){return((parseFloat(e)+parseFloat(t))/2).toFixed(2)},d=function(e){for(var t,a=[],n=e.parent;n;)t=window.gantt.getTask(n),a.unshift(t),n=t.parent;return a},f=function(e,t){[e].concat(d(e)).forEach(t)},v=["officialFee","associateFee","unidentifiedFee","brokerageFee"],g=function(e){return v.reduce((function(t,a){return parseFloat(t)+parseFloat(e[a]||0)}),0)},b=(window.location.hostname,function(e){var t={trigger:"wheel",useKey:"altKey",levels:[{name:"day",scale_height:27,min_column_width:80,scales:[{unit:"day",step:1,format:"%d %M"}]},{name:"week",scale_height:50,min_column_width:50,scales:[{unit:"week",step:1,format:function(t){var a=e.date.date_to_str("%d %M"),n=e.date.add(t,-6,"day");return"#"+e.date.date_to_str("%W")(t)+", "+a(t)+" - "+a(n)}},{unit:"day",step:1,format:"%j %D"}]},{name:"month",scale_height:50,min_column_width:120,scales:[{unit:"month",format:"%F, %Y"},{unit:"week",format:"Week #%W"}]},{name:"quarter",height:50,min_column_width:90,scales:[{unit:"month",step:1,format:"%M"},{unit:"quarter",step:1,format:function(t){var a=e.date.date_to_str("%M"),n=e.date.add(e.date.add(t,3,"month"),-1,"day");return a(t)+" - "+a(n)}}]},{name:"year",scale_height:50,min_column_width:30,scales:[{unit:"year",step:1,format:"%Y"}]}]};e.ext.zoom.init(t)}),h=[{name:"text",tree:!0,width:156,resize:!0},{name:"start_date",align:"center",resize:!0,width:90},{name:"duration",align:"center",resize:!0,width:90,template:function(e){return u(e.duration)}},{name:"totalCost",align:"center",label:"Cost",width:90,template:function(e){var t=parseFloat(m(e.minCost,e.maxCost))+parseFloat(g(e));return parseFloat(t)>0?r(t)+"$":""}},{name:"add",width:44,min_width:44,max_width:44}],E=function(e,t){var a=[].concat(h);t||a.pop(),e.config.columns=a},p=function(e){e.config.xml_date="%Y-%m-%d",e.config.date_format="%Y-%m-%d";var t=e.config,a=e.date.str_to_date(t.date_format,t.server_utc);e.templates.parse_date=function(e){return a(e.slice(0,10))},e.templates.grid_date_format=function(t,a){return e.date.date_to_str("%d/%m/%Y")(t)}},w=function(e,t){e.attachEvent("onGanttReady",(function(){e.config.buttons_left=[],e.config.buttons_right=[],e.locale.labels.gantt_cancel_btn="Close"}))},k=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a={task:{view:"taskDetails",edit:"editTaskDetails"},project:{view:"folderDetails",edit:"editFolderDetails"},milestone:{view:"milestoneDetails",edit:"editMilestoneDetails",height:200}},n=a[e],i=[{name:"lightbox",height:n.height?n.height:250,type:"template",map_to:t?n.edit:n.view}];return i};function N(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.config.lightbox.sections=k("task",t),e.config.lightbox.project_sections=k("project",t),e.config.lightbox.milestone_sections=k("milestone",t),e.locale.labels.section_lightbox="",e.attachEvent("onBeforeLightbox",(function(t){var a=e.getTask(t);return a.taskDetails||(a.taskDetails="<div id='task-details'/>",a.milestoneDetails="<div id='milestone-details'/>",a.folderDetails="<div id='folder-details'/>"),a}))}var j,O=function(e){e.keys={}},_=function(e,t){return function(a){var n=document.getElementById(t);return n?c.a.createPortal(i.a.createElement(e,a),n):null}},y=a(188),F=function(e){var t=e.task,a=e.className,n=void 0===a?"":a,o=t.progress?(100*t.progress).toFixed(2):0;return i.a.createElement("div",{className:n},i.a.createElement(y.a,{type:"circle",percent:o,width:80}))},C=a(60),x=a(190),S=a(39),T=a(40),z=a(44),D=function(e){var t=i.a.createElement(S.a,{icon:T.d,className:"edit-icon"}),a=i.a.createElement(S.a,{icon:T.a,className:"edit-icon"}),o=Object(n.useState)(!1),c=Object(l.a)(o,2),s=c[0],r=c[1],u=Object(n.useState)(t),m=Object(l.a)(u,2),d=m[0],f=m[1],v=Object(n.useCallback)((function(){s&&e&&e(),r(!s),f(s?t:a)}),[t,a,s,e]),g=Object(n.useCallback)((function(e){"Enter"===e.key&&(v(),e.preventDefault(),e.stopPropagation(),document.removeEventListener("keypress",g))}),[v]);return[s,function(e){var t=e.className,a=void 0===t?"":t;return i.a.createElement(z.a,{className:"edit-button ".concat(a),size:"small",onClick:v},d)}]},M=a(23),R=Object(M.atom)({key:"selectedTask",default:null}),L=Object(M.atom)({key:"editable",default:!1}),B=function(){},I=Object(n.forwardRef)((function(e,t){var a=e.title,n=e.value,o=void 0===n?0:n,c=e.onChange,l=e.className,s=void 0===l?"":l;return i.a.createElement("div",{className:"cost-edit ".concat(s)},i.a.createElement("span",{className:"cost-edit-title"},a),i.a.createElement(x.a,{ref:t,min:0,value:o||"",formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:c}))})),$=function(e){var t=e.value,a=void 0===t?0:t,n=e.title,o=e.showIfEmpty,c=void 0!==o&&o,l=e.className,s=void 0===l?"":l;return parseFloat(a)||c?i.a.createElement("div",{className:"cost-display ".concat(s)},i.a.createElement("span",{className:"cost-edit-title"},n),i.a.createElement("span",{className:"display-cost"},"$ ".concat(function(e){var t=parseFloat(e).toFixed(2).toString().split(".");return[t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t[1]].join(".")}(a)))):null},W=function(e){var t=e.value,a=e.title,o=e.onChange,c=void 0===o?B:o,r=(e.className,Object(n.useState)(t)),u=Object(l.a)(r,2),m=u[0],d=u[1],f=Object(M.useRecoilState)(R),v=Object(l.a)(f,2),g=v[0],b=v[1],h=D((function(){c(m),b(Object(s.a)({},window.gantt.getTask(g.index)))})),E=Object(l.a)(h,2),p=E[0],w=E[1],k=Object(n.useRef)();return Object(n.useEffect)((function(){p&&k.current&&k.current.focus()}),[p,k]),Object(n.useEffect)((function(){return function(){p&&c(m)}}),[m]),p?i.a.createElement("div",{className:"edit-cost"},i.a.createElement(I,{value:m,title:a,onChange:d,ref:k}),i.a.createElement(w,{className:"cost-edit-switch"})):i.a.createElement("div",{className:"edit-cost"},i.a.createElement($,{value:t,title:a,showIfEmpty:!0}),i.a.createElement(w,{className:"cost-edit-switch"}))},Y=function(e){var t=e.value,a=e.title,n=e.onChange,o=void 0===n?B:n,c=e.className,l=void 0===c?"":c,s=e.editable;return void 0!==s&&s?i.a.createElement(W,{value:t,title:a,onChange:o,className:l}):i.a.createElement($,{value:t,title:a,className:l})},A=function(e,t){var a=t-e.officialFee;f(e,(function(e){var t=parseFloat(e.officialFee)+parseFloat(a),n=Object(s.a)(Object(s.a)({},e),{},{officialFee:t,official_fee:t});window.gantt.updateTask(e.id,n)}))},J=function(e,t){var a=t-m(e.minCost,e.maxCost);f(e,(function(e){var t=parseFloat(e.minCost)+parseFloat(a),n=parseFloat(e.maxCost)+parseFloat(a),i=Object(s.a)(Object(s.a)({},e),{},{minCost:t,min_attorney_fee:t,maxCost:n,max_attorney_fee:n});window.gantt.updateTask(e.id,i)}))},P=function(e){return function(t,a){var n=t[e]||0,i=a-n;console.log("costs",n,i,a),f(t,(function(t){var a=t[e]||0,n=parseFloat(a)+parseFloat(i),o=Object(s.a)(Object(s.a)({},t),{},Object(C.a)({},e,n));window.gantt.updateTask(t.id,o)}))}},V=function(e){var t=e.task,a=e.className,n=void 0===a?"":a,o=m(t.minCost,t.maxCost)||0,c=t.officialFee,l=parseFloat(o)+parseFloat(g(t)),s=Object(M.useRecoilValue)(L)&&!t.isFolder;return i.a.createElement("div",{className:"price-details ".concat(n)},i.a.createElement(Y,{title:"Attorney Fee",value:o,editable:s,onChange:J.bind(null,t)}),i.a.createElement(Y,{title:"Official Fee",value:c,onChange:A.bind(null,t),editable:s}),i.a.createElement(Y,{title:"Associate Fee",value:t.associateFee,onChange:P("associateFee").bind(null,t),editable:s}),i.a.createElement(Y,{title:"Unidentified Fee",value:t.unidentifiedFee,onChange:P("unidentifiedFee").bind(null,t),editable:s}),i.a.createElement(Y,{title:"Brokerage Fee",value:t.brokerageFee,onChange:P("brokerageFee").bind(null,t),editable:s}),i.a.createElement(Y,{title:"Total",value:l,editable:!1,className:"total-cost"}))},q=a(186),K=function(e){var t=e.className,a=void 0===t?"":t,n=Object(M.useRecoilState)(R),o=Object(l.a)(n,2),c=o[0],s=o[1],r=d(c),u=function(e){var t;window.gantt.hideLightbox(),t=e.index,window.gantt.showTask(t),window.gantt.showLightbox(e.id),s(e)};return i.a.createElement(q.a,{className:a},r.map((function(e){return i.a.createElement(q.a.Item,{key:e.index.toString()},i.a.createElement(z.a,{className:"breadcrumb-button",key:e.index.toString(),type:"link",onClick:u.bind(null,e)},e.title))})))},U=a(189),G=function(e){var t=e.task;return i.a.createElement("div",{className:"summary-title"},t.title)},H=function(e){var t=e.task,a=e.className,o=void 0===a?"":a,c=Object(M.useSetRecoilState)(R),r=Object(n.useRef)(),u=Object(n.useState)(t.title),m=Object(l.a)(u,2),d=m[0],f=m[1],v=D((function(){var e=Object(s.a)(Object(s.a)({},t),{},{title:d,text:d});window.gantt.updateTask(t.id,e),c(e)})),g=Object(l.a)(v,2),b=g[0],h=g[1];return Object(n.useEffect)((function(){b&&r.current&&r.current.focus()}),[b,r]),b?i.a.createElement("div",{className:"title-edit ".concat(o)},i.a.createElement(U.a,{defaultValue:t.title,onChange:function(e){var t=e.target;return f(t.value)},onPressEnter:function(){},className:"title-input",ref:r}),i.a.createElement(h,null)):i.a.createElement("div",{className:"title-edit ".concat(o)},i.a.createElement(G,{task:t}),i.a.createElement(h,null))},Q=function(e){return Object(M.useRecoilValue)(L)?i.a.createElement(H,e):i.a.createElement(G,e)},X=function(e){var t=e.task,a=e.selectTask;return i.a.createElement("div",{className:"summary"},i.a.createElement(K,{task:t,selectTask:a,className:"parents-component"}),i.a.createElement(Q,{task:t}),i.a.createElement("div",null,"Duration: ",i.a.createElement("span",{className:"summary-duration"},u(t.duration))))},Z=function(e){var t=e.task,a=e.className,n=void 0===a?"":a,o=(e.editable,t.start_date.toUTCString().split(" ").splice(0,4).join(" "));return i.a.createElement("div",{className:n},i.a.createElement("div",{className:"title-line"},i.a.createElement(S.a,{icon:T.b,className:"milestone-icon"}),i.a.createElement(Q,{className:"milestone-title",task:t})),i.a.createElement("div",{className:"milestone-date"},o))},ee={Close:function(e){var t=e.className,a=void 0===t?"":t;return i.a.createElement(z.a,{type:"primary",className:"button close ".concat(a),onClick:function(){window.gantt.hideLightbox()}},"Close")}},te=[_((function(e){var t=e.task;return t?i.a.createElement("div",{className:"details-lightbox"},i.a.createElement("div",{className:"details-collection"},i.a.createElement(X,{task:t}),i.a.createElement(F,{task:t,className:"details-progress"})),i.a.createElement(V,{task:t}),i.a.createElement("div",{className:"view-buttons-section"},i.a.createElement(ee.Close,{className:"read-close"}))):null}),"task-details"),_((function(e){var t=e.task,a=e.selectTask;return t?i.a.createElement("div",{className:"details-lightbox"},i.a.createElement("div",{className:"details-collection"},i.a.createElement(X,{task:t,selectTask:a}),i.a.createElement(F,{task:t,className:"details-progress"})),i.a.createElement(V,{task:t,editable:!1}),i.a.createElement("div",{className:"view-buttons-section"},i.a.createElement(ee.Close,{className:"read-close"}))):null}),"folder-details"),_((function(e){var t=e.task;e.selectTask;return t?i.a.createElement("div",{className:"milestone-details-lightbox"},i.a.createElement("div",{className:"details-collection"},i.a.createElement(Z,{task:t,className:"milestone-summary"})),i.a.createElement(V,{task:t}),i.a.createElement("div",{className:"view-buttons-section"},i.a.createElement(ee.Close,{className:"read-close"}))):null}),"milestone-details")],ae=function(e){var t=e.data,a=(e.onSave,Object(M.useRecoilState)(R)),o=Object(l.a)(a,2),c=o[0],r=o[1];return Object(n.useEffect)((function(){(j=window.gantt).clearAll(),function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];b(e),O(e),E(e,t),p(e),N(e,t),w(e),e.init("ganttDiv")}(j,!1),j.ext.zoom.setLevel(0),window.gantt.parse(t),j.attachEvent("onLightbox",(function(e){r(Object(s.a)({},window.gantt.getTask(e)))})),j.attachEvent("onAfterLightbox",(function(e){r(null)}))}),[t,r]),i.a.createElement(i.a.Fragment,null,c?te.map((function(e,t){return i.a.createElement(e,{task:c,key:c.id+t.toString(),selectTask:r})})):null)},ne=function(){var e=window.gantt.ext.zoom._levels.length;return window.gantt.ext.zoom.getCurrentLevel()+1<e},ie=function(){return window.gantt.ext.zoom.getCurrentLevel()>0},oe=function(e){var t=e.className,a=void 0===t?"":t,o=Object(n.useState)(!1),c=Object(l.a)(o,2),s=c[0],r=c[1],u=Object(n.useState)(!0),m=Object(l.a)(u,2),d=m[0],f=m[1];return i.a.createElement("div",{className:a},i.a.createElement(z.a,{type:"primary",disabled:!s,className:"zoom-button",onClick:function(){window.gantt.ext.zoom.zoomIn(),f(ne()),r(ie())},icon:i.a.createElement(S.a,{icon:T.e,className:"zoom-in"})}),i.a.createElement(z.a,{type:"primary",disabled:!d,className:"zoom-button",onClick:function(){window.gantt.ext.zoom.zoomOut(),f(ne()),r(ie())},icon:i.a.createElement(S.a,{icon:T.c,className:"zoom-out"})}))};function ce(e){window.parent.postMessage(e,"*")}a(184);var le=function(){var e=Object(n.useState)(null),t=Object(l.a)(e,2),a=t[0],o=t[1],c=Object(M.useSetRecoilState)(L);return Object(n.useEffect)((function(){window.onmessage=function(e){var t=e.data;try{t=JSON.parse(e.data)}catch(a){console.log("can't parse data: "+e.data)}"data"===t.type&&(console.log("got data"),o(t.data),c(t.editable||!1),ce("done")),"getSnapshot"===t.type&&ce(JSON.stringify({type:"snapshot",snapshot:{tasks:Object.values(window.gantt.$data.tasksStore.pull),links:window.gantt.getLinks()}}))}}),[c]),i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"snufkin"},i.a.createElement("div",{className:"gantt-container"},a?i.a.createElement(ae,{data:a}):null)),i.a.createElement(oe,{className:"zoom-controller"}))},se=function(){return i.a.createElement(M.RecoilRoot,null,i.a.createElement(le,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(se,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[102,1,2]]]);