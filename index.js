!function(){"use strict";let e=document.getElementById("searchForm"),t=document.querySelector(".info"),n=document.querySelector(".repos__list");e.search.oninput=()=>e.search.classList.remove("error"),e.onsubmit=r=>{r.preventDefault(),e.search.value.trim().length<3?(n.innerHTML="",t.textContent="Ошибка. Введите не менее 3 символов",e.search.classList.add("error")):(t.textContent="",async function(e){let r=encodeURIComponent(`${e} in:name`);await fetch(`https://api.github.com/search/repositories?q=${r}`).then((e=>e.json())).then((e=>{var r;e.items.length?(r=e.items,n.innerHTML="",r.map(((e,t)=>{if(t<10){let t=document.createElement("div");t.className="repo",t.innerHTML=`<a href=${e.html_url} class='repo__name' target='blanc'>${e.name}</a>\n                                <div class="row">\n                                    <p class='repo__author'>автор <b>${e.owner.login}</b></p>\n                                    <p class='repo__count'><b>${e.stargazers_count}</b> оценок</p>\n                                </div>`,n.append(t)}}))):(n.innerHTML="",t.textContent="По вашему запросу ничего не найдено")})).catch((e=>console.log(e)))}(e.search.value))}}();