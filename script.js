(() => {
  document.body.classList.add("js-ready");

  const menu=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".main-nav");
  if(menu && nav){
    menu.addEventListener("click",()=>{
      const open=nav.classList.toggle("open");
      menu.setAttribute("aria-expanded",String(open));
    });
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded","false");
    }));
  }

  const header=document.querySelector(".site-header");
  const progress=document.querySelector("#progress");
  const year=document.querySelector("#year");

  const onScroll=()=>{
    if(header) header.classList.toggle("scrolled",window.scrollY>12);
    if(progress){
      const max=document.documentElement.scrollHeight-window.innerHeight;
      progress.style.width=(max>0 ? (window.scrollY/max)*100 : 0)+"%";
    }
  };
  window.addEventListener("scroll",onScroll,{passive:true});
  onScroll();

  if(year) year.textContent=new Date().getFullYear();

  const items=document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:"0px 0px -40px 0px"});
    items.forEach(el=>observer.observe(el));
  }else{
    items.forEach(el=>el.classList.add("visible"));
  }
})();