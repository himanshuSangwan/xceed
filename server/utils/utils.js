const jwt = require("jsonwebtoken");

const fs = require("fs");
module.exports = {
  // emailSend: async function (params) {
  //   try {
  //     SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = process.env.SENDINBLUE;

  //     new SibApiV3Sdk.TransactionalEmailsApi()
  //       .sendTransacEmail({
  //         subject: params.subject,
  //         sender: { email: process.env.EMAIL, name: "Vestorgrow" },
  //         // 'replyTo' : {'email':'api@sendinblue.com', 'name':'Sendinblue'},
  //         to: [{ email: params.to }],
  //         htmlContent: params.text,
  //         // 'params' : {'bodyMessage':'Made just for you!'}
  //       })
  //       .then(
  //         function (data) {
  //           console.log(data);
  //         },
  //         function (error) {
  //           console.error(error);
  //         }
  //       );
  //   } catch (err) {
  //     console.log(err.message, "================Mail not Send================");
  //   }
  // },

  //   ================= Send grid mail send  ====================

  jwtEncode: function (paylod) {
    let token = jwt.sign(paylod, process.env.JWT_KEY);
    return token;
  },
  jwtDecode: function (token) {
    let paylodDecoded = jwt.verify(token, process.env.JWT_KEY);
    return paylodDecoded;
  },
  sendResponse: function (result, req, res) {
    if (result.err != undefined && result.err != null && result.err.length > 0) {
      res.status(400).send(result);
    } else {
      res.send(result);
    }
  },
  sendResponseFile: function (result, req, res) {
    if (result.err != undefined && result.err != null && result.err.length > 0) {
      res.status(400).send(result.err);
    } else {
      res.download(result);
    }
  },
  checkRole: (user, role) => {
    if (user) {
      for (i = 0; i < user.role.length; i++) {
        if (user.role[i] == role) {
          return true;
        }
      }
    }
    return false;
  },
  ucfirst: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  deleteOldFile: (oldPath, newPath) => {
    if (newPath && oldPath && oldPath != "" && oldPath !== newPath) {
      oldPath = oldPath.replace(process.env.ENDPOINT, process.env.BASE_PATH);
      fs.unlink(oldPath, (err) => {
        if (err) return console.log(err);
        console.log("old file deleted successfully i.e = ", oldPath);
      });
    }
  },
  deleteFile: (fileArr) => {
    for (let i = 0; fileArr.length > i; i++) {
      let filePath = fileArr[i].replace(process.env.ENDPOINT, process.env.BASE_PATH);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  },
  secondsToHm: (sec) => {
    sec = parseInt(sec);
    let hr = Math.floor(sec / 3600);
    let min = Math.floor((sec % 3600) / 60);
    return `${hr}h ${min}m`;
  },
};
