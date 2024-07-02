export const message = {
    otp: async (name, otp, email, days) => `
    <tr>
        <td align="center" bgcolor="#e9ecef" >
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="center" valign="top" style="background-color: #293845;">
                <p style="font-size:20px;color:white;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;"><b>Team AST<b></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
          <tr>
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td   style="font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; text-align:center">
                <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Your One-Time Password from Team AST</h1>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>  
        <td align="center" bgcolor="#e9ecef">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
             <tr>
              <td align="center" bgcolor="#ffffff" style="padding: 3px 3px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 4px;">
                <p ><b style="color:#293845">Name:</b>${name}</p>
                  <p ><b style="color:#293845">Email:</b>${email}</p>
              </td>
            </tr>
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 30px 13px 10px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <p style="margin: 0;">Here is your verification code for <b style="color:#293845">Day ${parseInt(days)+1}</b> from Team AST.</p>
              </td>
            </tr>
            <tr>
              <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" bgcolor="#ffffff" style="padding: 10px;">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" bgcolor="#293845" style="border-radius: 2px;">
                            <h1  style="display: inline-block; padding: 5px 20px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 25px; color: #ffffff; text-decoration: none; border-radius: 6px;">${otp}</h1>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 15px 13px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <p style="margin: 0; padding-top: 10px; font-size:14px;">Please check your attendance and work submission at the following link:  <a href="https://asteam-attendance.vercel.app/scrummaster" target="_blank">AST Team Attendance and Submission Portal</a></p>
              </td>
            </tr>
           <tr>
              <td align="left" bgcolor="#ffffff" style="padding:36px 13px 15px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                <p style="margin: 0;">Thank You,<br>Team AST</p>     
              </td>
            </tr>
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                <p style="margin: 0; font-size: 12px;">Team AST</p>
                <p style="margin: 0; font-size: 12px;">Team AST, Bhimavaram</p>
              </td>
            </tr>

`,
}