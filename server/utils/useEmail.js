import querystring from 'querystring'
import https from 'https'

import ElasticEmail from '@elasticemail/elasticemail-client'
// See https://github.com/ElasticEmail/elasticemail-js/blob/master/examples/functions/sendBulkEmails.js

export default function useEmail() {
  const CONFIG = useRuntimeConfig()
  const dt = new Date()

  /////////////////////////////
  async function sendNewsletters(
    recipientss,
    newsletter_subject,
    newsletter_body_html,
    newsletter_id,
  ) {
    // local function
    // used to create
    function composeEmail(recipient, newsletter_body_html, newsletter_subject) {
      const TRACKING = `${CONFIG.public.HOST}/newsletters/track?account_id=${recipient.account_id}&newsletter_id=${newsletter_id}`
      const TRACKINGPIXEL = `<img src="${TRACKING}" style="width:1px;height:1px" alt="" />`
      ///////// Template from https://dashboard.unlayer.com/create/blank?ref=templates ////////////////////////////////

      const BEGIN_HTML = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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

      <style type="text/css">

      .ql-indent-1,
      .ql-indent-2,
      .ql-indent-3 {
        margin: 10px;
        padding: 0.5rem;
        padding-left: 2rem;
      }
      .ql-align-center {	text-align: center;	}
      .ql-align-justify {	text-align: justify;}
      .ql-align-right {	text-align: right;}
      .ql-font-serif {
        font-family: serif;
      }
      .ql-size-huge {
        font-size: xx-large;
      }
      .ql-size-large {
        font-size: xx-large;
      }
      .ql-size-small {
        font-size: small;
      }

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

    table, td { color: #000000; } </style>
  </head>

  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #dfdfdf;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->



    <!--
     ${TRACKINGPIXEL}
    image->
    <img src="https://buffalorugby.org/newsletters/track?account_id=1933&newsletter_id=2749" height="1" width="1"  alt=""/>
    <<-
    -->

    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #dfdfdf;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #dfdfdf;"><![endif]-->
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->

  <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->

  <!-- TITLE -->

  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

    <!--[if mso]><table width="100%"><tr><td><![endif]-->
      <h1 style="margin: 0px; color: #0200e0; line-height: 140%; text-align: center; word-wrap: break-word; font-family: arial black,AvenirNext-Heavy,avant garde,arial; font-size: 36px; font-weight: 400;"><span><span><span><span>Buffalo Rugby News</span></span></span></span></h1>
    <!--[if mso]></td></tr></table><![endif]-->

        </td>
      </tr>
    </tbody>
  </table>

  <!-- DATE -->

  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:16px;font-family:arial,helvetica,sans-serif;" align="center">

    <!--[if mso]><table width="100%"><tr><td><![endif]-->
      <h5 style="margin: 0px; color: #0200e0;  text-align: center; font-family:arial,helvetica,sans-serif; font-size: 16px; font-weight: 400;"><span><span><span><span>${dt.toDateString()}</span></span></span></span></h5>
    <!--[if mso]></td></tr></table><![endif]-->

        </td>
      </tr>
    </tbody>
  </table>

  <!-- SUBJECT -->

  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:18px;font-family:arial,helvetica,sans-serif;" align="center">

    <!--[if mso]><table width="100%"><tr><td><![endif]-->
      <h5 style="margin: 0px;   text-align: center; font-family:arial,helvetica,sans-serif; font-size: 18px; font-weight: 400;">${newsletter_subject}</h5>
    <!--[if mso]></td></tr></table><![endif]-->

        </td>
      </tr>
    </tbody>
  </table>
  <!-- TRACKINGPIXEL -->

       ${TRACKINGPIXEL}

  <!-- CONTENT -->

  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

      <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
        <p>`

      // content goes here

      const NEWSLETTER_END_STYLES = `</p>
      </div>

        </td>
      </tr>
    </tbody>
  </table>

  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">

          <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <tbody>
              <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                  <span>&#160;</span>
                </td>
              </tr>
            </tbody>
          </table>

        </td>
      </tr>
    </tbody>
  </table>

  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
              <p>This is Your Current Contact Info.</p>
              <p> Please <a href="${CONFIG.public.HOST}/update/918J275B654I${recipient.account_id}" target="_blank"> Update your info if necessary</a></p>
              <table>
                <tbody>
                  <tr><td>${recipient.member_firstname} ${recipient.member_lastname}</td></tr>
                  <tr><td>${recipient.account_addr_street}</td></tr>
                  <tr><td>${recipient.account_addr_street_ext}</td></tr>
                  <tr><td>${recipient.account_addr_city}, ${recipient.account_addr_state} ${recipient.account_addr_postal}</td></tr>
                  <tr><td>${recipient.account_addr_country}</td></tr>
                  <tr><td>${recipient.account_addr_phone}</td></tr>
                  <tr><td>Year Joined the BRC ${recipient.member_year}</td></tr>
                  <tr><td>Previous teams ${recipient.member_prev_club}</td></tr>
                </tbody>
              </table>
          </div>
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
</html>`
      //
      // This object conforms to Recipients key in "emailsPost"
      // Fields object defines template values in Content key
      // See https://github.com/ElasticEmail/elasticemail-js/blob/master/examples/functions/sendBulkEmails.js
      const email = {
        Email: recipient.account_email,
        Fields: {
          body: BEGIN_HTML + newsletter_body_html + NEWSLETTER_END_STYLES,
          subject: newsletter_subject,
        },
      }

      return email
    }
    // end of composeremail

    let k = 0
    let emails = []
    let sentlist = []
    // console.log('recipientss = ', recipientss)

    // create array of objects suitable for EE v4 bulk email
    do {
      // console.log(k, ' ', recipientss[k].account_email)
      sentlist.push(recipientss[k].account_email)
      // array of objects with recipients info
      emails.push(
        composeEmail(recipientss[k], newsletter_body_html, newsletter_subject),
      )
      k++
    } while (k < recipientss.length)
    // See https://github.com/ElasticEmail/elasticemail-js/blob/master/examples/functions/sendBulkEmails.js
    sendEmailEE(emails)

    return { success: sentlist.length, sentlist: sentlist }
  }

  // Bulk email send
  //
  function sendEmailEE(emails) {
    //
    //
    const callback = (error, data, response) => {
      if (error) {
        console.error(error)
      } else {
        console.log('response.res.statusMessage = ', response.res.statusMessage)
      }
    }

    // console.log('in sendEmailEE ', emails[0].Email, emails[0].Fields.subject)
    // console.log('in sendEmailEE ', emails[1].Email, emails[1].Fields.subject)
    //
    const defaultClient = ElasticEmail.ApiClient.instance
    const apikey = defaultClient.authentications['apikey']
    apikey.apiKey = CONFIG.EE_API_KEY

    const emailsApi = new ElasticEmail.EmailsApi()
    const emailData = {
      Recipients: emails,
      Content: {
        Body: [
          {
            ContentType: 'HTML',
            Charset: 'utf-8',
            Content: '{body}',
          },
          {
            ContentType: 'PlainText',
            Charset: 'utf-8',
            Content: 'Hi!',
          },
        ],
        From: 'secretary@buffalorugby.org',
        Subject: '{subject}',
      },
    }
    emailsApi.emailsPost(emailData, callback)
  }

  // Bulk email send
  //
  function getStatusEmailEE(transaction) {
    //
    //
    const callback = (error, data, response) => {
      if (error) {
        console.error(error)
      } else {
        console.log('response.res.statusMessage = ', response.res.statusMessage)
      }
    }

    // console.log('in sendEmailEE ', emails[0].Email, emails[0].Fields.subject)
    // console.log('in sendEmailEE ', emails[1].Email, emails[1].Fields.subject)
    //
    const defaultClient = ElasticEmail.ApiClient.instance
    const apikey = defaultClient.authentications['apikey']
    apikey.apiKey = CONFIG.EE_API_KEY

    const statsApi = new ElasticEmail.EmailsApi()

    statsApi.emailsByTransactionidStatusGet(transaction, callback)
  }

  // single email send
  //
  function sendEmail(to, subject, message) {
    const post_data = querystring.stringify({
      api_key: CONFIG.EE_API_KEY,
      subject: subject,
      from: CONFIG.FROM,
      fromName: CONFIG.FROM_NAME,
      to: to,
      body_html: message,
      body_text: '',
      isTransactional: false,
    })

    const post_options = {
      hostname: 'api.elasticemail.com',
      path: '/v2/email/send',
      port: '443',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': post_data.length,
      },
    }

    const req = https.request(post_options, (res) => {
      console.log('statusCode:', res.statusCode)
    })

    req.on('error', (e) => {
      console.error(e)
    })

    req.write(post_data)
    req.end()
  }

  return {
    sendEmail,
    sendNewsletters,
    getStatusEmailEE,
  }
}
