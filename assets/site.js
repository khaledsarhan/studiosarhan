(function(){
var lb=document.querySelector(".lb");
[].slice.call(document.querySelectorAll(".shots")).forEach(function(s){
var imgs=[].slice.call(s.querySelectorAll("img"));if(!imgs.length)return;
var t=document.createElement("div");t.className="track";t.tabIndex=0;t.setAttribute("aria-label","Photo slider");
imgs.forEach(function(i){i.removeAttribute("loading");t.appendChild(i)});s.appendChild(t);
if(imgs.length<2)return;
var c=document.createElement("div");c.className="ctl";
c.innerHTML='<button type="button" class="arr" aria-label="Previous photo">&#8249;</button><span class="cnt" aria-live="polite"></span><button type="button" class="arr" aria-label="Next photo">&#8250;</button>';
s.appendChild(c);
var b=c.querySelectorAll("button"),n=c.querySelector(".cnt");
function cur(){return t.clientWidth?Math.round(t.scrollLeft/t.clientWidth):0}
function go(k){k=Math.max(0,Math.min(imgs.length-1,k));t.scrollTo({left:k*t.clientWidth,behavior:"smooth"})}
function ui(){var k=cur();n.textContent=(k+1)+" / "+imgs.length;b[0].disabled=k===0;b[1].disabled=k===imgs.length-1}
b[0].onclick=function(){go(cur()-1)};b[1].onclick=function(){go(cur()+1)};
t.addEventListener("scroll",ui);ui()});
document.addEventListener("keydown",function(e){if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;if(lb&&!lb.hidden)return;var t=document.querySelector(".track");if(!t||!t.clientWidth)return;var k=Math.round(t.scrollLeft/t.clientWidth)+(e.key==="ArrowRight"?1:-1);k=Math.max(0,Math.min(t.children.length-1,k));t.scrollTo({left:k*t.clientWidth,behavior:"smooth"})});
if(!lb)return;
var li=lb.querySelector("img"),lc=lb.querySelector(".c"),lp=lb.querySelector(".p"),ln=lb.querySelector(".n"),lx=lb.querySelector(".x"),set=[],at=0,tx=null;
function show(k){at=Math.max(0,Math.min(set.length-1,k));var s=set[at];li.src=s.dataset.full||s.currentSrc||s.src;li.alt=s.alt;lc.textContent=set.length>1?(at+1)+" / "+set.length:"";lp.hidden=ln.hidden=set.length<2;lp.disabled=at===0;ln.disabled=at===set.length-1}
function openLb(l,k){set=l;lb.hidden=false;document.body.style.overflow="hidden";show(k);lx.focus();if(lb.requestFullscreen){try{lb.requestFullscreen().catch(function(){})}catch(x){}}}
function closeLb(){if(lb.hidden)return;lb.hidden=true;document.body.style.overflow="";if(document.fullscreenElement&&document.exitFullscreen){document.exitFullscreen().catch(function(){})}}
document.addEventListener("click",function(e){var i=e.target.closest&&e.target.closest(".track img");if(!i)return;var l=[].slice.call(i.parentNode.children);openLb(l,l.indexOf(i))});
lx.onclick=closeLb;lp.onclick=function(){show(at-1)};ln.onclick=function(){show(at+1)};
lb.addEventListener("click",function(e){if(e.target===lb)closeLb()});
document.addEventListener("fullscreenchange",function(){if(!document.fullscreenElement)closeLb()});
document.addEventListener("keydown",function(e){if(lb.hidden)return;if(e.key==="Escape")closeLb();else if(e.key==="ArrowLeft")show(at-1);else if(e.key==="ArrowRight")show(at+1)});
lb.addEventListener("touchstart",function(e){tx=e.touches[0].clientX},{passive:true});
lb.addEventListener("touchend",function(e){if(tx===null)return;var d=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(d)>50)show(at+(d<0?1:-1))});
})();
