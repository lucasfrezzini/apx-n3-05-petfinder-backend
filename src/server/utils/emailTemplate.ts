export function getHTMLString(
  pet_name: string,
  pet_owner_name: string,
  name: string,
  phone: string,
  info: string
) {
  return `
    <style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
body, a, li, p, h1, h2, h3 {
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
}
html {
-webkit-text-size-adjust: none !important
}
body, #innerTable {
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
#innerTable img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
line-height: inherit;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
u + #body a {
color: inherit;
text-decoration: none;
font-size: inherit;
font-family: inherit;
font-weight: inherit;
line-height: inherit;
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit;
text-decoration: none
}
</style>
<style type="text/css">
@media (min-width: 481px) {
.hd { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.hm { display: none!important }
}
</style>
<style type="text/css">
@media (max-width: 480px) {
.t56{mso-line-height-alt:0px!important;line-height:0!important;display:none!important}.t57{padding-left:30px!important;padding-bottom:40px!important;padding-right:30px!important}.t104{padding:40px 30px!important}.t100{padding-bottom:36px!important}.t96{text-align:center!important}.t67,.t69,.t73,.t75,.t79,.t81,.t85,.t87,.t91,.t93{display:revert!important}.t71,.t77,.t83,.t89,.t95{vertical-align:top!important;width:44px!important}.t1{padding-bottom:50px!important}.t3{width:80px!important}.t6{padding-bottom:20px!important}.t5{line-height:28px!important;font-size:26px!important;letter-spacing:-1.04px!important}
}
</style>
<!--[if !mso]>-->
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700;800&amp;display=swap" rel="stylesheet" type="text/css" />
<!--<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body id="body" class="t110" style="min-width:100%;Margin:0px;padding:0px;background-color:#fff;"><div class="t109" style="background-color:#fff;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t108" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#fff;" valign="top" align="center">
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color="#fff"/>
</v:background>
<![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td><div class="t56" style="mso-line-height-rule:exactly;mso-line-height-alt:45px;line-height:45px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t60" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="600" class="t59" style="background-color:#F8F8F8;width:600px;">
<table class="t58" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t57" style="padding:0 50px 60px 50px; background-color: white !important"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="left">
<table class="t4" role="presentation" cellpadding="0" cellspacing="0" style="Margin-right:auto;"><tr><td width="180" class="t3" style="width:180px;">
<table class="t2" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t1" style="padding:30px 0 60px 0;"><div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="180" alt="" src="https://res.cloudinary.com/dhwquhtqs/image/upload/v1744807149/petRescue1_oenjab.png"/></div></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t9" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t8" style="width:600px;">
<table class="t7" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t6" style="padding:0 0 15px 0;"><h1 class="t5" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:800;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:-1px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">¡Hola ${pet_owner_name}!<br/> Alguien vio a tu mascota ${pet_name} 🐶🐱</h1></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t14" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t13" style="width:600px;">
<table class="t12" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t11" style="padding:0 0 22px 0;"><p class="t10" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">¡Buenas noticias! Hemos recibido una notificación sobre tu mascota reportada y alguien la ha visto. Aquí tienes los detalles que nos proporcionaron:</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t20" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t19" style="background-color:#FFD599;width:600px;">
<table class="t18" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t17" style="padding:22px 22px 22px 22px;"><p class="t16" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${info}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t21" style="mso-line-height-rule:exactly;mso-line-height-alt:22px;line-height:22px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t27" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t26" style="width:600px;">
<table class="t25" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t24"><p class="t23" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">📞 <span class="t22" style="margin:0;Margin:0;font-weight:700;font-size:16px;mso-line-height-rule:exactly;">Contacto</span></p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t32" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t31" style="width:600px;">
<table class="t30" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t29" style="padding:0 0 22px 0;"><p class="t28" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${phone}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t37" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t36" style="width:600px;">
<table class="t35" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t34"><p class="t33" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:bold;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">👨🏼‍💻 Nombre / Correo</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t42" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t41" style="width:600px;">
<table class="t40" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t39" style="padding:0 0 22px 0;"><p class="t38" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">${name}</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t47" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t46" style="width:600px;">
<table class="t45" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t44"><p class="t43" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">No dudes en comunicarte con esta persona para obtener más detalles o coordinar la entrega. ¡Estamos seguros de que pronto estarán juntos de nuevo!</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td><div class="t48" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;&nbsp;</div></td></tr><tr><td align="center">
<table class="t55" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t54" style="width:600px;">
<table class="t53" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t52"><p class="t51" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Si necesitas ayuda, aquí estamos para apoyarte.&nbsp; <br/>Un abrazo, <span class="t50" style="margin:0;Margin:0;mso-line-height-rule:exactly;"><span class="t49" style="margin:0;Margin:0;font-weight:700;mso-line-height-rule:exactly;">Pet Rescue App</span></span></p></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t107" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="600" class="t106" style="background-color:#DFE4EA;width:600px;">
<table class="t105" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t104" style="padding:48px 50px 48px 50px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100% !important;"><tr><td align="center">
<table class="t65" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t64" style="width:600px;">
<table class="t63" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t62"><p class="t61" style="margin:0;Margin:0;font-family:Albert Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:800;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:-0.9px;direction:ltr;color:#787878;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">Diseño y desarrollo por Lucas Frezzini</p></td></tr></table>
</td></tr></table>
</td></tr><tr><td align="center">
<table class="t103" role="presentation" cellpadding="0" cellspacing="0" style="Margin-left:auto;Margin-right:auto;"><tr><td width="500" class="t102" style="width:800px;">
<table class="t101" role="presentation" cellpadding="0" cellspacing="0" width="100%" style="width:100%;"><tr><td class="t100" style="padding:10px 0 0 0;"><div class="t99" style="width:100%;text-align:center;"><div class="t98" style="display:inline-block;"><table class="t97" role="presentation" cellpadding="0" cellspacing="0" align="center" valign="top">
<tr class="t96"><td></td>
<td class="t71" width="44" valign="top">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="t70" style="width:100%;"><tr><td class="t67" style="width:10px;" width="10"></td><td class="t68"><div style="font-size:0px;"><a href="https://www.instagram.com/lucasfrezzini/" target="_blank"><img class="t66" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://res.cloudinary.com/dhwquhtqs/image/upload/v1745033143/instragram_vgusrb.png"/></a></div></td><td class="t69" style="width:10px;" width="10"></td></tr></table>
</td>
<td class="t77" width="44" valign="top">
<table role="resentation" wipdth="100%" cellpadding="0" cellspacing="0" class="t76" style="width:100%;"><tr><td class="t73" style="width:10px;" width="10"></td><td class="t74"><div style="font-size:0px;"><a href="https://www.linkedin.com/in/lucasfrezzini/" target="_blank"><img class="t72" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://res.cloudinary.com/dhwquhtqs/image/upload/v1745033143/linkedin_kifad7.png"/></a></div></td><td class="t75" style="width:10px;" width="10"></td></tr></table>
</td>
<td class="t77" width="44" valign="top">
<table role="resentation" wipdth="100%" cellpadding="0" cellspacing="0" class="t76" style="width:100%;"><tr><td class="t73" style="width:10px;" width="10"></td><td class="t74"><div style="font-size:0px;"><a href="https://github.com/lucasfrezzini" target="_blank"><img class="t72" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="24" height="24" alt="" src="https://res.cloudinary.com/dhwquhtqs/image/upload/v1745033143/github_ipxkdy.png"/></a></div></td><td class="t75" style="width:10px;" width="10"></td></tr></table>
</td>



<td></td></tr>
</table></div></div></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table>
</td></tr></table>
</td></tr></table></td></tr></table></div><div class="gmail-fix" style="display: none; white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div>
    `;
}
