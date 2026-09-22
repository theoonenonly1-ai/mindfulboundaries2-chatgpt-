export default function handler(_req,res){
 const url=process.env.STRIPE_PAYMENT_LINK;
 if(!url) return res.status(503).send("Zahlungslink ist noch nicht konfiguriert.");
 return res.redirect(302,url);
}