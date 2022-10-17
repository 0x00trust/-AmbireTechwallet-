(this["webpackJsonpambire-wallet"]=this["webpackJsonpambire-wallet"]||[]).push([[26],{1545:function(e,s,t){},1615:function(e,s,t){"use strict";t.r(s),t.d(s,"default",(function(){return x}));var n=t(7),r=t(2),c=t.n(r),a=t(12),i=t(9),o=t(1609),d=t(1544),l=(t(1545),t(47)),j=t(21),u=t(212),h=t(528),b=t(45),g=t(3),m=t(86),O=t(4);function x(e){var s,t=e.everythingToSign,r=e.resolve,j=e.account,x=e.connections,f=e.relayerURL,v=e.totalRequests,N=Object(b.a)().addToast,y=Object(g.useState)({codeRequired:!1,passphrase:""}),w=Object(i.a)(y,2),k=w[0],S=w[1],q=Object(g.useState)(null),T=Object(i.a)(q,2),A=T[0],I=T[1],R=Object(g.useRef)(null),E=function(){var e=Object(a.a)(c.a.mark((function e(s,t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){I((function(){return e}))}));case 2:if(n=e.sent){e.next=5;break}throw new Error("You must enter a confirmation code");case 5:return e.next=7,t({password:k.passphrase,code:n});case 7:return e.abrupt("return");case 8:case"end":return e.stop()}}),e)})));return function(s,t){return e.apply(this,arguments)}}(),C=Object(o.a)({fetch:fetch,account:j,everythingToSign:t,relayerURL:f,addToast:N,resolve:r,onConfirmationCodeRequired:E,getHardwareWallet:function(){return Object(h.a)({signer:j.signer,signerExtra:j.signerExtra,chainId:1})}}),M=C.approve,P=C.toSign,D=C.isLoading,F=C.hasPrivileges,L=C.hasProviderError,U=C.typeDataErr,Y=C.isDeployed,J=C.dataV4,H=C.requestedNetwork,z=C.requestedChainId,V=C.isTypedData,W=C.confirmationType,_=x.find((function(e){return e.uri===P.wcUri})),B=_&&(null===_||void 0===_||null===(s=_.session)||void 0===s?void 0:s.peerMeta)||null,G=B&&d.a.includes(B.url);if(Object(g.useEffect)((function(){W&&R.current.focus()}),[W]),!P||!j)return Object(O.jsx)(O.Fragment,{});if(!H)return Object(O.jsxs)("div",{id:"signMessage",children:[Object(O.jsxs)("h3",{className:"error",children:["Inexistant network for chainId : ",z]}),Object(O.jsx)(m.e,{className:"reject",onClick:function(){return r({message:"signature denied"})},children:"Reject"})]});if(U)return Object(O.jsxs)("div",{id:"signMessage",children:[Object(O.jsxs)("h3",{className:"error",children:["Invalid signing request: ",U]}),Object(O.jsx)(m.e,{className:"reject",onClick:function(){return r({message:"signature denied"})},children:"Reject"})]});return Object(O.jsxs)("div",{id:"signMessage",children:[Object(O.jsxs)("div",{id:"signingAccount",className:"panel",children:[Object(O.jsx)("div",{className:"title",children:"Signing with account"}),Object(O.jsxs)("div",{className:"content",children:[Object(O.jsxs)("div",{className:"signingAccount-account",children:[Object(O.jsx)("img",{className:"icon",src:u.create({seed:j.id}).toDataURL(),alt:"Account Icon"}),j.id]}),Object(O.jsxs)("div",{className:"signingAccount-network",children:["on",Object(O.jsx)("div",{className:"icon",style:{backgroundImage:"url(".concat(H.icon,")")}}),Object(O.jsx)("div",{className:"address",children:H.name})]})]})]}),Object(O.jsxs)("div",{className:"panel",children:[Object(O.jsxs)("div",{className:"title signMessageTitle",children:[Object(O.jsx)("span",{className:"signMessageTitle-title",children:"Sign message"}),Object(O.jsx)("span",{className:"signMessageTitle-signatureType",children:Object(O.jsxs)(m.z,{label:"".concat(V?"An EIP-712 typed data signature has been requested":"An ethSign ethereum signature type has been requested"),children:[Object(O.jsx)(l.q,{})," ",Object(O.jsx)("span",{children:V?"EIP-712 type":"standard type"})]})})]}),Object(O.jsxs)("div",{className:"request-message",children:[Object(O.jsxs)("div",{className:"dapp-message",children:[B?Object(O.jsxs)("a",{className:"dapp",href:B.url,target:"_blank",rel:"noreferrer",children:[Object(O.jsx)("div",{className:"icon",style:{backgroundImage:"url(".concat(B.icons[0],")")},children:Object(O.jsx)(l.c,{})}),B.name]}):"A dApp ","is requesting your signature."]}),Object(O.jsx)("span",{children:v>1?"You have ".concat(v-1," more pending requests."):""}),!G&&Object(O.jsx)(m.i,{})]}),Object(O.jsx)("textarea",{className:"sign-message",type:"text",value:J?JSON.stringify(J,"\n"," "):"0x"!==P.txn?p(P.txn):"(Empty message)",readOnly:!0}),Object(O.jsx)("div",{className:"actions",children:Object(O.jsxs)("form",{onSubmit:function(e){e.preventDefault(),M({password:k.passphrase})},children:[j.signer.quickAccManager&&Y&&Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(m.x,{password:!0,required:!0,minLength:3,placeholder:"Account password",value:k.passphrase,onChange:function(e){return S(Object(n.a)(Object(n.a)({},k),{},{passphrase:e}))}}),Object(O.jsx)("input",{type:"submit",hidden:!0})]}),W&&Object(O.jsxs)(O.Fragment,{children:["email"===W&&Object(O.jsx)("span",{children:"A confirmation code has been sent to your email, it is valid for 3 minutes."}),"otp"===W&&Object(O.jsx)("span",{children:"Please enter your OTP code"}),Object(O.jsx)(m.x,{ref:R,placeholder:"otp"===W?"Authenticator OTP code":"Confirmation code",onInput:function(e){var s;6===(s=e).length&&A(s)}})]}),null===Y&&!L&&Object(O.jsx)("div",{children:Object(O.jsx)(m.m,{})}),!1===Y&&Object(O.jsxs)("div",{children:[Object(O.jsx)("h3",{className:"error",children:"You can't sign this message yet."}),Object(O.jsxs)("h3",{className:"error",children:["You need to complete your first transaction on"," ",H.name," network in order to be able to sign messages."]})]}),!1===F&&Object(O.jsx)("div",{children:Object(O.jsx)("h3",{className:"error",children:"You do not have the privileges to sign this message."})}),L&&Object(O.jsx)("div",{children:Object(O.jsxs)("h3",{className:"error",children:["There was an issue with the network provider:"," ",L]})}),Object(O.jsxs)("div",{className:"buttons",children:[Object(O.jsx)(m.e,{type:"button",danger:!0,icon:Object(O.jsx)(l.h,{}),className:"reject",onClick:function(){return r({message:"signature denied"})},children:"Reject"}),null!==Y&&Y&&F&&Object(O.jsx)(m.e,{type:"submit",className:"approve",disabled:D,children:D?Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(m.m,{}),"Signing..."]}):Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)(l.f,{})," Sign"]})})]})]})})]})]})}function p(e){if(Object(j.isHexString)(e))try{return Object(j.toUtf8String)(e)}catch(s){return e}return(null===e||void 0===e?void 0:e.toString)?e.toString():e+""}},582:function(e,s){}}]);
//# sourceMappingURL=26.998f397c.chunk.js.map