const TelesignSDK = require('telesignenterprisesdk');

const customerId = process.env.CUSTOMERID || "534454C5-E191-46C9-92B6-A932C4CBA279";
const apiKey = process.env.APIKEY || "wYMUM35fPyQJzaTsrWMMY9INzH/E+HlvhAn9MRqyQWzHguhPOqc4mvA/PFEmRJhj2+MKtmYvqg2+wW1vQg8yvA==";
const phoneNumber = process.env.PHONENO || "+917877705896";

const verifyCode = Math.floor(Math.random() * 99999).toString();
const params = {
    verify_code: verifyCode
};
const client = new TelesignSDK(customerId, apiKey);

function smsCallback(error, responseBody) {
    if (!error) {
        console.log("\nResponse body:\n" + JSON.stringify(responseBody));
    } else {
        console.error("Unable to send message. " + error);
    }
    prompt('\nPlease enter the verification code you were sent:\n', verify);
}

function prompt(question, callback) {
    const stdin = process.stdin, stdout = process.stdout;
    stdin.resume();
    stdout.write(question);
    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

function verify(input) {
    if (input === params['verify_code']) {
        console.log('\nYour code is correct.');
    } else {
        console.log('\nYour code is incorrect.');
    }
    process.exit();
}

// Correctly passing params to the verify function
client.verify.sms(smsCallback, phoneNumber, params);
