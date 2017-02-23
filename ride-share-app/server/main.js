import { Email } from 'meteor/email';
import '../imports/api/carpool_data.js';

Meteor.startup(() => {
  process.env.MAIL_URL = "<your_mail_SMTP_server>";
});

Meteor.methods({
  sendEmail: function(from, to, cc, subject, text) {
    this.unblock();
    Email.send({
      to: to,
      cc: cc,
      from: from,
      subject: subject,
      text: text
    });
  }
});