const config = require('../config');

class MailTemplets {
  static get Header() {
    return `
    <table width="50%" align="center" bgcolor="#ff7f7f"  border="0" cellpadding="0" cellspacing="0" style="border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px; margin-bottom: 15px;">
        <tr>
          <td style="padding: 10px 0;">
            <h1 style="text-align: center; margin: 20px 0;">{subject}</h1>
          </td>
        </tr>
      </table>
        `;
  }
  static get Footer() {
    return `
        <table width="50%" align="center" bgcolor="#ff7f7f" border="0" cellpadding="0" cellspacing="0" style="border-radius: 10px; -webkit-border-radius: 10px; -moz-border-radius: 10px; margin-top: 15px;">
            <tr>
                <td style="padding: 10px 0;">
                    <h1 style="text-align:center; margin: 20px 0;">
                        <a href="${config.Client_Url[0]}"
                        target="_blank"

                        style="text-decoration: none; color: #000;"
                        >${config.APP_NAME}</a>
                    </h1>
                </td>
            </tr>
        </table>
        `;
  }

  static get SIGNUP() {
    return `
  <!doctype html>
  <html>
  <body>

${MailTemplets.Header}

  <table width="60%" align="center" bgcolor="transparent" style="border: 1px solid #fff; border-radius: 20px; backdrop-filter: blur(20px); padding: 20px;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="font-size: 24px; text-align: center;">
        Your Account Has Been Created Successfully.
      </td>
    </tr>
    <tr>
      <td style="font-size: 18px; text-align: center;">
        <strong>Created At:</strong> {currentDate}
      </td>
    </tr>
    <tr>
      <td style="font-size: 18px; text-align: center;">
        <strong>User Name:</strong> {username}
      </td>
    </tr>
    <tr>
      <td style="font-size: 18px; text-align: center;">
        <strong>Email Address:</strong> {email}
      </td>
    </tr>
    <tr>
      <td style="font-size: 18px; text-align: center;">
        <strong>Confirm Account Code:</strong> {code}
      </td>
    </tr>
    <tr>
      <td style="text-align: center;">
        <a href="{url}" target="_blank" style="text-decoration: none; background-color: rgba(129,50,50,0.46); color: #00f; padding: 10px 20px; border-radius: 20px;">Confirm Account</a>
      </td>
    </tr>
  
  </table>

  
  ${MailTemplets.Footer}
  </body>
  </html>
  `;
  }

  static get ACCEPT_LOGIN() {
    return `
  <!doctype html>
  <html>
  
  <body>
  
  ${MailTemplets.Header}

  <table width="100%" bgcolor="transparent" style="border:1px solid #fff;border-radius:20px;backdrop-filter:blur(20px);padding:20px 50px;" cellpadding="0" cellspacing="0">
  
    <tr>
      <td style="font-size:24px;line-height:1.5em;text-align:center;">
        Please Use Code Below To Login
      </td>
    </tr>
  

    <tr>
      <td style="font-size:18px;text-align:center;">
        <strong>Confirm Code:</strong> 
        <strong style="color:red">{code}</strong>
      </td>
    </tr>

    </tr>
  
  </table>
        ${MailTemplets.Footer}
  </body>
  </html>
      `;
  }
  static get UPDATE_EMAIL() {
    return `
  <!doctype html>
  <html>
  
  <body>
  
  ${MailTemplets.Header}

  <table width="100%" bgcolor="transparent" style="border:1px solid #fff;border-radius:20px;backdrop-filter:blur(20px);padding:20px 50px;" cellpadding="0" cellspacing="0">
  
    <tr>
      <td style="font-size:24px;line-height:1.5em;text-align:center;">
        You Have Requested To Update Your Email<br/>
        Please Click On The Link Below<br/>
        Or Copy And Paste Code In Your Browser
      </td>
    </tr>
  
    <tr>
      <td style="font-size:18px;text-align:center;">
        <strong>Old Email Address:</strong> {from}
      </td>
    </tr>
  
    <tr>
      <td style="font-size:18px;text-align:center;">
        <strong>New Email Address:</strong> {to}  
      </td>
    </tr>
  
    <tr>
      <td style="font-size:18px;text-align:center;">
        <strong>Confirm Code:</strong> {code}
      </td>
    </tr>
  
    <tr>
      <td style="text-align:center;">
        <a href="{url}" target="_blank" style="text-decoration:none;background-color:rgba(129,50,50,0.46);color:#00f;padding:10px 20px;border-radius:20px;">
          Confirm Email
        </a>
      </td>
    </tr>
  
  </table>
        ${MailTemplets.Footer}
  </body>
  </html>
      `;
  }
  static get ACTIVE_PENDING() {
    return `
  <!doctype html>
<html>
<head>
  <meta charset="UTF-8"> 
</head>

<body>
${MailTemplets.Header}


<table width="80%" align="center" bgcolor="#add8e6" style="border:1px solid #fff;border-radius:20px;padding:20px;text-align:center;">
  <tr>
    <td style="font-size:24px;line-height:1.5em;">
      Congratulations.<br/>
      Your Account Has Been Activated Successfully.<br/>
      You Can Login To Your Account And Start Using It<br/>
      Welcome To {name}
    </td>
  </tr>

  <tr>
    <td style="font-size:18px;">
      <strong>Subscription Start Date:</strong> {start}
    </td>
  </tr>

  <tr>
    <td style="font-size:18px;">  
      <strong>Subscription End Date:</strong> {end}
    </td>
  </tr>

  <tr>
    <td style="font-size:18px;">
      <strong>Accepted By:</strong> {accepted_by}
    </td> 
  </tr>

</table>
${MailTemplets.Footer}
</body>
</html>
      `;
  }

  static get REJECT_PENDING() {
    return `
  <!doctype html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>

${MailTemplets.Header}


  <table width="80%" align="center" bgcolor="#add8e6" style="border: 1px solid #fff; border-radius: 20px; padding: 20px; text-align: center;">
    <tr>
      <td style="font-size:24px;line-height:1.5em;">
        Hello Dear,<br/>
        Your Account Has Been Rejected.<br/>
        We Are So Sorry About That
      </td>
    </tr>

    <tr>
      <td style="font-size: 18px;">
        <strong>Reject Reason:</strong> {reason}
      </td>  
    </tr>

    <tr>
      <td style="font-size: 18px;">
        <strong>Rejected By:</strong> {rejected_by}
      </td>
    </tr>

  </table>

  ${MailTemplets.Footer}
</body>
</html>
  `;
  }
}

module.exports = MailTemplets;
