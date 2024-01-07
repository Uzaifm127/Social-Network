import SendGridMail from "@sendgrid/mail";

export const sendEmail = async (from, to, subject, htmlBody, res, message) => {
  try {
    await SendGridMail.send({
      from,
      to,
      subject,
      html: htmlBody,
    });
    console.log("email sent");
    res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error(error);
  }
};
