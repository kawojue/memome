import { sendPlunkEmail } from '../helpers/sendEmail'

const welcome = async (username: string, email: string) => {
  await sendPlunkEmail({
    to: email,
    subject: 'Welcome to MemoMe',
    body: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>

    <style type="text/css">
      @media only screen and (min-width: 520px) {
  .u-row {
    width: 500px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 500px !important;
  }

}

@media (max-width: 520px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } @media (max-width: 480px) { #u_content_heading_2 .v-font-size { font-size: 14px !important; } #u_content_heading_2 .v-text-align { text-align: center !important; } #u_content_heading_2 .v-line-height { line-height: 130% !important; } #u_content_heading_3 .v-font-size { font-size: 18px !important; } #u_content_text_2 .v-text-align { text-align: left !important; } #u_content_text_3 .v-line-height { line-height: 130% !important; } }
    </style>

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">

      <img align="center" border="0" src="https://d15zb4m4p46ai4.cloudfront.net/Dist/logo-1.png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 30%;max-width: 144px;" width="144"/>

    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

  <h1 class="v-text-align v-line-height v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 21px; font-weight: 400;">Welcome to MemoMe<br />Your Ultimate Anonymous Communication Platform</h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_heading_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

  <h3 class="v-text-align v-line-height v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 18px; font-weight: 400;">Dear <strong>${username}</strong>,</h3>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-family: 'Lato',sans-serif; font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;">We are thrilled to welcome you to MemoMe, the premier anonymous communication platform, meticulously crafted by our cook,<strong> Kawojue Raheem Olumuyiwa</strong>. Thank you for choosing MemoMe as your preferred platform for open and secure communication.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-family: 'Lato',sans-serif; font-size: 15px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 130%;"><strong>Unmatched Features:</strong></p>
<p style="line-height: 130%;">What sets MemoMe apart as the best anonymous website in the market are its unique features. You can send and receive text messages, images, and videos with the flexibility to toggle received text and media on or off, giving you complete control over your interactions.</p>
  </div>
</table>

<table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-family: 'Lato',sans-serif; font-size: 15px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 130%;"><strong>Host and Share Polls:</strong></p>
<p style="line-height: 130%;">MemoMe allows you to create and host polls with up to ten options and without an expiry date. You can easily share the poll link with others, encouraging them to participate and share their opinions anonymously. This feature makes MemoMe the perfect platform for gathering insights, making decisions, and engaging with the community.</p>
  </div>
</table>

<table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-family: 'Lato',sans-serif; font-size: 15px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 130%;"><strong>Content Control:</strong></p>
<p style="line-height: 130%;">MemoMe also enables you to edit your bio and conveniently download the original media sent to you, enhancing your user experience.</p>
  </div>
</table>

<table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-family: 'Lato',sans-serif; font-size: 15px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 130%;"><strong>Privacy and Security:</strong></p>
<p style="line-height: 130%;">We take your anonymity seriously. MemoMe offers account disabling options, allowing you to deactivate your account temporarily, adding an extra layer of privacy and security to safeguard your anonymity. All messages on MemoMe are encrypted to ensure your communications remain confidential and secure.</p>
  </div>
</table>

<table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-family: 'Lato',sans-serif; font-size: 15px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 130%;"><strong>Empowering Communication:</strong></p>
<p style="line-height: 130%;">MemoMe is not just another anonymous website; it is a platform that empowers you to communicate openly and honestly without the fear of judgment or consequences. It's the perfect place for sharing secrets, expressing emotions, and connecting with people from diverse backgrounds, all while preserving your anonymity and privacy.</p>
  </div>
</table>

<table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-family: 'Lato',sans-serif; font-size: 15px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 130%;"><strong>Unlock New Horizons with MemoMe Levels:</strong></p>
<p style="line-height: 130%;">As you continue to engage with MemoMe, you'll notice your level increasing. This isn't just a number; it's a symbol of your dedication to our community</p>
  </div>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-family: 'Lato',sans-serif; font-size: 15px; line-height: 130%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 130%;">In summary, MemoMe offers a user-friendly interface combined with robust features. Whether you're here to host polls, utilize our message generator, or explore the array of communication options, MemoMe is your ideal choice.</p>
<p style="line-height: 130%;"> </p>
<p style="line-height: 130%;">We look forward to having you as an active member of our community and witnessing how you use the platform to host polls, gather opinions, and engage in anonymous voting.</p>
<p style="line-height: 130%;"> </p>
<p style="line-height: 130%;">Thank you for choosing MemoMe for your anonymous communication needs. Together, we'll redefine communication in a secure and open environment.</p>
  </div>

  <table id="u_content_text_3" style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
        
  <div class="v-line-height v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 120%;">Warm regards,</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">
        
  <div class="v-line-height v-font-size" style="font-family: 'Lato',sans-serif; font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;">Kawojue Raheem O.,</p>
<p style="line-height: 140%;">Software Engineer.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  
    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
        `
  })
}

export default welcome