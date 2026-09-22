import crypto from "node:crypto";

export function verifyAccess(req){
 if(!process.env.ACCESS_SECRET) return false;
 const raw=req.headers.cookie?.match(/(?:^|; )theoone_access=([^;]+)/)?.[1];
 if(!raw) return false;
 try{
  const [payload,sig]=raw.split(".");
  if(!payload||!sig) return false;
  const expected=crypto.createHmac("sha256",process.env.ACCESS_SECRET).update(payload).digest("base64url");
  const a=Buffer.from(sig), b=Buffer.from(expected);
  if(a.length!==b.length||!crypto.timingSafeEqual(a,b)) return false;
  const data=JSON.parse(Buffer.from(payload,"base64url").toString());
  return Boolean(data.exp && data.exp>Date.now() && data.product==="theoone-office-ai");
 }catch{return false;}
}