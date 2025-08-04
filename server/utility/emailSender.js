require("dotenv").config();
const { TransactionalEmailsApi, SendSmtpEmail } = require("@getbrevo/brevo");
const { CustomError } = require("./customError");

class EmailService {
  constructor() {
    this.api = new TransactionalEmailsApi();
    this.api.authentications.apiKey.apiKey = process.env.APIEMAILKEY;
  }

  /**
   * Send transactional email using a Brevo template.
   * @param {Object} options
   * @param {number} options.templateId - The Brevo template ID
   * @param {Object[]} options.to - List of recipient objects { email, name }
   * @param {Object} options.params - Dynamic params for the template (e.g. { confirmCode: '123456' })
   * @param {Object} [options.sender] - Optional sender override
   */
  async sendTemplateEmail({
    templateId,
    to,
    params = {},
    senderName = "Nexigo",
  }) {
    const message = new SendSmtpEmail();

    message.templateId = templateId;
    message.to = to;
    message.params = params;
    message.sender = {
      name: senderName,
      email: "denigogov@gmail.com",
    };

    try {
      const response = await this.api.sendTransacEmail(message);

      return response;
    } catch (error) {
      const brevoMessage =
        error?.response?.body?.message ||
        error?.response?.body?.message ||
        error?.message ||
        "Unknown error while sending email";

      throw new CustomError(
        `Failed to send transactional email: ${brevoMessage}`,
        500,
        "EmailServiceError"
      );
    }
  }
}

module.exports = new EmailService();
