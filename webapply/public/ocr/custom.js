let locale = {
  sub_title_eid_front: `Scan your EID(front)`,
  title_eid_front: `Help us make sure it's you`,
  sub_title_eid_back: `Scan your EID(back)`,
  title_eid_back: `FLIP IT! FLIP IT! GOOD!`,
  sub_title_passport: `Scan your Passport`,
  title_passport: `Help us make sure it's you`,
  sub_title_visa: `Scan your VISA`,
  title_visa: `Help us make sure it's you`,
  top_instruction_message_passport: "Show us the picture side of your Passport",
  top_instruction_message_eid_front: "Show us the picture side of your EID",
  top_instruction_message_eid_back: "Show us the opposite side of your EID",
  top_instruction_message_visa: "Show us the picture side of your VISA",
  eid_scan_front: "Please scan the front of your Emirates ID Card",
  eid_scan_back: "Please scan the back of your Emirates ID Card",
  visa_scan: "",
  passport_scan: "Please Scan your picture side of passport",
  document_inside_frame: "Position your document inside the frame",
  searching_document: "Searching for document",
  ok: "Ok",
  loading: "Document Reader Processing",
  capture_button_text: "Click to Scan ",
  document_left_instruction: "Document towards left. Please center",
  document_right_instruction: "Document towards right. Please center",
  document_center_instruction: "Please Centre your document",
  document_closer_instruction: "Place the document closer to the camera",
  document_tooclose_instruction: "Document too close!",
  document_good_position: "Good Position. Please wait!.",
};
let isInitializedOcr = false;
let rhservAuthToken = "";

let baseUrl = ``;

let credentials = {
  username: "",
  password: "",
};

const rhservrLogin = async () => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      email: credentials.username,
      password: credentials.password,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let result = await fetch(baseUrl + "auth/access/login", requestOptions);
    if (result.status === 200)
      result.json().then((data) => {
        if (data.succeeded == true) {
          rhservAuthToken = data.data.token;
          getConfig();
        } else alert("RHServ Api : " + data.errors[0]);
      });
    else
      result.json().then((data) => {
        alert("RHServ Api : " + data.errors[0]?.message);
      });
  } catch (err) {
    console.error(err);
  }
};
const getConfig = async () => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + rhservAuthToken);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    let result = await fetch(baseUrl + "sdk/configuration", requestOptions);

    if (result.status === 200) {
      await result.json().then((resultConfig) => {
        if (resultConfig) {
          ocrInitialize(resultConfig.data);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
};
function ocrInitialize(config) {
  OCRSDK.getInstance.initialize({
    configValue: config,
    locale: locale,
    on_complete: function (message) {
      console.log("SDK READY");
      console.log(message);

      isInitializedOcr = true;
      if (document.getElementById("initializeMessage"))
        document.getElementById("initializeMessage").style.display = "none";
      if (document.getElementById("button-container"))
        document.getElementById("button-container").style.display = "block";
    },
    on_error: function (err) {
      console.log(err);
      document.getElementById("initializeMessage").innerHTML = err.message;
    },
  });
}

// function handleClose(){
//   OCRSDK.getInstance.startProcess({

//   })
//  }

function startScan(type) {
  if (!isInitializedOcr) {
    alert("SDK not ready");
    return;
  }
  document.getElementById("button-container").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("message-html").style.display = "block";
  document.getElementById("resultHtml").innerHTML = "";
  document.getElementById("captureImage").innerHTML = "";

  OCRSDK.getInstance.startProcess({
    scanType: type,
    on_result: function (oResult) {
      resultCallback(oResult);
      document.getElementById("main").style.display = "none";
      document.getElementById("message-html").style.display = "none";

      document.getElementById("loader").style.display = "block";
      document.getElementById("button-container").style.display = "block";
      document.getElementById("closeButton").style.display = "none";
    },
    on_progress: function (msg) {
      document.getElementById("closeButton").style.display = "block";
      console.log(msg);
    },
    on_error: function (error) {
      console.log(error);
    },
    on_close: function (message) {
      document.getElementById("closeButton").style.display = "none";
      document.getElementById("button-container").style.display = "block";
      document.getElementById("main").style.display = "none";
      console.log(message);
    },
  });
}
function resultCallback(oResult) {
  console.log(oResult);
  let captureImage = "";
  let arrayImage = oResult.images;
  arrayImage.map((singleImage) => {
    captureImage += `<img src="${singleImage}" style="width:100%;max-width:600px"/>`;
  });
  document.getElementById("captureImage").innerHTML = captureImage;

  idImages = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + rhservAuthToken);
  if (oResult.type == 1)
    var raw = JSON.stringify({
      bundleId: "",
      document: arrayImage[0].replace("data:image/jpeg;base64,", ""),
      documentBack: arrayImage[1].replace("data:image/jpeg;base64,", ""),
    });
  else if (oResult.type == 2 || oResult.type == 3)
    var raw = JSON.stringify({
      bundleId: "",
      document: arrayImage[0].replace("data:image/jpeg;base64,", ""),
    });
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(baseUrl + "v3/sdk/ocr/analyze", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      showResult(result);
    })
    .catch((error) => console.log("error", error));
}
async function showResult(result) {
  let resultData = JSON.parse(result)?.data?.textFields;
  let resultHTML = "";
  if (resultData && resultData["mrz"] !== undefined) {
    let mrz = resultData["mrz"][0].value;
    let mrzNew = mrz.replace(/</g, "&lt;");
    resultHTML += `<p>mrz: ${mrzNew}</p>`;
  }
  resultHTML += `<ul>`;
  //resultHTML += `<li>Decision: ${JSON.parse(result).decision}</li>`;
  for (const property in resultData)
    if (property != "mrz")
      resultHTML += `<li>${property}: ${resultData[property][0]?.value}</li>`;
  resultHTML += `</ul>`;
  document.getElementById("resultHtml").innerHTML = resultHTML;
  document.getElementById("loader").style.display = "none";
  document.getElementById("button-container").style.display = "block";
}

rhservrLogin();
