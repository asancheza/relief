
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

var twilioAccountSID = "AC6a8ada8488a56f4ec32b1f8b110b24a2"
var twilioAUTH = "9b79a6f494a9448d2c3f8c768680aa18"

Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

var twilio = require('twilio')(twilioAccountSID, twilioAUTH);

Parse.Cloud.define("sendVerificationCode", function(request, response) {
    var verificationCode = Math.floor(Math.random()*999999);
    // var user = Parse.User.current();
    // user.set("phoneVerificationCode", verificationCode);
    // user.save();
    
    twilio.sendSms({
        From: "+16502850471",
        To: request.params.phoneNumber,
        Body: "Your verification code is " + verificationCode + "."
    }, function(err, responseData) { 
        if (err) {
          response.error(err);
        } else { 
          response.success(verificationCode.toString());
        }
    });
});

Parse.Cloud.define("verifyPhoneNumber", function(request, response) {
    var user = new Parse.User();
    user.set("username", request.params.phoneNumber);
	user.set("password", "password");
    var verificationCode = user.get("phoneVerificationCode");
    if (verificationCode == request.params.phoneVerificationCode) {
        user.set("phoneNumber", request.params.phoneNumber);
        user.save();
        response.success("Success");
    } else {
        response.error("Invalid verification code.");
    }
});