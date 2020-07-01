(async () => {
    const connectDataPath = process.argv[2];
    const templatePath = process.argv[3];
    const dataPath = process.argv[4];

    const Promise = require("bluebird");
    const pa = Promise.promisifyAll;
    const fs = pa(require("fs"));

    const nodeMailer = require('nodemailer');

    const ejs = require("ejs");

    const rawConnectData = fs.readFileSync(connectDataPath);
    const rawEmailData = fs.readFileSync(dataPath);

    let connectData = '';
    let emailData = '';

    try {
        connectData = JSON.parse(rawConnectData);
        emailData = JSON.parse(rawEmailData);
    } catch (e) {
        throw new SyntaxError(`Invalid json data`);
    }

    const emailTemplate = await fs.readFileAsync(templatePath);

    const emailHtml = await ejs.render(emailTemplate.toString(), emailData);

    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: connectData.login,
            pass: connectData.password
        }
    });

    transporter.sendMail({
        from: connectData.login,
        to: connectData.login,
        subject: `hello test`,
        text: `Some text`,
        html: emailHtml,
    }).then( () => {
            console.log(`sent!`)
        }
    ).catch( (err) => {
            console.log(err)
        }

    );
    console.log(connectData);
})();


