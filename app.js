let workflows=[],selected=null,mode="standard",favorites=JSON.parse(localStorage.getItem("theooneFavorites")||"[]"),history=JSON.parse(localStorage.getItem("theooneHistory")||"[]"),showFavorites=false;
const $=id=>document.getElementById(id);
const baseRules=["Nutze ausschließlich die bereitgestellten Informationen.","Erfinde keine Fakten, Zahlen, Termine, Quellen oder Zusagen.","Fehlende Angaben mit [OFFEN] markieren.","Unklare oder widersprüchliche Angaben kurz kennzeichnen."];
const quality=["Nur belegte Angaben verwenden.","Keine Fakten, Zahlen, Termine, Zusagen oder Quellen erfinden.","Fehlende Angaben als [OFFEN] markieren.","Widersprüche sichtbar machen.","Vor Ausgabe auf Klarheit und Vollständigkeit prüfen.","Danach nur das fertige Ergebnis ausgeben, gefolgt von maximal 3 kurzen Hinweisen."];
async function init(){
 try{
  const response=await fetch("/api/workflows");
  if(response.status===401){
   document.querySelector("main").innerHTML='<section class="intro" style="max-width:760px;margin:80px auto;text-align:center"><div><small>THEOONE OFFICE AI · PREMIUM ACCESS</small><h1>Dein Zugang ist noch nicht freigeschaltet.</h1><p>Der Premium-Bereich wird nach erfolgreicher Zahlung automatisch geöffnet.</p><a href="/#angebot" style="display:inline-block;margin-top:20px;padding:14px 20px;border:1px solid currentColor;border-radius:10px;text-decoration:none">Zur Produktseite</a></div></section>';
   return;
  }
  if(!response.ok) throw new Error("Zugriff konnte nicht geprüft werden.");
  workflows=await response.json();
  render();
 }catch(e){
  $("title").textContent="Zugang konnte nicht geladen werden";
  $("desc").textContent=e.message;
 }
}
function render(filter=""){const box=$("categories");box.innerHTML="";[...new Set(workflows.map(w=>w.category))].forEach(cat=>{const list=workflows.filter(w=>w.category===cat&&(w.title+" "+w.description).toLowerCase().includes(filter.toLowerCase())&&(!showFavorites||favorites.includes(w.id)));if(!list.length)return;const sec=document.createElement("section");sec.className="cat";sec.innerHTML="<h3>"+cat+"</h3>";list.forEach(w=>{const b=document.createElement("button");b.className="wf"+(selected&&selected.id===w.id?" active":"");b.textContent=w.id+". "+w.title;b.onclick=()=>select(w);sec.appendChild(b)});box.appendChild(sec)})}
function select(w){selected=w;$("category").textContent=w.category;$("title").textContent=w.id+". "+w.title;$("desc").textContent=w.description;$("output").textContent="Bereit. Kontext eingeben und Prompt erstellen.";$("copy").disabled=true;$("favorite").disabled=false;$("favorite").textContent=favorites.includes(w.id)?"★ Favorit":"☆ Favorit";render($("search").value)}
function val(id){return $(id).value.trim()||"[HIER EINFÜGEN]"}
function makePrompt(){if(!selected){$("output").textContent="Bitte zuerst einen Workflow auswählen.";return}const input=$("context").value.trim()||"[HIER EINFÜGEN]";let out=[];if(mode==="standard"){out=["THEOONE OFFICE AI – PROMPT "+selected.id,"","[STANDARD]","Rolle: Arbeite als professioneller Arbeitsassistent.","Aufgabe: "+selected.title+".","Kontext: "+selected.description,"Input:",input,"","Ziel: Erstelle ein direkt nutzbares Ergebnis.","Format: klar strukturiert, kompakt und gut kopierbar.","Regeln:",...baseRules.map(x=>"- "+x),"- Ergebnis zuerst, danach höchstens 3 kurze Verbesserungshinweise."]}else{out=["THEOONE OFFICE AI – PROMPT "+selected.id,"","[PRÄZISION]","Bearbeite folgende Aufgabe: "+selected.title+".","Arbeitsprinzip: "+selected.description,"","INPUT:",input,"","ZIELGRUPPE / EMPFÄNGER:",val("recipient"),"","GEWÜNSCHTE WIRKUNG:",val("effect"),"","AUSGABEFORMAT:",val("format"),"","LÄNGE:",val("length"),"","TON:",val("tone"),"","PFLICHTINFORMATIONEN:",val("required"),"","NICHT ENTHALTEN:",val("exclude"),"","Qualitätsprüfung:",...quality.map((x,i)=>(i+1)+". "+x)]}$("output").textContent=out.join("\n");$("copy").disabled=false;history=[{id:selected.id,title:selected.title,mode,time:new Date().toISOString()},...history.filter(x=>x.id!==selected.id||x.mode!==mode)].slice(0,12);localStorage.setItem("theooneHistory",JSON.stringify(history))}
$("search").oninput=e=>render(e.target.value);
document.querySelectorAll(".mode button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".mode button").forEach(x=>x.classList.remove("active"));b.classList.add("active");mode=b.dataset.mode;$("precisionFields").hidden=mode!=="precision"});
async function runAI(){
 if(!selected){makePrompt();return}
 const input=$("context").value.trim();
 if(!input){$("output").textContent="Bitte zuerst Kontext/Input eingeben.";return}
 const fields={recipient:val("recipient"),effect:val("effect"),format:val("format"),length:val("length"),tone:val("tone"),required:val("required"),exclude:val("exclude")};
 $("output").textContent="KI wird ausgeführt …";$("copy").disabled=true;
 try{
  const r=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workflow:selected,mode,input,fields})});
  const data=await r.json();if(!r.ok)throw new Error(data.error||"KI-Anfrage fehlgeschlagen.");
  $("output").textContent=data.output||"Kein Ergebnis erhalten.";$("copy").disabled=false;
 }catch(e){$("output").textContent="KI-Ausführung nicht verfügbar. Der Prompt kann weiterhin mit „Prompt erstellen“ erzeugt werden.\n\n"+e.message}
}
$("run").onclick=runAI;
$("copy").onclick=async()=>{await navigator.clipboard.writeText($("output").textContent);$("copy").textContent="KOPIERT ✓";setTimeout(()=>$("copy").textContent="KOPIEREN",1300)};
$("clear").onclick=()=>{$("output").textContent="";$("copy").disabled=true};
$("favorite").onclick=()=>{if(!selected)return;favorites=favorites.includes(selected.id)?favorites.filter(id=>id!==selected.id):[...favorites,selected.id];localStorage.setItem("theooneFavorites",JSON.stringify(favorites));select(selected)};
$("favoritesOnly").onclick=()=>{showFavorites=!showFavorites;$("favoritesOnly").textContent=showFavorites?"★ Alle Workflows":"★ Favoriten";render($("search").value)};
$("historyBtn").onclick=()=>{if(!history.length){alert("Noch kein Verlauf vorhanden.");return}alert("Zuletzt verwendet:\n\n"+history.map(x=>x.id+". "+x.title+" — "+x.mode).join("\n"))};
init();