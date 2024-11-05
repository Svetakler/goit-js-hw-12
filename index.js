import{i as a,S}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const h=document.querySelector(".gallery");function P(o){return o.map(({webformatURL:r,largeImageURL:s,tags:l,likes:e,views:t,comments:i,downloads:E})=>` 
<li class="thumb"> 
    <a href="${s}" 
            class="gallery-item" > 
    <div class="photo-card"> 
            <img src="${r}" alt="${l}"  loading="lazy" 
            class="gallery-image"/> 
        <div class="info"> 
            <p class="info-item"> 
            <b>Likes</b>${e} 
            </p> 
            <p class="info-item"> 
            <b>Views</b>${t} 
            </p> 
            <p class="info-item"> 
            <b>Comments</b>${i} 
            </p> 
            <p class="info-item"> 
            <b>Downloads</b>${E} 
            </p> 
         </div> 
    </div> 
    </a> 
</li>`).join("")}function v(){h.innerHTML=""}function g(o){h.insertAdjacentHTML("beforeend",P(o))}const R="46856425-450f7e6938fc07d9efbff3295",$="https://pixabay.com/api/";async function p(o,r=1,s=15){const l=new URLSearchParams({key:R,q:encodeURIComponent(o),image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:s}),e=`${$}?${l.toString()}`;try{const t=await fetch(e);if(!t.ok)throw new Error("Error fetching images.");const i=await t.json();return i.hits.length===0?(a.error({position:"topRight",title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),[]):i}catch(t){return a.error({position:"topRight",title:"Error",message:"Error fetching images. Try again!"}),console.error("Error fetching images:",t),[]}}const y=document.querySelector(".loader"),b=document.querySelector("#search-form"),q=document.querySelector(".gallery"),n=document.createElement("button");n.classList.add("btn","load-more");n.textContent="Load more";n.style.display="none";document.body.appendChild(n);let f="",c=1;const u=15;let d=0,w=new S(".gallery a",{captionsData:"alt",captionDelay:250});b.addEventListener("submit",M);n.addEventListener("click",C);function M(o){if(o.preventDefault(),f=o.currentTarget.searchQuery.value.trim(),f==="")return a.info({position:"topRight",title:"Sorry",message:"Please, type what you want to search!"});v(),c=1,d=0,L(),n.style.display="none",p(f,c,u).then(r=>{if(d=r.totalHits,r.hits.length===0){a.info({position:"topRight",title:"No results",message:"No images found. Please try a different search term."}),m();return}g(r.hits),w.refresh(),c*u<d&&(n.style.display="block")}).catch(r=>{console.error("Error fetching images:",r),a.error({position:"topRight",title:"Error",message:"Something went wrong while fetching images. Please try again later!"})}).finally(()=>{m(),b.reset()})}function C(){c+=1,L(),p(f,c,u).then(o=>{const r=o.hits;g(r),w.refresh();const{height:s}=q.firstElementChild.getBoundingClientRect();window.scrollBy({top:s*2,behavior:"smooth"}),c*u>=d&&(n.style.display="none",a.info({position:"topRight",title:"End of Results",message:"We're sorry, but you've reached the end of search results."}))}).catch(o=>{console.error("Error fetching images:",o),a.error({position:"topRight",title:"Error",message:"Something went wrong while fetching images. Please try again later!"})}).finally(()=>{m()})}function L(){y.classList.remove("hidden")}function m(){y.classList.add("hidden")}
//# sourceMappingURL=index.js.map
