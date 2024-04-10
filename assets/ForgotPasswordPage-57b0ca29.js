import{a as l,b as m,s as d,c as i,d as c,j as a,L as u,N as h}from"./index-da0b41c1.js";import{u as x,c as p,a as j}from"./index.esm-36d89c20.js";import{F as f,I as F,M as g,S as b,a as y,b as v}from"./SigninPage.styled-e50bbcbf.js";import{u as S,M as w}from"./ModalTeam-95342f57.js";import"./signup-bottle-desktop-c5b3fade.js";const P=()=>{const{t:s}=S(),t=l(),r=m(d),e=x({initialValues:{email:""},validationSchema:p({email:j().required("Email is required").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,"Invalid email")}),onSubmit:async n=>{i.Notify.info("Please, consider that we use free API resources. Initial load may take some time.");const o=await t(c.forgotPassThunk(n));if(o.error)return i.Notify.failure(o.payload)}});return a.jsx(a.Fragment,{children:a.jsxs(f,{onSubmit:e.handleSubmit,children:[a.jsx("h2",{children:s("authForm.headerForgotPassword")}),a.jsx("label",{children:s("authForm.labelEmail")}),a.jsxs(F,{children:[a.jsx("input",{type:"email",name:"email",placeholder:s("authForm.placeholdEmail"),onChange:e.handleChange,onBlur:e.handleBlur,value:e.values.email,style:{color:e.errors.email&&e.touched.email?"var(--secondary-second)":"var(--primary-focus)",border:e.errors.email&&e.touched.email?"1px solid var(--secondary-second)":"1px solid var(--secondary-fifth)"}}),e.errors.email&&e.touched.email?a.jsx(g,{children:e.errors.email}):null]}),a.jsx("button",{type:"submit",disabled:r,children:r?a.jsx(u,{}):s("authForm.buttonSendNewPassword")}),a.jsx(h,{to:"/signin",children:s("authForm.linkSignin")}),a.jsx(b,{children:a.jsx(w,{})})]})})},E=()=>a.jsx(a.Fragment,{children:a.jsx(y,{children:a.jsx(v,{children:a.jsx(P,{})})})});export{E as default};