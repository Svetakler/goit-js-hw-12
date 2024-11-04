import{i as s,S as E}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const d=document.querySelector(".gallery");function S(r){return r.map(({webformatURL:o,largeImageURL:l,tags:a,likes:e,views:t,comments:n,downloads:L})=>` 
<li class="thumb"> 
    <a href="${l}" 
            class="gallery-item" > 
    <div class="photo-card"> 
            <img src="${o}" alt="${a}"  loading="lazy" 
            class="gallery-image"/> 
        <div class="info"> 
            <p class="info-item"> 
            <b>Likes</b>${e} 
            </p> 
            <p class="info-item"> 
            <b>Views</b>${t} 
            </p> 
            <p class="info-item"> 
            <b>Comments</b>${n} 
            </p> 
            <p class="info-item"> 
            <b>Downloads</b>${L} 
            </p> 
         </div> 
    </div> 
    </a> 
</li>`).join("")}function R(){d.innerHTML=""}function f(r){d.insertAdjacentHTML("beforeend",S(r))}const v="46856425-450f7e6938fc07d9efbff3295",P="https://pixabay.com/api/";async function g(r,o=1,l=15){const a=new URLSearchParams({key:v,q:encodeURIComponent(r),image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:l}),e=`${P}?${a.toString()}`;try{const t=await fetch(e);if(!t.ok)throw new Error("Error fetching images.");const n=await t.json();return n.hits.length===0?(s.error({position:"topRight",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),[]):n.hits}catch(t){return s.error({position:"topRight",title:"Error",message:"Error fetching images. Try again!"}),console.error("Error fetching images:",t),[]}}const m=document.querySelector(".loader"),h=document.querySelector("#search-form"),$=document.querySelector(".gallery"),i=document.createElement("button");i.classList.add("btn","load-more");i.textContent="Load more";i.style.display="none";document.body.appendChild(i);let c="",u=1;const p=15;let y=new E(".gallery a",{captionsData:"alt",captionDelay:250});h.addEventListener("submit",q);i.addEventListener("click",M);function q(r){if(r.preventDefault(),c=r.currentTarget.searchQuery.value.trim(),c==="")return s.info({position:"topRight",title:"Sorry",message:"Please, type what you want to search!"});R(),u=1,b(),i.style.display="none",g(c,u,p).then(o=>{if(o.length===0){s.warning({position:"topRight",title:"No Results",message:"No images found for your search. Try another query!"});return}f(o),y.refresh(),i.style.display="block"}).catch(o=>{console.error("Error fetching images:",o),s.error({position:"topRight",title:"Error",message:"Something went wrong while fetching images. Please try again later!"})}).finally(()=>{w(),h.reset()})}function M(){u+=1,b(),g(c,u,p).then(r=>{if(r.length===0){s.info({position:"topRight",title:"End of Results",message:"We're sorry, but you've reached the end of search results."}),i.style.display="none";return}f(r),y.refresh();const{height:o}=$.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}).catch(r=>{console.error("Error fetching images:",r),s.error({position:"topRight",title:"Error",message:"Something went wrong while fetching images. Please try again later!"})}).finally(()=>{w()})}function b(){m.classList.remove("hidden")}function w(){m.classList.add("hidden")}
//# sourceMappingURL=index.js.map
