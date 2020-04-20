(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{18:function(n,e,t){n.exports=t(27)},23:function(n,e,t){},27:function(n,e,t){"use strict";t.r(e);var r,a,o=t(0),c=t.n(o),i=t(13),u=t.n(i),l=(t(23),t(5)),f=t(3),s=t(1),d=t(2),b=t(8),v=t(9),g=t.n(v);!function(n){n[n.BOMB=-1]="BOMB",n[n.EMPTY=0]="EMPTY",n[n.ONE=1]="ONE",n[n.TWO=2]="TWO",n[n.THREE=3]="THREE"}(r||(r={})),function(n){n.EASY="easy",n.MEDIUM="medium",n.HARD="hard"}(a||(a={}));var m=g.a.mark(O),h=function(n,e,t){var r=function(n,e,t){for(var r=[],a=0;a<e;a++){for(var o=[],c=0;c<n;c++)o.push(t(a,c));r.push(o)}return r}(n,e,(function(n,e){return{uncovered:!1,value:0,position:{row:n,col:e},flagged:!1}})),a=j(r,t),o=a.board,c=a.bombs,i=[];return c.forEach((function(t){i.push({position:p(t,n,e),flagged:!1})})),{initialBoard:r=E(o),bombs:i}};var p=function(n,e,t){return{col:n%e,row:Math.floor(n/t)}};function O(n,e){var t,a,o,c,i,u,l,f,s;return g.a.wrap((function(d){for(;;)switch(d.prev=d.next){case 0:a=e.row,o=e.col,c=n.length,i=null===(t=n[0])||void 0===t?void 0:t.length,u=-1;case 4:if(!(u<=1)){d.next=18;break}l=-1;case 6:if(!(l<=1)){d.next=15;break}if(s=o+l,!((f=a+u)>=0&&f<i&&s>=0&&s<c&&n[f][s].value!==r.BOMB)||f===a&&s===o){d.next=12;break}return d.next=12,{row:f,col:s};case 12:l++,d.next=6;break;case 15:u++,d.next=4;break;case 18:case"end":return d.stop()}}),m)}var E=function(n){for(var e,t=n.length,a=null===(e=n[0])||void 0===e?void 0:e.length,o=0;o<t;o++)for(var c=0;c<a;c++)if(n[o][c].value===r.BOMB){var i,u=Object(b.a)(O(n,{row:o,col:c}));try{for(u.s();!(i=u.n()).done;){var l=i.value;n[l.row][l.col].value+=1}}catch(f){u.e(f)}finally{u.f()}}return n},j=function(n,e){for(var t=n.length*n.length,a=new Set;a.size<e;)a.add(Math.floor(Math.random()*t));return{board:n.map((function(e,t){return e.map((function(e,o){return a.has(function(n,e,t,r){return r*n+e}(t,o,n.length,n.length))?Object(l.a)({},e,{value:r.BOMB}):e}))})),bombs:a}},w=function(){var n=Object(o.useState)(!1),e=Object(f.a)(n,2),t=e[0],r=e[1],a=Object(o.useState)(!1),c=Object(f.a)(a,2),i=c[0],u=c[1];return{showModal:function(n){u(n),r(!0)},clearModal:function(){r(!1)},isShowing:t,success:i}},x=t(17);function k(){var n=Object(s.a)(["\n  padding: 10px;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n"]);return k=function(){return n},n}var y=d.a.button(k()),M={size:{width:5,height:5},bombCount:4},S=new Map([[a.EASY,M],[a.MEDIUM,{size:{width:10,height:10},bombCount:20}],[a.HARD,{size:{width:15,height:15},bombCount:56}]]);function C(){var n=Object(s.a)(["\n  padding: 2px;\n  border-radius: 0px;\n  width: 100%;\n\n  &:hover {\n    background-color: darkgray;\n  }\n"]);return C=function(){return n},n}function B(){var n=Object(s.a)(["\n  position: absolute;\n  background-color: lightslategray;\n  z-index: 700;\n  display: flex;\n  flex-direction: column;\n"]);return B=function(){return n},n}function D(){var n=Object(s.a)(["\n  display: inline-block;\n  position: relative;\n"]);return D=function(){return n},n}var R=d.a.div(D()),z=d.a.div(B()),A=Object(d.a)(y)(C()),Y=function(n){var e=n.text,t=n.options,r=n.handleSelectOption,a=Object(o.useState)(!1),i=Object(f.a)(a,2),u=i[0],l=i[1];return c.a.createElement(R,null,c.a.createElement(n.as,{onClick:function(){return l(!u)}},e),u&&c.a.createElement(z,null,t.map((function(n){return c.a.createElement(A,{onClick:function(){return function(n){r&&r(n),l(!1)}(n)},key:n},n)}))))};function N(){var n=Object(s.a)(["\n  padding: 0.3em;\n  background-color: cyan;\n  &:hover {\n    background-color: #34f1f1;\n  }\n"]);return N=function(){return n},n}function T(){var n=Object(s.a)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 0.5em;\n  margin-bottom: 0.5em;\n"]);return T=function(){return n},n}var U=d.a.div(T()),I=Object(d.a)(y)(N()),F=function(n){var e=n.flagsLeft,t=n.wins,r=n.losses,a=n.currentDifficulty,o=n.onClickChangeDifficulty;return c.a.createElement(U,null,c.a.createElement("div",null,c.a.createElement("span",null,"Difficulty: ",a),c.a.createElement(Y,{as:I,text:"change",options:Object(x.a)(S.keys()),handleSelectOption:function(n){return o(n)}})),c.a.createElement("span",null,"Flags Left: ",e),c.a.createElement("span",null,"W: ",t),c.a.createElement("span",null,"L: ",r))};function H(){var n=Object(s.a)(["\n  color: ",";\n"]);return H=function(){return n},n}function L(){var n=Object(s.a)(['\n  &::after {\n    font-size: 1.5rem;\n    content: "\ud83c\udff4\u200d\u2620\ufe0f";\n  }\n']);return L=function(){return n},n}function W(){var n=Object(s.a)(["\n  &::after {\n    animation: 1s "," infinite both;\n  }\n"]);return W=function(){return n},n}function P(){var n=Object(s.a)(['\n  from {\n    content: "\ud83d\udca3";\n  }\n  to {\n    content: "\ud83d\udca5";\n  }\n']);return P=function(){return n},n}function J(){var n=Object(s.a)(['\n  &::after {\n    content: "\ud83d\udca3";\n  }\n']);return J=function(){return n},n}function q(){var n=Object(s.a)(["\n  background-color: hsla(235, 7%, 80%, 1);\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 100;\n  top: 0.5px; // Offset the content border\n  left: 0.5px; // Offset the content border\n  cursor: pointer;\n  opacity: ",";\n  transition: opacity ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:hover {\n    background-color: hsl(235, 7%, 60%);\n  }\n"]);return q=function(){return n},n}var $=d.a.div(q(),(function(n){return n.uncovered?0:1}),(function(n){return n.uncovered?"0.5s":"0s"})),G=d.a.span.attrs({role:"img"})(J()),K=Object(d.b)(P()),Q=Object(d.a)(G)(W(),K),V=d.a.span.attrs({role:"img"})(L()),X=d.a.span(H(),(function(n){return 1===n.value?"green":2===n.value?"blue":"red"})),Z=function(n){var e=n.uncovered,t=n.value,a=n.flagged;return c.a.createElement(c.a.Fragment,null,c.a.createElement($,{uncovered:e},a&&c.a.createElement(V,null)),function(){switch(t){case r.BOMB:return e?c.a.createElement(Q,{"aria-label":"bomb-go-boom"}):c.a.createElement(G,{"aria-label":"bomb"});case r.EMPTY:return c.a.createElement("span",null);default:return c.a.createElement(X,{value:t},t)}}())};function _(){var n=Object(s.a)(["\n  border: 0.5px solid black;\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n"]);return _=function(){return n},n}function nn(){var n=Object(s.a)([""]);return nn=function(){return n},n}function en(){var n=Object(s.a)(["\n  width: 500px;\n  height: 500px;\n  border: 1px solid black;\n  border-spacing: 0px;\n  table-layout: fixed;\n"]);return en=function(){return n},n}var tn=d.a.table(en()),rn=d.a.tr(nn()),an=d.a.td(_()),on=function(n){var e=n.board,t=n.onCellClick,r=n.onCellRightClick;return c.a.createElement(tn,null,c.a.createElement("tbody",null,e.map((function(n,e){return c.a.createElement(rn,{key:e},n.map((function(n,e){return c.a.createElement(an,{key:e,onClick:function(e){return t(e,n)},onContextMenu:function(e){return r(e,n)}},c.a.createElement(Z,n))})))}))))};function cn(){var n=Object(s.a)(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 500;\n  width: 300px;\n  height: 150px;\n  background-color: ",";\n  border-radius: 20px;\n  box-shadow: 5px 5px 3px grey;\n  display: ",";\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n"]);return cn=function(){return n},n}var un,ln=d.a.div(cn(),(function(n){return n.background}),(function(n){return n.showing?"flex":"none"})),fn=function(n){return c.a.createElement(ln,n,n.children)};function sn(){var n=Object(s.a)(["\n  background-color: orange;\n  &:hover {\n    background-color: #e49400;\n  }\n"]);return sn=function(){return n},n}function dn(){var n=Object(s.a)(["\n  background-color: aquamarine;\n  &:hover {\n    background-color: #72e2bd;\n  }\n"]);return dn=function(){return n},n}function bn(){var n=Object(s.a)(["\n  display: flex;\n  width: 75%;\n  justify-content: space-around;\n"]);return bn=function(){return n},n}!function(n){n.SUCCESS="#35c575",n.FAILURE="#c54545"}(un||(un={}));var vn=d.a.div(bn()),gn=Object(d.a)(y)(dn()),mn=Object(d.a)(y)(sn()),hn=function(n){var e=n.isShowing,t=n.success,r=n.handleRestart,a=n.showNext,o=n.handleNext,i=t?"You got 'em all! You win!":"\ud83d\udca5BOOM!!!\ud83d\udca5";return c.a.createElement(fn,{showing:e,background:t?un.SUCCESS:un.FAILURE},c.a.createElement("p",null,i),c.a.createElement(vn,null,c.a.createElement(gn,{onClick:r},"Restart"),a&&c.a.createElement(mn,{onClick:o},"Next")))};function pn(){var n=Object(s.a)(["\n  margin-top: 0px;\n  margin-bottom: 0px;\n  text-align: center;\n"]);return pn=function(){return n},n}function On(){var n=Object(s.a)(["\n  max-width: 500px;\n"]);return On=function(){return n},n}function En(){var n=Object(s.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n"]);return En=function(){return n},n}var jn=d.a.div(En()),wn=d.a.div(On()),xn=d.a.h1(pn()),kn=function(){var n,e=w(),t=e.isShowing,i=e.showModal,u=e.clearModal,s=e.success,d=Object(o.useState)(0),v=Object(f.a)(d,2),g=v[0],m=v[1],p=Object(o.useState)(0),E=Object(f.a)(p,2),j=E[0],x=E[1],k=function(n){n?(m(g+1),i(!0)):(x(j+1),i(!1))},y=Object(o.useState)(a.EASY),C=Object(f.a)(y,2),B=C[0],D=C[1],R=null!==(n=S.get(B))&&void 0!==n?n:M,z=R.size,A=R.bombCount,Y=function(n){var e=S.get(n);void 0!==e&&(D(n),K(e.size,e.bombCount))},N=Object(o.useState)([]),T=Object(f.a)(N,2),U=T[0],I=T[1],H=Object(o.useState)((function(){var n=h(z.width,z.height,A),e=n.initialBoard,t=n.bombs;return I(t),e})),L=Object(f.a)(H,2),W=L[0],P=L[1],J=Object(o.useState)(A),q=Object(f.a)(J,2),$=q[0],G=q[1],K=function(n,e){var t=h(n.width,n.height,e),r=t.initialBoard,a=t.bombs;u(),I(a),G(e),P(r)};return c.a.createElement(jn,null,c.a.createElement(wn,null,c.a.createElement(hn,{isShowing:t,success:s,handleRestart:function(){return K(z,A)},showNext:s&&B!==a.HARD,handleNext:function(){B===a.EASY?Y(a.MEDIUM):B===a.MEDIUM&&Y(a.HARD)}}),c.a.createElement(xn,null,"Minesweeper"),c.a.createElement(F,{flagsLeft:$,wins:g,losses:j,currentDifficulty:B,onClickChangeDifficulty:Y}),c.a.createElement(on,{board:W,onCellClick:function(n,e){var t=function(n,e){var t=new Set;!function e(a){var o=a.value,c=a.position;if(!t.has(c)&&(t.add(c),o===r.EMPTY)){var i,u=Object(b.a)(O(n,c));try{for(u.s();!(i=u.n()).done;){var l=i.value;e(n[l.row][l.col])}}catch(f){u.e(f)}finally{u.f()}}}(e);var a=0;return{board:n.map((function(n){return n.map((function(n){return t.has(n.position)?(n.flagged&&a++,Object(l.a)({},n,{uncovered:!0,flagged:!1})):n}))})),recoveredFlags:a}}(W,e),a=t.board,o=t.recoveredFlags;P(a),G($+o),e.value===r.BOMB&&k(!1)},onCellRightClick:function(n,e){n.preventDefault();var t=e.flagged;if(t||0!==$){G($+(t?1:-1)),P((function(n){return function(n,e){return n.map((function(n){return n.map((function(n){return n.position===e.position?Object(l.a)({},n,{flagged:!n.flagged}):n}))}))}(n,e)}));var r=U.map((function(n){return e.position.row===n.position.row&&e.position.col===n.position.col?Object(l.a)({},n,{flagged:!n.flagged}):n}));r.reduce((function(n,e){return n&&e.flagged}),r[0].flagged)&&k(!0),I(r)}else console.log("No more flags!")}})))};var yn=function(){return c.a.createElement(kn,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(yn,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.bd86fb22.chunk.js.map