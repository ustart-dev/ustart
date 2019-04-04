// Code adapted from Meteor.Email
// https://github.com/meteor/meteor/blob/devel/packages/email/email.js
import urlModule from "url";
import nodemailer from "nodemailer";
import MailComposer from "nodemailer/lib/mail-composer";

const Email = {};
const EmailTest = {};

const makeTransport = function (mailUrlString) {
  let mailUrl = urlModule.parse(mailUrlString, true);

  if (mailUrl.protocol !== 'smtp:' && mailUrl.protocol !== 'smtps:') {
    throw new Error(`Email protocol in $MAIL_URL (${mailUrlString}) must be 'smtp' or 'smtps'`);
  }

  if (mailUrl.protocol === 'smtp:' && mailUrl.port === '465') {
    console.log("The $MAIL_URL is 'smtp://...:465'.  " +
                  "You probably want 'smtps://' (The 's' enables TLS/SSL) " +
                  "since '465' is typically a secure port.");
  }

  // Allow overriding pool setting, but default to true.
  if (!mailUrl.query) {
    mailUrl.query = {};
  }

  if (!mailUrl.query.pool) {
    mailUrl.query.pool = 'true';
  }

  return nodemailer.createTransport(urlModule.format(mailUrl));
};

let cacheKey, cache;
const getTransport = function() {
  // We delay this check until the first call to Email.send, in case someone
  // set process.env.MAIL_URL in startup code. Then we store in a cache until
  // process.env.MAIL_URL changes.
  const url = process.env.MAIL_URL;
  if (cacheKey === undefined || cacheKey !== url) {
    cacheKey = url;
    cache = url ? makeTransport(url) : null;
  }
  return cache;
}

let nextDevModeMailId = 0;
let output_stream = process.stdout;

// Testing hooks
EmailTest.overrideOutputStream = function (stream) {
  nextDevModeMailId = 0;
  output_stream = stream;
};

EmailTest.restoreOutputStream = function () {
  output_stream = process.stdout;
};

const devModeSend = function (mail) {
  const devModeMailId = nextDevModeMailId++;

  const stream = output_stream;

  // This approach does not prevent other writers to stdout from interleaving.
  stream.write(`====== BEGIN MAIL #${devModeMailId} ======\n`);
  stream.write("(Mail not sent; to enable sending, set the MAIL_URL " +
               "environment variable.)\n");
  const readStream = new MailComposer(mail).compile().createReadStream();
  readStream.pipe(stream, {end: false});
  readStream.on('end', function () {
    stream.write(`====== END MAIL #${devModeMailId} ======\n`);
  });
};

const smtpSend = async function (transport, mail) {
  await transport.sendMail(mail);
};

/**
 * Mock out email sending (eg, during a test.) This is private for now.
 *
 * f receives the arguments to Email.send and should return true to go
 * ahead and send the email (or at least, try subsequent hooks), or
 * false to skip sending.
 */
const sendHooks = [];
EmailTest.hookSend = function (f) {
  sendHooks.push(f);
};

/**
 * @summary Send an email. Throws an `Error` on failure to contact mail server
 * or if mail server returns an error. All fields should match
 * [RFC5322](http://tools.ietf.org/html/rfc5322) specification.
 *
 * If the `MAIL_URL` environment variable is set, actually sends the email.
 * Otherwise, prints the contents of the email to standard out.
 *
 * Note that this package is based on **mailcomposer 4**, so make sure to refer to
 * [the documentation](https://github.com/nodemailer/mailcomposer/blob/v4.0.1/README.md)
 * for that version when using the `attachments` or `mailComposer` options.
 *
 * @locus Server
 * @param {Object} options
 * @param {String} [options.from] "From:" address (required)
 * @param {String|String[]} options.to,cc,bcc,replyTo
 *   "To:", "Cc:", "Bcc:", and "Reply-To:" addresses
 * @param {String} [options.inReplyTo] Message-ID this message is replying to
 * @param {String|String[]} [options.references] Array (or space-separated string) of Message-IDs to refer to
 * @param {String} [options.messageId] Message-ID for this message; otherwise, will be set to a random value
 * @param {String} [options.subject]  "Subject:" line
 * @param {String} [options.text|html] Mail body (in plain text and/or HTML)
 * @param {String} [options.watchHtml] Mail body in HTML specific for Apple Watch
 * @param {String} [options.icalEvent] iCalendar event attachment
 * @param {Object} [options.headers] Dictionary of custom headers - e.g. `{ "header name": "header value" }`. To set an object under a header name, use `JSON.stringify` - e.g. `{ "header name": JSON.stringify({ tracking: { level: 'full' } }) }`.
 * @param {Object[]} [options.attachments] Array of attachment objects, as
 * described in the [mailcomposer documentation](https://github.com/nodemailer/mailcomposer/blob/v4.0.1/README.md#attachments).
 * @param {MailComposer} [options.mailComposer] A [MailComposer](https://nodemailer.com/extras/mailcomposer/#e-mail-message-fields)
 * object representing the message to be sent.  Overrides all other options.
 * You can create a `MailComposer` object via
 * `new EmailInternals.NpmModules.mailcomposer.module`.
 */
Email.send = function (options) {
  for (var i = 0; i < sendHooks.length; i++)
    if (! sendHooks[i](options))
      return;

  if (options.mailComposer) {
    options = options.mailComposer.mail;
  }

  const transport = getTransport();
  if (transport) {
    smtpSend(transport, options);
  } else {
    devModeSend(options);
  }
};

export { Email };
