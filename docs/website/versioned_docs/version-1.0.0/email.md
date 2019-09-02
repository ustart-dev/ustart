---
id: version-1.0.0-email
title: Email
original_id: email
---

The email class allows sending email from an uStart app.

## Usage

To use it, import the class in your resolver:

```javascript
import { Email } from "ustart";
```

The class reads from the `MAIL_URL` environment variable to determine how to send mail. The `MAIL_URL` should reference an SMTP server and use the form `smtp://USERNAME:PASSWORD@HOST:PORT` or `smtps://USERNAME:PASSWORD@HOST:PORT`. The `smtps://` form (the s is for “secure”) should be used if the mail server requires TLS/SSL (and does not use STARTTLS) and is most common on port 465. Connections which start unencrypted prior to being upgraded to TLS/SSL (using STARTTLS) typically use port 587 (and sometimes 25) and should use `smtp://`. For more information see the [Nodemailer docs](https://nodemailer.com).

If `MAIL_URL` is not set, `Email.send` outputs the message to standard output instead. `EMAIL_URL` must be set in the [.env file](project-structure.md#env) of your project.

```javascript
Email.send(options);
```

If the `MAIL_URL` environment variable is set, actually sends the email. Otherwise, prints the contents of the email to standard out.

Note that this class is based on **mailcomposer 4**, so make sure to refer to [the documentation](https://github.com/nodemailer/mailcomposer/blob/v4.0.1/README.md) for that version when using the *attachments* or *mailComposer* options.

*options*:
* **from** (String): "From" address (required)
* **to, cc, bcc, replyTo** (String or Array of Strings): "To:", "Cc:", "Bcc:", and "Reply-To:" addresses
* **inReplyTo** (String): Message-ID this message is replying to
* **references** (String or Array of Strings): Array (or space-separated string) of Message-IDs to refer to
* **messageId** (String): Message-ID for this message; otherwise, will be set to a random value
* **subject** (String): "Subject:" line
* **text, html** (String): Mail body (in plain text and/or HTML)
* **watchHtml** (String): Mail body in HTML specific for Apple Watch
* **icalEvent** (String): iCalendar event attachment
* **headers** (Object): Dictionary of custom headers - e.g. `{ "header name": "header value" }`. To set an object under a header name, use `JSON.stringify` - e.g. `{ "header name": JSON.stringify({ tracking: { level: 'full' } }) }`.
* **attachments** (Array of Objects): Array of attachment objects, as described in the [mailcomposer documentation](https://github.com/nodemailer/mailcomposer/blob/v4.0.1/README.md#attachments).
* **mailComposer** (MailComposer): A MailComposer object representing the message to be sent. Overrides all other options.

You must provide the `from` option and at least one of `to`, `cc`, and `bcc`; all other options are optional.

Here is an example of how to send an email:

```javascript
import { Email } from "ustart";

const userResolvers = {
  Mutation: {
    signup: (root, args, context) => {
      const { userEmail, userName } = args;

      // user registration...

      Email.send({
        to: userEmail,
        from: "Example <no-reply@example.com>",
        subject: "Signup",
        text: `Hello ${userName}, ¡welcome to Example.com!`
      });

      // ...
    },
  },
};

export default userResolvers;

```
