"use strict";

var resultsDiv = document.getElementById('resultsDiv'); //info

var submit = document.getElementById('submit'); //submit

var toggleButton = document.getElementById('toggleButton'); //res

function convertDate(dateString) {
  var arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  var englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var convertedDateString = ""; // تحويل الأرقام العربية إلى الأرقام الإنجليزية

  for (var i = 0; i < dateString.length; i++) {
    var _char = dateString[i];
    var index = arabicNumbers.indexOf(_char);

    if (index != -1) {
      _char = englishNumbers[index];
    }

    convertedDateString += _char;
  } // عكس تنسيق التاريخ


  var dateParts = convertedDateString.split("-");
  convertedDateString = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
  return convertedDateString;
}

submit.addEventListener('click', function () {
  var inputnormalizedservicecode = document.getElementById("normalizedservicecode");
  var inputpsl = inputnormalizedservicecode.value;
  var inputpatientid = document.getElementById("patientid");
  var inputid = inputpatientid.value; // استدعاء الدالة للتحقق من القيم

  var normalizedservicecode = inputpsl;
  var patientid = inputid;
  fetch('/infosick', {
    method: 'post',
    body: JSON.stringify({
      gsl: normalizedservicecode,
      id: patientid
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    if (data === null || data === undefined || data.message === 'error') {
      alerterror2.style.display = 'none';
      alerterror.style.display = 'grid'; //لايوجد نتائج

      toggleButton.style.display = 'inline'; //res

      submit.style.display = 'none'; //submit
      //window.location = 'login'
    } else {
      var inputdatesick = convertDate(data.inputdatesick);
      document.getElementById('patientname').textContent = data.inputnamear;
      document.getElementById('sickleavedate').textContent = inputdatesick;
      document.getElementById('duration').textContent = data.inputdaynum;
      document.getElementById('from1').textContent = data.inputdatefrom;
      document.getElementById('to1').textContent = data.inputdateto;
      document.getElementById('doctorname').textContent = data.inputdoctorar;
      document.getElementById('jobtitle').textContent = data.inputworktypear;
      resultsDiv.style.display = 'flex'; //info

      toggleButton.style.display = 'inline'; //res

      submit.style.display = 'none'; //submit

      alerterror.style.display = 'none';
      alerterror2.style.display = 'none';
    }
  })["catch"](function () {});
}); //325156565651561565651561

toggleButton.addEventListener('click', function () {
  var inputpsll = document.getElementById("normalizedservicecode");
  inputpsll.value = "";
  var inputidd = document.getElementById("patientid");
  inputidd.value = "";
  toggleButton.style.display = 'none'; //res

  resultsDiv.style.display = 'none'; //info

  submit.style.display = 'inline'; //submit

  alerterror.style.display = 'none';
  alerterror2.style.display = 'none';
});
//# sourceMappingURL=date.dev.js.map
