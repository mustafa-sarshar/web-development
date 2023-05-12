const nodemailer = require("nodemailer"),
  { google } = require("googleapis");

const MAIL_SERVICE = process.env["MAIL_SERVICE"],
  MAIL_SERVICE_TYPE = process.env["MAIL_SERVICE_TYPE"],
  MAIL_SERVICE_USER = process.env["MAIL_SERVICE_USER"],
  MAIL_SERVICE_CLIENT_ID = process.env["MAIL_SERVICE_CLIENT_ID"],
  MAIL_SERVICE_CLIENT_SECRET = process.env["MAIL_SERVICE_CLIENT_SECRET"],
  MAIL_SERVICE_REDIRECT_URI = process.env["MAIL_SERVICE_REDIRECT_URI"],
  MAIL_SERVICE_REFRESH_TOKEN = process.env["MAIL_SERVICE_REFRESH_TOKEN"];

const googleOAuth2Client = new google.auth.OAuth2(
  MAIL_SERVICE_CLIENT_ID,
  MAIL_SERVICE_CLIENT_SECRET,
  MAIL_SERVICE_REDIRECT_URI
);
googleOAuth2Client.setCredentials({
  refresh_token: MAIL_SERVICE_REFRESH_TOKEN,
});

const sendEmail = (emailAddress, emailSubject, emailHtml, accessToken) => {
  const mailOptions = {
    from: `Online-Shop App Service Team <${MAIL_SERVICE_USER}>`,
    to: emailAddress,
    subject: emailSubject,
    html: emailHtml,
  };

  const mailTransporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    auth: {
      type: MAIL_SERVICE_TYPE,
      user: MAIL_SERVICE_USER,
      clientId: MAIL_SERVICE_CLIENT_ID,
      clientSecret: MAIL_SERVICE_CLIENT_SECRET,
      refreshToken: MAIL_SERVICE_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  return mailTransporter.sendMail(mailOptions);
};

const getOAuth2AccessToken = () => {
  return googleOAuth2Client.getAccessToken();
};

module.exports = { sendEmail, getOAuth2AccessToken };
