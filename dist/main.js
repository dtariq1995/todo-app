(()=>{"use strict";!function(){let e=document.querySelector("#content"),t=document.querySelector("body"),n=document.createElement("header"),c=document.createElement("img"),m=document.createElement("div");c.src="/src/Assets/Images/agenda.png",m.textContent="To-Do List",n.append(c,m),t.insertAdjacentElement("afterbegin",n);let o=document.createElement("footer"),a=document.createElement("p"),r=document.createElement("a"),d=document.createElement("img");a.textContent="Created by:",d.src="/src/Assets/Images/GitHub-Mark-Light-32px.png",r.href="https://github.com/dtariq1995",r.textContent="Daanyaal Tariq",o.append(a,d,r),e.insertAdjacentElement("afterend",o),function(){let e=document.querySelector("#content"),t=document.createElement("div");t.id="sidebar";let n=document.createElement("div"),c=document.createElement("img");c.src="/src/Assets/Images/houseicon.png";let m=document.createElement("button");m.textContent="Home",n.append(c,m);let o=document.createElement("div"),a=document.createElement("img");a.src="/src/Assets/Images/dayicon.png";let r=document.createElement("button");r.textContent="Today",o.append(a,r);let d=document.createElement("div"),s=document.createElement("img");s.src="/src/Assets/Images/weekicon.png";let l=document.createElement("button");l.textContent="Week",d.append(s,l);let u=document.createElement("div"),i=document.createElement("img");i.src="/src/Assets/Images/projectsicon.png";let p=document.createElement("button");p.textContent="Projects",u.append(i,p);let E=document.createElement("div"),g=document.createElement("img");g.src="/src/Assets/Images/noteicon.png";let b=document.createElement("button");b.textContent="Notes",E.append(g,b),t.append(n,o,d,u,E),e.append(t)}();let s=document.createElement("div");s.id="main-area",s.textContent="Main",e.append(s)}()})();