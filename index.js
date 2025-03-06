import{a as h,S as v,i as d}from"./assets/vendor-CI_1IWob.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const L="https://pixabay.com/api/",b="31000801-179358ed9db1a9fc0904af43d";async function f({query:e,page:r}){const s=new URLSearchParams({key:b,image_type:"photo",orientation:"horizontal",safesearch:!0,q:e,page:r,per_page:15}),{data:i}=await h(`${L}?${s}`);return i}const u=document.querySelector(".gallery");let S=document.querySelector(".preloader");const w=document.querySelector(".load-more");document.querySelector(".end-text");const p=new v(".gallery a",{captionsData:"alt",captionDelay:250});function m(e=[]){return e.map(({webformatURL:r,largeImageURL:s,tags:i,likes:t,views:o,comments:n,downloads:g})=>`
        <li class="gallery-item">
          <a href="${s}" class="gallery-link">
            <div class="card-wrapper-img">
              <img
                class="card-img"
                src="${r}"
                alt="${i}"
              />
            </div>
            <div class="card-info">
              <div class="card-info-colum">
                <p class="card-info-title">likes</p>
                <p class="card-info-value">${t}</p>
              </div>
              <div class="card-info-colum">
                <p class="card-info-title">views</p>
                <p class="card-info-value">${o}</p>
              </div>
              <div class="card-info-colum">
                <p class="card-info-title">comments</p>
                <p class="card-info-value">${n}</p>
              </div>
              <div class="card-info-colum">
                <p class="card-info-title">downloads</p>
                <p class="card-info-value">${g}</p>
              </div>
            </div>
          </a>
        </li>`).join("")}function q(e){u.innerHTML=m(e),p.refresh()}function $(e){u.insertAdjacentHTML("beforeend",m(e)),p.refresh()}function M(){u.innerHTML=""}function y(){S.classList.add("show")}function c({totalHits:e=[],page:r=1}){w.classList.toggle("hidden",e<=r*40)}const E=document.querySelector(".search-form"),P=document.querySelector(".load-more");let l="",a=1;async function O(e){if(e.preventDefault(),l=e.target.elements.message.value.trim(),e.target.reset(),l!==""){y(),c({}),M(),a=1;try{const{hits:r,totalHits:s}=await f({query:l,page:a});if(r.length===0){d.info({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});return}q(r),c({totalHits:s,page:a}),s<=a*15&&d.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}finally{}}}async function R(){a+=1,y(),c({});try{const{hits:e,totalHits:r}=await f({query:l,page:a});if(e.length===0){d.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}),c({totalHits:r,page:a});return}$(e),c({totalHits:r,page:a}),r<=a*15&&d.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}finally{}}E.addEventListener("submit",O);P.addEventListener("click",R);
//# sourceMappingURL=index.js.map
