(this.webpackJsonpsnufkin=this.webpackJsonpsnufkin||[]).push([[0],{112:function(e,t,a){e.exports=a(215)},117:function(e,t,a){},214:function(e,t,a){},215:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(16),l=a.n(o),c=(a(117),a(21)),s=a(33);function r(e){var t=e>1e3?100:10;return Math.round(parseInt(e,10)/t*t).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function m(e){function t(e,t,a){return((e?e+" years":"")+(t?" "+t+" months":"")+(a?" "+a+" days":"")).trim()}if(e>36*30.4368499){var a=Math.floor(e/365.2421988),n=Math.floor((e-365.2421988*a)/30.4368499);return t(a,n,Math.round(e-365.2421988*a-30.4368499*n))}if(e>61){var i=Math.floor(e/30.4368499);return t(0,i,Math.round(e-30.4368499*i))}return t(0,0,e)}var u=function(e,t){return((parseFloat(e)+parseFloat(t))/2).toFixed(2)},d=function(e){for(var t,a=[],n=e.parent;n;)t=window.gantt.getTask(n),a.unshift(t),n=t.parent;return a},f=function(e,t){[e].concat(d(e)).forEach(t)},v=(window.location.hostname,function(e){var t={trigger:"wheel",useKey:"altKey",levels:[{name:"day",scale_height:27,min_column_width:80,scales:[{unit:"day",step:1,format:"%d %M"}]},{name:"week",scale_height:50,min_column_width:50,scales:[{unit:"week",step:1,format:function(t){var a=e.date.date_to_str("%d %M"),n=e.date.add(t,-6,"day");return"#"+e.date.date_to_str("%W")(t)+", "+a(t)+" - "+a(n)}},{unit:"day",step:1,format:"%j %D"}]},{name:"month",scale_height:50,min_column_width:120,scales:[{unit:"month",format:"%F, %Y"},{unit:"week",format:"Week #%W"}]},{name:"quarter",height:50,min_column_width:90,scales:[{unit:"month",step:1,format:"%M"},{unit:"quarter",step:1,format:function(t){var a=e.date.date_to_str("%M"),n=e.date.add(e.date.add(t,3,"month"),-1,"day");return a(t)+" - "+a(n)}}]},{name:"year",scale_height:50,min_column_width:30,scales:[{unit:"year",step:1,format:"%Y"}]}]};e.ext.zoom.init(t)}),g=[{name:"text",tree:!0,width:156,resize:!0},{name:"start_date",align:"center",resize:!0,width:90},{name:"duration",align:"center",resize:!0,width:90,template:function(e){return m(e.duration)}},{name:"totalCost",align:"center",label:"Cost",width:90,template:function(e){var t=parseFloat(u(e.minCost,e.maxCost))+parseFloat(e.officialFee);return parseFloat(t)>0?r(t)+"$":""}},{name:"add",width:44,min_width:44,max_width:44}],h=function(e,t){var a=[].concat(g);t||a.pop(),e.config.columns=a},E=function(e){e.config.xml_date="%Y-%m-%d",e.config.date_format="%Y-%m-%d";var t=e.config,a=e.date.str_to_date(t.date_format,t.server_utc);e.templates.parse_date=function(e){return a(e.slice(0,10))},e.templates.grid_date_format=function(t,a){return e.date.date_to_str("%d/%m/%Y")(t)}},b=function(e,t){e.attachEvent("onGanttReady",(function(){e.config.buttons_left=[],e.config.buttons_right=[],e.locale.labels.gantt_cancel_btn="Close"}))},p=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a={task:{view:"taskDetails",edit:"editTaskDetails"},project:{view:"folderDetails",edit:"editFolderDetails"},milestone:{view:"milestoneDetails",edit:"editMilestoneDetails",height:200}},n=a[e],i=[{name:"lightbox",height:n.height?n.height:250,type:"template",map_to:t?n.edit:n.view}];return i};function w(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.config.lightbox.sections=p("task",t),e.config.lightbox.project_sections=p("project",t),e.config.lightbox.milestone_sections=p("milestone",t),e.locale.labels.section_lightbox="",e.attachEvent("onBeforeLightbox",(function(t){var a=e.getTask(t);return a.taskDetails||(a.taskDetails="<div id='task-details'/>",a.milestoneDetails="<div id='milestone-details'/>",a.folderDetails="<div id='folder-details'/>"),a}))}var k,N=function(e){e.keys={}},j=function(e,t){return function(a){var n=document.getElementById(t);return n?l.a.createPortal(i.a.createElement(e,a),n):null}},O=a(217),_=function(e){var t=e.task,a=e.className,n=void 0===a?"":a,o=t.progress?(100*t.progress).toFixed(2):0;return i.a.createElement("div",{className:n},i.a.createElement(O.a,{type:"circle",percent:o,width:80}))},y=a(220),x=a(219),C=a(39),F=a(40),S=a(44),z=function(e){var t=i.a.createElement(C.a,{icon:F.d,className:"edit-icon"}),a=i.a.createElement(C.a,{icon:F.a,className:"edit-icon"}),o=Object(n.useState)(!1),l=Object(c.a)(o,2),s=l[0],r=l[1],m=Object(n.useState)(t),u=Object(c.a)(m,2),d=u[0],f=u[1],v=Object(n.useCallback)((function(){s&&e&&e(),r(!s),f(s?t:a)}),[t,a,s,e]),g=Object(n.useCallback)((function(e){"Enter"===e.key&&(v(),e.preventDefault(),e.stopPropagation(),document.removeEventListener("keypress",g))}),[v]);return[s,function(e){var t=e.className,a=void 0===t?"":t;return i.a.createElement(S.a,{className:"edit-button ".concat(a),size:"small",onClick:v},d)}]},T=a(23),D=Object(T.atom)({key:"selectedTask",default:null}),M=Object(T.atom)({key:"editable",default:!1}),R=function(){},L=Object(n.forwardRef)((function(e,t){var a=e.title,n=e.value,o=void 0===n?0:n,l=e.onChange,c=e.className,s=void 0===c?"":c;return i.a.createElement("div",{className:"cost-edit ".concat(s)},i.a.createElement("div",{className:"cost-edit-title"},a),i.a.createElement(y.a,{ref:t,min:0,value:o,formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:l}))})),I=function(e){var t=e.value,a=e.title,n=e.showIfEmpty,o=void 0!==n&&n;return parseFloat(t)||o?i.a.createElement(x.a,{title:a,value:t,precision:2,prefix:"$",className:"display-cost"}):null},B=function(e){var t=e.value,a=e.title,o=e.onChange,l=void 0===o?R:o,r=(e.className,Object(n.useState)(t)),m=Object(c.a)(r,2),u=m[0],d=m[1],f=Object(T.useRecoilState)(D),v=Object(c.a)(f,2),g=v[0],h=v[1],E=z((function(){l(u),h(Object(s.a)({},window.gantt.getTask(g.index)))})),b=Object(c.a)(E,2),p=b[0],w=b[1],k=Object(n.useRef)();return Object(n.useEffect)((function(){p&&k.current&&k.current.focus()}),[p,k]),p?i.a.createElement("div",{className:"edit-cost"},i.a.createElement(L,{value:u,title:a,onChange:d,ref:k}),i.a.createElement(w,{className:"cost-edit-switch"})):i.a.createElement("div",{className:"edit-cost"},i.a.createElement(I,{value:t,title:a,showIfEmpty:!0}),i.a.createElement(w,{className:"cost-edit-switch"}))},$=function(e){var t=e.value,a=e.title,n=e.onChange,o=void 0===n?R:n,l=(e.className,e.editable);return void 0!==l&&l?i.a.createElement(B,{value:t,title:a,onChange:o}):i.a.createElement(I,{value:t,title:a})},W=function(e,t){var a=t-e.officialFee;f(e,(function(e){var t=parseFloat(e.officialFee)+parseFloat(a),n=Object(s.a)(Object(s.a)({},e),{},{officialFee:t,official_fee:t});window.gantt.updateTask(e.id,n)}))},Y=function(e,t){var a=t-u(e.minCost,e.maxCost);f(e,(function(e){var t=parseFloat(e.minCost)+parseFloat(a),n=parseFloat(e.maxCost)+parseFloat(a),i=Object(s.a)(Object(s.a)({},e),{},{minCost:t,min_attorney_fee:t,maxCost:n,max_attorney_fee:n});window.gantt.updateTask(e.id,i)}))},J=function(e){var t=e.task,a=e.className,n=void 0===a?"":a,o=u(t.minCost,t.maxCost)||0,l=t.officialFee,c=parseFloat(o)+parseFloat(l),s=Object(T.useRecoilValue)(M);return i.a.createElement("div",{className:"price-details ".concat(n)},i.a.createElement($,{title:"Attorney Fee",value:o,editable:s,onChange:Y.bind(null,t)}),i.a.createElement($,{title:"Official Fee",value:l,onChange:W.bind(null,t),editable:s}),i.a.createElement($,{title:"Total",value:c,editable:!1}))},A=a(216),P=function(e){var t=e.className,a=void 0===t?"":t,n=Object(T.useRecoilState)(D),o=Object(c.a)(n,2),l=o[0],s=o[1],r=d(l),m=function(e){var t;window.gantt.hideLightbox(),t=e.index,window.gantt.showTask(t),window.gantt.showLightbox(e.id),s(e)};return i.a.createElement(A.a,{className:a},r.map((function(e){return i.a.createElement(A.a.Item,{key:e.index.toString()},i.a.createElement(S.a,{className:"breadcrumb-button",key:e.index.toString(),type:"link",onClick:m.bind(null,e)},e.title))})))},V=a(218),q=function(e){var t=e.task;return i.a.createElement("div",{className:"summary-title"},t.title)},K=function(e){var t=e.task,a=e.className,o=void 0===a?"":a,l=Object(T.useSetRecoilState)(D),r=Object(n.useRef)(),m=Object(n.useState)(t.title),u=Object(c.a)(m,2),d=u[0],f=u[1],v=z((function(){var e=Object(s.a)(Object(s.a)({},t),{},{title:d,text:d});window.gantt.updateTask(t.id,e),l(e)})),g=Object(c.a)(v,2),h=g[0],E=g[1];return Object(n.useEffect)((function(){h&&r.current&&r.current.focus()}),[h,r]),h?i.a.createElement("div",{className:"title-edit ".concat(o)},i.a.createElement(V.a,{defaultValue:t.title,onChange:function(e){var t=e.target;return f(t.value)},onPressEnter:function(){},className:"title-input",ref:r}),i.a.createElement(E,null)):i.a.createElement("div",{className:"title-edit ".concat(o)},i.a.createElement(q,{task:t}),i.a.createElement(E,null))},G=function(e){return Object(T.useRecoilValue)(M)?i.a.createElement(K,e):i.a.createElement(q,e)},U=function(e){var t=e.task,a=e.selectTask;return i.a.createElement("div",{className:"summary"},i.a.createElement(P,{task:t,selectTask:a,className:"parents-component"}),i.a.createElement(G,{task:t}),i.a.createElement("div",null,"Duration: ",i.a.createElement("span",{className:"summary-duration"},m(t.duration))))},H=function(e){var t=e.task,a=e.className,n=void 0===a?"":a,o=(e.editable,t.start_date.toUTCString().split(" ").splice(0,4).join(" "));return i.a.createElement("div",{className:n},i.a.createElement("div",{className:"title-line"},i.a.createElement(C.a,{icon:F.b,className:"milestone-icon"}),i.a.createElement(G,{className:"milestone-title",task:t})),i.a.createElement("div",{className:"milestone-date"},o))},Q={Close:function(e){var t=e.className,a=void 0===t?"":t;return i.a.createElement(S.a,{type:"primary",className:"button close ".concat(a),onClick:function(){window.gantt.hideLightbox()}},"Close")}},X=[j((function(e){var t=e.task;return t?i.a.createElement("div",{className:"details-lightbox"},i.a.createElement("div",{className:"details-collection"},i.a.createElement(U,{task:t}),i.a.createElement(_,{task:t,className:"details-progress"})),i.a.createElement(J,{task:t}),i.a.createElement("div",{className:"view-buttons-section"},i.a.createElement(Q.Close,{className:"read-close"}))):null}),"task-details"),j((function(e){var t=e.task,a=e.selectTask;return t?i.a.createElement("div",{className:"details-lightbox"},i.a.createElement("div",{className:"details-collection"},i.a.createElement(U,{task:t,selectTask:a}),i.a.createElement(_,{task:t,className:"details-progress"})),i.a.createElement(J,{task:t,editable:!1}),i.a.createElement("div",{className:"view-buttons-section"},i.a.createElement(Q.Close,{className:"read-close"}))):null}),"folder-details"),j((function(e){var t=e.task;e.selectTask;return t?i.a.createElement("div",{className:"milestone-details-lightbox"},i.a.createElement("div",{className:"details-collection"},i.a.createElement(H,{task:t,className:"milestone-summary"})),i.a.createElement(J,{task:t}),i.a.createElement("div",{className:"view-buttons-section"},i.a.createElement(Q.Close,{className:"read-close"}))):null}),"milestone-details")],Z=function(e){var t=e.data,a=(e.onSave,Object(T.useRecoilState)(D)),o=Object(c.a)(a,2),l=o[0],r=o[1];return Object(n.useEffect)((function(){(k=window.gantt).clearAll(),function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];v(e),N(e),h(e,t),E(e),w(e,t),b(e),e.init("ganttDiv")}(k,!1),k.ext.zoom.setLevel(0),window.gantt.parse(t),k.attachEvent("onLightbox",(function(e){r(Object(s.a)({},window.gantt.getTask(e)))})),k.attachEvent("onAfterLightbox",(function(e){r(null)}))}),[t,r]),i.a.createElement(i.a.Fragment,null,l?X.map((function(e,t){return i.a.createElement(e,{task:l,key:l.id+t.toString(),selectTask:r})})):null)},ee=function(){var e=window.gantt.ext.zoom._levels.length;return window.gantt.ext.zoom.getCurrentLevel()+1<e},te=function(){return window.gantt.ext.zoom.getCurrentLevel()>0},ae=function(e){var t=e.className,a=void 0===t?"":t,o=Object(n.useState)(!1),l=Object(c.a)(o,2),s=l[0],r=l[1],m=Object(n.useState)(!0),u=Object(c.a)(m,2),d=u[0],f=u[1];return i.a.createElement("div",{className:a},i.a.createElement(S.a,{type:"primary",disabled:!s,className:"zoom-button",onClick:function(){window.gantt.ext.zoom.zoomIn(),f(ee()),r(te())},icon:i.a.createElement(C.a,{icon:F.e,className:"zoom-in"})}),i.a.createElement(S.a,{type:"primary",disabled:!d,className:"zoom-button",onClick:function(){window.gantt.ext.zoom.zoomOut(),f(ee()),r(te())},icon:i.a.createElement(C.a,{icon:F.c,className:"zoom-out"})}))};function ne(e){window.parent.postMessage(e,"*")}a(214);var ie=function(){var e=Object(n.useState)(null),t=Object(c.a)(e,2),a=t[0],o=t[1],l=Object(T.useSetRecoilState)(M);return Object(n.useEffect)((function(){window.onmessage=function(e){var t=e.data;try{t=JSON.parse(e.data)}catch(a){console.log("can't parse data: "+e.data)}"data"===t.type&&(console.log("got data"),o(t.data),l(t.editable||!1),ne("done")),"getSnapshot"===t.type&&ne(JSON.stringify({type:"snapshot",snapshot:{tasks:Object.values(window.gantt.$data.tasksStore.pull),links:window.gantt.getLinks()}}))},l(!1)}),[l]),i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"snufkin"},i.a.createElement("div",{className:"gantt-container"},a?i.a.createElement(Z,{data:a}):null)),i.a.createElement(ae,{className:"zoom-controller"}))},oe=function(){return i.a.createElement(T.RecoilRoot,null,i.a.createElement(ie,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(oe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[112,1,2]]]);