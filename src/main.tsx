import './styles.css';
// Production HTML is pre-rendered: load interaction code after the first paint.
let loaded:Promise<unknown>|undefined;
let interactive=false;
const activate=()=>loaded??=(import('./hydrate').then(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>{interactive=true;resolve()}))));
// Keep an early click on an interactive control while hydration is loading.
document.addEventListener('click',event=>{
 const button=(event.target as Element).closest('button');
 if(button&&!interactive){event.preventDefault();event.stopImmediatePropagation();void activate().then(()=>{if(button.isConnected)button.click()})}
},true);
document.addEventListener('pointerdown',()=>{void activate()},{once:true,passive:true});
document.addEventListener('focusin',()=>{void activate()},{once:true});
if(document.getElementById('root')?.querySelector('main')) {
 const schedule=()=>{if('requestIdleCallback' in window) window.requestIdleCallback(activate,{timeout:1200});else setTimeout(activate,100)};
 if(document.readyState==='complete')schedule();else window.addEventListener('load',schedule,{once:true});
} else {void activate();}
