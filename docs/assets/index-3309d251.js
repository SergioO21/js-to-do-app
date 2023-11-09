(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function l(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=l(o);fetch(o.href,n)}})();const v=`<section class="todoapp">
    <header class="header">
        <h1>Tasks</h1>
        <input id="new-todo-input" class="new-todo" placeholder="What do you have to do?" autofocus>
    </header>
    
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><b id="pending-count">0</b> pending</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="filter selected" href="#/">To-do</a>
            </li>
            <li>
                <a class="filter" href="#/active">Pending</a>
            </li>
            <li>
                <a class="filter" href="#/completed">Completed</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Delete completed</button>
    </footer>
</section>

<footer class="info">
    <p>Template created by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <p>Created by <b>Sergio Orejarena</b> </p>
</footer>`;let h;const C=new Uint8Array(16);function L(){if(!h&&(h=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!h))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return h(C)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function S(e,t=0){return s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),b={randomUUID:E};function A(e,t,l){if(b.randomUUID&&!t&&!e)return b.randomUUID();e=e||{};const d=e.random||(e.rng||L)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){l=l||0;for(let o=0;o<16;++o)t[l+o]=d[o];return t}return S(d)}class k{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"All",Completed:"Completed",Pending:"Pending"},i={todos:[],filter:c.All},P=()=>{T()},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));i.todos=e,i.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(i))},U=(e=c.All)=>{switch(e){case c.All:return[...i.todos];case c.Completed:return i.todos.filter(t=>t.done);case c.Pending:return i.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},q=e=>{if(!e)throw new Error("Description is required");i.todos.push(new k(e)),g()},x=e=>{i.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},I=e=>{if(!e)throw new Error("todoId is required");i.todos=i.todos.filter(t=>t.id!==e),g()},O=()=>{i.todos=i.todos.filter(e=>!e.done),g()},D=(e=c.All)=>{if(!Object.keys(c).includes(e))throw new Error(` The filter ${e} is not valid `);i.filter=e,g()},M=()=>i.filter,a={addTodo:q,deleteCompleted:O,deleteTodo:I,getCurrentFilter:M,getTodos:U,initStore:P,loadStore:T,setFilter:D,toggleTodo:x},F=e=>{if(!e)throw new Error("A to-do object is required");const{done:t,description:l,id:d}=e,o=`
      <div class="view">
          <input class="toggle" type="checkbox" ${t?"checked":""}>
          <label>${l}</label>
          <button class="destroy"></button>
      </div>
      <input class="edit" value="Create a TodoMVC template">
  `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),n.classList=t?"completed":"",n};let f;const H=e=>{if(f||(f=document.querySelector(e)),!f)throw new Error(`Element ${e} not found`);f.innerHTML=a.getTodos(c.Pending).length};let y;const N=(e,t=[])=>{if(y||(y=document.querySelector(e)),!e)throw new Error(`Element ${e} not found`);y.innerHTML="",t.forEach(l=>{y.append(F(l))})},m={ClearCompleted:".clear-completed",PendingCounter:"#pending-count",TodoFilters:".filter",TodoInput:"#new-todo-input",TodoList:".todo-list"},$=e=>{const t=()=>{const r=a.getTodos(a.getCurrentFilter());N(m.TodoList,r)},l=()=>{H(m.PendingCounter)};(()=>{const r=document.createElement("div");r.innerHTML=v,document.querySelector(e).append(r),t(),l()})();const d=document.querySelector(m.ClearCompleted),o=document.querySelectorAll(m.TodoFilters),n=document.querySelector(m.TodoInput),u=document.querySelector(m.TodoList);n.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(a.addTodo(r.target.value),t(),l(),r.target.value="")}),u.addEventListener("click",r=>{if(r.target.className!=="toggle")return;const p=r.target.closest("[data-id]");a.toggleTodo(p.getAttribute("data-id")),t(),l()}),u.addEventListener("click",r=>{if(r.target.className!=="destroy")return;const p=r.target.closest("[data-id]");a.deleteTodo(p.getAttribute("data-id")),t(),l()}),d.addEventListener("click",()=>{a.deleteCompleted(),t()}),o.forEach(r=>{r.addEventListener("click",p=>{switch(o.forEach(w=>w.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"To-do":a.setFilter(c.All);break;case"Pending":a.setFilter(c.Pending);break;case"Completed":a.setFilter(c.Completed);break}t()})})};a.initStore();$("#app");
