(this["webpackJsonpthird-react-app-todo-list"]=this["webpackJsonpthird-react-app-todo-list"]||[]).push([[0],[,,,,,,,,function(e,t,n){},,function(e,t,n){e.exports=n(19)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),o=n(9),i=n.n(o);n(15),n(8),n(16);var l,r=function(){return c.a.createElement("div",{id:"header",className:"margin"},"Super Awesome Todo List")},u=n(6),s=n(2),m=n(5),f=n(1),d=n.n(f),p=(n(17),"ALL"),v="DONE",E="TODO",h=(l={},Object(m.a)(l,v,!0),Object(m.a)(l,E,!1),l);var b=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],o=t[1],i=Object(a.useState)([]),l=Object(s.a)(i,2),r=l[0],m=l[1],f=Object(a.useState)(""),b=Object(s.a)(f,2),O=b[0],g=b[1],j=Object(a.useState)(p),N=Object(s.a)(j,2),y=N[0],k=N[1];Object(a.useEffect)((function(){w()}));var w=function(){document.title="Todo's: ".concat(r.length-n.length)},C=function(e){e.complete=!e.complete,n.includes(e)||o([].concat(Object(u.a)(n),[e]))},D=function(e){k(e)};return c.a.createElement("div",{id:"todoList"},c.a.createElement("div",{className:"form"},c.a.createElement("form",null,c.a.createElement("input",{type:"text",placeholder:"Thing to do...",value:O,onChange:function(e){g(e.target.value)}}),c.a.createElement("input",{type:"submit",value:"Create!",onClick:function(e){e.preventDefault();var t=O.split(";"),n=Object(s.a)(t,2),a=n[0],c=n[1];m([].concat(Object(u.a)(r),[{item:a,difficulty:c,complete:!1}])),g("")}})),c.a.createElement("div",{className:"select"},c.a.createElement("div",{className:d()("option",{selected:y===p}),onClick:function(){return D(p)}},"All"),c.a.createElement("div",{className:d()("option",{selected:y===v}),onClick:function(){return D(v)}},"Done"),c.a.createElement("div",{className:d()("option",{selected:y===E}),onClick:function(){return D(E)}},"To Do"))),c.a.createElement("ul",{className:"list"},(console.log(h[y]),!1===h[y]||!0===h[y]?function(e){return e.filter((function(e){return e.complete===h[y]})).map((function(e,t){return c.a.createElement("li",{key:t,className:d()("todoItem",{done:e.complete})},"Thing: ",e.item,", Difficulty: ",e.difficulty,c.a.createElement("input",{type:"button",className:"doneButton",onClick:function(){return C(e)}}))}))}:function(e){return e.map((function(e,t){return c.a.createElement("li",{key:t,className:d()("todoItem",{done:e.complete})},"Thing: ",e.item,", Difficulty: ",e.difficulty,c.a.createElement("input",{type:"button",className:"doneButton",onClick:function(){return C(e)}}))}))})(r)))};n(18);var O=function(){return c.a.createElement("div",{id:"footer",className:"margin"},"Footer!")};var g=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(r,null),c.a.createElement(b,null),c.a.createElement(O,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.34af6de1.chunk.js.map