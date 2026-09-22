import crypto from "node:crypto";
import { verifyAccess } from "./_auth.js";

const APP_URL=process.env.APP_URL||"/app.html";

export default async function handler(req,res){
 try{
  if(verifyAccess(req)) return res.redirect(302,APP_URL);
  const sessionId=req.query?.session_id;
  if(!sessionId) return res.status(401).send("Kein gültiger Checkout-Nachweis. Bitte über den Kaufbutton starten.");
  if(!process.env.STRIPE_SECRET_KEY) return res.status(503).send("STRIPE_SECRET_KEY ist auf dem Server noch nicht konfiguriert.");
  if(!process.env.THEOONE_PRICE_ID) return res.status(503).send("THEOONE_PRICE_ID ist auf dem Server noch nicht konfiguriert.");
  if(!process.env.ACCESS_SECRET) return res.status(503).send("ACCESS_SECRET ist auf dem Server noch nicht konfiguriert.");

  const sessionResponse=await fetch("https://api.stripe.com/v1/checkout/sessions/"+encodeURIComponent(sessionId),{
   headers:{Authorization:"Bearer "+process.env.STRIPE_SECRET_KEY}
  });
  const session=await sessionResponse.json();
  if(!sessionResponse.ok) return res.status(401).send("Checkout konnte nicht verifiziert werden.");
  if(session.payment_status!=="paid") return res.status(402).send("Die Zahlung ist noch nicht als bezahlt bestätigt.");

  const itemsResponse=await fetch("https://api.stripe.com/v1/checkout/sessions/"+encodeURIComponent(sessionId)+"/line_items?limit=20",{
   headers:{Authorization:"Bearer "+process.env.STRIPE_SECRET_KEY}
  });
  const items=await itemsResponse.json();
  if(!itemsResponse.ok) return res.status(401).send("Kaufposition konnte nicht verifiziert werden.");
  const valid=Array.isArray(items.data)&&items.data.some(item=>item.price?.id===process.env.THEOONE_PRICE_ID);
  if(!valid) return res.status(403).send("Dieser Checkout gehört nicht zum THEOONE Office AI Produkt.");

  const payload=Buffer.from(JSON.stringify({
   product:"theoone-office-ai",
   sessionId,
   exp:Date.now()+1000*60*60*24*3650
  })).toString("base64url");
  const sig=crypto.createHmac("sha256",process.env.ACCESS_SECRET).update(payload).digest("base64url");

  res.setHeader("Set-Cookie", "theoone_access="+payload+"."+sig+"; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=315360000");
  return res.redirect(302,APP_URL);
 }catch{return res.status(500).send("Zugangsprüfung fehlgeschlagen.");}
}