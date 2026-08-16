import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{s as t}from"./motion-C1tg1Zn9.js";import{r as n}from"./SEOHead-C76_ZPLa.js";var r=e(t(),1),i=/^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,a=/^[\\/]{2}/;function o(e,t){return t+e.replace(/\\/g,`/`)}var s=`popstate`;function c(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function l(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return m(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:h(t)}return _(t,n,null,e)}function u(e,t){if(e===!1||e==null)throw Error(t)}function d(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function f(){return Math.random().toString(36).substring(2,10)}function p(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function m(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?g(t):t,state:n,key:t&&t.key||r||f(),mask:i}}function h({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function g(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function _(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,l=`POP`,u=null,d=f();d??(d=0,o.replaceState({...o.state,idx:d},``));function f(){return(o.state||{idx:null}).idx}function h(){l=`POP`;let e=f(),t=e==null?null:e-d;d=e,u&&u({action:l,location:b.location,delta:t})}function g(e,t){l=`PUSH`;let r=c(e)?e:m(b.location,e,t);n&&n(r,e),d=f()+1;let s=p(r,d),h=b.createHref(r.mask||r);try{o.pushState(s,``,h)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(h)}a&&u&&u({action:l,location:b.location,delta:1})}function _(e,t){l=`REPLACE`;let r=c(e)?e:m(b.location,e,t);n&&n(r,e),d=f();let i=p(r,d),s=b.createHref(r.mask||r);o.replaceState(i,``,s),a&&u&&u({action:l,location:b.location,delta:0})}function y(e){return v(i,e)}let b={get action(){return l},get location(){return e(i,o)},listen(e){if(u)throw Error(`A history only accepts one active listener`);return i.addEventListener(s,h),u=e,()=>{i.removeEventListener(s,h),u=null}},createHref(e){return t(i,e)},createURL:y,encodeLocation(e){let t=y(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:g,replace:_,go(e){return o.go(e)}};return b}function v(e,t,n=!1){let r=`http://localhost`;e&&(r=e.location.origin===`null`?e.location.href:e.location.origin),u(r,`No window.location.(origin|href) available to create URL`);let i=typeof t==`string`?t:h(t);return i=i.replace(/ $/,`%20`),!n&&a.test(i)&&(i=r+i),new URL(i,r)}function y(e,t,n=`/`){return b(e,t,n,!1)}function b(e,t,n,r,i){let a=P((typeof t==`string`?g(t):t).pathname||`/`,n);if(a==null)return null;let o=i??S(e),s=null,c=ae(a);for(let e=0;s==null&&e<o.length;++e)s=te(o[e],c,r);return s}function x(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function S(e){let t=C(e);return T(t),t}function C(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;u(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=pe([r,c.relativePath]),d=n.concat(c);e.children&&e.children.length>0&&(u(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),C(e.children,t,d,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:N(l,e.index),routesMeta:d.map((e,t)=>{let[n,r]=ie(e.relativePath,e.caseSensitive,t===d.length-1);return{...e,matcher:n,compiledParams:r}})})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of w(e.path))a(e,t,!0,n)}),t}function w(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=w(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function T(e){e.sort((e,t)=>e.score===t.score?ee(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var E=/^:[\w-]+$/,D=3,O=2,k=1,A=10,j=-2,M=e=>e===`*`;function N(e,t){let n=e.split(`/`),r=n.length;return n.some(M)&&(r+=j),t&&(r+=O),n.filter(e=>!M(e)).reduce((e,t)=>e+(E.test(t)?D:t===``?k:A),r)}function ee(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function te(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u={path:s.relativePath,caseSensitive:s.caseSensitive,end:c},d=s.matcher&&s.compiledParams?re(u,l,s.matcher,s.compiledParams):ne(u,l),f=s.route;if(!d&&c&&n&&!r[r.length-1].route.index&&(d=ne({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!d)return null;Object.assign(i,d.params),o.push({params:i,pathname:pe([a,d.pathname]),pathnameBase:he(pe([a,d.pathnameBase])),route:f}),d.pathnameBase!==`/`&&(a=pe([a,d.pathnameBase]))}return o}function ne(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=ie(e.path,e.caseSensitive,e.end);return re(e,t,n,r)}function re(e,t,n,r){let i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function ie(e,t=!1,n=!0){d(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function ae(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return d(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function P(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}function oe(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?g(e):e,a;return n?(n=fe(n),a=n.startsWith(`/`)?se(n.substring(1),`/`):se(n,t)):a=t,{pathname:a,search:ge(r),hash:_e(i)}}function se(e,t){let n=me(t).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function ce(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function le(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function ue(e){let t=le(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function de(e,t,n,r=!1){let i;typeof e==`string`?i=g(e):(i={...e},u(!i.pathname||!i.pathname.includes(`?`),ce(`?`,`pathname`,`search`,i)),u(!i.pathname||!i.pathname.includes(`#`),ce(`#`,`pathname`,`hash`,i)),u(!i.search||!i.search.includes(`#`),ce(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=oe(i,s),l=o&&o!==`/`&&o.endsWith(`/`),d=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||d)&&(c.pathname+=`/`),c}var fe=e=>e.replace(/[\\/]{2,}/g,`/`),pe=e=>fe(e.join(`/`)),me=e=>e.replace(/\/+$/,``),he=e=>me(e).replace(/^\/*/,`/`),ge=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,_e=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,ve=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function ye(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function be(e){return pe(e.map(e=>e.route.path).filter(Boolean))||`/`}var xe=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Se(e,t){let n=e;if(typeof n!=`string`||!i.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,s=!1;if(xe)try{let e=new URL(window.location.href),r=a.test(n)?new URL(o(n,e.protocol)):new URL(n),i=P(r.pathname,t);r.origin===e.origin&&i!=null?n=i+r.search+r.hash:s=!0}catch{d(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:s,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Ce=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Ce);var we=[`GET`,...Ce];new Set(we);var Te=[`about:`,`blob:`,`chrome:`,`chrome-untrusted:`,`content:`,`data:`,`devtools:`,`file:`,`filesystem:`,`javascript:`];function Ee(e){try{return Te.includes(new URL(e).protocol)}catch{return!1}}var De=r.createContext(null);De.displayName=`DataRouter`;var Oe=r.createContext(null);Oe.displayName=`DataRouterState`;var ke=r.createContext(!1);function Ae(){return r.useContext(ke)}var je=r.createContext({isTransitioning:!1});je.displayName=`ViewTransition`;var Me=r.createContext(new Map);Me.displayName=`Fetchers`;var Ne=r.createContext(null);Ne.displayName=`Await`;var F=r.createContext(null);F.displayName=`Navigation`;var Pe=r.createContext(null);Pe.displayName=`Location`;var Fe=r.createContext({outlet:null,matches:[],isDataRoute:!1});Fe.displayName=`Route`;var Ie=r.createContext(null);Ie.displayName=`RouteError`;var Le=`REACT_ROUTER_ERROR`,Re=`REDIRECT`,ze=`ROUTE_ERROR_RESPONSE`;function Be(e){if(e.startsWith(`${Le}:${Re}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function Ve(e){if(e.startsWith(`${Le}:${ze}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new ve(t.status,t.statusText,t.data)}catch{}}function He(e,{relative:t}={}){u(Ue(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:i}=r.useContext(F),{hash:a,pathname:o,search:s}=Xe(e,{relative:t}),c=o;return n!==`/`&&(c=o===`/`?n:pe([n,o])),i.createHref({pathname:c,search:s,hash:a})}function Ue(){return r.useContext(Pe)!=null}function We(){return u(Ue(),`useLocation() may be used only in the context of a <Router> component.`),r.useContext(Pe).location}var Ge=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function Ke(e){r.useContext(F).static||r.useLayoutEffect(e)}function qe(){let{isDataRoute:e}=r.useContext(Fe);return e?ht():Je()}function Je(){u(Ue(),`useNavigate() may be used only in the context of a <Router> component.`);let e=r.useContext(De),{basename:t,navigator:n}=r.useContext(F),{matches:i}=r.useContext(Fe),{pathname:a}=We(),o=JSON.stringify(ue(i)),s=r.useRef(!1);return Ke(()=>{s.current=!0}),r.useCallback((r,i={})=>{if(d(s.current,Ge),!s.current)return;if(typeof r==`number`){n.go(r);return}let c=de(r,JSON.parse(o),a,i.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:pe([t,c.pathname])),(i.replace?n.replace:n.push)(c,i.state,i)},[t,n,o,a,e])}r.createContext(null);function Ye(){let{matches:e}=r.useContext(Fe);return e[e.length-1]?.params??{}}function Xe(e,{relative:t}={}){let{matches:n}=r.useContext(Fe),{pathname:i}=We(),a=JSON.stringify(ue(n));return r.useMemo(()=>de(e,JSON.parse(a),i,t===`path`),[e,a,i,t])}function Ze(e,t){return Qe(e,t)}function Qe(e,t,n){u(Ue(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:i}=r.useContext(F),{matches:a}=r.useContext(Fe),o=a[a.length-1],s=o?o.params:{},c=o?o.pathname:`/`,l=o?o.pathnameBase:`/`,f=o&&o.route;{let e=f&&f.path||``;_t(c,!f||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let p=We(),m;if(t){let e=typeof t==`string`?g(t):t;u(l===`/`||e.pathname?.startsWith(l),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${e.pathname}" was given in the \`location\` prop.`),m=e}else m=p;let h=m.pathname||`/`,_=h;if(l!==`/`){let e=l.replace(/^\//,``).split(`/`);_=`/`+h.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let v=n&&n.state.matches.length?n.state.matches.map(e=>Object.assign(e,{route:n.manifest[e.route.id]||e.route})):y(e,{pathname:_});d(f||v!=null,`No routes matched location "${m.pathname}${m.search}${m.hash}" `),d(v==null||v[v.length-1].route.element!==void 0||v[v.length-1].route.Component!==void 0||v[v.length-1].route.lazy!==void 0,`Matched leaf route at location "${m.pathname}${m.search}${m.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let b=at(v&&v.map(e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:pe([l,i.encodeLocation?i.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?l:pe([l,i.encodeLocation?i.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),a,n);return t&&b?r.createElement(Pe.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,mask:void 0,...m},navigationType:`POP`}},b):b}function $e(){let e=mt(),t=ye(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,i=`rgba(200,200,200, 0.5)`,a={padding:`0.5rem`,backgroundColor:i},o={padding:`2px 4px`,backgroundColor:i},s=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),s=r.createElement(r.Fragment,null,r.createElement(`p`,null,`💿 Hey developer 👋`),r.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,r.createElement(`code`,{style:o},`ErrorBoundary`),` or`,` `,r.createElement(`code`,{style:o},`errorElement`),` prop on your route.`)),r.createElement(r.Fragment,null,r.createElement(`h2`,null,`Unexpected Application Error!`),r.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?r.createElement(`pre`,{style:a},n):null,s)}var et=r.createElement($e,null),tt=class extends r.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=Ve(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:r.createElement(Fe.Provider,{value:this.props.routeContext},r.createElement(Ie.Provider,{value:e,children:this.props.component}));return this.context?r.createElement(rt,{error:e},t):t}};tt.contextType=ke;var nt=new WeakMap;function rt({children:e,error:t}){let{basename:n}=r.useContext(F);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=Be(t.digest);if(e){let i=nt.get(t);if(i)throw i;let a=Se(e.location,n),o=a.absoluteURL||a.to;if(Ee(o))throw Error(`Invalid redirect location`);if(xe&&!nt.get(t))if(a.isExternal||e.reloadDocument)window.location.href=o;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(a.to,{replace:e.replace}));throw nt.set(t,n),n}return r.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${o}`})}}return e}function it({routeContext:e,match:t,children:n}){let i=r.useContext(De);return i&&i.static&&i.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=t.route.id),r.createElement(Fe.Provider,{value:e},n)}function at(e,t=[],n){let i=n?.state;if(e==null){if(!i)return null;if(i.errors)e=i.matches;else if(t.length===0&&!i.initialized&&i.matches.length>0)e=i.matches;else return null}let a=e,o=i?.errors;if(o!=null){let e=a.findIndex(e=>e.route.id&&o?.[e.route.id]!==void 0);u(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(`,`)}`),a=a.slice(0,Math.min(a.length,e+1))}let s=!1,c=-1;if(n&&i){s=i.renderFallback;for(let e=0;e<a.length;e++){let t=a[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(c=e),t.route.id){let{loaderData:e,errors:r}=i,o=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!r||r[t.route.id]===void 0);if(t.route.lazy||o){n.isStatic&&(s=!0),a=c>=0?a.slice(0,c+1):[a[0]];break}}}}let l=n?.onError,d=i&&l?(e,t)=>{l(e,{location:i.location,params:i.matches?.[0]?.params??{},pattern:be(i.matches),errorInfo:t})}:void 0;return a.reduceRight((e,n,l)=>{let u,f=!1,p=null,m=null;i&&(u=o&&n.route.id?o[n.route.id]:void 0,p=n.route.errorElement||et,s&&(c<0&&l===0?(_t(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),f=!0,m=null):c===l&&(f=!0,m=n.route.hydrateFallbackElement||null)));let h=t.concat(a.slice(0,l+1)),g=()=>{let t;return t=u?p:f?m:n.route.Component?r.createElement(n.route.Component,null):n.route.element?n.route.element:e,r.createElement(it,{match:n,routeContext:{outlet:e,matches:h,isDataRoute:i!=null},children:t})};return i&&(n.route.ErrorBoundary||n.route.errorElement||l===0)?r.createElement(tt,{location:i.location,revalidation:i.revalidation,component:p,error:u,children:g(),routeContext:{outlet:null,matches:h,isDataRoute:!0},onError:d}):g()},null)}function ot(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function st(e){let t=r.useContext(De);return u(t,ot(e)),t}function ct(e){let t=r.useContext(Oe);return u(t,ot(e)),t}function lt(e){let t=r.useContext(Fe);return u(t,ot(e)),t}function ut(e){let t=lt(e),n=t.matches[t.matches.length-1];return u(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function dt(){return ut(`useRouteId`)}function ft(){let e=ct(`useNavigation`);return r.useMemo(()=>{let{matches:t,historyAction:n,...r}=e.navigation;return r},[e.navigation])}function pt(){let{matches:e,loaderData:t}=ct(`useMatches`);return r.useMemo(()=>e.map(e=>x(e,t)),[e,t])}function mt(){let e=r.useContext(Ie),t=ct(`useRouteError`),n=ut(`useRouteError`);return e===void 0?t.errors?.[n]:e}function ht(){let{router:e}=st(`useNavigate`),t=ut(`useNavigate`),n=r.useRef(!1);return Ke(()=>{n.current=!0}),r.useCallback(async(r,i={})=>{d(n.current,Ge),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var gt={};function _t(e,t,n){!t&&!gt[e]&&(gt[e]=!0,d(!1,n))}r.memo(vt);function vt({routes:e,manifest:t,future:n,state:r,isStatic:i,onError:a}){return Qe(e,void 0,{manifest:t,state:r,isStatic:i,onError:a,future:n})}function yt(e){u(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function bt({basename:e=`/`,children:t=null,location:n,navigationType:i=`POP`,navigator:a,static:o=!1,useTransitions:s}){u(!Ue(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let c=e.replace(/^\/*/,`/`),l=r.useMemo(()=>({basename:c,navigator:a,static:o,useTransitions:s,future:{}}),[c,a,o,s]);typeof n==`string`&&(n=g(n));let{pathname:f=`/`,search:p=``,hash:m=``,state:h=null,key:_=`default`,mask:v}=n,y=r.useMemo(()=>{let e=P(f,c);return e==null?null:{location:{pathname:e,search:p,hash:m,state:h,key:_,mask:v},navigationType:i}},[c,f,p,m,h,_,i,v]);return d(y!=null,`<Router basename="${c}"> is not able to match the URL "${f}${p}${m}" because it does not start with the basename, so the <Router> won't render anything.`),y==null?null:r.createElement(F.Provider,{value:l},r.createElement(Pe.Provider,{children:t,value:y}))}function xt({children:e,location:t}){return Ze(St(e),t)}r.Component;function St(e,t=[]){let n=[];return r.Children.forEach(e,(e,i)=>{if(!r.isValidElement(e))return;let a=[...t,i];if(e.type===r.Fragment){n.push.apply(n,St(e.props.children,a));return}u(e.type===yt,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),u(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let o={id:e.props.id||a.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(o.children=St(e.props.children,a)),n.push(o)}),n}var Ct=`get`,wt=`application/x-www-form-urlencoded`;function Tt(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Et(e){return Tt(e)&&e.tagName.toLowerCase()===`button`}function Dt(e){return Tt(e)&&e.tagName.toLowerCase()===`form`}function Ot(e){return Tt(e)&&e.tagName.toLowerCase()===`input`}function kt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function At(e,t){return e.button===0&&(!t||t===`_self`)&&!kt(e)}var jt=null;function Mt(){if(jt===null)try{new FormData(document.createElement(`form`),0),jt=!1}catch{jt=!0}return jt}var Nt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Pt(e){return e!=null&&!Nt.has(e)?(d(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${wt}"`),null):e}function Ft(e,t){let n,r,i,a,o;if(Dt(e)){let o=e.getAttribute(`action`);r=o?P(o,t):null,n=e.getAttribute(`method`)||Ct,i=Pt(e.getAttribute(`enctype`))||wt,a=new FormData(e)}else if(Et(e)||Ot(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?P(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Ct,i=Pt(e.getAttribute(`formenctype`))||Pt(o.getAttribute(`enctype`))||wt,a=new FormData(o,e),!Mt()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(Tt(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Ct,r=null,i=wt,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var It={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},Lt=/[&><\u2028\u2029]/g;function Rt(e){return e.replace(Lt,e=>It[e])}function zt(e,t){if(e===!1||e==null)throw Error(t)}function Bt(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&P(i.pathname,t)===`/`?i.pathname=`${me(t)}/_root.${r}`:i.pathname=`${me(i.pathname)}.${r}`,i}async function Vt(e,t){if(e.id in t)return t[e.id];try{let r=await n(()=>import(e.module),[]);return t[e.id]=r,r}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Ht(e){return e!=null&&typeof e.page==`string`}function Ut(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function Wt(e,t,n){return Yt((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Vt(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(Ut).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function Gt(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function Kt(e,t,{includeHydrateFallback:n}={}){return qt(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function qt(e){return[...new Set(e)]}function Jt(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function Yt(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!Ht(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(Jt(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function Xt(){let e=r.useContext(De);return zt(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function Zt(){let e=r.useContext(Oe);return zt(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var Qt=r.createContext(void 0);Qt.displayName=`FrameworkContext`;function $t(){let e=r.useContext(Qt);return zt(e,`You must render this element inside a <HydratedRouter> element`),e}function en(e,t){let n=r.useContext(Qt),[i,a]=r.useState(!1),[o,s]=r.useState(!1),{onFocus:c,onBlur:l,onMouseEnter:u,onMouseLeave:d,onTouchStart:f}=t,p=r.useRef(null);r.useEffect(()=>{if(e===`render`&&s(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{s(e.isIntersecting)})},{threshold:.5});return p.current&&e.observe(p.current),()=>{e.disconnect()}}},[e]),r.useEffect(()=>{if(i){let e=setTimeout(()=>{s(!0)},100);return()=>{clearTimeout(e)}}},[i]);let m=()=>{a(!0)},h=()=>{a(!1),s(!1)};return n?e===`intent`?[o,p,{onFocus:tn(c,m),onBlur:tn(l,h),onMouseEnter:tn(u,m),onMouseLeave:tn(d,h),onTouchStart:tn(f,m)}]:[o,p,{}]:[!1,p,{}]}function tn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function nn({page:e,...t}){let n=Ae(),{nonce:i}=$t(),{router:a}=Xt(),o=r.useMemo(()=>y(a.routes,e,a.basename),[a.routes,e,a.basename]);return o?(t.nonce==null&&i&&(t={...t,nonce:i}),n?r.createElement(an,{page:e,matches:o,...t}):r.createElement(on,{page:e,matches:o,...t})):null}function rn(e){let{manifest:t,routeModules:n}=$t(),[i,a]=r.useState([]);return r.useEffect(()=>{let r=!1;return Wt(e,t,n).then(e=>{r||a(e)}),()=>{r=!0}},[e,t,n]),i}function an({page:e,matches:t,...n}){let i=We(),{future:a}=$t(),{basename:o}=Xt(),s=r.useMemo(()=>{if(e===i.pathname+i.search+i.hash)return[];let n=Bt(e,o,a.v8_trailingSlashAwareDataRequests,`rsc`),r=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?r=!0:s.push(e.route.id);return r&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[o,a.v8_trailingSlashAwareDataRequests,e,i,t]);return r.createElement(r.Fragment,null,s.map(e=>r.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function on({page:e,matches:t,...n}){let i=We(),{future:a,manifest:o,routeModules:s}=$t(),{basename:c}=Xt(),{loaderData:l,matches:u}=Zt(),d=r.useMemo(()=>Gt(e,t,u,o,i,`data`),[e,t,u,o,i]),f=r.useMemo(()=>Gt(e,t,u,o,i,`assets`),[e,t,u,o,i]),p=r.useMemo(()=>{if(e===i.pathname+i.search+i.hash)return[];let n=new Set,r=!1;if(t.forEach(e=>{let t=o.routes[e.route.id];!t||!t.hasLoader||(!d.some(t=>t.route.id===e.route.id)&&e.route.id in l&&s[e.route.id]?.shouldRevalidate||t.hasClientLoader?r=!0:n.add(e.route.id))}),n.size===0)return[];let u=Bt(e,c,a.v8_trailingSlashAwareDataRequests,`data`);return r&&n.size>0&&u.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[u.pathname+u.search]},[c,a.v8_trailingSlashAwareDataRequests,l,i,o,d,t,e,s]),m=r.useMemo(()=>Kt(f,o),[f,o]),h=rn(f);return r.createElement(r.Fragment,null,p.map(e=>r.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),m.map(e=>r.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),h.map(({key:e,link:t})=>r.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function sn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}r.Component;var cn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{cn&&(window.__reactRouterVersion=`7.18.2`)}catch{}function ln({basename:e,children:t,useTransitions:n,window:i}){let a=r.useRef();a.current??=l({window:i,v5Compat:!0});let o=a.current,[s,c]=r.useState({action:o.action,location:o.location}),u=r.useCallback(e=>{n===!1?c(e):r.startTransition(()=>c(e))},[n]);return r.useLayoutEffect(()=>o.listen(u),[o,u]),r.createElement(bt,{basename:e,children:t,location:s.location,navigationType:s.action,navigator:o,useTransitions:n})}function un({basename:e,children:t,history:n,useTransitions:i}){let[a,o]=r.useState({action:n.action,location:n.location}),s=r.useCallback(e=>{i===!1?o(e):r.startTransition(()=>o(e))},[i]);return r.useLayoutEffect(()=>n.listen(s),[n,s]),r.createElement(bt,{basename:e,children:t,location:a.location,navigationType:a.action,navigator:n,useTransitions:i})}un.displayName=`unstable_HistoryRouter`;var dn=r.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:a,reloadDocument:o,replace:s,mask:c,state:l,target:u,to:d,preventScrollReset:f,viewTransition:p,defaultShouldRevalidate:m,...h},g){let{basename:_,navigator:v,useTransitions:y}=r.useContext(F),b=typeof d==`string`&&i.test(d),x=Se(d,_);d=x.to;let S=He(d,{relative:a}),C=We(),w=null;if(c){let e=de(c,[],C.mask?C.mask.pathname:`/`,!0);_!==`/`&&(e.pathname=e.pathname===`/`?_:pe([_,e.pathname])),w=v.createHref(e)}let[T,E,D]=en(n,h),O=vn(d,{replace:s,mask:c,state:l,target:u,preventScrollReset:f,relative:a,viewTransition:p,defaultShouldRevalidate:m,useTransitions:y});function k(t){e&&e(t),t.defaultPrevented||O(t)}let A=!(x.isExternal||o),j=r.createElement(`a`,{...h,...D,href:(A?w:void 0)||x.absoluteURL||S,onClick:A?k:e,ref:sn(g,E),target:u,"data-discover":!b&&t===`render`?`true`:void 0});return T&&!b?r.createElement(r.Fragment,null,j,r.createElement(nn,{page:S})):j});dn.displayName=`Link`;var fn=r.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:i=!1,style:a,to:o,viewTransition:s,children:c,...l},u){let d=Xe(o,{relative:l.relative}),f=We(),p=r.useContext(Oe),{navigator:m,basename:h}=r.useContext(F),g=p!=null&&On(d)&&s===!0,_=m.encodeLocation?m.encodeLocation(d).pathname:d.pathname,v=f.pathname,y=p&&p.navigation&&p.navigation.location?p.navigation.location.pathname:null;t||(v=v.toLowerCase(),y=y?y.toLowerCase():null,_=_.toLowerCase()),y&&h&&(y=P(y,h)||y);let b=_!==`/`&&_.endsWith(`/`)?_.length-1:_.length,x=v===_||!i&&v.startsWith(_)&&v.charAt(b)===`/`,S=y!=null&&(y===_||!i&&y.startsWith(_)&&y.charAt(_.length)===`/`),C={isActive:x,isPending:S,isTransitioning:g},w=x?e:void 0,T;T=typeof n==`function`?n(C):[n,x?`active`:null,S?`pending`:null,g?`transitioning`:null].filter(Boolean).join(` `);let E=typeof a==`function`?a(C):a;return r.createElement(dn,{...l,"aria-current":w,className:T,ref:u,style:E,to:o,viewTransition:s},typeof c==`function`?c(C):c)});fn.displayName=`NavLink`;var pn=r.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:a,replace:o,state:s,method:c=Ct,action:l,onSubmit:u,relative:d,preventScrollReset:f,viewTransition:p,defaultShouldRevalidate:m,...h},g)=>{let{useTransitions:_}=r.useContext(F),v=xn(),y=Sn(l,{relative:d}),b=c.toLowerCase()===`get`?`get`:`post`,x=typeof l==`string`&&i.test(l);return r.createElement(`form`,{ref:g,method:b,action:y,onSubmit:a?u:e=>{if(u&&u(e),e.defaultPrevented)return;e.preventDefault();let i=e.nativeEvent.submitter,a=i?.getAttribute(`formmethod`)||c,l=()=>v(i||e.currentTarget,{fetcherKey:t,method:a,navigate:n,replace:o,state:s,relative:d,preventScrollReset:f,viewTransition:p,defaultShouldRevalidate:m});_&&n!==!1?r.startTransition(()=>l()):l()},...h,"data-discover":!x&&e===`render`?`true`:void 0})});pn.displayName=`Form`;function mn({getKey:e,storageKey:t,...n}){let i=r.useContext(Qt),{basename:a}=r.useContext(F),o=We(),s=pt();En({getKey:e,storageKey:t});let c=r.useMemo(()=>{if(!i||!e)return null;let t=Tn(o,s,a,e);return t===o.key?null:t},[]);if(!i||i.isSpaMode)return null;let l=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return n.nonce==null&&i?.nonce&&(n.nonce=i.nonce),r.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${l})(${Rt(JSON.stringify(t||Cn))}, ${Rt(JSON.stringify(c))})`}})}mn.displayName=`ScrollRestoration`;function hn(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function gn(e){let t=r.useContext(De);return u(t,hn(e)),t}function _n(e){let t=r.useContext(Oe);return u(t,hn(e)),t}function vn(e,{target:t,replace:n,mask:i,state:a,preventScrollReset:o,relative:s,viewTransition:c,defaultShouldRevalidate:l,useTransitions:u}={}){let d=qe(),f=We(),p=Xe(e,{relative:s});return r.useCallback(m=>{if(At(m,t)){m.preventDefault();let t=n===void 0?h(f)===h(p):n,g=()=>d(e,{replace:t,mask:i,state:a,preventScrollReset:o,relative:s,viewTransition:c,defaultShouldRevalidate:l});u?r.startTransition(()=>g()):g()}},[f,d,p,n,i,a,t,e,o,s,c,l,u])}var yn=0,bn=()=>`__${String(++yn)}__`;function xn(){let{router:e}=gn(`useSubmit`),{basename:t}=r.useContext(F),n=dt(),i=e.fetch,a=e.navigate;return r.useCallback(async(e,r={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Ft(e,t);r.navigate===!1?await i(r.fetcherKey||bn(),n,r.action||o,{defaultShouldRevalidate:r.defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:l,body:u,formMethod:r.method||s,formEncType:r.encType||c,flushSync:r.flushSync}):await a(r.action||o,{defaultShouldRevalidate:r.defaultShouldRevalidate,preventScrollReset:r.preventScrollReset,formData:l,body:u,formMethod:r.method||s,formEncType:r.encType||c,replace:r.replace,state:r.state,fromRouteId:n,flushSync:r.flushSync,viewTransition:r.viewTransition})},[i,a,t,n])}function Sn(e,{relative:t}={}){let{basename:n}=r.useContext(F),i=r.useContext(Fe);u(i,`useFormAction must be used inside a RouteContext`);let[a]=i.matches.slice(-1),o={...Xe(e||`.`,{relative:t})},s=We();if(e==null){o.search=s.search;let e=new URLSearchParams(o.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();o.search=n?`?${n}`:``}}return(!e||e===`.`)&&a.route.index&&(o.search=o.search?o.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(o.pathname=o.pathname===`/`?n:pe([n,o.pathname])),h(o)}var Cn=`react-router-scroll-positions`,wn={};function Tn(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:P(e.pathname,n)||e.pathname},t)),i??=e.key,i}function En({getKey:e,storageKey:t}={}){let{router:n}=gn(`useScrollRestoration`),{restoreScrollPosition:i,preventScrollReset:a}=_n(`useScrollRestoration`),{basename:o}=r.useContext(F),s=We(),c=pt(),l=ft();r.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Dn(r.useCallback(()=>{if(l.state===`idle`){let t=Tn(s,c,o,e);wn[t]=window.scrollY}try{sessionStorage.setItem(t||Cn,JSON.stringify(wn))}catch(e){d(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[l.state,e,o,s,c,t])),typeof document<`u`&&(r.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Cn);e&&(wn=JSON.parse(e))}catch{}},[t]),r.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(wn,()=>window.scrollY,e?(t,n)=>Tn(t,n,o,e):void 0);return()=>t&&t()},[n,o,e]),r.useLayoutEffect(()=>{if(i!==!1){if(typeof i==`number`){window.scrollTo(0,i);return}try{if(s.hash){let e=document.getElementById(decodeURIComponent(s.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{d(!1,`"${s.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}a!==!0&&window.scrollTo(0,0)}},[s,i,a]))}function Dn(e,t){let{capture:n}=t||{};r.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function On(e,{relative:t}={}){let n=r.useContext(je);u(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:i}=gn(`useViewTransitionState`),a=Xe(e,{relative:t});if(!n.isTransitioning)return!1;let o=P(n.currentLocation.pathname,i)||n.currentLocation.pathname,s=P(n.nextLocation.pathname,i)||n.nextLocation.pathname;return ne(a.pathname,s)!=null||ne(a.pathname,o)!=null}function kn(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function An(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var jn={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},Mn={duration:.5,overwrite:!1,delay:0},Nn,I,L,Pn=1e8,R=1/Pn,Fn=Math.PI*2,In=Fn/4,Ln=0,Rn=Math.sqrt,zn=Math.cos,Bn=Math.sin,z=function(e){return typeof e==`string`},B=function(e){return typeof e==`function`},Vn=function(e){return typeof e==`number`},Hn=function(e){return e===void 0},Un=function(e){return typeof e==`object`},V=function(e){return e!==!1},Wn=function(){return typeof window<`u`},Gn=function(e){return B(e)||z(e)},Kn=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},H=Array.isArray,qn=/random\([^)]+\)/g,Jn=/,\s*/g,Yn=/(?:-?\.?\d|\.)+/gi,Xn=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Zn=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Qn=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,$n=/[+-]=-?[.\d]+/,er=/[^,'"\[\]\s]+/gi,tr=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,U,nr,rr,ir,ar={},or={},sr,cr=function(e){return(or=Lr(e,ar))&&Xa},lr=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},ur=function(e,t){return!t&&console.warn(e)},dr=function(e,t){return e&&(ar[e]=t)&&or&&(or[e]=t)||ar},fr=function(){return 0},pr={suppressEvents:!0,isStart:!0,kill:!1},mr={suppressEvents:!0,kill:!1},hr={suppressEvents:!0},gr={},_r=[],vr={},yr,br={},xr={},Sr=30,Cr=[],wr=``,Tr=function(e){var t=e[0],n,r;if(Un(t)||B(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=Cr.length;r--&&!Cr[r].targetTest(t););n=Cr[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new la(e[r],n)))||e.splice(r,1);return e},Er=function(e){return e._gsap||Tr(yi(e))[0]._gsap},Dr=function(e,t,n){return(n=e[t])&&B(n)?e[t]():Hn(n)&&e.getAttribute&&e.getAttribute(t)||n},W=function(e,t){return(e=e.split(`,`)).forEach(t)||e},G=function(e){return Math.round(e*1e5)/1e5||0},K=function(e){return Math.round(e*1e7)/1e7||0},Or=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},kr=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},Ar=function(){var e=_r.length,t=_r.slice(0),n,r;for(vr={},_r.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},jr=function(e){return!!(e._initted||e._startAt||e.add)},Mr=function(e,t,n,r){_r.length&&!I&&Ar(),e.render(t,n,r||!!(I&&t<0&&jr(e))),_r.length&&!I&&Ar()},Nr=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(er).length<2?t:z(e)?e.trim():e},Pr=function(e){return e},Fr=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Ir=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},Lr=function(e,t){for(var n in t)e[n]=t[n];return e},Rr=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=Un(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},zr=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},Br=function(e){var t=e.parent||U,n=e.keyframes?Ir(H(e.keyframes)):Fr;if(V(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Vr=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Hr=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Ur=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Wr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Gr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Kr=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},qr=function(e,t,n,r){return e._startAt&&(I?e._startAt.revert(mr):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Jr=function e(t){return!t||t._ts&&e(t.parent)},Yr=function(e){return e._repeat?Xr(e._tTime,e=e.duration()+e._rDelay)*e:0},Xr=function(e,t){var n=Math.floor(e=K(e/t));return e&&n===e?n-1:n},Zr=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Qr=function(e){return e._end=K(e._start+(e._tDur/Math.abs(e._ts||e._rts||R)||0))},$r=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=K(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Qr(e),n._dirty||Gr(n,e)),e},ei=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Zr(e.rawTime(),t),(!t._dur||mi(0,t.totalDuration(),n)-t._tTime>R)&&t.render(n,!0)),Gr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-R}},ti=function(e,t,n,r){return t.parent&&Wr(t),t._start=K((Vn(n)?n:n||e!==U?di(e,n,t):e._time)+t._delay),t._end=K(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Hr(e,t,`_first`,`_last`,e._sort?`_start`:0),ai(t)||(e._recent=t),r||ei(e,t),e._ts<0&&$r(e,e._tTime),e},ni=function(e,t){return(ar.ScrollTrigger||lr(`scrollTrigger`,t))&&ar.ScrollTrigger.create(t,e)},ri=function(e,t,n,r,i){if(_a(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!I&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&yr!==Xi.frame)return _r.push(e),e._lazy=[i,r],1},ii=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},ai=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},oi=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&ii(e)&&!(!e._initted&&ai(e))||(e._ts<0||e._dp._ts<0)&&!ai(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=mi(0,e._tDur,t),l=Xr(s,o),e._yoyo&&l&1&&(a=1-a),l!==Xr(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||I||r||e._zTime===R||!t&&e._zTime){if(!e._initted&&ri(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?R:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&qr(e,t,n,!0),e._onUpdate&&!n&&Ii(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&Ii(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Wr(e,1),!n&&!I&&(Ii(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},si=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},ci=function(e,t,n,r){var i=e._repeat,a=K(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:K(a*(i+1)+e._rDelay*i):a,o>0&&!r&&$r(e,e._tTime=e._tDur*o),e.parent&&Qr(e),n||Gr(e.parent,e),e},li=function(e){return e instanceof X?Gr(e):ci(e,e._dur)},ui={_start:0,endTime:fr,totalDuration:fr},di=function e(t,n,r){var i=t.labels,a=t._recent||ui,o=t.duration()>=Pn?a.endTime(!1):t._dur,s,c,l;return z(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(H(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},fi=function(e,t,n){var r=Vn(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=V(s.vars.inherit)&&s.parent;a.immediateRender=V(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new Z(t[0],a,t[i+1])},pi=function(e,t){return e||e===0?t(e):t},mi=function(e,t,n){return n<e?e:n>t?t:n},q=function(e,t){return!z(e)||!(t=tr.exec(e))?``:t[1]},hi=function(e,t,n){return pi(n,function(n){return mi(e,t,n)})},gi=[].slice,_i=function(e,t){return e&&Un(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&Un(e[0]))&&!e.nodeType&&e!==nr},vi=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return z(e)&&!t||_i(e,1)?(r=n).push.apply(r,yi(e)):n.push(e)})||n},yi=function(e,t,n){return L&&!t&&L.selector?L.selector(e):z(e)&&!n&&(rr||!Zi())?gi.call((t||ir).querySelectorAll(e),0):H(e)?vi(e,n):_i(e)?gi.call(e,0):e?[e]:[]},bi=function(e){return e=yi(e)[0]||ur(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return yi(t,n.querySelectorAll?n:n===e?ur(`Invalid scope`)||ir.createElement(`div`):e)}},xi=function(e){return e.sort(function(){return .5-Math.random()})},Si=function(e){if(B(e))return e;var t=Un(e)?e:{each:e},n=ia(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return z(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,Pn])[1],!S){for(b=-Pn;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===Pn?0:s?f*u/S-.5:r/S|0,b=0,x=Pn,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):Rn(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&xi(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=q(t.amount||t.each)||0,n=n&&f<0?ra(n):n}return f=(p[e]-p.min)/p.max||0,K(p.b+(n?n(f):f)*p.v)+p.u}},Ci=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=K(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Vn(n)?0:q(n))}},wi=function(e,t){var n=H(e),r,i;return!n&&Un(e)&&(r=n=e.radius||Pn,e.values?(e=yi(e.values),(i=!Vn(e[0]))&&(r*=r)):e=Ci(e.increment)),pi(t,n?B(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=Pn,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||Vn(t)?s:s+q(t)}:Ci(e))},Ti=function(e,t,n,r){return pi(H(e)?!t:n===!0?!!(n=0):!r,function(){return H(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},Ei=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},Di=function(e,t){return function(n){return e(parseFloat(n))+(t||q(n))}},Oi=function(e,t,n){return Ni(e,t,0,1,n)},ki=function(e,t,n){return pi(n,function(n){return e[~~t(n)]})},Ai=function e(t,n,r){var i=n-t;return H(t)?ki(t,e(0,t.length),n):pi(r,function(e){return(i+(e-t)%i)%i+t})},ji=function e(t,n,r){var i=n-t,a=i*2;return H(t)?ki(t,e(0,t.length-1),n):pi(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},Mi=function(e){return e.replace(qn,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(Jn);return Ti(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},Ni=function(e,t,n,r,i){var a=t-e,o=r-n;return pi(i,function(t){return n+((t-e)/a*o||0)})},Pi=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=z(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(H(t)&&!H(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=Lr(H(t)?[]:{},t));if(!u){for(c in n)fa.call(s,t,c,`get`,n[c]);a=function(e){return Ma(e,s)||(o?t.p:t)}}}return pi(r,a)},Fi=function(e,t,n){var r=e.labels,i=Pn,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},Ii=function(e,t,n){var r=e.vars,i=r[t],a=L,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&_r.length&&Ar(),o&&(L=o),l=s?i.apply(c,s):i.call(c),L=a,l},Li=function(e){return Wr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!I),e.progress()<1&&Ii(e,`onInterrupt`),e},Ri,zi=[],Bi=function(e){if(e)if(e=!e.name&&e.default||e,Wn()||e.headless){var t=e.name,n=B(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:fr,render:Ma,add:fa,kill:Pa,modifier:Na,rawVars:0},a={targetTest:0,get:0,getSetter:Oa,aliases:{},register:0};if(Zi(),e!==r){if(br[t])return;Fr(r,Fr(zr(e,i),a)),Lr(r.prototype,Lr(i,zr(e,a))),br[r.prop=t]=r,e.targetTest&&(Cr.push(r),gr[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}dr(t,r),e.register&&e.register(Xa,r,Q)}else zi.push(e)},J=255,Vi={aqua:[0,J,J],lime:[0,J,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,J],navy:[0,0,128],white:[J,J,J],olive:[128,128,0],yellow:[J,J,0],orange:[J,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[J,0,0],pink:[J,192,203],cyan:[0,J,J],transparent:[J,J,J,0]},Hi=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*J+.5|0},Ui=function(e,t,n){var r=e?Vn(e)?[e>>16,e>>8&J,e&J]:0:Vi.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Vi[e])r=Vi[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&J,r&J,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&J,e&J]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(Yn),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Hi(s+1/3,i,a),r[1]=Hi(s,i,a),r[2]=Hi(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(Xn),n&&r.length<4&&(r[3]=1),r}else r=e.match(Yn)||Vi.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/J,a=r[1]/J,o=r[2]/J,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},Wi=function(e){var t=[],n=[],r=-1;return e.split(Ki).forEach(function(e){var i=e.match(Zn)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Gi=function(e,t,n){var r=``,i=(e+r).match(Ki),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Ui(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=Wi(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(Ki,`1`).split(Zn),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(Ki),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},Ki=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Vi)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),qi=/hsl[a]?\(/,Ji=function(e){var t=e.join(` `),n;if(Ki.lastIndex=0,Ki.test(t))return n=qi.test(t),e[1]=Gi(e[1],n),e[0]=Gi(e[0],n,Wi(e[1])),!0},Yi,Xi=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){sr&&(!rr&&Wn()&&(nr=rr=window,ir=nr.document||{},ar.gsap=Xa,(nr.gsapVersions||=[]).push(Xa.version),cr(or||nr.GreenSockGlobals||!nr.gsap&&nr||{}),zi.forEach(Bi)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},Yi=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Yi=0,l=fr},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Zi(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Zi=function(){return!Yi&&Xi.wake()},Y={},Qi=/^[\d.\-M][\d.\-,\s]/,$i=/["']/g,ea=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace($i,``).trim():+c,r=s.substr(o+1).trim();return t},ta=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},na=function(e){var t=(e+``).split(`(`),n=Y[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[ea(t[1])]:ta(e).split(`,`).map(Nr)):Y._CE&&Qi.test(e)?Y._CE(``,e):n},ra=function(e){return function(t){return 1-e(1-t)}},ia=function(e,t){return e&&(B(e)?e:Y[e]||na(e))||t},aa=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return W(e,function(e){for(var t in Y[e]=ar[e]=i,Y[a=e.toLowerCase()]=n,i)Y[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=Y[e+`.`+t]=i[t]}),i},oa=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},sa=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/Fn*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*Bn((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:oa(s);return a=Fn/a,c.config=function(n,r){return e(t,n,r)},c},ca=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:oa(r);return i.config=function(n){return e(t,n)},i};W(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;aa(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),Y.Linear.easeNone=Y.none=Y.Linear.easeIn,aa(`Elastic`,sa(`in`),sa(`out`),sa()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};aa(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),aa(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),aa(`Circ`,function(e){return-(Rn(1-e*e)-1)}),aa(`Sine`,function(e){return e===1?1:-zn(e*In)+1}),aa(`Back`,ca(`in`),ca(`out`),ca()),Y.SteppedEase=Y.steps=ar.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-R;return function(e){return((r*mi(0,a,e)|0)+i)*n}}},Mn.ease=Y[`quad.out`],W(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return wr+=e+`,`+e+`Params,`});var la=function(e,t){this.id=Ln++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Dr,this.set=t?t.getSetter:Oa},ua=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,ci(this,+e.duration,1,1),this.data=e.data,L&&(this._ctx=L,L.data.push(this)),Yi||Xi.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,ci(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Zi(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for($r(this,e),!n._dp||n.parent||ei(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&ti(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===R||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),Mr(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Yr(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Yr(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Xr(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-R?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Zr(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-R?0:this._rts,this.totalTime(mi(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),Qr(this),Kr(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Zi(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==R&&(this._tTime-=R)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=K(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&ti(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(V(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Zr(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=hr);var t=I;return I=e,jr(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),I=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,li(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,li(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(di(this,e),V(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,V(t)),this._dur||(this._zTime=-R),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-R:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-R,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-R)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=B(e)?e:Pr,a=function(){var e=t.then;t.then=null,n&&n(),B(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){Li(this)},e}();Fr(ua.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-R,_prom:0,_ps:!1,_rts:1});var X=function(e){An(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=V(t.sortChildren),U&&ti(t.parent||U,kn(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&ni(kn(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return fi(0,arguments,this),this},n.from=function(e,t,n){return fi(1,arguments,this),this},n.fromTo=function(e,t,n,r){return fi(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,Br(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new Z(e,t,di(this,n),1),this},n.call=function(e,t,n){return ti(this,Z.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new Z(e,n,di(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,Br(n).immediateRender=V(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,Br(r).immediateRender=V(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:K(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==U&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=K(o%f),o===i?(d=this._repeat,c=a):(_=K(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=Xr(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:K(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&Ii(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=si(this,K(r),K(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(Ii(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-R);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||I&&jr(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-R:R);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-R)._zTime=c>=r?1:-1,this._ts))return this._start=g,Qr(this),this.render(e,t,n);this._onUpdate&&!t&&Ii(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&Wr(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(Ii(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(Vn(t)||(t=di(this,t,e)),!(e instanceof ua)){if(H(e))return e.forEach(function(e){return n.add(e,t)}),this;if(z(e))return this.addLabel(e,t);if(B(e))e=Z.delayedCall(0,e);else return this}return this===e?this:ti(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-Pn);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof Z?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return z(e)?this.removeLabel(e):B(e)?this.killTweensOf(e):(e.parent===this&&Ur(this,e),e===this._recent&&(this._recent=this._last),Gr(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=K(Xi.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=di(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=Z.delayedCall(0,t||fr,n);return r.data=`isPause`,this._hasPause=1,ti(this,r,di(this,e))},n.removePause=function(e){var t=this._first;for(e=di(this,e);t;)t._start===e&&t.data===`isPause`&&Wr(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)ha!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=yi(e),i=this._first,a=Vn(t),o;i;)i instanceof Z?kr(i._targets,r)&&(a?(!ha||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=di(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=Z.to(n,Fr({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||R,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&ci(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,Fr({startAt:{time:di(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),Fi(this,di(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),Fi(this,di(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+R)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=K(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return Gr(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),Gr(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=Pn,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,ti(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=K(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;ci(n,n===U&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(U._ts&&(Mr(U,Zr(e,U)),yr=Xi.frame),Xi.frame>=Sr){Sr+=jn.autoSleep||120;var t=U._first;if((!t||!t._ts)&&jn.autoSleep&&Xi._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Xi.sleep()}}},t}(ua);Fr(X.prototype,{_lock:0,_hasPause:0,_forcing:0});var da=function(e,t,n,r,i,a,o){var s=new Q(this._pt,e,t,0,1,ja,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=Mi(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(Qn)||[];u=Qn.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?Or(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=Qn.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,($n.test(r)||g)&&(s.e=0),this._pt=s,s},fa=function(e,t,n,r,i,a,o,s,c,l){B(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?B(u)?c?e[t.indexOf(`set`)||!B(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=B(u)?c?Ea:Ta:wa,p;if(z(r)&&(~r.indexOf(`random(`)&&(r=Mi(r)),r.charAt(1)===`=`&&(p=Or(d,r)+(q(d)||0),(p||p===0)&&(r=p))),!l||d!==r||ga)return!isNaN(d*r)&&r!==``?(p=new Q(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?Aa:ka,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&lr(t,r),da.call(this,e,t,d,r,f,s||jn.stringFilter,c))},pa=function(e,t,n,r,i){if(B(e)&&(e=xa(e,i,t,n,r)),!Un(e)||e.style&&e.nodeType||H(e)||Kn(e))return z(e)?xa(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=xa(e[o],i,t,n,r);return a},ma=function(e,t,n,r,i,a){var o,s,c,l;if(br[e]&&(o=new br[e]).init(i,o.rawVars?t[e]:pa(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new Q(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Ri))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},ha,ga,_a=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!Nn,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,O,k,A,j,M,N,ee;if(b&&(!f||!a)&&(a=`none`),t._ease=ia(a,Mn.ease),t._rEase=x&&(ia(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(k=g[0]?Er(g[0]).harness:0,N=k&&i[k.prop],S=zr(i,gr),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?mr:pr),h._lazy=0),o){if(Wr(t._startAt=Z.set(g,Fr({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&V(c),startAt:null,delay:0,onUpdate:l&&function(){return Ii(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(I||!s&&!p)&&t._startAt.revert(mr),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=Fr({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&V(c),immediateRender:s,stagger:0,parent:_},S),N&&(w[k.prop]=N),Wr(t._startAt=Z.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(I?t._startAt.revert(mr):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,R,R);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&V(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],O=E._gsap||Tr(g)[C]._gsap,t._ptLookup[C]=j={},vr[O.id]&&_r.length&&Ar(),M=v===g?C:v.indexOf(E),k&&(A=new k).init(E,N||S,t,M,v)!==!1&&(t._pt=T=new Q(t._pt,E,A.name,0,1,A.render,A,0,A.priority),A._props.forEach(function(e){j[e]=T}),A.priority&&(D=1)),!k||N)for(w in S)br[w]&&(A=ma(w,S,t,M,E,v))?A.priority&&(D=1):j[w]=T=fa.call(t,E,w,`get`,S[w],M,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(ha=t,U.killTweensOf(E,j,t.globalTime(n)),ee=!t.parent,ha=0),t._pt&&c&&(vr[O.id]=1)}D&&Ia(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!ee,f&&n<=0&&b.render(Pn,!0,!0)},va=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return ga=1,e.vars[t]=`+=0`,_a(e,o),ga=0,s?ur(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&=G(n)+q(u.e),u.b&&=l.s+q(u.b)},ya=function(e,t){var n=e[0]?Er(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=Lr({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},ba=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(H(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},xa=function(e,t,n,r,i){return B(e)?e.call(t,n,r,i):z(e)&&~e.indexOf(`random(`)?Mi(e):e},Sa=wr+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,Ca={};W(Sa+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return Ca[e]=1});var Z=function(e){An(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:Br(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||U,g=(H(t)||Kn(t)?Vn(t[0]):`length`in n)?[t]:yi(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?Tr(g):ur(`GSAP target `+t+` not found. https://gsap.com`,!jn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||Gn(s)||Gn(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new X({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=kn(a),_._start=0,u||Gn(s)||Gn(c)){if(b=g.length,C=u&&Si(u),Un(u))for(x in u)~Sa.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=zr(n,Ca),y.stagger=0,T&&(y.easeReverse=T),w&&Lr(y,w),S=g[v],y.duration=+xa(s,kn(a),v,S,g),y.delay=(+xa(c,kn(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=Y.none;_.duration()?s=c=0:a.timeline=0}else if(f){Br(Fr(_.vars.defaults,{ease:`none`})),_._ease=ia(f.ease||n.ease||`none`);var E=0,D,O,k;if(H(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||ba(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)O=D[v],k={ease:O.e,duration:(O.t-(v?D[v-1].t:0))/100*s},k[x]=O.v,_.to(g,k,E),E+=k.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!Nn&&(ha=kn(a),U.killTweensOf(g),ha=0),ti(h,kn(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===K(h._time)&&V(l)&&Jr(kn(a))&&h.data!==`nested`)&&(a._tTime=-R,a.render(Math.max(0,-c)||0)),m&&ni(kn(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-R&&!o?i:e<R?0:e,c,l,u,d,f,p,m,h;if(!a)oi(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=K(s%d),s===i?(u=this._repeat,c=a):(f=K(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=Xr(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(K(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(ri(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(Ii(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&qr(this,e,t,n),Ii(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&Ii(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&qr(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&Wr(this,1),!t&&!(o&&!r)&&(s||r||p)&&(Ii(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){Yi||Xi.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||_a(this,a),o=this._ease(a/this._dur),va(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):($r(this,0),this.parent||Hr(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?Li(this):this.scrollTrigger&&this.scrollTrigger.kill(!!I),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,ha&&ha.vars.overwrite!==!0)._first||Li(this),this.parent&&n!==this.timeline.totalDuration()&&ci(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?yi(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&Vr(r,i))return t===`all`&&(this._pt=0),Li(this);for(s=this._op=this._op||[],t!==`all`&&(z(t)&&(d={},W(t,function(e){return d[e]=1}),t=d),t=ya(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&Ur(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&Li(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return fi(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return fi(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return U.killTweensOf(e,t,n)},t}(ua);Fr(Z.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),W(`staggerTo,staggerFrom,staggerFromTo`,function(e){Z[e]=function(){var t=new X,n=gi.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var wa=function(e,t,n){return e[t]=n},Ta=function(e,t,n){return e[t](n)},Ea=function(e,t,n,r){return e[t](r.fp,n)},Da=function(e,t,n){return e.setAttribute(t,n)},Oa=function(e,t){return B(e[t])?Ta:Hn(e[t])&&e.setAttribute?Da:wa},ka=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Aa=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},ja=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Ma=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Na=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},Pa=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Ur(this,t,`_pt`):t.dep||(n=1),t=r;return!n},Fa=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Ia=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},Q=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||ka,this.d=o||this,this.set=s||wa,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=Fa,this.m=e,this.mt=n,this.tween=t},e}();W(wr+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return gr[e]=1}),ar.TweenMax=ar.TweenLite=Z,ar.TimelineLite=ar.TimelineMax=X,U=new X({sortChildren:!1,defaults:Mn,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),jn.stringFilter=Ji;var La=[],Ra={},za=[],Ba=0,Va=0,Ha=function(e){return(Ra[e]||za).map(function(e){return e()})},Ua=function(){var e=Date.now(),t=[];e-Ba>2&&(Ha(`matchMediaInit`),La.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=nr.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),Ha(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Ba=e,Ha(`matchMedia`))},Wa=function(){function e(e,t){this.selector=t&&bi(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Va++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){B(e)&&(n=t,t=e,e=B);var r=this,i=function(){var e=L,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=bi(n)),L=r,a=t.apply(r,arguments),B(a)&&r._r.push(a),L=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===B?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=L;L=null,e(this),L=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof Z&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof X?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof Z)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=La.length;r--;)La[r].id===this.id&&La.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),Ga=function(){function e(e){this.contexts=[],this.scope=e,L&&L.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){Un(e)||(e={matches:e});var r=new Wa(0,n||this.scope),i=r.conditions={},a,o,s;for(o in L&&!r.selector&&(r.selector=L.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=nr.matchMedia(e[o]),a&&(La.indexOf(r)<0&&La.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Ua):a.addEventListener(`change`,Ua)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),Ka={registerPlugin:function(){[...arguments].forEach(function(e){return Bi(e)})},timeline:function(e){return new X(e)},getTweensOf:function(e,t){return U.getTweensOf(e,t)},getProperty:function(e,t,n,r){z(e)&&(e=yi(e)[0]);var i=Er(e||{}).get,a=n?Pr:Nr;return n===`native`&&(n=``),e&&(t?a((br[t]&&br[t].get||i)(e,t,n,r)):function(t,n,r){return a((br[t]&&br[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=yi(e),e.length>1){var r=e.map(function(e){return Xa.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=br[t],o=Er(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Ri._pt=0,r.init(e,n?t+n:t,Ri,0,[e]),r.render(1,r),Ri._pt&&Ma(1,Ri)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=Xa.to(e,Fr((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return U.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ia(e.ease,Mn.ease)),Rr(Mn,e||{})},config:function(e){return Rr(jn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!br[e]&&!ar[e]&&ur(t+` effect requires `+e+` plugin.`)}),xr[t]=function(e,t,r){return n(yi(e),Fr(t||{},i),r)},a&&(X.prototype[t]=function(e,n,r){return this.add(xr[t](e,Un(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){Y[e]=ia(t)},parseEase:function(e,t){return arguments.length?ia(e,t):Y},getById:function(e){return U.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new X(e),r,i;for(n.smoothChildTiming=V(e.smoothChildTiming),U.remove(n),n._dp=0,n._time=n._tTime=U._time,r=U._first;r;)i=r._next,(t||!(!r._dur&&r instanceof Z&&r.vars.onComplete===r._targets[0]))&&ti(n,r,r._start-r._delay),r=i;return ti(U,n,0),n},context:function(e,t){return e?new Wa(e,t):L},matchMedia:function(e){return new Ga(e)},matchMediaRefresh:function(){return La.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Ua()},addEventListener:function(e,t){var n=Ra[e]||(Ra[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Ra[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Ai,wrapYoyo:ji,distribute:Si,random:Ti,snap:wi,normalize:Oi,getUnit:q,clamp:hi,splitColor:Ui,toArray:yi,selector:bi,mapRange:Ni,pipe:Ei,unitize:Di,interpolate:Pi,shuffle:xi},install:cr,effects:xr,ticker:Xi,updateRoot:X.updateRoot,plugins:br,globalTimeline:U,core:{PropTween:Q,globals:dr,Tween:Z,Timeline:X,Animation:ua,getCache:Er,_removeLinkedListItem:Ur,reverting:function(){return I},context:function(e){return e&&L&&(L.data.push(e),e._ctx=L),L},suppressOverwrites:function(e){return Nn=e}}};W(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return Ka[e]=Z[e]}),Xi.add(X.updateRoot),Ri=Ka.to({},{duration:0});var qa=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Ja=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=qa(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Ya=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(z(n)&&(r={},W(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Ja(e,n)}}}},Xa=Ka.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)I?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ya(`roundProps`,Ci),Ya(`modifiers`),Ya(`snap`,wi))||Ka;Z.version=X.version=Xa.version=`3.15.0`,sr=1,Wn()&&Zi(),Y.Power0,Y.Power1,Y.Power2,Y.Power3,Y.Power4,Y.Linear,Y.Quad,Y.Cubic,Y.Quart,Y.Quint,Y.Strong,Y.Elastic,Y.Back,Y.SteppedEase,Y.Bounce,Y.Sine,Y.Expo,Y.Circ;var Za,Qa,$a,eo,to,no,ro,io=function(){return typeof window<`u`},ao={},oo=180/Math.PI,so=Math.PI/180,co=Math.atan2,lo=1e8,uo=/([A-Z])/g,fo=/(left|right|width|margin|padding|x)/i,po=/[\s,\(]\S/,mo={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},ho=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},go=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},_o=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},vo=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},yo=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},bo=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},xo=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},So=function(e,t,n){return e.style[t]=n},Co=function(e,t,n){return e.style.setProperty(t,n)},wo=function(e,t,n){return e._gsap[t]=n},To=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Eo=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},Do=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},$=`transform`,Oo=$+`Origin`,ko=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in ao&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=mo[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=Jo(i,e)}):this.tfm[t]=o.x?o[t]:Jo(i,t),t===Oo&&(this.tfm.zOrigin=o.zOrigin);else return mo.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf($)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(Oo,n,``)),t=$}(a||n)&&this.props.push(t,n,a[t])},Ao=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},jo=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,i,a;for(i=0;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(uo,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=ro(),(!i||!i.isStart)&&!n[$]&&(Ao(n),r.zOrigin&&n[Oo]&&(n[Oo]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Mo=function(e,t){var n={target:e,props:[],revert:jo,save:ko};return e._gsap||Xa.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},No,Po=function(e,t){var n=Qa.createElementNS?Qa.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):Qa.createElement(e);return n&&n.style?n:Qa.createElement(e)},Fo=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(uo,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,Lo(n)||n,1)||``},Io=`O,Moz,ms,Ms,Webkit`.split(`,`),Lo=function(e,t,n){var r=(t||to).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(Io[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?Io[i]:``)+e},Ro=function(){io()&&window.document&&(Za=window,Qa=Za.document,$a=Qa.documentElement,to=Po(`div`)||{style:{}},Po(`div`),$=Lo($),Oo=$+`Origin`,to.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,No=!!Lo(`perspective`),ro=Xa.core.reverting,eo=1)},zo=function(e){var t=e.ownerSVGElement,n=Po(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),$a.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),$a.removeChild(n),i},Bo=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Vo=function(e){var t,n;try{t=e.getBBox()}catch{t=zo(e),n=1}return t&&(t.width||t.height)||n||(t=zo(e)),t&&!t.width&&!t.x&&!t.y?{x:+Bo(e,[`x`,`cx`,`x1`])||0,y:+Bo(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},Ho=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Vo(e))},Uo=function(e,t){if(t){var n=e.style,r;t in ao&&t!==Oo&&(t=$),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(uo,`-$1`).toLowerCase())):n.removeAttribute(t)}},Wo=function(e,t,n,r,i,a){var o=new Q(e._pt,t,n,0,1,a?xo:bo);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},Go={deg:1,rad:1,turn:1},Ko={grid:1,flex:1},qo=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=to.style,c=fo.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||Go[i]||Go[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&Ho(t),(p||o===`%`)&&(ao[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],G(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===Qa||!h.appendChild)&&(h=Qa.body),g=h._gsap,g&&p&&g.width&&c&&g.time===Xi.time&&!g.uncache)return G(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:Uo(t,n)}else (p||o===`%`)&&!Ko[Fo(h,`display`)]&&(s.position=Fo(t,`position`)),h===t&&(s.position=`static`),h.appendChild(to),m=to[u],h.removeChild(to),s.position=`absolute`;return c&&p&&(g=Er(h),g.time=Xi.time,g.width=h[u]),G(f?m*a/d:m&&a?d/m*a:0)},Jo=function(e,t,n,r){var i;return eo||Ro(),t in mo&&t!==`transform`&&(t=mo[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),ao[t]&&t!==`transform`?(i=os(e,r),i=t===`transformOrigin`?i.svg?i.origin:ss(Fo(e,Oo))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=$o[t]&&$o[t](e,t,n)||Fo(e,t)||Dr(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?qo(e,t,i,n)+n:i},Yo=function(e,t,n,r){if(!n||n===`none`){var i=Lo(t,e,1),a=i&&Fo(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=Fo(e,`borderTopColor`))}var o=new Q(this._pt,e.style,t,0,1,ja),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=Fo(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=Fo(e,t)||r,m?e.style[t]=m:Uo(e,t)),l=[n,r],Ji(l),n=l[0],r=l[1],d=n.match(Zn)||[],b=r.match(Zn)||[],b.length){for(;u=Zn.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=Or(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=Zn.lastIndex-v.length,v||(v=v||jn.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=qo(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?xo:bo;return $n.test(r)&&(o.e=0),this._pt=o,o},Xo={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},Zo=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=Xo[n]||n,t[1]=Xo[r]||r,t.join(` `)},Qo=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],ao[o]&&(s=1,o=o===`transformOrigin`?Oo:$),Uo(n,o);s&&(Uo(n,$),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,os(n,1),a.uncache=1,Ao(r)))}},$o={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new Q(e._pt,t,n,0,0,Qo);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},es=[1,0,0,1,0,0],ts={},ns=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},rs=function(e){var t=Fo(e,$);return ns(t)?es:t.substr(7).match(Xn).map(G)},is=function(e,t){var n=e._gsap||Er(e),r=e.style,i=rs(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?es:i):(i===es&&!e.offsetParent&&e!==$a&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,$a.appendChild(e)),i=rs(e),s?r.display=s:Uo(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):$a.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},as=function(e,t,n,r,i,a){var o=e._gsap,s=i||is(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==es&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=Vo(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Oo]=`0px 0px`,a&&(Wo(a,o,`xOrigin`,c,y),Wo(a,o,`yOrigin`,l,b),Wo(a,o,`xOffset`,u,o.xOffset),Wo(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},os=function(e,t){var n=e._gsap||new la(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=Fo(e,Oo)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,ee,te,ne,re,ie,ae,P;return n.svg=!!(e.getCTM&&Ho(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[$]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[$]===`none`?``:s[$])),r.scale=r.rotate=r.translate=`none`),S=is(e,n.svg),n.svg&&(n.uncache?(N=e.getBBox(),c=n.xOrigin-N.x+`px `+(n.yOrigin-N.y)+`px`,M=``):M=!t&&e.getAttribute(`data-svg-origin`),as(e,M||c,!!M||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==es&&(E=S[0],D=S[1],O=S[2],k=S[3],l=A=S[4],u=j=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(k*k+O*O),m=E||D?co(D,E)*oo:0,_=O||k?co(O,k)*oo+m:0,_&&(p*=Math.abs(Math.cos(_*so))),n.svg&&(l-=b-(b*E+x*O),u-=x-(b*D+x*k))):(P=S[6],ie=S[7],te=S[8],ne=S[9],re=S[10],ae=S[11],l=S[12],u=S[13],d=S[14],C=co(P,re),h=C*oo,C&&(w=Math.cos(-C),T=Math.sin(-C),M=A*w+te*T,N=j*w+ne*T,ee=P*w+re*T,te=A*-T+te*w,ne=j*-T+ne*w,re=P*-T+re*w,ae=ie*-T+ae*w,A=M,j=N,P=ee),C=co(-O,re),g=C*oo,C&&(w=Math.cos(-C),T=Math.sin(-C),M=E*w-te*T,N=D*w-ne*T,ee=O*w-re*T,ae=k*T+ae*w,E=M,D=N,O=ee),C=co(D,E),m=C*oo,C&&(w=Math.cos(C),T=Math.sin(C),M=E*w+D*T,N=A*w+j*T,D=D*w-E*T,j=j*w-A*T,E=M,A=N),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=G(Math.sqrt(E*E+D*D+O*O)),p=G(Math.sqrt(j*j+P*P)),C=co(A,j),_=Math.abs(C)>2e-4?C*oo:0,y=ae?1/(ae<0?-ae:ae):0),n.svg&&(M=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!ns(Fo(e,$)),M&&e.setAttribute(`transform`,M))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=G(f),n.scaleY=G(p),n.rotation=G(m)+o,n.rotationX=G(h)+o,n.rotationY=G(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[Oo]=ss(c)),n.xOffset=n.yOffset=0,n.force3D=jn.force3D,n.renderTransform=n.svg?ms:No?ps:ls,n.uncache=0,n},ss=function(e){return(e=e.split(` `))[0]+` `+e[1]},cs=function(e,t,n){var r=q(t);return G(parseFloat(t)+parseFloat(qo(e,`x`,n+`px`,r)))+r},ls=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,ps(e,t)},us=`0deg`,ds=`0px`,fs=`) `,ps=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==us||l!==us)){var x=parseFloat(l)*so,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*so,w=Math.cos(x),a=cs(_,a,S*w*-v),o=cs(_,o,-Math.sin(x)*-v),s=cs(_,s,C*w*-v+v)}h!==ds&&(y+=`perspective(`+h+fs),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==ds||o!==ds||s!==ds)&&(y+=s!==ds||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+fs),c!==us&&(y+=`rotate(`+c+fs),l!==us&&(y+=`rotateY(`+l+fs),u!==us&&(y+=`rotateX(`+u+fs),(d!==us||f!==us)&&(y+=`skew(`+d+`, `+f+fs),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+fs),_.style[$]=y||`translate(0, 0)`},ms=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=so,c*=so,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=so,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=G(b),x=G(x),S=G(S),C=G(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=qo(f,`x`,a,`px`),y=qo(f,`y`,o,`px`)),(p||m||h||g)&&(v=G(v+p-(p*b+m*S)+h),y=G(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=G(v+r/100*w.width),y=G(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[$]=w)},hs=function(e,t,n,r,i){var a=360,o=z(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?oo:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*lo)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*lo)%a-~~(s/a)*a)),e._pt=u=new Q(e._pt,t,n,r,s,go),u.e=c,u.u=`deg`,e._props.push(n),u},gs=function(e,t){for(var n in t)e[n]=t[n];return e},_s=function(e,t,n){var r=gs({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[$]=t,o=os(n,1),Uo(n,$),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[$],a[$]=t,o=os(n,1),a[$]=c),ao)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=q(c),p=q(l),u=f===p?parseFloat(c):qo(n,s,c,p),d=parseFloat(l),e._pt=new Q(e._pt,o,s,u,d-u,ho),e._pt.u=p||0,e._props.push(s));gs(o,r)};W(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});$o[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return Jo(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var vs={name:`css`,register:Ro,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in eo||Ro(),this.styles=this.styles||Mo(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(br[m]&&ma(m,t,n,r,e,i)))){if(f=typeof l,p=$o[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=Mi(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,Ki.lastIndex=0,Ki.test(c)||(h=q(c),g=q(l),g?h!==g&&(c=qo(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],z(c)&&~c.indexOf(`random(`)&&(c=Mi(c)),q(c+``)||c===`auto`||(c+=jn.units[m]||q(Jo(e,m))||``),(c+``).charAt(1)===`=`&&(c=Jo(e,m))):c=Jo(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in mo&&(m===`autoAlpha`&&(d===1&&Jo(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),Wo(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=mo[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in ao,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=Fo(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=Fo(e,`perspective`),T?e.style.perspective=T:Uo(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||os(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new Q(this._pt,o,$,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new Q(this._pt,b,`scaleY`,b.scaleY,(_?Or(b.scaleY,_+u):u)-b.scaleY||0,ho),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(Oo,0,o[Oo]),l=Zo(l),b.svg?as(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&Wo(this,b,`zOrigin`,b.zOrigin,g),Wo(this,o,m,ss(c),ss(l)));continue}else if(m===`svgOrigin`){as(e,l,1,x,0,this);continue}else if(m in ts){hs(this,b,m,d,_?Or(d,_+l):l);continue}else if(m===`smoothOrigin`){Wo(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){_s(this,l,e);continue}}else m in o||(m=Lo(m)||m);if(v||(u||u===0)&&(d||d===0)&&!po.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=q(l)||(m in jn.units?jn.units[m]:h),h!==g&&(d=qo(e,m,c,g)),this._pt=new Q(this._pt,v?b:o,m,d,(_?Or(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?yo:ho),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=vo):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=_o);else if(m in o)Yo.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){lr(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&Ia(this)},render:function(e,t){if(t.tween._time||!ro())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Jo,aliases:mo,getSetter:function(e,t,n){var r=mo[t];return r&&r.indexOf(`,`)<0&&(t=r),t in ao&&t!==Oo&&(e._gsap.x||Jo(e,`x`))?n&&no===n?t===`scale`?To:wo:(no=n||{})&&(t===`scale`?Eo:Do):e.style&&!Hn(e.style[t])?So:~t.indexOf(`-`)?Co:Oa(e,t)},core:{_removeProperty:Uo,_getMatrix:is}};Xa.utils.checkPrefix=Lo,Xa.core.getStyleSaver=Mo,(function(e,t,n,r){var i=W(e+`,`+t+`,`+n,function(e){ao[e]=1});W(t,function(e){jn.units[e]=`deg`,ts[e]=1}),mo[i[13]]=e+`,`+t,W(r,function(e){var t=e.split(`:`);mo[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),W(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){jn.units[e]=`px`}),Xa.registerPlugin(vs);var ys=Xa.registerPlugin(vs)||Xa;ys.core.Tween;var bs=Object.assign({"../content/blog/adapt-cps-methodology.en.md":`---
title: A process model where the contract exists before the code
date: 2026-08-15
summary: Six phases for building a self-adaptive cyber-physical system, built around one structural idea: the team's feedback loop and the system's feedback loop run at wildly different speeds and must not be confused.
tags: cyber-physical, process
---

Having argued that agile and waterfall both miss what a cyber-physical adaptive system needs, I owed the room an actual answer. This is it: ADAPT-CPS, six phases plus a preparation step, aimed at multi-team projects where software, hardware and safety all have to move at once.

The shape of it comes from one observation. A self-adaptive system contains two feedback loops with about nine orders of magnitude between them, and almost every methodology failure I could find came from treating them as one.

<figure>
<svg viewBox="0 0 640 400" role="img" aria-label="Six phases with an iteration zero, and two feedback paths returning from adaptive operation">
  <defs>
    <marker id="ph-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="ph-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="0" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="20" class="dg-t">1 &#183; Level-zero global specification</text>
  <text x="16" y="35" class="dg-s">rules, quality attributes, context map. Defined once.</text>
  <path d="M175 46 V56" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="58" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="78" class="dg-t">2 &#183; Decomposition into domains</text>
  <text x="16" y="93" class="dg-s">one team per domain, recursive when a domain is too big</text>
  <path d="M175 104 V114" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="116" width="350" height="44" rx="8" class="dg-node-warn"/>
  <text x="16" y="136" class="dg-t">Iteration zero</text>
  <text x="16" y="151" class="dg-s">riskiest scenario, contracts made concrete, CI standing up</text>
  <path d="M175 162 V172" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="174" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="194" class="dg-t">3 &#183; Minimum functional skeleton</text>
  <text x="16" y="209" class="dg-s">the adaptation loop is born here, end to end, minimal</text>
  <path d="M175 220 V230" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="232" width="350" height="44" rx="8" class="dg-node-accent"/>
  <text x="16" y="252" class="dg-t">4 &#183; Incremental multi-team growth</text>
  <text x="16" y="267" class="dg-s">parallel, against the contract, on simulators</text>
  <path d="M175 278 V288" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="290" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="310" class="dg-t">5 &#183; Verification, integration, deployment</text>
  <text x="16" y="325" class="dg-s">contract tests, then the twin, then the metal</text>
  <path d="M175 336 V346" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="348" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="368" class="dg-t">6 &#183; Adaptive operation</text>
  <text x="16" y="383" class="dg-s">the loop runs continuously, on its own</text>
  <path d="M350 370 H420 V254 H358" class="dg-flow-accent" marker-end="url(#ph-head-a)"/>
  <text x="432" y="290" class="dg-m">EVERY CYCLE</text>
  <text x="432" y="306" class="dg-s">what the system learns in</text>
  <text x="432" y="319" class="dg-s">operation feeds the next</text>
  <text x="432" y="332" class="dg-s">growth increment.</text>
  <path d="M350 370 H570 V22 H358" class="dg-flow-dashed" marker-end="url(#ph-head)"/>
  <text x="432" y="52" class="dg-m">RARE</text>
  <text x="432" y="68" class="dg-s">only when a level-zero rule</text>
  <text x="432" y="81" class="dg-s">stops holding. That is a</text>
  <text x="432" y="94" class="dg-s">baseline change and needs</text>
  <text x="432" y="107" class="dg-s">formal review by every</text>
  <text x="432" y="120" class="dg-s">affected domain.</text>
</svg>
<figcaption>The solid return path is the normal one and it is short. The dashed one reaches all the way back to the founding agreement, and making it expensive on purpose is what keeps that agreement worth having.</figcaption>
</figure>

## The founding agreement is made once

Phase 1 puts the leads of every domain in one room to define, collaboratively and once, three things: the business rules, the quality attributes of the whole system, and the context map with the integration contracts between domains.

The word doing the work there is once. This level is meant to stay stable for the life of normal development. If it moves every quarter it was never a baseline, it was a backlog, and every downstream team has been building against sand.

Phase 2 turns the context map into an org chart. Each functional domain gets a responsible team, and when a domain turns out to be too broad the same pattern repeats inside it: subdomains with their own internal contract, always subordinate to the global one. Two questions get answered here and nowhere else. What are the pieces, and how do they relate.

## Iteration zero exists because three decisions block everything else

Before construction starts, three things get decided, and each one is a common cause of a stalled project when skipped.

Which scenario to build first. The criterion is not business value, it is early uncertainty reduction: pick the scenario that is simultaneously the simplest and the riskiest. The one that will teach you the most about whether the architecture survives contact with the physical world.

Contracts get lowered from concept to reality. The context map from phase 1 says two domains exchange a commanded setpoint. Iteration zero says exactly which schema, which format, which protocol, which units. Until that happens, "we agreed on the contract" is a shared feeling rather than something two teams can build against.

And the shared infrastructure goes up: repositories, test environments, the first continuous integration channel. Not because tooling is exciting, but because a phase-4 team that has to invent its own pipeline will invent a different one, and integration will pay for it later.

## The loop is born in phase 3, and it is born whole

Phase 3 is the smallest interesting phase. Each team builds its own smallest real slice of the chosen scenario, with real components or temporary simulators.

What makes it a phase rather than a milestone is what appears at the end of it: a complete monitor, analyze, plan and execute cycle, running end to end, however minimally. There is no earlier version of that loop. This is where it starts existing.

That ordering matters. A loop assembled at the end from four independently built stages tends to discover, very late, that the monitor's sampling rate cannot support the plan's decision window. Building it thin and whole first makes that a phase-3 problem instead of a phase-5 catastrophe.

## Phase 4 is where the contract earns its keep

Each team grows its part in parallel, keeping its own internal way of working, which is deliberate: a mechatronics group and an embedded software group should not be forced onto the same ceremony.

The mechanism that lets them move without blocking each other is the contract defined before anyone wrote code. Each side builds against the interface and uses simulators until both are ready to integrate with the real physical component. Coordination between teams happens at periodic synchronisation points rather than continuously, because continuous coordination between six teams is just a meeting.

Phase 5 is the automated gate: integrate everyone's work, run the contract conformance tests, validate the enriched loop against the digital twin where one exists, and only then deploy to the physical environment. The twin is not a nice-to-have in that sentence. It is the step that makes deploying to real equipment a decision rather than a gamble.

## Two clocks, and the reason to keep them apart

Phase 6 is the system operating and adapting on its own. And here is the structural point of the whole model.

<figure>
<svg viewBox="0 0 640 160" role="img" aria-label="Two timelines at very different frequencies: the team's increments and the system's runtime adaptation">
  <defs>
    <marker id="cl-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <text x="0" y="30" class="dg-m">TEAM CLOCK</text>
  <path d="M0 52 H628" class="dg-flow" marker-end="url(#cl-head)"/>
  <path d="M0 44 V60 M156 44 V60 M312 44 V60 M468 44 V60 M624 44 V60" class="dg-flow"/>
  <text x="78" y="42" text-anchor="middle" class="dg-s">2-week increment</text>
  <text x="234" y="42" text-anchor="middle" class="dg-s">2-week increment</text>
  <text x="390" y="42" text-anchor="middle" class="dg-s">2-week increment</text>
  <text x="546" y="42" text-anchor="middle" class="dg-s">2-week increment</text>
  <text x="0" y="76" class="dg-s">closes against the simulator &#183; CI on every commit &#183; hardware-in-the-loop every second increment</text>
  <text x="0" y="112" class="dg-m">SYSTEM CLOCK</text>
  <path d="M0 130 H628" class="dg-flow-accent" marker-end="url(#cl-head)"/>
  <path d="M0 124 V136 M12 124 V136 M24 124 V136 M36 124 V136 M48 124 V136 M60 124 V136 M72 124 V136 M84 124 V136 M96 124 V136 M108 124 V136 M120 124 V136 M132 124 V136 M144 124 V136 M156 124 V136 M168 124 V136 M180 124 V136 M192 124 V136 M204 124 V136 M216 124 V136 M228 124 V136 M240 124 V136 M252 124 V136 M264 124 V136 M276 124 V136 M288 124 V136 M300 124 V136 M312 124 V136 M324 124 V136 M336 124 V136 M348 124 V136 M360 124 V136 M372 124 V136 M384 124 V136 M396 124 V136 M408 124 V136 M420 124 V136 M432 124 V136 M444 124 V136 M456 124 V136 M468 124 V136 M480 124 V136 M492 124 V136 M504 124 V136 M516 124 V136 M528 124 V136 M540 124 V136 M552 124 V136 M564 124 V136 M576 124 V136 M588 124 V136 M600 124 V136 M612 124 V136 M624 124 V136" class="dg-flow-accent"/>
  <text x="0" y="152" class="dg-s">the loop adapting in milliseconds, continuously, with nobody in the room</text>
</svg>
<figcaption>Not a metaphor. These are the two rates at which the system changes, and the same drawing at true scale would put roughly a billion ticks on the lower line per tick of the upper one.</figcaption>
</figure>

Confusing them is the classic mistake, and it goes in both directions. Teams promise runtime adaptiveness and deliver a sprint cadence, so the system waits for humans to notice a problem. Or they treat every runtime adaptation as feedback the backlog must respond to, and drown.

Keeping them apart is what the last phase encodes. What phase 6 learns feeds phase 4, the next growth increment: normal, frequent, cheap. Only in the exceptional case where a level-zero rule has stopped being true does that feedback reach phase 1, and then it is explicitly a change of baseline requiring formal review by the leads of every affected domain.

Two return paths, deliberately different costs. That is the part I would defend hardest if only one idea survived: the founding agreement is only worth having if going back to it is expensive, and the growth loop is only worth having if going back to it is not.
`,"../content/blog/adapt-cps-methodology.es.md":`---
title: Un modelo de procesos donde el contrato existe antes que el código
date: 2026-08-15
summary: Seis fases para construir un sistema ciberfísico autoadaptativo, armadas sobre una idea estructural: el lazo de retroalimentación del equipo y el del sistema corren a velocidades muy distintas y no hay que confundirlos.
tags: ciberfísicos, proceso
---

Después de argumentar que ágil y cascada se pierden los dos lo que necesita un sistema ciberfísico adaptativo, le debía a la sala una respuesta concreta. Esta es: ADAPT-CPS, seis fases más un paso de preparación, pensada para proyectos multiequipo donde software, hardware y seguridad tienen que moverse a la vez.

Su forma sale de una sola observación. Un sistema autoadaptativo contiene dos lazos de retroalimentación con unos nueve órdenes de magnitud entre ellos, y casi todas las fallas de metodología que encontré venían de tratarlos como uno solo.

<figure>
<svg viewBox="0 0 640 400" role="img" aria-label="Seis fases con una iteración cero y dos caminos de retroalimentación que vuelven desde la operación adaptativa">
  <defs>
    <marker id="ph-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="ph-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="0" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="20" class="dg-t">1 &#183; Especificación global de nivel cero</text>
  <text x="16" y="35" class="dg-s">reglas, atributos de calidad, mapa de contextos. Una vez.</text>
  <path d="M175 46 V56" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="58" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="78" class="dg-t">2 &#183; Descomposición en dominios</text>
  <text x="16" y="93" class="dg-s">un equipo por dominio, recursivo si el dominio es muy amplio</text>
  <path d="M175 104 V114" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="116" width="350" height="44" rx="8" class="dg-node-warn"/>
  <text x="16" y="136" class="dg-t">Iteración cero</text>
  <text x="16" y="151" class="dg-s">escenario más riesgoso, contratos concretos, CI en pie</text>
  <path d="M175 162 V172" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="174" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="194" class="dg-t">3 &#183; Esqueleto funcional mínimo</text>
  <text x="16" y="209" class="dg-s">el lazo de adaptación nace aquí, de punta a punta, mínimo</text>
  <path d="M175 220 V230" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="232" width="350" height="44" rx="8" class="dg-node-accent"/>
  <text x="16" y="252" class="dg-t">4 &#183; Crecimiento incremental multiequipo</text>
  <text x="16" y="267" class="dg-s">en paralelo, contra el contrato, sobre simuladores</text>
  <path d="M175 278 V288" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="290" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="310" class="dg-t">5 &#183; Verificación, integración, despliegue</text>
  <text x="16" y="325" class="dg-s">pruebas de contrato, luego el gemelo, luego el equipo</text>
  <path d="M175 336 V346" class="dg-flow" marker-end="url(#ph-head)"/>
  <rect x="0" y="348" width="350" height="44" rx="8" class="dg-node"/>
  <text x="16" y="368" class="dg-t">6 &#183; Operación adaptativa</text>
  <text x="16" y="383" class="dg-s">el lazo corre de forma continua y autónoma</text>
  <path d="M350 370 H420 V254 H358" class="dg-flow-accent" marker-end="url(#ph-head-a)"/>
  <text x="432" y="290" class="dg-m">CADA CICLO</text>
  <text x="432" y="306" class="dg-s">lo que el sistema aprende</text>
  <text x="432" y="319" class="dg-s">en operación alimenta el</text>
  <text x="432" y="332" class="dg-s">siguiente incremento.</text>
  <path d="M350 370 H570 V22 H358" class="dg-flow-dashed" marker-end="url(#ph-head)"/>
  <text x="432" y="52" class="dg-m">RARO</text>
  <text x="432" y="68" class="dg-s">solo cuando una regla de</text>
  <text x="432" y="81" class="dg-s">nivel cero deja de valer.</text>
  <text x="432" y="94" class="dg-s">Es un cambio de línea base</text>
  <text x="432" y="107" class="dg-s">y exige revisión formal de</text>
  <text x="432" y="120" class="dg-s">cada dominio afectado.</text>
</svg>
<figcaption>El camino de vuelta sólido es el normal y es corto. El punteado llega hasta el acuerdo fundacional, y hacerlo caro a propósito es lo que mantiene a ese acuerdo valiendo la pena.</figcaption>
</figure>

## El acuerdo fundacional se hace una sola vez

La fase 1 pone a los responsables de todos los dominios en una sala para definir, de forma colaborativa y una sola vez, tres cosas: las reglas de negocio, los atributos de calidad del sistema completo, y el mapa de contextos con los contratos de integración entre dominios.

La palabra que hace el trabajo ahí es *una*. Este nivel está pensado para permanecer estable durante todo el desarrollo normal. Si se mueve cada trimestre nunca fue una línea base, fue un backlog, y todos los equipos río abajo estuvieron construyendo sobre arena.

La fase 2 convierte el mapa de contextos en un organigrama. Cada dominio funcional recibe un equipo responsable, y cuando un dominio resulta demasiado amplio se repite el mismo patrón dentro de él: subdominios con su propio contrato interno, siempre subordinado al global. Aquí se responden dos preguntas y en ningún otro lado. Cuáles son las piezas, y cómo se relacionan.

## La iteración cero existe porque tres decisiones bloquean todo lo demás

Antes de empezar a construir se deciden tres cosas, y saltarse cada una es una causa común de proyecto estancado.

Qué escenario construir primero. El criterio no es valor de negocio, es reducción temprana de incertidumbre: elige el escenario que sea a la vez el más simple y el más riesgoso. El que más te va a enseñar sobre si la arquitectura sobrevive al contacto con el mundo físico.

Los contratos bajan de concepto a realidad. El mapa de contextos de la fase 1 dice que dos dominios intercambian un setpoint comandado. La iteración cero dice exactamente qué esquema, qué formato, qué protocolo, qué unidades. Hasta que eso pasa, "acordamos el contrato" es una sensación compartida y no algo contra lo que dos equipos puedan construir.

Y se levanta la infraestructura compartida: repositorios, entornos de prueba, el primer canal de integración continua. No porque el tooling sea emocionante, sino porque un equipo de la fase 4 que tenga que inventar su propio pipeline va a inventar uno distinto, y la integración lo va a pagar después.

## El lazo nace en la fase 3, y nace completo

La fase 3 es la fase más pequeña que es interesante. Cada equipo construye su porción real más chica del escenario elegido, con componentes reales o con simuladores temporales.

Lo que la hace una fase y no un hito es lo que aparece al final: un ciclo completo de monitorear, analizar, planificar y ejecutar, corriendo de punta a punta, por mínimo que sea. No existe una versión anterior de ese lazo. Aquí es donde empieza a existir.

Ese orden importa. Un lazo ensamblado al final a partir de cuatro etapas construidas por separado tiende a descubrir, muy tarde, que la frecuencia de muestreo del monitor no alcanza para la ventana de decisión del plan. Construirlo delgado y completo primero convierte eso en un problema de la fase 3 en vez de una catástrofe de la fase 5.

## La fase 4 es donde el contrato se gana el sueldo

Cada equipo hace crecer su parte en paralelo, conservando su propia forma de trabajo interna, y eso es deliberado: a un grupo de mecatrónica y a uno de software embebido no hay que obligarlos a la misma ceremonia.

El mecanismo que les permite moverse sin bloquearse mutuamente es el contrato definido antes de que nadie escribiera código. Cada lado construye contra la interfaz y usa simuladores hasta que ambos estén listos para integrarse con el componente físico real. La coordinación entre equipos ocurre en encuentros periódicos de sincronización y no de forma continua, porque la coordinación continua entre seis equipos es solo una reunión.

La fase 5 es la compuerta automatizada: integrar el trabajo de todos, correr las pruebas de conformidad de contrato, validar el lazo enriquecido contra el gemelo digital cuando existe, y solo entonces desplegar al entorno físico. El gemelo no es un extra en esa frase. Es el paso que convierte desplegar sobre equipo real en una decisión y no en una apuesta.

## Dos relojes, y la razón para mantenerlos separados

La fase 6 es el sistema operando y adaptándose solo. Y aquí está el punto estructural de todo el modelo.

<figure>
<svg viewBox="0 0 640 160" role="img" aria-label="Dos líneas de tiempo a frecuencias muy distintas: los incrementos del equipo y la adaptación del sistema en tiempo de ejecución">
  <defs>
    <marker id="cl-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <text x="0" y="30" class="dg-m">RELOJ DEL EQUIPO</text>
  <path d="M0 52 H628" class="dg-flow" marker-end="url(#cl-head)"/>
  <path d="M0 44 V60 M156 44 V60 M312 44 V60 M468 44 V60 M624 44 V60" class="dg-flow"/>
  <text x="78" y="42" text-anchor="middle" class="dg-s">incremento de 2 semanas</text>
  <text x="234" y="42" text-anchor="middle" class="dg-s">incremento de 2 semanas</text>
  <text x="390" y="42" text-anchor="middle" class="dg-s">incremento de 2 semanas</text>
  <text x="546" y="42" text-anchor="middle" class="dg-s">incremento de 2 semanas</text>
  <text x="0" y="76" class="dg-s">cierra contra el simulador &#183; CI en cada commit &#183; hardware-in-the-loop cada dos incrementos</text>
  <text x="0" y="112" class="dg-m">RELOJ DEL SISTEMA</text>
  <path d="M0 130 H628" class="dg-flow-accent" marker-end="url(#cl-head)"/>
  <path d="M0 124 V136 M12 124 V136 M24 124 V136 M36 124 V136 M48 124 V136 M60 124 V136 M72 124 V136 M84 124 V136 M96 124 V136 M108 124 V136 M120 124 V136 M132 124 V136 M144 124 V136 M156 124 V136 M168 124 V136 M180 124 V136 M192 124 V136 M204 124 V136 M216 124 V136 M228 124 V136 M240 124 V136 M252 124 V136 M264 124 V136 M276 124 V136 M288 124 V136 M300 124 V136 M312 124 V136 M324 124 V136 M336 124 V136 M348 124 V136 M360 124 V136 M372 124 V136 M384 124 V136 M396 124 V136 M408 124 V136 M420 124 V136 M432 124 V136 M444 124 V136 M456 124 V136 M468 124 V136 M480 124 V136 M492 124 V136 M504 124 V136 M516 124 V136 M528 124 V136 M540 124 V136 M552 124 V136 M564 124 V136 M576 124 V136 M588 124 V136 M600 124 V136 M612 124 V136 M624 124 V136" class="dg-flow-accent"/>
  <text x="0" y="152" class="dg-s">el lazo adaptándose en milisegundos, de forma continua, sin nadie en la sala</text>
</svg>
<figcaption>No es una metáfora. Estas son las dos velocidades a las que cambia el sistema, y el mismo dibujo a escala real pondría unos mil millones de marcas en la línea de abajo por cada marca de la de arriba.</figcaption>
</figure>

Confundirlos es el error clásico, y va en las dos direcciones. Los equipos prometen adaptación en tiempo de ejecución y entregan una cadencia de sprint, así que el sistema espera a que un humano note el problema. O tratan cada adaptación en ejecución como retroalimentación a la que el backlog debe responder, y se ahogan.

Mantenerlos separados es lo que codifica la última fase. Lo aprendido en la fase 6 alimenta la fase 4, el siguiente incremento de crecimiento: normal, frecuente, barato. Solo en el caso excepcional en que una regla de nivel cero dejó de ser cierta esa retroalimentación llega a la fase 1, y entonces es explícitamente un cambio de línea base que exige revisión formal de los responsables de cada dominio afectado.

Dos caminos de vuelta, con costos deliberadamente distintos. Esa es la parte que defendería con más fuerza si solo sobreviviera una idea: el acuerdo fundacional solo vale la pena si volver a él es caro, y el lazo de crecimiento solo vale la pena si volver a él no lo es.
`,"../content/blog/agile-waterfall-cyber-physical.en.md":`---
title: Agile and waterfall both fail cyber-physical systems, from opposite ends
date: 2026-08-13
summary: One method ignores physics. The other cannot absorb uncertainty. Neither gap is fixable by tuning ceremonies, which is why the answer is a different process model.
tags: cyber-physical, process
---

Ask how a team should build a system where software controls physical equipment and adapts its own behaviour at runtime, and you get one of two answers. Run Scrum. Or run a V-model, because safety.

Both answers are given in good faith and both are wrong, in ways that turn out to be exact mirror images of each other. Understanding why is what justifies proposing a different process model rather than adjusting an existing one.

<figure>
<svg viewBox="0 0 640 214" role="img" aria-label="Agile and rigid methods approaching from opposite ends and both stopping short of what a cyber-physical adaptive system needs">
  <defs>
    <marker id="gp-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="34" width="188" height="50" rx="8" class="dg-node"/>
  <text x="94" y="56" text-anchor="middle" class="dg-t">Traditional agile</text>
  <text x="94" y="72" text-anchor="middle" class="dg-s">Scrum, Kanban, XP</text>
  <path d="M192 59 H236" class="dg-flow" marker-end="url(#gp-head)"/>
  <rect x="452" y="34" width="188" height="50" rx="8" class="dg-node"/>
  <text x="546" y="56" text-anchor="middle" class="dg-t">Traditional rigid</text>
  <text x="546" y="72" text-anchor="middle" class="dg-s">Waterfall, V-model</text>
  <path d="M448 59 H404" class="dg-flow" marker-end="url(#gp-head)"/>
  <rect x="244" y="14" width="152" height="90" rx="8" class="dg-plate"/>
  <text x="320" y="38" text-anchor="middle" class="dg-m">THE GAP</text>
  <text x="320" y="58" text-anchor="middle" class="dg-s">real-time physics</text>
  <text x="320" y="74" text-anchor="middle" class="dg-s">runtime adaptation</text>
  <text x="320" y="90" text-anchor="middle" class="dg-s">a living safety case</text>
  <text x="0" y="136" class="dg-t">Stops because it ignores the physical</text>
  <text x="0" y="156" class="dg-s">No latency budgets, no actuator limits, no</text>
  <text x="0" y="170" class="dg-s">certification evidence. Flexibility means the</text>
  <text x="0" y="184" class="dg-s">team can change its mind next Tuesday.</text>
  <text x="640" y="136" text-anchor="end" class="dg-t">Stops because it freezes too early</text>
  <text x="640" y="156" text-anchor="end" class="dg-s">Physics modelled once, in a document that</text>
  <text x="640" y="170" text-anchor="end" class="dg-s">ages. Software waits for hardware. Runtime</text>
  <text x="640" y="184" text-anchor="end" class="dg-s">variability is not contemplated at all.</text>
</svg>
<figcaption>Both arrows are travelling toward the same middle and neither one arrives. That middle is the entire problem space of a cyber-physical adaptive system.</figcaption>
</figure>

## Five dimensions where the two methods split

Laid out side by side, the failures are not random. Each method fails on the exact dimension the other handles, which is what makes "just combine them" so tempting and so unhelpful.

| Critical dimension | Traditional agile | Traditional rigid |
| --- | --- | --- |
| Real time and physics | Does not model latencies or physical limits | Models them, frozen in the opening document |
| Hardware and software co-design | Assumes the environment already exists | Sequential: software waits for the board |
| Runtime adaptation | Flexibility means changing requirements at the next meeting | Runtime variability is not contemplated |
| Safety and certification | Minimal documentation, the safety case does not exist | Certification as a closing phase, late and expensive |
| Cost of an error | Cheap, you revert a deploy | High, and that is why the whole cycle goes slow |

The last row explains the other four. Agile's speed is downstream of cheap mistakes: you can ship on Tuesday and revert on Wednesday because reverting costs a deploy. Waterfall's caution is downstream of expensive ones. Put software in charge of something heavy and errors become expensive again, so agile's economics stop holding. But make that software adapt at runtime and the specification cannot be frozen, so waterfall's economics stop holding too.

You end up needing a method that is cheap to iterate and rigorous about physical risk. Neither tradition offers both because neither ever had to.

## Four things a CPAS method has to do differently

The proposal I ended up defending is not a blend of the two. It is four commitments, each of which contradicts current practice in a specific way.

**Simulate first, instead of writing documents nobody executes.** Digital twins and SysML models let code be tested in a virtual environment, software-in-the-loop, before the hardware exists. The status quo is one of two failure modes: no documentation at all, or hundreds of pages of PDF that no pipeline ever runs. An executable model is documentation that fails a build when it stops being true.

**Co-design in parallel, for real.** Mechatronics, control and software advance simultaneously against validated simulators, under agreed maximum latencies. Today the honest description of most projects is that nobody writes control code until the board arrives, and then everything is late at once.

**Put the flexibility in the runtime, not in the meeting.** This is the one that separates a CPAS method from a normal one. The code is designed from the start to reconfigure itself when a sensor degrades or the environment changes unpredictably. In current practice, "we are flexible" means the team can change plan, which is a property of the organisation, not of the system. A system that needs a sprint planning session to adapt is not adaptive.

**Manage physical risk as a continuous metric.** Hardware-in-the-loop runs and the safety case are tracked continuously as part of the maturity of the system, not produced as a closing formality. The alternative is what everyone has watched happen: certification discovered late, and a redesign that costs more than the feature did.

## Why the answer had to be a process model

I resisted this conclusion for a while, because "the answer is a new methodology" is usually a bad smell.

What changed my mind is that the four commitments above are not technology. Digital twins exist. Simulation-in-the-loop exists. Runtime reconfiguration exists and ships in production. Safety cases are a mature practice with standards behind them.

What does not exist is an accepted answer to who does which of those, in what order, with what artifacts, and how a team knows a stage is finished. The literature is generous with guidance on designing adaptive cyber-physical systems and nearly silent on developing them. That is not a research gap you close by discovering something. It is a gap you close by deciding, writing it down, and being specific enough that a team can follow it on a Monday.
`,"../content/blog/agile-waterfall-cyber-physical.es.md":`---
title: Ágil y cascada fallan los dos en sistemas ciberfísicos, por extremos opuestos
date: 2026-08-13
summary: Un método ignora la física. El otro no absorbe incertidumbre. Ninguna de las dos brechas se arregla ajustando ceremonias, y por eso la respuesta es otro modelo de procesos.
tags: ciberfísicos, proceso
---

Pregunta cómo debería un equipo construir un sistema donde el software controla equipo físico y adapta su propio comportamiento en tiempo de ejecución, y obtienes una de dos respuestas. Corre Scrum. O corre un V-model, por seguridad.

Las dos se dan de buena fe y las dos están equivocadas, de formas que resultan ser espejos exactos una de la otra. Entender por qué es lo que justifica proponer otro modelo de procesos en lugar de ajustar uno existente.

<figure>
<svg viewBox="0 0 640 214" role="img" aria-label="Métodos ágiles y rígidos acercándose desde extremos opuestos y quedándose cortos los dos frente a lo que necesita un sistema ciberfísico adaptativo">
  <defs>
    <marker id="gp-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="34" width="188" height="50" rx="8" class="dg-node"/>
  <text x="94" y="56" text-anchor="middle" class="dg-t">Ágil tradicional</text>
  <text x="94" y="72" text-anchor="middle" class="dg-s">Scrum, Kanban, XP</text>
  <path d="M192 59 H236" class="dg-flow" marker-end="url(#gp-head)"/>
  <rect x="452" y="34" width="188" height="50" rx="8" class="dg-node"/>
  <text x="546" y="56" text-anchor="middle" class="dg-t">Rígido tradicional</text>
  <text x="546" y="72" text-anchor="middle" class="dg-s">Waterfall, V-model</text>
  <path d="M448 59 H404" class="dg-flow" marker-end="url(#gp-head)"/>
  <rect x="244" y="14" width="152" height="90" rx="8" class="dg-plate"/>
  <text x="320" y="38" text-anchor="middle" class="dg-m">EL HUECO</text>
  <text x="320" y="58" text-anchor="middle" class="dg-s">física en tiempo real</text>
  <text x="320" y="74" text-anchor="middle" class="dg-s">adaptación en runtime</text>
  <text x="320" y="90" text-anchor="middle" class="dg-s">un safety case vivo</text>
  <text x="0" y="136" class="dg-t">Se detiene porque ignora lo físico</text>
  <text x="0" y="156" class="dg-s">Sin presupuestos de latencia, sin límites</text>
  <text x="0" y="170" class="dg-s">de actuador, sin evidencia de certificación.</text>
  <text x="0" y="184" class="dg-s">Flexible = el equipo cambia de opinión.</text>
  <text x="640" y="136" text-anchor="end" class="dg-t">Se detiene porque congela muy pronto</text>
  <text x="640" y="156" text-anchor="end" class="dg-s">La física se modela una vez y el documento</text>
  <text x="640" y="170" text-anchor="end" class="dg-s">envejece. El software espera al hardware.</text>
  <text x="640" y="184" text-anchor="end" class="dg-s">La variabilidad en runtime no se contempla.</text>
</svg>
<figcaption>Las dos flechas viajan hacia el mismo centro y ninguna llega. Ese centro es todo el espacio de problema de un sistema ciberfísico adaptativo.</figcaption>
</figure>

## Cinco dimensiones donde los dos métodos se separan

Puestas lado a lado, las fallas no son al azar. Cada método falla exactamente en la dimensión que el otro maneja, que es lo que hace tan tentador y tan poco útil el "combinémoslos".

| Dimensión crítica | Ágil tradicional | Rígido tradicional |
| --- | --- | --- |
| Tiempo real y física | No modela latencias ni límites físicos | Los modela, congelados en el documento inicial |
| Co-diseño hardware y software | Asume que el entorno ya existe | Secuencial: el software espera a la placa |
| Adaptación en ejecución | Flexibilidad es cambiar requisitos en la próxima reunión | No contempla variabilidad en runtime |
| Seguridad y certificación | Documentación mínima, el safety case no existe | Certificación como fase de cierre, tardía y cara |
| Coste del error | Barato, se revierte un deploy | Alto, y por eso el ciclo completo se vuelve lento |

La última fila explica las otras cuatro. La velocidad de ágil viene de que los errores son baratos: puedes publicar el martes y revertir el miércoles porque revertir cuesta un deploy. La cautela de cascada viene de que son caros. Pon al software a cargo de algo pesado y los errores vuelven a ser caros, así que la economía de ágil deja de sostenerse. Pero haz que ese software se adapte en tiempo de ejecución y la especificación no se puede congelar, así que la economía de cascada tampoco.

Terminas necesitando un método que sea barato de iterar y riguroso con el riesgo físico. Ninguna de las dos tradiciones ofrece ambas porque ninguna tuvo que hacerlo.

## Cuatro cosas que un método CPAS tiene que hacer distinto

La propuesta que terminé defendiendo no es una mezcla de las dos. Son cuatro compromisos, y cada uno contradice la práctica actual de una forma concreta.

**Simular primero, en lugar de escribir documentos que nadie ejecuta.** Los gemelos digitales y los modelos SysML permiten probar el código en un entorno virtual, software-in-the-loop, antes de que exista el hardware. El estado actual es uno de dos modos de falla: no hay documentación, o hay cientos de páginas de PDF que ningún pipeline corre nunca. Un modelo ejecutable es documentación que rompe un build cuando deja de ser cierta.

**Co-diseñar en paralelo, de verdad.** Mecatrónica, control y software avanzan a la vez contra simuladores validados, bajo latencias máximas acordadas. Hoy la descripción honesta de la mayoría de los proyectos es que nadie escribe código de control hasta que llega la placa, y después todo llega tarde al mismo tiempo.

**Poner la flexibilidad en el runtime, no en la reunión.** Este es el que separa un método CPAS de uno normal. El código nace diseñado para reconfigurarse solo cuando un sensor se degrada o el entorno cambia de forma impredecible. En la práctica actual, "somos flexibles" significa que el equipo puede cambiar de plan, que es una propiedad de la organización, no del sistema. Un sistema que necesita una reunión de planificación para adaptarse no es adaptativo.

**Gestionar el riesgo físico como métrica continua.** Las corridas de hardware-in-the-loop y el safety case se llevan de forma continua como parte de la madurez del sistema, no se producen como trámite de cierre. La alternativa es lo que todos hemos visto pasar: la certificación se descubre tarde, y el rediseño cuesta más que la feature.

## Por qué la respuesta tenía que ser un modelo de procesos

Me resistí a esta conclusión un buen rato, porque "la respuesta es una metodología nueva" suele oler mal.

Lo que me hizo cambiar de opinión es que los cuatro compromisos de arriba no son tecnología. Los gemelos digitales existen. La simulación en el lazo existe. La reconfiguración en tiempo de ejecución existe y está en producción. Los safety cases son una práctica madura con estándares detrás.

Lo que no existe es una respuesta aceptada a quién hace cuál de esas cosas, en qué orden, con qué artefactos, y cómo sabe un equipo que una etapa terminó. La literatura es generosa en guías para diseñar sistemas ciberfísicos adaptativos y casi muda sobre desarrollarlos. Esa no es una brecha de investigación que se cierre descubriendo algo. Es una brecha que se cierra decidiendo, dejándolo escrito, y siendo lo bastante concreto como para que un equipo lo pueda seguir un lunes.
`,"../content/blog/boring-releases.en.md":`---
title: The best mobile release is the one nobody notices
date: 2026-06-05
summary: Ten years of App Store submissions taught me that release quality is a process property, not a testing phase.
tags: process, mobile
---

Web teams ship a bad deploy and roll it back in four minutes. Mobile teams ship a bad build and wait a day and a half for review, while the crash rate graph does something upsetting in front of the whole company. Every release habit worth having comes from that asymmetry.

## Cut the branch on a schedule, not when the work is done

If the release date moves because a feature isn't ready, then every feature is now negotiating with the release, and the release always loses. Pick a day. Cut the branch on that day. Whatever is merged and behind a flag goes out, whatever isn't waits for the next one. This sounds rigid until the first time a stakeholder asks to "just squeeze this in" and the answer is a date rather than an argument.

## Feature flags are how you get to roll back

You cannot un-ship a binary. You can turn something off inside a binary you already shipped. That's the entire reason flags earn their complexity on mobile, and it's why the flag has to be checked at the point of use rather than read once at launch:

\`\`\`ts
// A user who launched the app before you flipped the kill switch
// keeps the broken screen for their whole session.
const showNewCheckout = flags.get('new-checkout')

// Reads current state, so the kill switch actually kills.
function Checkout() {
  const showNew = useFlag('new-checkout')
  return showNew ? <NewCheckout /> : <LegacyCheckout />
}
\`\`\`

Every flag needs a removal ticket filed the day it's created. A flag left in for two years isn't a flag, it's a branch in your codebase that nobody has the confidence to delete.

## Staged rollout is not optional and 1% is not enough

Both stores let you release to a fraction of users. Use it, but be honest about the arithmetic: 1% of a small user base is a sample too small to show you anything before you've already gone to 100%. I'd rather do 10% for 24 hours and actually see the crash-free rate move than 1% for an hour and call it a canary.

Know which number aborts the rollout, and know it before you start. "Crash-free sessions below 99.5%, we halt" is a decision. "We'll watch it and see" is how you find out on Monday.

## Version the build, not the sprint

Put the commit SHA in a settings screen where support can read it out loud. When a user reports something impossible, the first question is which build, and "the latest one" is never true. This costs an afternoon once and saves you every time.

## The part that's cultural

None of the above works if a release is an event. If shipping requires three people to stay late, you will ship less often, each release will carry more change, and each release will be riskier, which makes the next one an even bigger event. The way out is boring: ship smaller things more often until it stops being interesting.
`,"../content/blog/boring-releases.es.md":`---
title: El mejor release mobile es el que nadie nota
date: 2026-06-05
summary: Diez años enviando builds a las tiendas me enseñaron que la calidad de un release es una propiedad del proceso, no una fase de pruebas.
tags: proceso, mobile
---

Un equipo web despliega mal y hace rollback en cuatro minutos. Un equipo mobile publica un build malo y espera día y medio a que lo revisen, mientras la gráfica de crashes hace algo perturbador delante de toda la empresa. Cada hábito de release que vale la pena tener sale de esa asimetría.

## Corta la rama por calendario, no cuando el trabajo esté listo

Si la fecha del release se mueve porque una feature no está lista, entonces todas las features están negociando con el release, y el release siempre pierde. Elige un día. Corta la rama ese día. Lo que esté mergeado y detrás de un flag sale, lo que no espera al siguiente. Suena rígido hasta la primera vez que alguien pide "meter esto rapidito" y la respuesta es una fecha en lugar de una discusión.

## Los feature flags son cómo consigues hacer rollback

No puedes des-publicar un binario. Sí puedes apagar algo dentro de un binario que ya publicaste. Esa es toda la razón por la que los flags se ganan su complejidad en mobile, y por eso el flag tiene que leerse en el punto de uso y no una sola vez al arrancar:

\`\`\`ts
// Alguien que abrió la app antes de que apagaras el kill switch
// se queda con la pantalla rota toda la sesión.
const showNewCheckout = flags.get('new-checkout')

// Lee el estado actual, así el kill switch de verdad mata.
function Checkout() {
  const showNew = useFlag('new-checkout')
  return showNew ? <NewCheckout /> : <LegacyCheckout />
}
\`\`\`

Cada flag necesita un ticket de remoción creado el mismo día que el flag. Un flag que lleva dos años ahí no es un flag, es una rama en tu código que nadie tiene la confianza de borrar.

## El rollout escalonado no es opcional y 1% no alcanza

Las dos tiendas te dejan publicar a una fracción de usuarios. Úsalo, pero sé honesto con la aritmética: 1% de una base pequeña es una muestra demasiado chica para mostrarte algo antes de que ya estés en 100%. Prefiero 10% durante 24 horas y ver de verdad cómo se mueve la tasa de sesiones sin crash, que 1% por una hora y llamarlo canary.

Ten claro qué número aborta el rollout, y tenlo claro antes de empezar. "Sesiones sin crash por debajo de 99.5%, paramos" es una decisión. "Lo vamos mirando" es cómo te enteras el lunes.

## Versiona el build, no el sprint

Pon el SHA del commit en una pantalla de ajustes donde soporte pueda leerlo en voz alta. Cuando un usuario reporta algo imposible, la primera pregunta es qué build, y "la última" nunca es cierto. Esto cuesta una tarde una sola vez y te salva siempre.

## La parte que es cultural

Nada de lo anterior funciona si un release es un evento. Si publicar requiere que tres personas se queden hasta tarde, vas a publicar menos seguido, cada release va a cargar más cambios, y cada release va a ser más riesgoso, lo que convierte al siguiente en un evento todavía más grande. La salida es aburrida: publica cosas más chicas más seguido hasta que deje de ser interesante.
`,"../content/blog/flatlist-jank.en.md":`---
title: Your FlatList isn't slow, your renderItem is
date: 2026-04-18
summary: Most React Native list jank comes from three habits in renderItem, and none of them are fixed by tuning windowSize.
tags: react-native, performance
---

Every few months someone hands me a screen that scrolls at 40fps on a mid-range Android and asks which \`FlatList\` prop will fix it. The answer is usually none of them. \`windowSize\`, \`initialNumToRender\` and \`maxToRenderPerBatch\` change *how many* rows you render. They do nothing about how expensive each row is, and an expensive row is what you almost always have.

Here is the order I check things in.

## 1. Is \`renderItem\` allocating a new component type?

This is the one that hurts most and looks most innocent:

\`\`\`tsx
<FlatList
  data={orders}
  renderItem={({ item }) => {
    const Row = () => <OrderCard order={item} />   // new type, every render
    return <Row />
  }}
/>
\`\`\`

A component *type* declared inside a render function is a different type on every pass, so React unmounts and remounts the whole subtree instead of updating it. You lose all local state, all memoisation, and you pay full mount cost per row per scroll frame. The fix is to not do it: declare the component at module scope and call it.

The subtler version of the same bug is passing an inline object or arrow as a prop to a memoised row:

\`\`\`tsx
renderItem={({ item }) => (
  <OrderCard order={item} style={{ padding: 12 }} onPress={() => open(item.id)} />
)}
\`\`\`

\`OrderCard\` can be wrapped in \`React.memo\` all you like. \`style\` and \`onPress\` are new references each time, the props comparison fails, and it re-renders anyway. Hoist the style into a \`StyleSheet\` and make the press handler take the id from the row itself.

## 2. Does the row know its own height?

Without \`getItemLayout\`, the list measures every row on the native side before it can position it. For fixed-height rows you are throwing away free information:

\`\`\`tsx
const ROW_HEIGHT = 72

getItemLayout={(_, index) => ({
  length: ROW_HEIGHT,
  offset: ROW_HEIGHT * index,
  index,
})}
\`\`\`

This also fixes the "scroll to index lands in the wrong place" bug, which is the same missing measurement showing up somewhere else.

If your rows genuinely vary in height, don't fake it with an average. Give the row a stable minimum height so layout doesn't reflow when the image loads, and accept the measurement pass.

## 3. What is happening on the JS thread while you scroll?

Open the profiler and watch the JS thread during a fling. If you see work there, scrolling was never the problem, it's just when the problem becomes visible. The usual suspects are a context provider re-rendering the list on every keystroke somewhere else in the tree, an \`onViewableItemsChanged\` handler doing analytics work synchronously, and date formatting. \`new Intl.DateTimeFormat()\` inside a row is genuinely slow on Hermes. Build the formatter once, outside the component.

## Where the New Architecture actually helps

On the New Architecture, \`FlatList\` gets faster mostly because layout is synchronous and the bridge isn't serialising your row props through JSON. It does not make an expensive component cheap. If your row does layout thrash or allocates per frame, Fabric renders that expensive row more predictably, not less expensively.

The list virtualisation in React Native is fine. It's been fine for years. Look at the row.
`,"../content/blog/flatlist-jank.es.md":`---
title: Tu FlatList no es lenta, tu renderItem sí
date: 2026-04-18
summary: Casi todo el jank de listas en React Native sale de tres hábitos en renderItem, y ninguno se arregla ajustando windowSize.
tags: react-native, rendimiento
---

Cada tantos meses alguien me pasa una pantalla que scrollea a 40fps en un Android de gama media y me pregunta qué prop de \`FlatList\` lo arregla. La respuesta casi siempre es ninguna. \`windowSize\`, \`initialNumToRender\` y \`maxToRenderPerBatch\` cambian *cuántas* filas renderizas. No hacen nada sobre lo caro que es cada fila, y una fila cara es lo que casi siempre tienes.

Este es el orden en que reviso las cosas.

## 1. ¿\`renderItem\` está creando un tipo de componente nuevo?

Este es el que más duele y el que más inocente se ve:

\`\`\`tsx
<FlatList
  data={orders}
  renderItem={({ item }) => {
    const Row = () => <OrderCard order={item} />   // tipo nuevo, en cada render
    return <Row />
  }}
/>
\`\`\`

Un *tipo* de componente declarado dentro de una función de render es un tipo distinto en cada pasada, así que React desmonta y vuelve a montar todo el subárbol en vez de actualizarlo. Pierdes el estado local, pierdes la memoización, y pagas el costo completo de montaje por fila por frame de scroll. El arreglo es no hacerlo: declara el componente a nivel de módulo y llámalo.

La versión más sutil del mismo bug es pasar un objeto o una arrow function inline como prop a una fila memoizada:

\`\`\`tsx
renderItem={({ item }) => (
  <OrderCard order={item} style={{ padding: 12 }} onPress={() => open(item.id)} />
)}
\`\`\`

Puedes envolver \`OrderCard\` en \`React.memo\` todo lo que quieras. \`style\` y \`onPress\` son referencias nuevas cada vez, la comparación de props falla, y se re-renderiza igual. Sube el estilo a un \`StyleSheet\` y haz que el handler del press tome el id desde la fila misma.

## 2. ¿La fila sabe cuánto mide?

Sin \`getItemLayout\`, la lista mide cada fila del lado nativo antes de poder posicionarla. Para filas de altura fija estás tirando información gratis:

\`\`\`tsx
const ROW_HEIGHT = 72

getItemLayout={(_, index) => ({
  length: ROW_HEIGHT,
  offset: ROW_HEIGHT * index,
  index,
})}
\`\`\`

Esto también arregla el bug de "el scroll a un índice cae en el lugar equivocado", que es la misma medición faltante apareciendo en otro lado.

Si tus filas de verdad varían de altura, no lo falsees con un promedio. Dale a la fila una altura mínima estable para que el layout no se reacomode cuando carga la imagen, y acepta la pasada de medición.

## 3. ¿Qué está pasando en el hilo de JS mientras scrolleas?

Abre el profiler y mira el hilo de JS durante un fling. Si ves trabajo ahí, el scroll nunca fue el problema, solo es cuando el problema se vuelve visible. Los sospechosos de siempre son un context provider re-renderizando la lista con cada tecla que se escribe en otra parte del árbol, un handler de \`onViewableItemsChanged\` haciendo analítica de forma síncrona, y el formateo de fechas. \`new Intl.DateTimeFormat()\` dentro de una fila es genuinamente lento en Hermes. Construye el formateador una vez, fuera del componente.

## Dónde ayuda de verdad la New Architecture

En la New Architecture, \`FlatList\` se vuelve más rápida sobre todo porque el layout es síncrono y el bridge no está serializando las props de tus filas a JSON. No hace barato un componente caro. Si tu fila hace layout thrash o asigna memoria por frame, Fabric renderiza esa fila cara de forma más predecible, no menos costosa.

La virtualización de listas en React Native está bien. Lleva años estando bien. Mira la fila.
`,"../content/blog/hiring-mobile-engineers.en.md":`---
title: What I look for when I interview a mobile engineer
date: 2026-07-21
summary: I stopped asking about the event loop. These four questions tell me more in ten minutes than a whiteboard does in an hour.
tags: career, hiring
---

I've been on both sides of enough mobile interviews to know that most of them measure interview practice. Here's what I ask instead, and what the answers tell me.

## "Walk me through the last bug that took you more than a day."

Not the hardest bug, the last one. Hard-bug stories get rehearsed. The last one is still messy, and the mess is the useful part: how they narrowed it down, what they ruled out and why, whether they went looking for the root cause or stopped at the symptom that made the ticket go away.

The answer I like is unglamorous. Something like "I couldn't reproduce it on my device so I checked what was different about the reporters' devices." The answer that worries me is a fix with no diagnosis attached.

## "This screen re-renders on every keystroke somewhere else in the app. Where do you look?"

A real problem with a real shape. I'm not after a specific answer, I'm after whether they reason about the tree or reach for a tool. Both are fine. Reaching for \`React.memo\` on every component without knowing which one is re-rendering is not fine, and it's common enough that this question earns its slot.

## "What did you have to ship that you disagreed with?"

Senior work happens inside constraints, and most of the constraints aren't technical. I want to hear that they made the case, lost, shipped it well anyway, and can still describe the tradeoff accurately. Someone who has never disagreed with a decision hasn't been close enough to one. Someone who is still angry about a decision from three jobs ago will be angry about mine.

## "What's in your app that you'd delete if nobody would notice?"

This tells me whether they read the codebase they work in or only the parts they were assigned. Engineers who know where the dead abstractions are have been paying attention, and the specificity is impossible to fake.

## What I've stopped asking

Anything with a right answer I could look up. Trivia about the JS event loop, the difference between two lifecycle methods that were deprecated years ago, reverse a linked list. None of it predicted anything about how someone worked once they joined. The candidates who did well on that material and the candidates who did well on the job were different sets of people.

## The thing that isn't a question

Give them the actual codebase for an hour, or something shaped like it, and pair on a small real change. It's the only part of the process that tests the job. It's also the only part where the candidate learns something true about working with you, which matters more than most hiring processes admit.
`,"../content/blog/hiring-mobile-engineers.es.md":`---
title: Qué busco cuando entrevisto a un ingeniero mobile
date: 2026-07-21
summary: Dejé de preguntar por el event loop. Estas cuatro preguntas me dicen más en diez minutos que un whiteboard en una hora.
tags: carrera, contratación
---

He estado en los dos lados de suficientes entrevistas mobile para saber que la mayoría mide práctica de entrevistas. Esto es lo que pregunto en su lugar, y lo que me dicen las respuestas.

## "Cuéntame el último bug que te tomó más de un día."

No el más difícil, el último. Las historias del bug más difícil vienen ensayadas. La última todavía está desordenada, y el desorden es la parte útil: cómo lo acotaron, qué descartaron y por qué, si fueron a buscar la causa raíz o se detuvieron en el síntoma que hizo desaparecer el ticket.

La respuesta que me gusta no tiene nada de glamorosa. Algo como "no lo podía reproducir en mi dispositivo, así que revisé qué tenían distinto los dispositivos de quienes lo reportaron". La respuesta que me preocupa es un fix sin diagnóstico.

## "Esta pantalla se re-renderiza con cada tecla que se escribe en otra parte de la app. ¿Dónde buscas?"

Un problema real con forma real. No busco una respuesta específica, busco si razonan sobre el árbol de componentes o si van directo a una herramienta. Ambas están bien. Poner \`React.memo\` en todos los componentes sin saber cuál se está re-renderizando no está bien, y es lo bastante común como para que la pregunta se gane su lugar.

## "¿Qué tuviste que entregar estando en desacuerdo?"

El trabajo senior pasa dentro de restricciones, y la mayoría no son técnicas. Quiero escuchar que expusieron su argumento, perdieron, lo entregaron bien de todas formas, y todavía pueden describir el tradeoff con precisión. Alguien que nunca estuvo en desacuerdo con una decisión no estuvo lo bastante cerca de una. Alguien que sigue molesto por una decisión de hace tres trabajos va a estar molesto con las mías.

## "¿Qué borrarías de tu app si nadie lo fuera a notar?"

Esto me dice si leen el código en el que trabajan o solo las partes que les asignaron. Quien sabe dónde están las abstracciones muertas ha estado prestando atención, y ese nivel de detalle es imposible de inventar.

## Lo que dejé de preguntar

Cualquier cosa con una respuesta correcta que yo podría buscar. Trivia del event loop, la diferencia entre dos métodos de ciclo de vida deprecados hace años, invertir una lista enlazada. Nada de eso predijo cómo trabajaba alguien después de entrar. Los candidatos que respondían bien ese material y los que trabajaban bien en el puesto eran conjuntos distintos de personas.

## La parte que no es una pregunta

Dales el código real por una hora, o algo con esa forma, y hagan pair en un cambio pequeño de verdad. Es la única parte del proceso que evalúa el trabajo. También es la única parte donde el candidato aprende algo cierto sobre trabajar contigo, que importa más de lo que la mayoría de los procesos admite.
`,"../content/blog/iot-cps-cpas.en.md":`---
title: IoT measures, a CPS acts, a CPAS rewrites how it acts
date: 2026-07-30
summary: The three get used interchangeably and they are not the same system. The difference is where the value ends, and it decides your whole architecture.
tags: cyber-physical, architecture
---

I spent a few weeks researching cyber-physical adaptive systems for a methodology proposal, and the single most useful hour was the one where the vocabulary stopped being a synonym pile. Vendors, papers and job posts use IoT, CPS and CPAS as if they were the same thing with different amounts of marketing. They describe three architectures with three different failure modes.

The distinction that holds up is not about sensors or protocols. It is about where the value of the system ends.

<figure>
<svg viewBox="0 0 640 258" role="img" aria-label="Three lanes comparing where value ends in IoT, CPS and CPAS systems">
  <defs>
    <marker id="ic-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="ic-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <text x="0" y="40" class="dg-m">IOT</text>
  <rect x="76" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="128" y="41" text-anchor="middle" class="dg-t">Measure</text>
  <path d="M182 36 H200" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="204" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="256" y="41" text-anchor="middle" class="dg-t">Transmit</text>
  <path d="M310 36 H328" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="332" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="384" y="41" text-anchor="middle" class="dg-t">Report</text>
  <text x="456" y="32" class="dg-s">Value ends in the data:</text>
  <text x="456" y="46" class="dg-s">a dashboard, an alert.</text>
  <text x="0" y="116" class="dg-m">CPS</text>
  <rect x="76" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="128" y="117" text-anchor="middle" class="dg-t">Measure</text>
  <path d="M182 112 H200" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="204" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="256" y="117" text-anchor="middle" class="dg-t">Decide</text>
  <path d="M310 112 H328" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="332" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="384" y="117" text-anchor="middle" class="dg-t">Actuate</text>
  <text x="456" y="108" class="dg-s">Value ends in the world:</text>
  <text x="456" y="122" class="dg-s">a valve moves.</text>
  <text x="0" y="196" class="dg-m">CPAS</text>
  <rect x="76" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="128" y="197" text-anchor="middle" class="dg-t">Measure</text>
  <path d="M182 192 H200" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <rect x="204" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="256" y="197" text-anchor="middle" class="dg-t">Decide</text>
  <path d="M310 192 H328" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <rect x="332" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="384" y="197" text-anchor="middle" class="dg-t">Actuate</text>
  <path d="M384 211 V234 H256 V216" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <text x="320" y="250" text-anchor="middle" class="dg-m">THE DECIDE STEP REWRITES ITSELF AT RUNTIME</text>
  <text x="456" y="188" class="dg-s">Value ends in a system</text>
  <text x="456" y="202" class="dg-s">that changed itself.</text>
</svg>
<figcaption>The same three boxes. What differs is whether anything comes back, and whether what comes back is data or a new decision rule.</figcaption>
</figure>

An IoT deployment measures, transmits and reports. Its output is telemetry, and a human or a fixed rule decides what to do with it. A cyber-physical system closes the loop: sensors capture temperature or pressure or movement, algorithms pick a response given goals and constraints, actuators change the physical process, and the system measures the result to adjust on the next pass. Its output is a movement.

A cyber-physical adaptive system adds one condition, and it is the expensive one. The decision logic itself changes at runtime, without recompiling and without redeploying. The system is not executing a policy someone shipped. It is executing a policy it currently holds, which may not be the one that was installed.

## Each generation solved something and left something

Reading the field chronologically is more useful than reading it by vendor, because every stage is a direct answer to what the previous one could not do.

| Stage | Dominant approach | What it left open |
| --- | --- | --- |
| Classic embedded | Deterministic control, monolithic firmware | Closed. It does not evolve. |
| IoT, the 2010s | Connectivity and cloud, telemetry | Connecting is not adapting. Silos per vendor. |
| CPS | Joint modelling of the physical and the computational | Integration complexity |
| Self-adaptive CPS | Software control loops, MAPE-K, autonomic computing | Hard to verify, hard to guarantee |
| Current frontier | Learned adaptation, digital twins, LLMs in the decision loop | Explainability, safety, non-determinism |

That last row is the one worth staring at. The capability is here. Adaptation driven by learning works, ships, and is in production in several industries. What is missing is not the mechanism. It is any accepted way to verify what it will do, or to explain what it just did.

## Four gaps, and only one of them is a research problem

Across the current work, four things are consistently missing, and it is worth separating them because they do not have the same kind of answer.

Commercial ecosystems are reactive rather than adaptive. A smart home that runs "if motion, then light" is automating a rule a human wrote. Nothing in it learns, and calling it adaptive is a category error that quietly sets expectations no product meets.

When behaviour genuinely does change, the user gets no answer to why. Adaptation without explanation is indistinguishable from a bug, and users treat it as one. This is the research problem of the four, and it is not close to solved.

There is design guidance for adaptive CPS and almost nothing on how to develop one in a disciplined way. Plenty of papers describe what the architecture should look like. Very few describe who does what, in which order, with which artifacts, and how you know a stage is done. That gap is a methodology gap, not a technology gap, which means it can be closed by deciding rather than by discovering.

And the domain logic ends up welded to the hardware protocol. The rule that says when a pump should slow down lives inside the code that speaks Modbus to the pump. Change the pump, rewrite the rule. This one is the most ordinary and the most fixable: it is the same coupling problem application developers solved years ago with ports and adapters, applied to a boundary that happens to be physical.

## Why the distinction is not academic

If you are building the IoT version, your risk is data loss and your hardest question is fleet management.

If you are building the CPS version, your risk is that a wrong decision moves something heavy, and your hardest question is verification of a fixed policy.

If you are building the CPAS version, your risk is that the policy you verified is not the policy running right now, and your hardest question is how to bound what the system is allowed to become. That is a different job. Runtime assurance, safe envelopes and contracts that constrain the adaptation stop being nice architecture and start being the thing that keeps the system certifiable.

Three words, three risk models. Picking the wrong one at the start means the whole verification strategy is aimed at a system you are not building.
`,"../content/blog/iot-cps-cpas.es.md":`---
title: IoT mide, un CPS actúa, un CPAS reescribe cómo actúa
date: 2026-07-30
summary: Los tres se usan como sinónimos y no son el mismo sistema. La diferencia está en dónde termina el valor, y decide toda tu arquitectura.
tags: ciberfísicos, arquitectura
---

Pasé unas semanas investigando sistemas ciberfísicos adaptativos para una propuesta de metodología, y la hora más útil fue aquella en que el vocabulario dejó de ser una pila de sinónimos. Proveedores, papers y ofertas de trabajo usan IoT, CPS y CPAS como si fueran lo mismo con distintas cantidades de marketing. Describen tres arquitecturas con tres modos de falla distintos.

La distinción que se sostiene no es sobre sensores ni protocolos. Es sobre dónde termina el valor del sistema.

<figure>
<svg viewBox="0 0 640 258" role="img" aria-label="Tres carriles que comparan dónde termina el valor en sistemas IoT, CPS y CPAS">
  <defs>
    <marker id="ic-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="ic-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <text x="0" y="40" class="dg-m">IOT</text>
  <rect x="76" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="128" y="41" text-anchor="middle" class="dg-t">Medir</text>
  <path d="M182 36 H200" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="204" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="256" y="41" text-anchor="middle" class="dg-t">Transmitir</text>
  <path d="M310 36 H328" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="332" y="19" width="104" height="34" rx="6" class="dg-node"/><text x="384" y="41" text-anchor="middle" class="dg-t">Reportar</text>
  <text x="456" y="32" class="dg-s">El valor termina en el dato:</text>
  <text x="456" y="46" class="dg-s">un dashboard, una alerta.</text>
  <text x="0" y="116" class="dg-m">CPS</text>
  <rect x="76" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="128" y="117" text-anchor="middle" class="dg-t">Medir</text>
  <path d="M182 112 H200" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="204" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="256" y="117" text-anchor="middle" class="dg-t">Decidir</text>
  <path d="M310 112 H328" class="dg-flow" marker-end="url(#ic-head)"/>
  <rect x="332" y="95" width="104" height="34" rx="6" class="dg-node"/><text x="384" y="117" text-anchor="middle" class="dg-t">Actuar</text>
  <text x="456" y="108" class="dg-s">El valor termina en el mundo:</text>
  <text x="456" y="122" class="dg-s">una válvula se mueve.</text>
  <text x="0" y="196" class="dg-m">CPAS</text>
  <rect x="76" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="128" y="197" text-anchor="middle" class="dg-t">Medir</text>
  <path d="M182 192 H200" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <rect x="204" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="256" y="197" text-anchor="middle" class="dg-t">Decidir</text>
  <path d="M310 192 H328" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <rect x="332" y="175" width="104" height="34" rx="6" class="dg-node-accent"/><text x="384" y="197" text-anchor="middle" class="dg-t">Actuar</text>
  <path d="M384 211 V234 H256 V216" class="dg-flow-accent" marker-end="url(#ic-head-a)"/>
  <text x="320" y="250" text-anchor="middle" class="dg-m">EL PASO DECIDIR SE REESCRIBE SOLO EN RUNTIME</text>
  <text x="456" y="188" class="dg-s">El valor termina en un sistema</text>
  <text x="456" y="202" class="dg-s">que se cambió a sí mismo.</text>
</svg>
<figcaption>Las mismas tres cajas. Lo que cambia es si algo regresa, y si lo que regresa es un dato o una regla de decisión nueva.</figcaption>
</figure>

Un despliegue IoT mide, transmite y reporta. Su salida es telemetría, y un humano o una regla fija decide qué hacer con ella. Un sistema ciberfísico cierra el lazo: los sensores capturan temperatura o presión o movimiento, los algoritmos eligen una respuesta según objetivos y restricciones, los actuadores cambian el proceso físico, y el sistema mide el resultado para ajustarse en la siguiente pasada. Su salida es un movimiento.

Un sistema ciberfísico adaptativo agrega una condición más, y es la cara. La lógica de decisión misma cambia en tiempo de ejecución, sin recompilar y sin redesplegar. El sistema no está ejecutando una política que alguien publicó. Está ejecutando la política que tiene ahora, que puede no ser la que se instaló.

## Cada generación resolvió algo y dejó algo

Leer el campo en orden cronológico es más útil que leerlo por proveedor, porque cada etapa es una respuesta directa a lo que la anterior no podía hacer.

| Etapa | Enfoque dominante | Lo que dejó abierto |
| --- | --- | --- |
| Embebidos clásicos | Control determinista, firmware monolítico | Cerrado. No evoluciona. |
| IoT, década de 2010 | Conectividad y nube, telemetría | Conectar no es adaptar. Silos por fabricante. |
| CPS | Modelado conjunto de lo físico y lo computacional | Complejidad de integración |
| CPS autoadaptativos | Lazos de control de software, MAPE-K, computación autonómica | Difíciles de verificar y de garantizar |
| Frontera actual | Adaptación con aprendizaje, gemelos digitales, LLM en el lazo de decisión | Explicabilidad, seguridad, no determinismo |

Esa última fila es la que vale la pena mirar fijo. La capacidad ya está aquí. La adaptación guiada por aprendizaje funciona, se publica y está en producción en varias industrias. Lo que falta no es el mecanismo. Es alguna forma aceptada de verificar qué va a hacer, o de explicar qué acaba de hacer.

## Cuatro brechas, y solo una es un problema de investigación

En el trabajo actual faltan cuatro cosas de manera consistente, y vale separarlas porque no tienen el mismo tipo de respuesta.

Los ecosistemas comerciales son reactivos antes que adaptativos. Una casa inteligente que corre "si hay movimiento, entonces luz" está automatizando una regla que escribió un humano. Nada ahí aprende, y llamarlo adaptativo es un error de categoría que fija expectativas que ningún producto cumple.

Cuando el comportamiento sí cambia de verdad, el usuario no obtiene respuesta al porqué. Una adaptación sin explicación es indistinguible de un bug, y los usuarios la tratan como tal. Este es el problema de investigación de los cuatro, y no está cerca de resolverse.

Hay guías para diseñar CPS adaptativos y casi nada sobre cómo desarrollarlos de forma disciplinada. Abundan los papers que describen cómo debería verse la arquitectura. Muy pocos describen quién hace qué, en qué orden, con qué artefactos, y cómo sabes que una etapa terminó. Esa es una brecha de metodología, no de tecnología, lo que significa que se cierra decidiendo y no descubriendo.

Y la lógica de dominio termina soldada al protocolo del hardware. La regla que dice cuándo una bomba debe bajar la velocidad vive dentro del código que le habla Modbus a esa bomba. Cambias la bomba, reescribes la regla. Esta es la más ordinaria y la más arreglable: es el mismo problema de acoplamiento que los desarrolladores de aplicaciones resolvieron hace años con puertos y adaptadores, aplicado a una frontera que resulta ser física.

## Por qué la distinción no es académica

Si estás construyendo la versión IoT, tu riesgo es perder datos y tu pregunta más difícil es la gestión de flota.

Si estás construyendo la versión CPS, tu riesgo es que una decisión equivocada mueva algo pesado, y tu pregunta más difícil es la verificación de una política fija.

Si estás construyendo la versión CPAS, tu riesgo es que la política que verificaste no sea la que está corriendo ahora, y tu pregunta más difícil es cómo acotar en qué se le permite convertirse al sistema. Ese es otro trabajo. El assurance en tiempo de ejecución, los safe envelopes y los contratos que restringen la adaptación dejan de ser arquitectura elegante y pasan a ser lo que mantiene certificable al sistema.

Tres palabras, tres modelos de riesgo. Elegir el equivocado al principio significa que toda la estrategia de verificación apunta a un sistema que no estás construyendo.
`,"../content/blog/mape-k-loop.en.md":`---
title: MAPE-K, or how to keep adaptation out of your business logic
date: 2026-08-04
summary: A self-adaptive system has two jobs running at once: doing the work, and deciding how the work should be done. MAPE-K is the pattern that stops those two from merging.
tags: cyber-physical, architecture
---

The failure mode is easy to picture. A pump controller starts as one function that reads a sensor and sets a speed. Then somebody adds a rule for when the sensor is noisy. Then a fallback for when the network is down. Then a slower profile for night hours, and an override for maintenance mode. Six months later the function that controls the pump is mostly a function that decides which pump-controlling behaviour to use, and nobody can change either without touching the other.

MAPE-K exists to prevent exactly that. Proposed by IBM in 2003 as the core of autonomic computing, it is still the reference architecture for self-adaptive systems, and the reason it survived is not sophistication. It is that it draws one line: the logic that does the work and the logic that adapts the work are separate components, and they meet only through shared knowledge.

<figure>
<svg viewBox="0 -14 640 296" role="img" aria-label="The MAPE-K loop reading and writing shared Knowledge, acting on a managed physical system, and validating plans against a digital twin">
  <defs>
    <marker id="mk-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="mk-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="32" width="118" height="214" rx="8" class="dg-node"/>
  <text x="59" y="126" text-anchor="middle" class="dg-t">Knowledge</text>
  <text x="59" y="144" text-anchor="middle" class="dg-s">models, goals,</text>
  <text x="59" y="158" text-anchor="middle" class="dg-s">history</text>
  <rect x="142" y="8" width="250" height="262" rx="10" class="dg-plate"/>
  <text x="142" y="-3" class="dg-m">MANAGING SYSTEM</text>
  <rect x="162" y="32" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="52" class="dg-t">Monitor</text>
  <text x="178" y="67" class="dg-s">sensors, connectivity, load</text>
  <rect x="162" y="90" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="110" class="dg-t">Analyze</text>
  <text x="178" y="125" class="dg-s">state against quality goals</text>
  <rect x="162" y="148" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="168" class="dg-t">Plan</text>
  <text x="178" y="183" class="dg-s">a strategy, under deadline</text>
  <rect x="162" y="206" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="226" class="dg-t">Execute</text>
  <text x="178" y="241" class="dg-s">without stopping the system</text>
  <path d="M267 78 V86" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M267 136 V144" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M267 194 V202" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M120 54 H158" class="dg-flow-dashed"/>
  <path d="M120 112 H158" class="dg-flow-dashed"/>
  <path d="M120 170 H158" class="dg-flow-dashed"/>
  <path d="M120 228 H158" class="dg-flow-dashed"/>
  <text x="59" y="180" text-anchor="middle" class="dg-m">SHARED BY</text>
  <text x="59" y="192" text-anchor="middle" class="dg-m">ALL FOUR</text>
  <rect x="430" y="32" width="210" height="86" rx="8" class="dg-node"/>
  <text x="446" y="60" class="dg-t">Managed system</text>
  <text x="446" y="78" class="dg-s">the pump, the vehicle,</text>
  <text x="446" y="92" class="dg-s">the production cell. Never</text>
  <text x="446" y="106" class="dg-s">stops doing its own job.</text>
  <rect x="430" y="160" width="210" height="86" rx="8" class="dg-node-warn"/>
  <text x="446" y="188" class="dg-t">Digital twin</text>
  <text x="446" y="206" class="dg-s">an executable replica.</text>
  <text x="446" y="220" class="dg-s">The plan runs here before</text>
  <text x="446" y="234" class="dg-s">it runs on the metal.</text>
  <path d="M426 62 H404 V54 H378" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <text x="398" y="40" text-anchor="middle" class="dg-m">READS</text>
  <path d="M376 228 H414 V100 H426" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <text x="420" y="140" class="dg-m">ACTS</text>
  <path d="M376 170 H396 V200 H426" class="dg-flow" marker-end="url(#mk-head)"/>
  <text x="382" y="196" class="dg-m">SIMULATE</text>
</svg>
<figcaption>Four stages in order, one Knowledge every stage reads and writes, and a managed system that never stops running. The plan reaches the twin before it reaches the equipment.</figcaption>
</figure>

## The four stages are not four functions

Written out, MAPE-K sounds like a pipeline anyone would have invented: monitor, analyze, plan, execute. What makes it worth naming is that each stage has a distinct input, a distinct failure, and a distinct owner in a real team.

Monitor collects runtime state from the physical side: temperature, vibration, network connectivity, workload. Its failure is sampling that is too slow or too coarse to see the thing you are adapting to, and it is usually owned by whoever owns the hardware.

Analyze compares that state against defined quality goals, which is the stage most projects skip and later regret. Availability, safety and performance have to be written down as thresholds before this stage can exist at all. Without them, Analyze degrades into a pile of if-statements that encode goals nobody agreed on.

Plan produces a concrete strategy: reconfigure an industrial workflow, recalculate a route, drop to a degraded mode. In a cyber-physical setting it plans under hard time constraints, which rules out a lot of otherwise attractive search techniques.

Execute applies the change through the actuators while the system keeps operating. Not on restart, not in a maintenance window. That constraint is what makes Execute hard, and it is why the split matters: the managed system must be built so that its behaviour can be swapped underneath it.

Knowledge is the shared model all four read and write. Goals, current beliefs, history of past adaptations.

## The twin is the safety mechanism

In a normal software system the Plan stage can be optimistic, because a bad plan gets rolled back. In a cyber-physical one a bad plan moves several tonnes of something.

That is the reason a digital twin usually attaches to Knowledge rather than being a separate initiative. An executable replica of the physical system lets the loop simulate the adaptation and check it before it goes anywhere near the equipment. It converts an unbounded runtime risk into a bounded simulation cost, which is the only version of this that certifies.

The corollary is that the twin has to be maintained as part of the loop, not as a demo. A twin that drifts from the plant is worse than no twin, because it grants confidence it has not earned.

## One loop is the exception, not the rule

The textbook drawing shows a single central loop, and cyber-physical systems mostly cannot have one. Connectivity is intermittent, latency budgets are tight, and a controller that must reach a central brain to react is a controller that fails when the link does.

So decentralised MAPE-K is the normal shape: several loops, each local to a subsystem, coordinating with each other. They can share only the Monitor stage, or share Knowledge, or run fully independently with negotiated contracts at the edges. Choosing which pattern you are using is an architectural decision worth making explicitly and writing down, because the patterns differ in what they guarantee when a link drops, and that is the exact moment anyone will care.

## Where this meets ordinary application architecture

The fourth gap I keep running into in this field is that the domain rule gets welded to the hardware protocol. The logic that says a pump should slow down ends up inside the code that speaks Modbus to that specific pump.

MAPE-K does not fix that by itself. Hexagonal architecture does, and the two compose well: the loop is domain logic, the sensors and actuators sit behind ports, and the adapters are whatever hardware happens to be installed today.

<figure>
<svg viewBox="0 0 640 168" role="img" aria-label="The adaptation loop talking to a port, with three interchangeable adapters behind it">
  <defs>
    <marker id="hx-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="56" width="150" height="56" rx="8" class="dg-node-accent"/>
  <text x="75" y="80" text-anchor="middle" class="dg-t">MAPE-K loop</text>
  <text x="75" y="96" text-anchor="middle" class="dg-s">pure domain logic</text>
  <path d="M154 84 H206" class="dg-flow" marker-end="url(#hx-head)"/>
  <rect x="210" y="46" width="120" height="76" rx="8" class="dg-plate"/>
  <text x="270" y="78" text-anchor="middle" class="dg-t">Actuator port</text>
  <text x="270" y="94" text-anchor="middle" class="dg-s">an interface</text>
  <path d="M334 84 H384" class="dg-flow" marker-end="url(#hx-head)"/>
  <rect x="388" y="10" width="200" height="38" rx="6" class="dg-node"/>
  <text x="404" y="34" class="dg-t">Modbus adapter</text>
  <rect x="388" y="65" width="200" height="38" rx="6" class="dg-node"/>
  <text x="404" y="89" class="dg-t">Simulator adapter</text>
  <rect x="388" y="120" width="200" height="38" rx="6" class="dg-node-warn"/>
  <text x="404" y="144" class="dg-t">Digital twin adapter</text>
  <path d="M370 29 V139" class="dg-flow"/>
  <path d="M370 29 H382" class="dg-flow" marker-end="url(#hx-head)"/>
  <path d="M370 139 H382" class="dg-flow" marker-end="url(#hx-head)"/>
</svg>
<figcaption>Same loop, three destinations. Testing against the simulator and validating against the twin stop being separate builds and become a swapped adapter.</figcaption>
</figure>

The payoff is not elegance. It is that "test the adaptation logic" stops requiring hardware, and "validate against the twin before deploying" stops being a manual step somebody remembers. Both become the same call against a different adapter, which is the only version of this that a team keeps doing after the third month.
`,"../content/blog/mape-k-loop.es.md":`---
title: MAPE-K, o cómo sacar la adaptación de tu lógica de negocio
date: 2026-08-04
summary: Un sistema autoadaptativo hace dos trabajos a la vez: el trabajo, y decidir cómo debe hacerse el trabajo. MAPE-K es el patrón que impide que esos dos se fusionen.
tags: ciberfísicos, arquitectura
---

El modo de falla es fácil de imaginar. El controlador de una bomba empieza como una función que lee un sensor y fija una velocidad. Después alguien agrega una regla para cuando el sensor viene ruidoso. Después un fallback para cuando la red se cae. Después un perfil más lento para horario nocturno, y una anulación para modo mantenimiento. Seis meses después, la función que controla la bomba es sobre todo una función que decide qué comportamiento de control usar, y nadie puede cambiar ninguno de los dos sin tocar el otro.

MAPE-K existe justamente para evitar eso. Propuesto por IBM en 2003 como el núcleo de la computación autonómica, sigue siendo la arquitectura de referencia para sistemas autoadaptativos, y la razón por la que sobrevivió no es su sofisticación. Es que traza una sola línea: la lógica que hace el trabajo y la lógica que adapta el trabajo son componentes separados, y se encuentran únicamente a través de un conocimiento compartido.

<figure>
<svg viewBox="0 -14 640 296" role="img" aria-label="El lazo MAPE-K leyendo y escribiendo un Conocimiento compartido, actuando sobre un sistema físico gestionado y validando planes contra un gemelo digital">
  <defs>
    <marker id="mk-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="mk-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="0" y="32" width="118" height="214" rx="8" class="dg-node"/>
  <text x="59" y="126" text-anchor="middle" class="dg-t">Conocimiento</text>
  <text x="59" y="144" text-anchor="middle" class="dg-s">modelos, objetivos,</text>
  <text x="59" y="158" text-anchor="middle" class="dg-s">historia</text>
  <rect x="142" y="8" width="250" height="262" rx="10" class="dg-plate"/>
  <text x="142" y="-3" class="dg-m">SISTEMA GESTOR</text>
  <rect x="162" y="32" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="52" class="dg-t">Monitor</text>
  <text x="178" y="67" class="dg-s">sensores, conectividad, carga</text>
  <rect x="162" y="90" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="110" class="dg-t">Análisis</text>
  <text x="178" y="125" class="dg-s">el estado contra los objetivos</text>
  <rect x="162" y="148" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="168" class="dg-t">Plan</text>
  <text x="178" y="183" class="dg-s">una estrategia, con plazo</text>
  <rect x="162" y="206" width="210" height="44" rx="6" class="dg-node-accent"/>
  <text x="178" y="226" class="dg-t">Ejecución</text>
  <text x="178" y="241" class="dg-s">sin detener el sistema</text>
  <path d="M267 78 V86" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M267 136 V144" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M267 194 V202" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <path d="M120 54 H158" class="dg-flow-dashed"/>
  <path d="M120 112 H158" class="dg-flow-dashed"/>
  <path d="M120 170 H158" class="dg-flow-dashed"/>
  <path d="M120 228 H158" class="dg-flow-dashed"/>
  <text x="59" y="180" text-anchor="middle" class="dg-m">COMPARTIDO POR</text>
  <text x="59" y="192" text-anchor="middle" class="dg-m">LAS CUATRO</text>
  <rect x="430" y="32" width="210" height="86" rx="8" class="dg-node"/>
  <text x="446" y="60" class="dg-t">Sistema gestionado</text>
  <text x="446" y="78" class="dg-s">la bomba, el vehículo,</text>
  <text x="446" y="92" class="dg-s">la celda de producción. Nunca</text>
  <text x="446" y="106" class="dg-s">deja de hacer su trabajo.</text>
  <rect x="430" y="160" width="210" height="86" rx="8" class="dg-node-warn"/>
  <text x="446" y="188" class="dg-t">Gemelo digital</text>
  <text x="446" y="206" class="dg-s">una réplica ejecutable.</text>
  <text x="446" y="220" class="dg-s">El plan corre aquí antes</text>
  <text x="446" y="234" class="dg-s">de correr sobre el equipo.</text>
  <path d="M426 62 H404 V54 H378" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <text x="398" y="40" text-anchor="middle" class="dg-m">LEE</text>
  <path d="M376 228 H414 V100 H426" class="dg-flow-accent" marker-end="url(#mk-head-a)"/>
  <text x="420" y="140" class="dg-m">ACTÚA</text>
  <path d="M376 170 H396 V200 H426" class="dg-flow" marker-end="url(#mk-head)"/>
  <text x="382" y="196" class="dg-m">SIMULA</text>
</svg>
<figcaption>Cuatro etapas en orden, un Conocimiento que todas leen y escriben, y un sistema gestionado que nunca se detiene. El plan llega al gemelo antes de llegar al equipo.</figcaption>
</figure>

## Las cuatro etapas no son cuatro funciones

Escrito así, MAPE-K suena a un pipeline que cualquiera habría inventado: monitorear, analizar, planificar, ejecutar. Lo que hace que valga la pena nombrarlo es que cada etapa tiene una entrada distinta, una falla distinta y un dueño distinto en un equipo real.

Monitor recoge estado de ejecución del lado físico: temperatura, vibración, conectividad de red, carga de trabajo. Su falla es un muestreo demasiado lento o demasiado grueso para ver aquello a lo que te estás adaptando, y suele ser de quien sea dueño del hardware.

Análisis compara ese estado contra objetivos de calidad definidos, que es la etapa que la mayoría de los proyectos se salta y después lamenta. Disponibilidad, seguridad y rendimiento tienen que estar escritos como umbrales antes de que esta etapa pueda existir siquiera. Sin ellos, Análisis degenera en un montón de condicionales que codifican objetivos que nadie acordó.

Plan produce una estrategia concreta: reconfigurar un flujo industrial, recalcular una ruta, bajar a un modo degradado. En un entorno ciberfísico planifica bajo restricciones de tiempo duras, lo que descarta muchas técnicas de búsqueda que de otro modo serían atractivas.

Ejecución aplica el cambio sobre los actuadores mientras el sistema sigue operando. No al reiniciar, no en una ventana de mantenimiento. Esa restricción es lo que hace difícil a Ejecución, y es la razón de que la separación importe: el sistema gestionado tiene que estar construido de forma que su comportamiento se pueda cambiar por debajo.

Conocimiento es el modelo compartido que las cuatro leen y escriben. Objetivos, creencias actuales, historia de adaptaciones pasadas.

## El gemelo es el mecanismo de seguridad

En un sistema de software normal la etapa de Plan puede ser optimista, porque un mal plan se revierte. En uno ciberfísico un mal plan mueve varias toneladas de algo.

Por eso un gemelo digital suele colgar del Conocimiento en lugar de ser una iniciativa aparte. Una réplica ejecutable del sistema físico le permite al lazo simular la adaptación y comprobarla antes de que se acerque al equipo. Convierte un riesgo de ejecución no acotado en un costo de simulación acotado, que es la única versión de esto que se certifica.

El corolario es que el gemelo hay que mantenerlo como parte del lazo, no como una demo. Un gemelo que se desvía de la planta es peor que no tener gemelo, porque da una confianza que no se ganó.

## Un solo lazo es la excepción, no la regla

El dibujo de manual muestra un único lazo central, y los sistemas ciberfísicos en su mayoría no pueden tenerlo. La conectividad es intermitente, los presupuestos de latencia son ajustados, y un controlador que tiene que alcanzar un cerebro central para reaccionar es un controlador que falla cuando falla el enlace.

Así que MAPE-K descentralizado es la forma normal: varios lazos, cada uno local a un subsistema, coordinándose entre sí. Pueden compartir solo la etapa de Monitor, o compartir Conocimiento, o correr del todo independientes con contratos negociados en los bordes. Elegir qué patrón estás usando es una decisión arquitectónica que vale hacer explícita y dejar escrita, porque los patrones difieren en qué garantizan cuando se cae un enlace, y ese es exactamente el momento en que a alguien le va a importar.

## Dónde se cruza esto con la arquitectura de aplicaciones de siempre

La cuarta brecha con la que me sigo encontrando en este campo es que la regla de dominio queda soldada al protocolo del hardware. La lógica que dice que una bomba debe bajar la velocidad termina dentro del código que le habla Modbus a esa bomba específica.

MAPE-K no arregla eso por sí solo. La arquitectura hexagonal sí, y las dos componen bien: el lazo es lógica de dominio, los sensores y actuadores quedan detrás de puertos, y los adaptadores son el hardware que esté instalado hoy.

<figure>
<svg viewBox="0 0 640 168" role="img" aria-label="El lazo de adaptación hablando con un puerto, con tres adaptadores intercambiables detrás">
  <defs>
    <marker id="hx-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
  </defs>
  <rect x="0" y="56" width="150" height="56" rx="8" class="dg-node-accent"/>
  <text x="75" y="80" text-anchor="middle" class="dg-t">Lazo MAPE-K</text>
  <text x="75" y="96" text-anchor="middle" class="dg-s">lógica de dominio pura</text>
  <path d="M154 84 H206" class="dg-flow" marker-end="url(#hx-head)"/>
  <rect x="210" y="46" width="120" height="76" rx="8" class="dg-plate"/>
  <text x="270" y="78" text-anchor="middle" class="dg-t">Puerto actuador</text>
  <text x="270" y="94" text-anchor="middle" class="dg-s">una interfaz</text>
  <path d="M334 84 H384" class="dg-flow" marker-end="url(#hx-head)"/>
  <rect x="388" y="10" width="200" height="38" rx="6" class="dg-node"/>
  <text x="404" y="34" class="dg-t">Adaptador Modbus</text>
  <rect x="388" y="65" width="200" height="38" rx="6" class="dg-node"/>
  <text x="404" y="89" class="dg-t">Adaptador simulador</text>
  <rect x="388" y="120" width="200" height="38" rx="6" class="dg-node-warn"/>
  <text x="404" y="144" class="dg-t">Adaptador gemelo digital</text>
  <path d="M370 29 V139" class="dg-flow"/>
  <path d="M370 29 H382" class="dg-flow" marker-end="url(#hx-head)"/>
  <path d="M370 139 H382" class="dg-flow" marker-end="url(#hx-head)"/>
</svg>
<figcaption>El mismo lazo, tres destinos. Probar contra el simulador y validar contra el gemelo dejan de ser builds separados y pasan a ser un adaptador intercambiado.</figcaption>
</figure>

La ganancia no es elegancia. Es que "probar la lógica de adaptación" deja de requerir hardware, y "validar contra el gemelo antes de desplegar" deja de ser un paso manual que alguien recuerda. Ambos se vuelven la misma llamada contra otro adaptador, que es la única versión de esto que un equipo sigue haciendo después del tercer mes.
`,"../content/blog/one-contract-two-platforms.en.md":`---
title: What a TurboModule spec cannot tell you
date: 2026-08-11
summary: Codegen guarantees both platforms have the same types. It has nothing to say about denied permissions, double taps, or who owns a system singleton, and that is where implementations quietly diverge.
tags: react-native, native-modules
---

A native module has a deceptively simple job: expose a platform capability to JavaScript once, and have it behave the same way on two operating systems that agree about almost nothing. React Native's codegen makes the first half free. The second half is where the work is, and no amount of tooling touches it.

I wrote a small library that does two things, open the system confirm dialog and fire a local notification when a savings goal completes. The whole TypeScript surface is two method signatures. Writing it twice, once in Swift and once in Kotlin, is what showed me how much of the contract had never been written down.

<figure>
<svg viewBox="0 0 640 300" role="img" aria-label="One TypeScript spec generating two native implementations, with a line marking where the spec stops guaranteeing anything">
  <defs>
    <marker id="tm-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="tm-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="200" y="0" width="240" height="46" rx="8" class="dg-node-accent"/>
  <text x="320" y="21" text-anchor="middle" class="dg-t">TypeScript spec</text>
  <text x="320" y="37" text-anchor="middle" class="dg-s">names, arity, types, promise shape</text>
  <path d="M320 50 V66" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <rect x="250" y="70" width="140" height="30" rx="15" class="dg-node"/>
  <text x="320" y="90" text-anchor="middle" class="dg-t">codegen</text>
  <path d="M320 104 V118 H130 V136" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <path d="M320 104 V118 H510 V136" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <rect x="30" y="140" width="200" height="52" rx="8" class="dg-node"/>
  <text x="130" y="162" text-anchor="middle" class="dg-t">Swift implementation</text>
  <text x="130" y="179" text-anchor="middle" class="dg-s">UIAlertController, UNUserNC</text>
  <rect x="410" y="140" width="200" height="52" rx="8" class="dg-node"/>
  <text x="510" y="162" text-anchor="middle" class="dg-t">Kotlin implementation</text>
  <text x="510" y="179" text-anchor="middle" class="dg-s">AlertDialog, NotificationManager</text>
  <path d="M0 216 H640" class="dg-flow-dashed"/>
  <text x="320" y="234" text-anchor="middle" class="dg-m">BELOW THIS LINE THE SPEC GUARANTEES NOTHING</text>
  <rect x="0" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="100" y="268" text-anchor="middle" class="dg-t">Denial semantics</text>
  <text x="100" y="284" text-anchor="middle" class="dg-s">resolve or reject?</text>
  <rect x="220" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="320" y="268" text-anchor="middle" class="dg-t">Re-entrancy</text>
  <text x="320" y="284" text-anchor="middle" class="dg-s">what does a double tap do?</text>
  <rect x="440" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="540" y="268" text-anchor="middle" class="dg-t">Singleton ownership</text>
  <text x="540" y="284" text-anchor="middle" class="dg-s">who holds the delegate?</text>
</svg>
<figcaption>Codegen enforces everything above the line and nothing below it. The three boxes underneath are the ones that make two platforms behave differently while both still typecheck.</figcaption>
</figure>

## Denial is not an error

\`notifyGoalCompleted(goalName): Promise<void>\`. What should happen when the user has denied notification permission?

The type does not say, and both answers are defensible. Rejecting is honest: the caller asked for a notification and did not get one. Resolving is also honest: the user already made this choice, it is not an exceptional condition, and the caller cannot do anything with the rejection except swallow it.

I chose to resolve. The goal is still complete; this one channel stays quiet. What matters more than the choice is that both platforms make the same one, and that turns out to be harder than it sounds, because they do not present the same question. iOS gives an authorization status enum with five cases, checked before you schedule anything. Android 13 and up gives a runtime permission you request through the activity, plus a separate app-level notifications switch that is not a permission at all and has to be checked independently.

Two platforms, three different ways for the answer to be no, one behaviour the JavaScript caller observes. None of that is visible in \`Promise<void>\`.

## The promise that never settles

\`showConfirmDialog(title, message): Promise<boolean>\`. Users double tap. What happens on the second call while the first dialog is still up?

On iOS, UIKit refuses to present a view controller on top of one that is already presenting, and it refuses silently. No exception, no callback, nothing at all. The second promise simply never settles, and the caller waits forever behind a spinner that will never resolve. On Android the second dialog stacks over the first, which is not a hang but is not what anyone wanted either.

The fix is a re-entrancy guard on both sides that rejects the second call with a named error instead of leaving it dangling. Small code. The point is that nothing in the type system, the codegen, or either platform's compiler was ever going to ask me the question. Writing the second implementation asked it, because you cannot port a behaviour you never articulated.

## The singleton you are quietly taking

To show a notification while the app is in the foreground on iOS, something must implement the notification centre delegate. That API accepts exactly one delegate, process-wide.

A library that registers itself as that delegate silently evicts whatever the host app had registered, which for a lot of apps is their push notification handling. It works in the example app and breaks in production, in a codebase whose owner has no reason to suspect a savings-notification library.

So the library keeps a weak reference to the previous delegate and forwards the presentation callback to it when one exists. Android has no equivalent hazard, because its notification manager is not a single-delegate API. There is nothing to take and nothing to give back.

That asymmetry is the shape of most of them. The differences that survived into the final code all live in the platform, not in the contract: Android needs a request code per permission request so a late callback cannot resolve the wrong promise, and an incrementing notification id so two completed goals do not overwrite each other in the tray. iOS needs neither.

## The result should look different

Here is the same message, dispatched through the same JavaScript call, on both platforms:

<figure class="shots">
<img src="/blog/bolsillo-dialog-ios.png" alt="The iOS system confirm dialog over the savings app" />
<img src="/blog/bolsillo-dialog-android.png" alt="The Android system confirm dialog over the same screen" />
</figure>

Frosted panel with stacked buttons on one, opaque sheet with right-aligned text buttons on the other. Different button order, different typography, different everything.

This is the outcome you want, and it is worth saying because the instinct when you own both implementations is to make them match. A user's confirmation dialog should look like their operating system's confirmation dialog. What has to be identical is the contract: same question, same two outcomes, same promise resolving to the same boolean. The chrome should be native, and native means different.

## The part to write down

The type contract is generated and enforced perfectly. The behaviour contract is prose, nothing enforces it, and it is the only one where two platforms drift apart.

So the README is not documentation of the library, it is part of the library. Denial resolves rather than rejects, a second dialog rejects rather than hangs, the delegate is borrowed rather than taken. Each of those is a decision that a compiler will never check and a second implementer will otherwise make differently.

Write it before the second platform, not after. I did it after, and every "wait, what does iOS do here" cost a trip back through code I had written by feel two days earlier.
`,"../content/blog/one-contract-two-platforms.es.md":`---
title: Lo que una spec de TurboModule no te puede decir
date: 2026-08-11
summary: El codegen garantiza que las dos plataformas tengan los mismos tipos. No tiene nada que decir sobre permisos denegados, dobles taps o quién es dueño de un singleton del sistema, y ahí es donde las implementaciones se separan en silencio.
tags: react-native, módulos-nativos
---

Un módulo nativo tiene un trabajo engañosamente simple: exponer una capacidad de la plataforma a JavaScript una sola vez, y que se comporte igual en dos sistemas operativos que no coinciden en casi nada. El codegen de React Native hace gratis la primera mitad. La segunda mitad es donde está el trabajo, y ninguna herramienta la toca.

Escribí una librería pequeña que hace dos cosas: abrir el diálogo de confirmación del sistema y disparar una notificación local cuando se completa una meta de ahorro. Toda la superficie de TypeScript son dos firmas de método. Escribirla dos veces, una en Swift y otra en Kotlin, fue lo que me mostró cuánto del contrato nunca había quedado escrito.

<figure>
<svg viewBox="0 0 640 300" role="img" aria-label="Una spec de TypeScript generando dos implementaciones nativas, con una línea que marca dónde la spec deja de garantizar algo">
  <defs>
    <marker id="tm-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="tm-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="200" y="0" width="240" height="46" rx="8" class="dg-node-accent"/>
  <text x="320" y="21" text-anchor="middle" class="dg-t">Spec de TypeScript</text>
  <text x="320" y="37" text-anchor="middle" class="dg-s">nombres, aridad, tipos, forma de promesa</text>
  <path d="M320 50 V66" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <rect x="250" y="70" width="140" height="30" rx="15" class="dg-node"/>
  <text x="320" y="90" text-anchor="middle" class="dg-t">codegen</text>
  <path d="M320 104 V118 H130 V136" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <path d="M320 104 V118 H510 V136" class="dg-flow-accent" marker-end="url(#tm-head-a)"/>
  <rect x="30" y="140" width="200" height="52" rx="8" class="dg-node"/>
  <text x="130" y="162" text-anchor="middle" class="dg-t">Implementación Swift</text>
  <text x="130" y="179" text-anchor="middle" class="dg-s">UIAlertController, UNUserNC</text>
  <rect x="410" y="140" width="200" height="52" rx="8" class="dg-node"/>
  <text x="510" y="162" text-anchor="middle" class="dg-t">Implementación Kotlin</text>
  <text x="510" y="179" text-anchor="middle" class="dg-s">AlertDialog, NotificationManager</text>
  <path d="M0 216 H640" class="dg-flow-dashed"/>
  <text x="320" y="234" text-anchor="middle" class="dg-m">DEBAJO DE ESTA LÍNEA LA SPEC NO GARANTIZA NADA</text>
  <rect x="0" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="100" y="268" text-anchor="middle" class="dg-t">Semántica del rechazo</text>
  <text x="100" y="284" text-anchor="middle" class="dg-s">¿resolver o rechazar?</text>
  <rect x="220" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="320" y="268" text-anchor="middle" class="dg-t">Reentrada</text>
  <text x="320" y="284" text-anchor="middle" class="dg-s">¿qué hace un doble tap?</text>
  <rect x="440" y="246" width="200" height="54" rx="8" class="dg-node-warn"/>
  <text x="540" y="268" text-anchor="middle" class="dg-t">Dueño del singleton</text>
  <text x="540" y="284" text-anchor="middle" class="dg-s">¿quién tiene el delegate?</text>
</svg>
<figcaption>El codegen impone todo lo que está arriba de la línea y nada de lo que está abajo. Las tres cajas de abajo son las que hacen que dos plataformas se comporten distinto mientras las dos siguen compilando.</figcaption>
</figure>

## Denegar no es un error

\`notifyGoalCompleted(goalName): Promise<void>\`. ¿Qué debería pasar cuando el usuario denegó el permiso de notificaciones?

El tipo no lo dice, y las dos respuestas son defendibles. Rechazar es honesto: el llamador pidió una notificación y no la obtuvo. Resolver también es honesto: el usuario ya tomó esa decisión, no es una condición excepcional, y el llamador no puede hacer nada con el rechazo salvo tragárselo.

Elegí resolver. La meta sigue cumplida; este canal simplemente se queda callado. Lo que importa más que la elección es que las dos plataformas tomen la misma, y eso resulta más difícil de lo que suena, porque no plantean la misma pregunta. iOS da un enum de estado de autorización con cinco casos, que se consulta antes de programar nada. Android 13 en adelante da un permiso en tiempo de ejecución que se pide a través de la activity, más un interruptor de notificaciones a nivel de app que no es un permiso y hay que revisar aparte.

Dos plataformas, tres formas distintas de que la respuesta sea no, un solo comportamiento que observa el llamador de JavaScript. Nada de eso es visible en \`Promise<void>\`.

## La promesa que nunca se resuelve

\`showConfirmDialog(title, message): Promise<boolean>\`. Los usuarios hacen doble tap. ¿Qué pasa con la segunda llamada mientras el primer diálogo sigue en pantalla?

En iOS, UIKit se niega a presentar un view controller encima de uno que ya está presentando, y se niega en silencio. Sin excepción, sin callback, sin nada. La segunda promesa simplemente nunca se asienta, y el llamador espera para siempre detrás de un spinner que no va a resolverse. En Android el segundo diálogo se apila sobre el primero, que no es un cuelgue pero tampoco es lo que nadie quería.

El arreglo es una guarda de reentrada en los dos lados que rechaza la segunda llamada con un error con nombre en vez de dejarla colgando. Poco código. El punto es que nada en el sistema de tipos, en el codegen ni en el compilador de ninguna de las dos plataformas me iba a hacer la pregunta jamás. Escribir la segunda implementación sí la hizo, porque no puedes portar un comportamiento que nunca articulaste.

## El singleton que estás tomando en silencio

Para mostrar una notificación con la app en primer plano en iOS, algo tiene que implementar el delegate del centro de notificaciones. Esa API acepta exactamente un delegate en todo el proceso.

Una librería que se registra como ese delegate desaloja en silencio al que la app anfitriona tuviera registrado, que para muchas apps es su manejo de push notifications. Funciona en la app de ejemplo y se rompe en producción, en un código cuyo dueño no tiene ninguna razón para sospechar de una librería de notificaciones de ahorro.

Así que la librería guarda una referencia débil al delegate anterior y le reenvía el callback de presentación cuando existe. Android no tiene un riesgo equivalente, porque su notification manager no es una API de un solo delegate. No hay nada que tomar ni nada que devolver.

Esa asimetría es la forma de casi todas. Las diferencias que sobrevivieron al código final viven en la plataforma, no en el contrato: Android necesita un request code por pedido de permiso para que un callback tardío no resuelva la promesa equivocada, y un id de notificación incremental para que dos metas cumplidas no se pisen en la bandeja. iOS no necesita ninguno de los dos.

## El resultado debería verse distinto

Este es el mismo mensaje, despachado por la misma llamada de JavaScript, en las dos plataformas:

<figure class="shots">
<img src="/blog/bolsillo-dialog-ios.png" alt="El diálogo de confirmación del sistema iOS sobre la app de ahorro" />
<img src="/blog/bolsillo-dialog-android.png" alt="El diálogo de confirmación del sistema Android sobre la misma pantalla" />
</figure>

Panel esmerilado con botones apilados en uno, hoja opaca con botones de texto alineados a la derecha en el otro. Distinto orden de botones, distinta tipografía, distinto todo.

Este es el resultado que quieres, y vale decirlo porque el instinto cuando eres dueño de las dos implementaciones es hacer que coincidan. El diálogo de confirmación de un usuario debería verse como el diálogo de confirmación de su sistema operativo. Lo que tiene que ser idéntico es el contrato: la misma pregunta, los mismos dos desenlaces, la misma promesa resolviendo al mismo booleano. El chrome debe ser nativo, y nativo significa distinto.

## La parte que hay que dejar escrita

El contrato de tipos se genera y se impone perfectamente. El contrato de comportamiento es prosa, nada lo impone, y es el único donde dos plataformas de verdad se separan.

Así que el README no es documentación de la librería, es parte de la librería. Denegar resuelve en lugar de rechazar, un segundo diálogo rechaza en lugar de colgarse, el delegate se toma prestado en lugar de quedárselo. Cada una de esas es una decisión que ningún compilador va a revisar y que un segundo implementador tomaría distinto.

Escríbelo antes de la segunda plataforma, no después. Yo lo hice después, y cada "espera, ¿qué hace iOS acá?" costó un viaje de vuelta a código que había escrito por intuición dos días antes.
`,"../content/blog/webview-micro-app.en.md":`---
title: A web screen inside a native app is a trust boundary, not a component
date: 2026-08-08
summary: Embedding a micro-app in a WebView gives you a second runtime, an unvalidated input channel into your global state, and a startup race. Here is the contract that closes all three.
tags: react-native, architecture
---

Sooner or later a mobile product gets a screen that has to be web. A different team owns it, or it ships on a weekly cadence the app stores cannot match, or the business wants to change it without a release. The usual answer is a \`WebView\`, and the usual result is a screen that works on the demo and behaves strangely in the field.

I built one of these recently: a savings app where the goal list is native and the goal detail, including the deposit form, is a static web micro-app inside a \`WebView\`. The interesting engineering was not either side. It was the seam.

<figure class="shots">
<img src="/blog/bolsillo-detail-ios.png" alt="The goal detail screen rendered by the web micro-app on iOS" />
<img src="/blog/bolsillo-detail-android.png" alt="The same web micro-app rendered on Android" />
</figure>

Same HTML on both platforms, which is the entire reason anyone takes this trade. What follows is what it costs.

## Three problems, and they are not the ones people expect

The problems are not styling or scroll behaviour. They are these.

The \`WebView\` reloads when you did not ask it to, throwing away a live application. The page and the native side race at startup, and whoever loses is silent about it. And every message arriving from the page is external input with a direct route into your global state.

Each has a specific fix, and together they form a contract worth writing down before any feature work.

## The reload nobody asks for

This is the first line everyone writes:

\`\`\`tsx
<WebView source={{ html }} onMessage={handleMessage} />
\`\`\`

That object literal is a fresh reference on every render of the parent. \`WebView\` compares \`source\`, sees a change, and reloads the page. Every re-render of the screen destroys the DOM, the scroll position and every variable the micro-app was holding, then rebuilds from zero.

Hoisting the source to a module-level constant fixes it permanently. It is the same class of mistake as passing an inline object to a memoised child, with a far worse blast radius: a wasted re-render costs a frame, a wasted reload costs the entire state of a second application.

## The handshake, and why native must not speak first

Native holds the data and wants to send it. The page has to be listening when it arrives. There is no event that means "the JavaScript inside your WebView has finished attaching its listeners." \`onLoadEnd\` fires when the document loads, which is close enough to work on a fast device and fail on a slow one.

So the page speaks first. It attaches its listeners, then announces itself, and native replies only to that announcement.

<figure>
<svg viewBox="0 0 640 336" role="img" aria-label="Message sequence between the native shell and the web micro-app">
  <defs>
    <marker id="wv-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="wv-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="16" y="0" width="188" height="34" rx="6" class="dg-node"/>
  <text x="110" y="21" text-anchor="middle" class="dg-t">Native shell</text>
  <rect x="436" y="0" width="188" height="34" rx="6" class="dg-node"/>
  <text x="530" y="21" text-anchor="middle" class="dg-t">Web micro-app</text>
  <path d="M110 34 V330" class="dg-flow-dashed"/>
  <path d="M530 34 V330" class="dg-flow-dashed"/>
  <text x="520" y="60" text-anchor="end" class="dg-s">listeners attached on window and document</text>
  <text x="320" y="84" text-anchor="middle" class="dg-m">WEB_APP_READY</text>
  <path d="M524 92 H116" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="320" y="118" text-anchor="middle" class="dg-m">SESSION_INITIALIZED &#123; goal &#125;</text>
  <path d="M116 126 H524" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="536" y="144" class="dg-s">first paint</text>
  <text x="520" y="182" text-anchor="end" class="dg-s">user submits an amount</text>
  <text x="320" y="206" text-anchor="middle" class="dg-m">DEPOSIT_CONFIRMED &#123; goalId, amount &#125;</text>
  <path d="M524 214 H116" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <rect x="20" y="228" width="180" height="52" rx="6" class="dg-node-warn"/>
  <text x="110" y="248" text-anchor="middle" class="dg-t">parse, validate, reject</text>
  <text x="110" y="263" text-anchor="middle" class="dg-s">then the use case,</text>
  <text x="110" y="275" text-anchor="middle" class="dg-s">then the store</text>
  <text x="320" y="304" text-anchor="middle" class="dg-m">ACCUMULATED_AMOUNT_UPDATED &#123; accumulatedAmount &#125;</text>
  <path d="M116 312 H524" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="536" y="330" class="dg-s">repaints in place</text>
</svg>
<figcaption>The page announces readiness before native sends anything, so the opening race is closed by construction rather than by timing. Every inbound message passes the validation box before it can reach the store.</figcaption>
</figure>

The race is not made unlikely. It is made impossible, which is the only version I trust, because timing bugs at a runtime boundary reproduce on one device out of five and never on the one on your desk.

One platform detail worth knowing: \`react-native-webview\` delivers the native-to-web message on \`document\` on Android and on \`window\` on iOS. Registering both is correct everywhere, and since the handler is idempotent a duplicate delivery is harmless.

## Treat the page as a client you did not write

The message channel is the whole attack surface, and it is easy to forget that because you wrote the page too. You wrote *this version* of the page. A \`WebView\` renders whatever HTML it is given, and on a compromised device or a mis-scoped release that is not necessarily your HTML.

So there is exactly one module that knows the wire format, and it never throws. An unparseable or malformed message resolves to null and gets dropped. Everything downstream receives a typed value or nothing, which means no caller ever needs a try/catch and no malformed payload ever reaches Redux.

That single decision is what lets the rest of the app treat these messages as ordinary typed events. The trust boundary is enforced in one file instead of being everyone's responsibility, which is the difference between a rule and a hope.

## Updating without remounting

The naive way to reflect a new balance in the page is to re-render the screen with new data, which reloads the \`WebView\`, which loses everything. The right way is to treat the page as a live client and send it a message.

That means adding a second native-to-web message type rather than a second source of truth, and it means the payload has to carry the number the domain just computed. Not the number the screen can derive.

That last point cost me a bug. The screen had a goal snapshot captured at mount and computed the new balance by adding the deposit to it. Correct on the first deposit of a session, wrong on every one after, because the snapshot never moved. The visible symptom was the page showing 1.502.000 while the store held 1.503.000.

The tempting fix is to make the snapshot live. The real fix is that the presentation layer had no business doing domain arithmetic at all. The use case already computes the new balance from current state; it just was not returning it. Once it did, the screen forwards a number instead of deriving one, and the duplicated arithmetic disappears.

## The rule that generalises

Everything above is one rule wearing four costumes: across a runtime boundary, send facts, never derivations.

The stable \`source\` is a fact about identity. The handshake is a fact about readiness rather than a guess at it. The validated parser is a refusal to derive trust from origin. And the balance message carries what the domain computed instead of what the view could work out.

A \`WebView\` looks like a component in the JSX tree, which is exactly why this keeps catching people. It is a second application with a message queue in front of it, and every habit that makes sense across a network boundary applies to it unchanged.
`,"../content/blog/webview-micro-app.es.md":`---
title: Una pantalla web dentro de una app nativa es una frontera de confianza, no un componente
date: 2026-08-08
summary: Embeber una micro-app en un WebView te da un segundo runtime, un canal de entrada sin validar hacia tu estado global, y una carrera en el arranque. Este es el contrato que cierra los tres.
tags: react-native, arquitectura
---

Tarde o temprano un producto mobile tiene una pantalla que tiene que ser web. La tiene otro equipo, o sale con una cadencia semanal que las tiendas no pueden seguir, o el negocio quiere cambiarla sin publicar una versión. La respuesta habitual es un \`WebView\`, y el resultado habitual es una pantalla que funciona en el demo y se comporta raro en campo.

Construí una de estas hace poco: una app de ahorro donde el listado de metas es nativo y el detalle de la meta, incluido el formulario de abono, es una micro-app web estática dentro de un \`WebView\`. La ingeniería interesante no estaba en ninguno de los dos lados. Estaba en la costura.

<figure class="shots">
<img src="/blog/bolsillo-detail-ios.png" alt="La pantalla de detalle de meta renderizada por la micro-app web en iOS" />
<img src="/blog/bolsillo-detail-android.png" alt="La misma micro-app web renderizada en Android" />
</figure>

El mismo HTML en las dos plataformas, que es toda la razón por la que alguien acepta este trato. Lo que sigue es lo que cuesta.

## Tres problemas, y no son los que la gente espera

Los problemas no son de estilos ni de scroll. Son estos.

El \`WebView\` recarga cuando no se lo pediste, tirando a la basura una aplicación viva. La página y el lado nativo compiten en el arranque, y el que pierde se queda callado. Y cada mensaje que llega desde la página es entrada externa con una ruta directa hacia tu estado global.

Cada uno tiene un arreglo específico, y juntos forman un contrato que vale escribir antes de cualquier trabajo de features.

## La recarga que nadie pidió

Esta es la primera línea que todo el mundo escribe:

\`\`\`tsx
<WebView source={{ html }} onMessage={handleMessage} />
\`\`\`

Ese objeto literal es una referencia nueva en cada render del padre. \`WebView\` compara \`source\`, ve un cambio y recarga la página. Cada re-render de la pantalla destruye el DOM, la posición del scroll y todas las variables que la micro-app tenía, y reconstruye desde cero.

Subir el source a una constante de módulo lo arregla de forma permanente. Es la misma clase de error que pasar un objeto inline a un hijo memoizado, con un radio de daño mucho peor: un re-render desperdiciado cuesta un frame, una recarga desperdiciada cuesta el estado entero de una segunda aplicación.

## El handshake, y por qué nativo no debe hablar primero

Nativo tiene los datos y quiere enviarlos. La página tiene que estar escuchando cuando lleguen. No existe ningún evento que signifique "el JavaScript dentro de tu WebView terminó de montar sus listeners". \`onLoadEnd\` dispara cuando carga el documento, que se le parece lo suficiente como para funcionar en un dispositivo rápido y fallar en uno lento.

Así que la página habla primero. Monta sus listeners, después se anuncia, y nativo responde solo a ese anuncio.

<figure>
<svg viewBox="0 0 640 336" role="img" aria-label="Secuencia de mensajes entre el shell nativo y la micro-app web">
  <defs>
    <marker id="wv-head" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head"/></marker>
    <marker id="wv-head-a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6 z" class="dg-head-accent"/></marker>
  </defs>
  <rect x="16" y="0" width="188" height="34" rx="6" class="dg-node"/>
  <text x="110" y="21" text-anchor="middle" class="dg-t">Shell nativo</text>
  <rect x="436" y="0" width="188" height="34" rx="6" class="dg-node"/>
  <text x="530" y="21" text-anchor="middle" class="dg-t">Micro-app web</text>
  <path d="M110 34 V330" class="dg-flow-dashed"/>
  <path d="M530 34 V330" class="dg-flow-dashed"/>
  <text x="520" y="60" text-anchor="end" class="dg-s">listeners montados en window y document</text>
  <text x="320" y="84" text-anchor="middle" class="dg-m">WEB_APP_READY</text>
  <path d="M524 92 H116" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="320" y="118" text-anchor="middle" class="dg-m">SESSION_INITIALIZED &#123; goal &#125;</text>
  <path d="M116 126 H524" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="536" y="144" class="dg-s">primer pintado</text>
  <text x="520" y="182" text-anchor="end" class="dg-s">el usuario envía un monto</text>
  <text x="320" y="206" text-anchor="middle" class="dg-m">DEPOSIT_CONFIRMED &#123; goalId, amount &#125;</text>
  <path d="M524 214 H116" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <rect x="14" y="228" width="192" height="52" rx="6" class="dg-node-warn"/>
  <text x="110" y="248" text-anchor="middle" class="dg-t">parsear, validar, rechazar</text>
  <text x="110" y="263" text-anchor="middle" class="dg-s">después el caso de uso,</text>
  <text x="110" y="275" text-anchor="middle" class="dg-s">después el store</text>
  <text x="320" y="304" text-anchor="middle" class="dg-m">ACCUMULATED_AMOUNT_UPDATED &#123; accumulatedAmount &#125;</text>
  <path d="M116 312 H524" class="dg-flow-accent" marker-end="url(#wv-head-a)"/>
  <text x="536" y="330" class="dg-s">repinta en sitio</text>
</svg>
<figcaption>La página anuncia que está lista antes de que nativo envíe nada, así la carrera del arranque queda cerrada por construcción y no por temporización. Todo mensaje entrante pasa por la caja de validación antes de poder llegar al store.</figcaption>
</figure>

La carrera no se vuelve improbable. Se vuelve imposible, que es la única versión en la que confío, porque los bugs de temporización en una frontera de runtime se reproducen en uno de cada cinco dispositivos y nunca en el que tienes en el escritorio.

Un detalle de plataforma que conviene saber: \`react-native-webview\` entrega el mensaje de nativo a web en \`document\` en Android y en \`window\` en iOS. Registrar los dos es correcto en cualquier plataforma, y como el handler es idempotente, una entrega duplicada no hace daño.

## Trata a la página como un cliente que no escribiste

El canal de mensajes es toda la superficie de ataque, y es fácil olvidarlo porque la página también la escribiste tú. Escribiste *esta versión* de la página. Un \`WebView\` renderiza el HTML que se le dé, y en un dispositivo comprometido o con un release mal acotado ese HTML no es necesariamente el tuyo.

Así que hay exactamente un módulo que conoce el formato del cable, y nunca lanza excepciones. Un mensaje imposible de parsear o malformado resuelve a null y se descarta. Todo lo que está río abajo recibe un valor tipado o nada, lo que significa que ningún llamador necesita try/catch y ningún payload malformado llega jamás a Redux.

Esa única decisión es lo que permite que el resto de la app trate estos mensajes como eventos tipados normales. La frontera de confianza se aplica en un archivo en vez de ser responsabilidad de todos, que es la diferencia entre una regla y una esperanza.

## Actualizar sin remontar

La forma ingenua de reflejar un saldo nuevo en la página es re-renderizar la pantalla con datos nuevos, lo que recarga el \`WebView\`, lo que pierde todo. La forma correcta es tratar a la página como un cliente vivo y enviarle un mensaje.

Eso significa agregar un segundo tipo de mensaje de nativo a web en vez de una segunda fuente de verdad, y significa que el payload tiene que llevar el número que el dominio acaba de calcular. No el número que la pantalla puede derivar.

Ese último punto me costó un bug. La pantalla tenía un snapshot de la meta capturado al montar y calculaba el saldo nuevo sumándole el abono. Correcto en el primer abono de la sesión, incorrecto en todos los siguientes, porque el snapshot nunca se movía. El síntoma visible era la página mostrando 1.502.000 mientras el store tenía 1.503.000.

El arreglo tentador es hacer que el snapshot sea vivo. El arreglo real es que la capa de presentación no tenía por qué hacer aritmética de dominio. El caso de uso ya calcula el saldo nuevo a partir del estado actual; solo que no lo estaba devolviendo. Una vez que lo devolvió, la pantalla reenvía un número en lugar de derivarlo, y la aritmética duplicada desaparece.

## La regla que generaliza

Todo lo anterior es una sola regla con cuatro disfraces: cruzando una frontera de runtime, envía hechos, nunca derivaciones.

El \`source\` estable es un hecho sobre identidad. El handshake es un hecho sobre estar listo en lugar de una suposición. El parser validado es una negativa a derivar confianza a partir del origen. Y el mensaje del saldo lleva lo que el dominio calculó en vez de lo que la vista podría deducir.

Un \`WebView\` parece un componente en el árbol de JSX, que es exactamente por qué esto sigue agarrando desprevenida a la gente. Es una segunda aplicación con una cola de mensajes delante, y todo hábito que tiene sentido cruzando una frontera de red le aplica sin cambios.
`});function xs(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(e);if(!t)return{meta:{},body:e.trim()};let n={};for(let e of t[1].split(`
`)){let t=e.indexOf(`:`);t!==-1&&(n[e.slice(0,t).trim()]=e.slice(t+1).trim())}return{meta:n,body:t[2].trim()}}function Ss(e){return Math.max(1,Math.round(e.trim().split(/\s+/).length/220))}function Cs(e){let t=e.split(`/`).pop().replace(/\.md$/,``),n=t.lastIndexOf(`.`),r=t.slice(n+1);return{slug:t.slice(0,n),lang:r===`es`?`es`:`en`}}var ws=Object.entries(bs).map(([e,t])=>{let{slug:n,lang:r}=Cs(e),{meta:i,body:a}=xs(t);return{slug:n,lang:r,number:``,title:i.title??n,date:i.date??`1970-01-01`,summary:i.summary??``,tags:i.tags?i.tags.split(`,`).map(e=>e.trim()).filter(Boolean):[],body:a,readingMinutes:Ss(a)}}).sort((e,t)=>e.date.localeCompare(t.date)),Ts=new Map;for(let e of ws)Ts.has(e.slug)||Ts.set(e.slug,String(Ts.size+1).padStart(3,`0`)),e.number=Ts.get(e.slug);function Es(e){let t=new Map;for(let n of ws){let r=t.get(n.slug);(!r||n.lang===e&&r.lang!==e)&&t.set(n.slug,n)}return[...t.values()].sort((e,t)=>t.date.localeCompare(e.date))}function Ds(e){return[...new Set(Es(e).flatMap(e=>e.tags))].sort()}function Os(e,t){return new Date(`${e}T00:00:00`).toLocaleDateString(t===`es`?`es-ES`:`en-US`,{year:`numeric`,month:`short`,day:`numeric`})}function ks(){return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches}export{ys as a,yt as c,Ye as d,Ds as i,xt as l,Os as n,ln as o,Es as r,dn as s,ks as t,We as u};