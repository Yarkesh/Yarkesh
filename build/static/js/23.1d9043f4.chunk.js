(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{369:function(e,t,a){e.exports={button_flex:"style_button_flex__YKWMQ",button:"style_button__1oBEt",tag:"style_tag__15uHH",tag_flex:"style_tag_flex__UiEGo",usBoxContainer:"style_usBoxContainer__2jKMw",hoverCard:"style_hoverCard__1AM34",usBox:"style_usBox__2UV3d",usBoxRow:"style_usBoxRow__2Ud5Z",formControll:"style_formControll__2gDam",modalContainer:"style_modalContainer__11_TM",accept:"style_accept__QlmP0",borderi:"style_borderi__2p1O9"}},615:function(e,t,a){"use strict";a.r(t);a(477);var n=a(489),c=(a(429),a(431)),r=(a(390),a(396)),l=(a(304),a(306)),o=(a(302),a(303)),u=(a(411),a(368)),s=(a(271),a(27)),i=(a(275),a(280)),m=a(125),d=a(52),h=(a(412),a(391)),f=a(36),y=a(369),b=a.n(y),p=a(0),E=a.n(p),v=a(71),j=h.a.Option;t.default=function(e){var t=Object(p.useState)(!1),a=Object(d.a)(t,2),y=(a[0],a[1],Object(p.useState)("")),g=Object(d.a)(y,2),O=g[0],x=g[1],_=Object(p.useState)(""),C=Object(d.a)(_,2),w=C[0],k=C[1],S=Object(p.useState)(""),I=Object(d.a)(S,2),N=I[0],B=I[1],F=Object(p.useState)(""),M=Object(d.a)(F,2),T=M[0],P=M[1],R=Object(p.useState)(),D=Object(d.a)(R,2),A=D[0],K=D[1],U=Object(p.useState)(),V=Object(d.a)(U,2),W=V[0],H=V[1],J=Object(p.useState)(!1),Q=Object(d.a)(J,2),q=(Q[0],Q[1]),z=Object(p.useState)(""),G=Object(d.a)(z,2),Y=G[0],Z=G[1],L=Object(p.useState)([]),X=Object(d.a)(L,2),$=X[0],ee=X[1],te=Object(p.useState)(""),ae=Object(d.a)(te,2),ne=ae[0],ce=ae[1],re=Object(p.useState)(!1),le=Object(d.a)(re,2),oe=le[0],ue=le[1],se=Object(p.useState)([]),ie=Object(d.a)(se,2),me=ie[0],de=ie[1],he=Object(p.useState)([]),fe=Object(d.a)(he,2),ye=fe[0],be=fe[1],pe=Object(p.useState)(1),Ee=Object(d.a)(pe,2),ve=Ee[0],je=Ee[1],ge=Object(p.useState)(),Oe=Object(d.a)(ge,2),xe=(Oe[0],Oe[1]),_e=Object(f.d)(),Ce=Object(f.e)(function(e){return e.projectStories},f.c),we=Ce.loading,ke=Ce.stories,Se=Ce.selectedStory,Ie=(Object(p.useCallback)(function(){return _e(Object(v.g)())},[]),Object(f.e)(function(e){return e.projectDetail},f.c),Object(f.e)(function(e){return e.auth},f.c),Object(f.e)(function(e){return e.projectMember},f.c).members),Ne=Object(f.e)(function(e){return e.sprintActivity},f.c),Be=Ne.activities,Fe=Ne.sprints;Object(p.useEffect)(function(){Se.storyId&&(e.setVisible(!0),x(Se.storyName||" "),k(Se.as||" "),B(Se.iWant||" "),P(Se.soThat||" "),ee(Se.acceptanceTest||[]),je(Se.storyPoint),ce(Se.priority||""),ue(Se.isEpic),K(Se.activityId),H(Se.sprintId),xe(Se.storyId),be(Se.assignment),de(Se.dependency))},[Se]);var Me=function(){if(Y.length){var e={test:Y,checked:!1};ee(function(t){return[].concat(Object(m.a)(t),[e])}),Z("")}};return Object(p.useEffect)(function(){w.length>=2&&N.length>=2&&T.length>=2&&O.length>=2?q(!1):q(!0)},[w,N,T,O,e.projectId]),E.a.createElement(l.a,{style:{justifyContent:"space-between",display:"flex",flexWrap:"wrap"}},E.a.createElement(o.a,{md:14,xs:24,style:{marginTop:"8px"}},E.a.createElement("div",{className:"".concat(b.a.formControll)},E.a.createElement("label",{htmlFor:"name"},"name:"),E.a.createElement(i.a,{onChange:function(e){return x(e.target.value)},placeholder:"name of user story",id:"name",value:O})),E.a.createElement("div",{className:"".concat(b.a.formControll)},E.a.createElement("label",{htmlFor:"who"},"as :"),E.a.createElement(i.a,{onChange:function(e){return k(e.target.value)},placeholder:"who want to do this",id:"who",value:w})),E.a.createElement("div",{className:"".concat(b.a.formControll)},E.a.createElement("label",{htmlFor:"what"},"i want:"),E.a.createElement(i.a,{onChange:function(e){return B(e.target.value)},placeholder:"what you want to do",id:"what",value:N})),E.a.createElement("div",{className:"".concat(b.a.formControll)},E.a.createElement("label",{htmlFor:"why"},"so that:"),E.a.createElement(i.a.TextArea,{value:T,onChange:function(e){return P(e.target.value)},placeholder:"why you want to do this",autosize:{minRows:2,maxRows:6},id:"why"})),E.a.createElement("div",{className:"".concat(b.a.formControll)},E.a.createElement("label",{htmlFor:"which"},"acceptance criteria:"),E.a.createElement(i.a,{placeholder:"by which condition do this",id:"which",onKeyDown:function(e){13===e.keyCode&&Me()},value:Y,onChange:function(e){return Z(e.target.value)},suffix:E.a.createElement(s.a,{type:"plus-circle",onClick:Me,style:{color:"rgba(0,0,0,.45)"}})})),$.length?E.a.createElement(l.a,null,$.map(function(e,t){return E.a.createElement(o.a,{key:t,span:24,style:{display:"flex",justifyContent:"space-between",marginBottom:"4px",marginTop:"4px"}},E.a.createElement(u.a,{style:{textDecoration:e.checked?"line-through":"none",color:e.checked?"gray":"black"},onChange:function(){return function(e){var t=Object(m.a)($),a=t.findIndex(function(t){return t===e});-1!==a&&(t[a].checked=!t[a].checked),ee(t)}(e)},checked:!!e.checked},e.test),E.a.createElement(s.a,{type:"delete",onClick:function(){return function(e){var t=$.filter(function(t){return t!==e});ee(t)}(e)}}))})):E.a.createElement(E.a.Fragment,null)),E.a.createElement(o.a,{md:8,xs:16,style:{margin:"0 auto"}},E.a.createElement("div",{style:{margin:"16px"}},E.a.createElement("label",{htmlFor:"storyPoint: "},"story point ","   "),E.a.createElement(r.a,{id:"storyPoint",style:{width:"60px"},max:40,min:1,value:ve,defaultValue:ve,onChange:je})),E.a.createElement("div",{style:{margin:"16px"}},E.a.createElement(h.a,{value:ne||"Could",style:{width:"100%"},onChange:function(e){return ce(e)}},E.a.createElement(j,{value:"disabled",disabled:!0},"Select Priority"),E.a.createElement(j,{value:"Could"}," ",E.a.createElement(c.a,{status:"success",text:"Could"})),E.a.createElement(j,{value:"Should"},E.a.createElement(c.a,{status:"default",text:"Should"})),E.a.createElement(j,{value:"Must"},E.a.createElement(c.a,{status:"error",text:"Must"}))))," ",E.a.createElement("div",{style:{margin:"16px"}},E.a.createElement(h.a,{placeholder:"select activty",style:{width:"100%"},value:A,onChange:function(e){return K(e)}},E.a.createElement(j,{value:"disabled",disabled:!0},"selecte activity"),Be.map(function(e){return E.a.createElement(j,{value:e.activityId,key:e.activityId}," ",E.a.createElement(c.a,{status:"default",text:e.activityName}))})))," ",E.a.createElement("div",{style:{margin:"16px"}},E.a.createElement(h.a,{placeholder:"select sprint",style:{width:"100%"},value:W,onChange:function(e){return H(e)}},E.a.createElement(j,{value:"disabled",disabled:!0},"selecte sprint"),Fe.map(function(e){return E.a.createElement(j,{value:e.sprintId,key:e.sprintId}," ",E.a.createElement(c.a,{status:"default",text:e.sprintName}))})))," ",E.a.createElement("div",{style:{margin:"16px"}},E.a.createElement("h4",{style:{float:"left",marginRight:"16px"}},"Is Epic:"),E.a.createElement(n.a,{checked:oe,onChange:function(e,t){return ue(e)},checkedChildren:E.a.createElement(s.a,{type:"check"}),unCheckedChildren:E.a.createElement(s.a,{type:"close"}),defaultChecked:!0}))," ",E.a.createElement("div",{style:{margin:"16px"}},E.a.createElement(h.a,{loading:we,mode:"multiple",placeholder:"select prerequisite of project",onChange:function(e){return de(e)},style:{width:"100%"},value:me},ke.filter(function(e){return!me.includes(e.storyId)}).map(function(e){return E.a.createElement(j,{key:e.storyId,value:e.storyId},E.a.createElement(c.a,{status:"default",text:e.storyName}))}))),E.a.createElement("div",{style:{margin:"16px"}},E.a.createElement(h.a,{mode:"multiple",placeholder:"assign to members",onChange:function(e){return be(e)},style:{width:"100%"},value:ye},Ie.filter(function(e){return!ye.includes(e.user.userId)}).map(function(e){return E.a.createElement(j,{key:e.user.userId,value:e.user.userId},E.a.createElement(c.a,{status:"default",text:e.user.name}))})))))}}}]);
//# sourceMappingURL=23.1d9043f4.chunk.js.map