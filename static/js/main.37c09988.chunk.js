(this.webpackJsonpsnufkin=this.webpackJsonpsnufkin||[]).push([[0],{103:function(e,t,a){e.exports=a(185)},108:function(e,t,a){},184:function(e,t,a){},185:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(17),c=a.n(o),l=(a(108),a(12)),s=a(22);function r(e){var t=e>1e3?100:10;return Math.round(parseInt(e,10)/t*t).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function u(e){function t(e,t,a){return((e?e+" years":"")+(t?" "+t+" months":"")+(a?" "+a+" days":"")).trim()}if(e>36*30.4368499){var a=Math.floor(e/365.2421988),n=Math.floor((e-365.2421988*a)/30.4368499);return t(a,n,Math.round(e-365.2421988*a-30.4368499*n))}if(e>61){var i=Math.floor(e/30.4368499);return t(0,i,Math.round(e-30.4368499*i))}return t(0,0,e)}var d=function(e,t){return((parseFloat(e)+parseFloat(t))/2).toFixed(2)},m=function(e){for(var t,a=[],n=e.parent;n;)t=window.gantt.getTask(n),a.unshift(t),n=t.parent;return a},f=function(e){window.gantt.showTask(e)},v=function(e,t){[e].concat(m(e)).forEach(t)},g=["officialFee","associateFee","unidentifiedFee","brokerageFee"],b=function(e){return g.reduce((function(t,a){return parseFloat(t)+parseFloat(e[a]||0)}),0)},h=function(e){var t=window.gantt.getTask(e);if(t){var a=function(e){return Object.values(window.gantt.$data.tasksStore.pull).filter((function(t){return t.parent===e}))}(e),n=t.parent;a.forEach((function(e){window.gantt.updateTask(e.id,Object(s.a)(Object(s.a)({},e),{},{parent:n}))})),t.isFolder||E(t),window.gantt.deleteTask(e)}},E=function(e){var t=m(e),a=Object.entries(e).filter((function(e){var t=Object(l.a)(e,2),a=t[0],n=t[1];return(a.toLowerCase().includes("fee")||a.includes("Cost"))&&n}));console.log(a,t),t.forEach((function(e){var t=Object(s.a)({},e);a.forEach((function(e){var a=Object(l.a)(e,2),n=a[0],i=a[1];t[n]=t[n]-i})),window.gantt.updateTask(e.id,t)}))},p=(window.location.hostname,function(e){var t={trigger:"wheel",useKey:"altKey",levels:[{name:"day",scale_height:27,min_column_width:80,scales:[{unit:"day",step:1,format:"%d %M"}]},{name:"week",scale_height:50,min_column_width:50,scales:[{unit:"week",step:1,format:function(t){var a=e.date.date_to_str("%d %M"),n=e.date.add(t,-6,"day");return"#"+e.date.date_to_str("%W")(t)+", "+a(t)+" - "+a(n)}},{unit:"day",step:1,format:"%j %D"}]},{name:"month",scale_height:50,min_column_width:120,scales:[{unit:"month",format:"%F, %Y"},{unit:"week",format:"Week #%W"}]},{name:"quarter",height:50,min_column_width:90,scales:[{unit:"month",step:1,format:"%M"},{unit:"quarter",step:1,format:function(t){var a=e.date.date_to_str("%M"),n=e.date.add(e.date.add(t,3,"month"),-1,"day");return a(t)+" - "+a(n)}}]},{name:"year",scale_height:50,min_column_width:30,scales:[{unit:"year",step:1,format:"%Y"}]}]};e.ext.zoom.init(t)}),w=[{name:"text",tree:!0,width:156,resize:!0},{name:"start_date",align:"center",resize:!0,width:90},{name:"duration",align:"center",resize:!0,width:90,template:function(e){return u(e.duration)}},{name:"totalCost",align:"center",label:"Cost",width:90,template:function(e){var t=parseFloat(d(e.minCost,e.maxCost))+parseFloat(b(e));return parseFloat(t)>0?r(t)+"$":""}},{name:"add",width:44,min_width:44,max_width:44}],k=function(e,t){var a=[].concat(w);t||a.pop(),e.config.columns=a},j=function(e){e.config.date_format="%Y-%m-%d",e.config.date_format="%Y-%m-%d";var t=e.config,a=e.date.str_to_date(t.date_format,t.server_utc);e.templates.parse_date=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return a(e.slice(0,10))},e.templates.grid_date_format=function(t,a){return e.date.date_to_str("%d/%m/%Y")(t)}},O=function(e,t){e.attachEvent("onGanttReady",(function(){e.config.buttons_left=[],e.config.buttons_right=[],e.locale.labels.gantt_cancel_btn="Close"}))},N=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a={task:{view:"taskDetails",edit:"editTaskDetails"},project:{view:"folderDetails",edit:"editFolderDetails"},milestone:{view:"milestoneDetails",edit:"editMilestoneDetails",height:200}},n=a[e],i=[{name:"lightbox",height:n.height?n.height:250,type:"template",map_to:t?n.edit:n.view}];return i};function _(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.config.lightbox.sections=N("task",t),e.config.lightbox.project_sections=N("project",t),e.config.lightbox.milestone_sections=N("milestone",t),e.locale.labels.section_lightbox="",e.attachEvent("onBeforeLightbox",(function(t){var a=e.getTask(t);return a.taskDetails||(a.taskDetails="<div id='task-details'/>",a.milestoneDetails="<div id='milestone-details' class='snufkin'/>",a.folderDetails="<div id='folder-details'/>"),a})),e.attachEvent("onTaskCreated",(function(t){return t.$new=!0,e.addTask(t),!1})),e.attachEvent("onAfterTaskAdd",(function(t,a){a.$new&&(a.index=a.id,a.title=a.text,a.minCost=0,a.maxCost=0,a.$source=[],a.$target=[],a.$new=!1,e.showLightbox(t))}))}var x,y=function(e){e.keys={}},F=function(e){e.plugins({auto_scheduling:!0}),e.config.auto_scheduling=!0},C=function(e,t){return function(a){var n=document.getElementById(t);return n?c.a.createPortal(i.a.createElement(e,a),n):null}},S=a(188),T=function(e){var t=e.task,a=e.className,n=void 0===a?"":a,o=t.progress?(100*t.progress).toFixed(2):0;return i.a.createElement("div",{className:n},i.a.createElement(S.a,{type:"circle",percent:o,width:80}))},D=a(61),z=a(190),$=a(39),R=a(40),L=a(45),M=function(e){var t=i.a.createElement($.a,{icon:R.d,className:"edit-icon"}),a=i.a.createElement($.a,{icon:R.a,className:"edit-icon"}),o=Object(n.useState)(!1),c=Object(l.a)(o,2),s=c[0],r=c[1],u=Object(n.useState)(t),d=Object(l.a)(u,2),m=d[0],f=d[1],v=Object(n.useCallback)((function(){s&&e&&e(),r(!s),f(s?t:a)}),[t,a,s,e]),g=Object(n.useCallback)((function(e){"Enter"===e.key&&(v(),e.preventDefault(),e.stopPropagation(),document.removeEventListener("keypress",g))}),[v]);return[s,function(e){var t=e.className,a=void 0===t?"":t;return i.a.createElement(L.a,{className:"edit-button ".concat(a),size:"small",onClick:v},m)}]},B=a(18),I=Object(B.atom)({key:"selectedTask",default:null}),A=Object(B.atom)({key:"editable",default:!1}),Y=function(){},V=Object(n.forwardRef)((function(e,t){var a=e.title,n=e.value,o=void 0===n?0:n,c=e.onChange,l=e.className,s=void 0===l?"":l;return i.a.createElement("div",{className:"cost-edit ".concat(s)},i.a.createElement("span",{className:"cost-edit-title"},a),i.a.createElement(z.a,{ref:t,min:0,value:parseFloat(o)?o:"",formatter:function(e){return"$ ".concat(e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")},onChange:c}))})),W=function(e){var t=e.value,a=void 0===t?0:t,n=e.title,o=(e.showIfEmpty,e.className),c=void 0===o?"":o;return i.a.createElement("div",{className:"cost-display ".concat(c)},i.a.createElement("span",{className:"cost-edit-title"},n),i.a.createElement("span",{className:"display-cost"},"$ ".concat(function(e){var t=parseFloat(e).toFixed(2).toString().split(".");return[t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t[1]].join(".")}(a||0))))},J=function(e){var t=e.value,a=e.title,o=e.onChange,c=void 0===o?Y:o,r=(e.className,Object(n.useState)(t)),u=Object(l.a)(r,2),d=u[0],m=u[1],f=Object(B.useRecoilState)(I),v=Object(l.a)(f,2),g=v[0],b=v[1],h=M((function(){c(d),b(Object(s.a)({},window.gantt.getTask(g.index)))})),E=Object(l.a)(h,2),p=E[0],w=E[1],k=Object(n.useRef)();return Object(n.useEffect)((function(){p&&k.current&&k.current.focus()}),[p,k]),Object(n.useEffect)((function(){return function(){p&&!g&&(console.log("inputref",k),c(d))}}),[d,p,c,g]),p?i.a.createElement("div",{className:"edit-cost"},i.a.createElement(V,{value:d,title:a,onChange:m,ref:k}),i.a.createElement(w,{className:"cost-edit-switch"})):i.a.createElement("div",{className:"edit-cost"},i.a.createElement(W,{value:t,title:a,showIfEmpty:!0}),i.a.createElement(w,{className:"cost-edit-switch"}))},P=function(e){var t=e.value,a=e.title,n=e.onChange,o=void 0===n?Y:n,c=e.className,l=void 0===c?"":c,s=e.editable;return void 0!==s&&s?i.a.createElement(J,{value:t,title:a,onChange:o,className:l}):i.a.createElement(W,{value:t,title:a,className:l})},U=function(e,t){var a=t-e.officialFee;v(e,(function(e){var t=parseFloat(e.officialFee)+parseFloat(a),n=Object(s.a)(Object(s.a)({},e),{},{officialFee:t,official_fee:t});window.gantt.updateTask(e.id,n)}))},q=function(e,t){var a=t-d(e.minCost,e.maxCost);v(e,(function(e){var t=parseFloat(e.minCost)+parseFloat(a),n=parseFloat(e.maxCost)+parseFloat(a),i=Object(s.a)(Object(s.a)({},e),{},{minCost:t,min_attorney_fee:t,maxCost:n,max_attorney_fee:n});window.gantt.updateTask(e.id,i)}))},K=function(e){return function(t,a){var n=t[e]||0,i=a-n;console.log("costs",n,i,a),v(t,(function(t){var a=t[e]||0,n=parseFloat(a)+parseFloat(i),o=Object(s.a)(Object(s.a)({},t),{},Object(D.a)({},e,n));window.gantt.updateTask(t.id,o)}))}},G=function(e){var t=e.task,a=e.className,n=void 0===a?"":a,o=d(t.minCost||0,t.maxCost||0)||0,c=t.officialFee,l=parseFloat(o)+parseFloat(b(t)),s=Object(B.useRecoilValue)(A)&&!t.isFolder;return i.a.createElement("div",{className:"price-details ".concat(n)},i.a.createElement(P,{title:"Attorney Fee",value:o,editable:s,onChange:q.bind(null,t)}),i.a.createElement(P,{title:"Official Fee",value:c,onChange:U.bind(null,t),editable:s}),i.a.createElement(P,{title:"Associate Fee",value:t.associateFee,onChange:K("associateFee").bind(null,t),editable:s}),i.a.createElement(P,{title:"Unidentified Fee",value:t.unidentifiedFee,onChange:K("unidentifiedFee").bind(null,t),editable:s}),i.a.createElement(P,{title:"Brokerage Fee",value:t.brokerageFee,onChange:K("brokerageFee").bind(null,t),editable:s}),i.a.createElement(P,{title:"Total",value:l,editable:!1,className:"total-cost"}))},H=a(186),Q=function(e){var t=e.className,a=void 0===t?"":t,n=Object(B.useRecoilState)(I),o=Object(l.a)(n,2),c=o[0],s=o[1],r=m(c),u=function(e){window.gantt.hideLightbox(),f(e.index),window.gantt.showLightbox(e.id),s(e)};return i.a.createElement(H.a,{className:a},r.map((function(e){return i.a.createElement(H.a.Item,{key:e.index.toString()},i.a.createElement(L.a,{className:"breadcrumb-button",key:e.index.toString(),type:"link",onClick:u.bind(null,e)},e.title))})))},X=a(189),Z=function(e){var t=e.task;return i.a.createElement("div",{className:"summary-title"},t.title)},ee=function(e){var t=e.task,a=e.className,o=void 0===a?"":a,c=Object(B.useSetRecoilState)(I),r=Object(n.useRef)(),u=Object(n.useState)(t.title),d=Object(l.a)(u,2),m=d[0],f=d[1],v=M((function(){var e=Object(s.a)(Object(s.a)({},t),{},{title:m,text:m});window.gantt.updateTask(t.id,e),c(e)})),g=Object(l.a)(v,2),b=g[0],h=g[1];return Object(n.useEffect)((function(){b&&r.current&&r.current.focus()}),[b,r]),b?i.a.createElement("div",{className:"title-edit ".concat(o)},i.a.createElement(X.a,{defaultValue:t.title,onChange:function(e){var t=e.target;return f(t.value)},onPressEnter:function(){},className:"title-input",ref:r}),i.a.createElement(h,null)):i.a.createElement("div",{className:"title-edit ".concat(o)},i.a.createElement(Z,{task:t}),i.a.createElement(h,null))},te=function(e){return Object(B.useRecoilValue)(A)?i.a.createElement(ee,e):i.a.createElement(Z,e)},ae=function(e){var t=e.task,a=e.selectTask;return i.a.createElement("div",{className:"summary"},i.a.createElement(Q,{task:t,selectTask:a,className:"parents-component"}),i.a.createElement(te,{task:t}),i.a.createElement("div",null,"Duration: ",i.a.createElement("span",{className:"summary-duration"},u(t.duration))))},ne=function(e){var t=e.task,a=e.className,n=void 0===a?"":a,o=(e.editable,t&&t.start_date&&t.start_date.toUTCString?t.start_date.toUTCString().split(" ").splice(0,4).join(" "):null);return i.a.createElement("div",{className:n},i.a.createElement("div",{className:"title-line"},i.a.createElement($.a,{icon:R.b,className:"milestone-icon"}),i.a.createElement(te,{className:"milestone-title",task:t})),i.a.createElement("div",{className:"milestone-date"},o))},ie=function(e){var t=e.className,a=void 0===t?"":t,n=Object(B.useRecoilState)(I),o=Object(l.a)(n,2),c=o[0],r=o[1];return i.a.createElement(L.a,{type:"primary",className:"button close ".concat(a),onClick:function(){var e=Object(s.a)({},window.gantt.getTask(c.id));e.$source=[].concat(e.$source),e.$target=[].concat(e.$target),window.gantt.updateTask(c.id,e),window.gantt.hideLightbox(),r(null)}},"Close")},oe=function(e){var t=e.id;return i.a.createElement(L.a,{onClick:function(){window.gantt.hideLightbox(),h(t)},className:"delete-button button",type:"primary",danger:!0},"Delete")},ce={Close:ie,Delete:oe,Default:function(e){var t=e.id;return Object(B.useRecoilValue)(A)?i.a.createElement("div",{className:"editable-buttons"},i.a.createElement(oe,{id:t}),i.a.createElement(ie,null)):i.a.createElement("div",{className:"buttons"}," ",i.a.createElement(ie,null)," ")}},le=[C((function(e){var t=e.task;return t?i.a.createElement("div",{className:"details-lightbox"},i.a.createElement("div",{className:"details-collection"},i.a.createElement(ae,{task:t}),i.a.createElement(T,{task:t,className:"details-progress"})),i.a.createElement(G,{task:t}),i.a.createElement("div",{className:"view-buttons-section"},i.a.createElement(ce.Default,{id:t.id}))):null}),"task-details"),C((function(e){var t=e.task,a=e.selectTask;return t?i.a.createElement("div",{className:"details-lightbox"},i.a.createElement("div",{className:"details-collection"},i.a.createElement(ae,{task:t,selectTask:a}),i.a.createElement(T,{task:t,className:"details-progress"})),i.a.createElement(G,{task:t,editable:!1}),i.a.createElement("div",{className:"view-buttons-section"},i.a.createElement(ce.Default,{id:t.id}))):null}),"folder-details"),C((function(e){var t=e.task,a=void 0===t?{}:t;e.selectTask;return a?i.a.createElement("div",{className:"milestone-details-lightbox"},i.a.createElement("div",{className:"details-collection"},i.a.createElement(ne,{task:a,className:"milestone-summary"})),i.a.createElement(G,{task:a}),i.a.createElement("div",{className:"view-buttons-section"},i.a.createElement(ce.Default,{id:a.id}))):null}),"milestone-details")],se=function(){var e=window.gantt.ext.zoom._levels.length;return window.gantt.ext.zoom.getCurrentLevel()+1<e},re=function(){return window.gantt.ext.zoom.getCurrentLevel()>0},ue=function(e){var t=e.className,a=void 0===t?"":t,o=Object(n.useState)(!1),c=Object(l.a)(o,2),s=c[0],r=c[1],u=Object(n.useState)(!0),d=Object(l.a)(u,2),m=d[0],f=d[1];return i.a.createElement("div",{className:a},i.a.createElement(L.a,{type:"primary",disabled:!s,className:"zoom-button",onClick:function(){window.gantt.ext.zoom.zoomIn(),f(se()),r(re())},icon:i.a.createElement($.a,{icon:R.e,className:"zoom-in"})}),i.a.createElement(L.a,{type:"primary",disabled:!m,className:"zoom-button",onClick:function(){window.gantt.ext.zoom.zoomOut(),f(se()),r(re())},icon:i.a.createElement($.a,{icon:R.c,className:"zoom-out"})}))},de=function(e){var t=e.data,a=(e.onSave,Object(B.useRecoilState)(I)),o=Object(l.a)(a,2),c=o[0],r=o[1],u=Object(n.useState)(!1),d=Object(l.a)(u,2),m=d[0],g=d[1],b=Object(B.useRecoilValue)(A),h=Object(n.useState)(null),E=Object(l.a)(h,2),w=E[0],N=E[1];return Object(n.useEffect)((function(){(x=window.gantt).clearAll(),function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];p(e),F(e),y(e),k(e,t),j(e),_(e),O(e),e.init("ganttDiv")}(x,b),x.ext.zoom.setLevel(0),x.config.date_format="%Y-%m-%d",window.gantt.parse(t),Object.values(t.tasks).forEach((function(e){return x.addTask(e,e.parent)})),x.attachEvent("onLightbox",(function(e){r(window.gantt.getTask(e))})),x.attachEvent("onAfterLightbox",(function(e){r(null)})),m||g(!0)}),[t,r,g,b]),Object(n.useEffect)((function(){m&&(!c||!c.index||w&&w.index===c.index||(x.hideLightbox(),N(c),f(c.index),x.$data.tasksStore.select(c.index),v(c,(function(e){if(e.isFolder){var t=Object(s.a)(Object(s.a)({},e),{},{$open:!0});window.gantt.updateTask(e.id,t)}})),window.gantt.showLightbox(c.id)))}),[m,c,w]),i.a.createElement(i.a.Fragment,null,c?le.map((function(e,t){return i.a.createElement(e,{task:c,key:c.id+t.toString(),selectTask:r})})):null,i.a.createElement(ue,{className:"zoom-controller"}))};function me(e){window.parent.postMessage(e,"*")}a(184);var fe=function(e){var t=e.tasks,a=e.links,o=e.selectedTask,c=Object(n.useState)(null),s=Object(l.a)(c,2),r=s[0],u=s[1],d=Object(B.useSetRecoilState)(A),m=Object(B.useSetRecoilState)(I);return Object(n.useEffect)((function(){window.onmessage=function(e){var t=e.data;try{t=JSON.parse(e.data)}catch(a){console.log("can't parse data: "+e.data)}"data"===t.type&&(console.log("got data"),u(t.data),d(t.editable||!1),me("done")),"getSnapshot"===t.type&&me(JSON.stringify({type:"snapshot",snapshot:{tasks:Object.values(window.gantt.$data.tasksStore.pull),links:window.gantt.getLinks()}}))}}),[d]),Object(n.useEffect)((function(){t&&a&&u({data:t,links:a})}),[t,a]),Object(n.useEffect)((function(){m(o)}),[o]),i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"snufkin"},i.a.createElement("div",{id:"ganttDiv"}),i.a.createElement("div",{className:"gantt-container"},r?i.a.createElement(de,{data:r}):null)))},ve=function(e){return i.a.createElement(B.RecoilRoot,null,i.a.createElement(fe,e))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(ve,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[103,1,2]]]);