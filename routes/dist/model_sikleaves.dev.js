"use strict";

var router = require('express').Router();

var PDFDocument = require('pdfkit');

var path = require('path');

var Customer = require('../models/customerSchema.cjs');

var _require = require('url'),
    fileURLToPath = _require.fileURLToPath;

var _require2 = require('path'),
    dirname = _require2.dirname;

router.get('/sickleavecreat/:id', function (req, res) {
  Customer.findById(req.params.id).then(function (result) {
    var doc = new PDFDocument();
    doc.font('/font/Cairo-Regular.ttf');
    doc.page.size = 'A4';
    doc.page.margins = {
      top: 0,
      bottom: 50,
      left: 20,
      right: 20
    };
    var daynum = result.inputdaynum;
    var infoid = result.inputgsl;
    var infodurationar = result.inputindurationh;
    var infodurationen = result.inputdurationm;
    var infodatehin = result.inputdatehin;
    var infodatemout = result.inputdatemout;
    var infodatehout = result.inputdatehout;
    var infodatemin = result.inputdatemin;
    var infodatem = result.inputdatesick;
    var infonamear = result.inputnamear;
    var infonameen = result.inputnameen;
    var infonational = result.inputidentity;
    var infonationalityar = result.inputnationalityar;
    var infonationalityen = result.inputnationalityen;
    var infoemployerar = result.inputworkar;
    var infoemployeren = result.inputworken;
    var infophysicianar = result.inputdoctorar;
    var infophysicianen = result.inputdoctoren;
    var infoPositionAr = result.inputworktypear;
    var infoPositionEn = result.inputworktypeen;
    var infoCentralAr = result.inputcentralnamear;
    var infotime = result.inputtimeparint;
    var infoCentralEn = result.inputcentralnameen;
    var infoDateAr = result.inputdateparint;
    var infoCentralid = result.inputcentralid;
    var logocenter = result.inputcentralnum;
    console.log(result);

    if (typeof daynum === 'undefined') {
      console.log(daynum);
      daynum = "";
    }

    if (typeof infoid === 'undefined') {
      console.log(infoid);
      infoid = "";
    }

    if (typeof infodurationar === 'undefined') {
      console.log(infodurationar);
      infodurationar = "";
    }

    if (typeof infodurationen === 'undefined') {
      console.log(infodurationen);
      infodurationen = "";
    }

    if (typeof infodatehin === 'undefined') {
      console.log(infodatehin);
      infodatehin = "";
    }

    if (typeof infodatemout === 'undefined') {
      console.log(infodatemout);
      infodatemout = "";
    }

    if (typeof infodatehout === 'undefined') {
      console.log(infodatehout);
      infodatehout = "";
    }

    if (typeof infodatemin === 'undefined') {
      console.log(infodatemin);
      infodatemin = "";
    }

    if (typeof infodatem === 'undefined') {
      console.log(infodatem);
      infodatem = "";
    }

    if (typeof infonamear === 'undefined') {
      console.log(infonamear);
      infonamear = "";
    }

    if (typeof infonameen === 'undefined') {
      console.log(infonameen);
      infonameen = "";
    }

    if (typeof infonational === 'undefined') {
      console.log(infonational);
      infonational = "";
    }

    if (typeof infonationalityar === 'undefined') {
      console.log(infonationalityar);
      infonationalityar = "";
    }

    if (typeof infonationalityen === 'undefined') {
      console.log(infonationalityen);
      infonationalityen = "";
    }

    if (typeof infoemployerar === 'undefined') {
      infoemployerar = '';
      console.log(infoemployerar);
    }

    if (typeof infoemployeren === 'undefined') {
      infoemployeren = '';
      console.log(infoemployeren);
    }

    if (typeof infophysicianar === 'undefined') {
      infophysicianar = '';
      console.log(infophysicianar);
    }

    if (typeof infophysicianen === 'undefined') {
      infophysicianen = '';
      console.log(infophysicianen);
    }

    if (typeof infoPositionAr === 'undefined') {
      infoPositionAr = '';
      console.log(infoPositionAr);
    }

    if (typeof infoPositionEn === 'undefined') {
      infoPositionEn = '';
      console.log(infoPositionEn);
    }

    if (typeof infoCentralAr === 'undefined') {
      infoCentralAr = '';
      console.log(infoCentralAr);
    }

    if (typeof infotime === 'undefined') {
      infotime = '';
      console.log(infotime);
    }

    if (typeof infoCentralEn === 'undefined') {
      infoCentralEn = '';
      console.log(infoCentralEn);
    }

    if (typeof infoDateAr === 'undefined') {
      infoDateAr = '';
      console.log(infoDateAr);
    }

    if (typeof infoCentralid === 'undefined') {
      infoCentralid = '';
      console.log(infoCentralid);
    }

    if (typeof logocenter === 'undefined') {
      logocenter = '1';
      console.log(logocenter);
    } //-----------القالب----------------


    var sickleaveTitleEn = "Kingdom of Saudi Arabia";
    var sickleaveRebortEn = "Sick Leave Report";
    var sickleaveRebortAr = "تقرير إجازة مرضية";
    var sickleaveIdEn = "Leave ID";
    var sickleaveIdAr = "رمز الإجازة";
    var sickleaveDurationEn = "Leave Duration";
    var sickleaveDurationAr = "مدة الإجازة";
    var sickleaveDateInEn = "Admission Date";
    var sickleaveDateInAr = "تاريخ الدخول";
    var sickleaveDateOutEn = "Discharge Date";
    var sickleaveDateOutAr = "تاريخ الخروج";
    var sickleaveDateEn = "Issue Date";
    var sickleaveDateAr = "تاريخ اصدار التقرير";
    var sickleaveNameEn = "Name";
    var sickleaveNameAr = "الاسم";
    var sickleaveNationalEn = "National ID/Iqama";
    var sickleaveNationalAr = "رقم الهوية/الإقامة";
    var sickleaveNationalityEn = "Nationality";
    var sickleaveNationalityAr = "الجنسية";
    var sickleaveEmployerEn = "Employer";
    var sickleaveEmployerAr = "جهة العمل";
    var sickleavePhysicianEn = "Physician Name";
    var sickleavePhysicianAr = "اسم الطبيب المعالج";
    var sickleavePositionEn = "Position";
    var sickleavePositionAr = "المسمى الوظيفي"; //-----------القالب----------------
    // Add the data to the PDF document

    var infobarcodear = "للتحقق من بيانات التقرير يرجى التاكد من زيارة موقع منصة صحة الرسمي";
    var infobarcodeen = "to check the report data please visit Seha`s official website";
    var infobarcodeweb = "www.quiris-se.pw/ui/slenquiry"; //-----------logo----------------

    var imagesBack = '/image/back1.jpg';
    doc.image(imagesBack, 0, 0, {
      width: 595.28,
      height: 841.89
    });
    var logo_seha = '/image/logo-seha.jpg';
    doc.image(logo_seha, 26, 20, {
      width: 90,
      height: 50
    });
    var imageslogo_kingdom = '/image/logo-kingdom.jpg';
    doc.image(imageslogo_kingdom, 235, 20, {
      width: 125,
      height: 40
    });
    var imageslogo_right = '/image/logo-right.jpg';
    doc.image(imageslogo_right, 430, 1.7, {
      width: 181,
      height: 140
    });
    var imagesbarcode_new = '/image/barcode-new.jpg';
    var imageslogo_health = '/image/logo-health.jpg';
    doc.image(imageslogo_health, 475, 722, {
      width: 100,
      height: 50
    }); //var imageslogo_health = '/image/logo.jpg'; 
    //-----------logo----------------
    // Add the rest of the data...
    // حفظ المستند في ملف

    doc.fontSize(10);
    doc.fillColor('#0f0e0e');
    doc.font('/font/Cairo-SemiBold.ttf');
    doc.text(sickleaveTitleEn, doc.page.width / 2 - doc.widthOfString(sickleaveTitleEn) / 1.7, 40);
    doc.fillColor('#304378');
    doc.fontSize(20);
    doc.font('/font/Cairo-Bold.ttf');
    doc.text(sickleaveRebortEn, doc.page.width / 2 - doc.widthOfString(sickleaveRebortEn) / 1.9, 135);
    doc.fillColor('#4f80c4');
    doc.text(sickleaveRebortAr, doc.page.width / 2 - doc.widthOfString(sickleaveRebortAr) / 1.9, 100, {
      features: ['rtla']
    });
    doc.fontSize(8);
    doc.fillColor('#304378');
    doc.font('/font/Cairo-SemiBold.ttf');
    doc.text(sickleaveIdEn, doc.page.width / 9 - doc.widthOfString(sickleaveIdEn) / 2.5, 224);
    doc.fillColor('#fbfbfb');
    doc.text(sickleaveDurationEn, doc.page.width / 9 - doc.widthOfString(sickleaveDurationEn) / 2.5, 253);
    doc.fillColor('#304378');
    doc.text(sickleaveDateInEn, doc.page.width / 9 - doc.widthOfString(sickleaveDateInEn) / 2.5, 284);
    doc.text(sickleaveDateOutEn, doc.page.width / 9 - doc.widthOfString(sickleaveDateOutEn) / 2.5, 314);
    doc.text(sickleaveDateEn, doc.page.width / 9 - doc.widthOfString(sickleaveDateEn) / 2.5, 344);
    doc.text(sickleaveNameEn, doc.page.width / 9 - doc.widthOfString(sickleaveNameEn) / 2.5, 375);
    doc.text(sickleaveNationalEn, doc.page.width / 9 - doc.widthOfString(sickleaveNationalEn) / 2.5, 406);
    doc.text(sickleaveNationalityEn, doc.page.width / 9 - doc.widthOfString(sickleaveNationalityEn) / 2.5, 436);
    doc.text(sickleaveEmployerEn, doc.page.width / 9 - doc.widthOfString(sickleaveEmployerEn) / 2.5, 466);
    doc.text(sickleavePhysicianEn, doc.page.width / 9 - doc.widthOfString(sickleavePhysicianEn) / 2.5, 498);
    doc.text(sickleavePositionEn, doc.page.width / 9 - doc.widthOfString(sickleavePositionEn) / 2.5, 527); //----------ar-البيانات----------------

    doc.fontSize(8);
    doc.fillColor('#304378');
    doc.text(sickleaveIdAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleaveIdAr) / 3.5, 223, {
      features: ['rtla']
    });
    doc.fillColor('#fbfbfb');
    doc.text(sickleaveDurationAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleaveDurationAr) / 3.5, 252, {
      features: ['rtla']
    });
    doc.fillColor('#304378');
    doc.text(sickleaveDateInAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleaveDateInAr) / 3, 282, {
      features: ['rtla']
    });
    doc.text(sickleaveDateOutAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleaveDateOutAr) / 3, 312, {
      features: ['rtla']
    });
    doc.text(sickleaveDateAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleaveDateAr) / 2.7, 342, {
      features: ['rtla']
    });
    doc.text(sickleaveNameAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleaveNameAr) / 5, 373, {
      features: ['rtla']
    });
    doc.text(sickleaveNationalAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleaveNationalAr) / 2.6, 404, {
      features: ['rtla']
    });
    doc.text(sickleaveNationalityAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleaveNationalityAr) / 5, 434, {
      features: ['rtla']
    });
    doc.text(sickleaveEmployerAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleaveEmployerAr) / 4, 464, {
      features: ['rtla']
    });
    doc.text(sickleavePhysicianAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleavePhysicianAr) / 2.6, 494, {
      features: ['rtla']
    });
    doc.text(sickleavePositionAr, doc.page.width - doc.page.width / 6 - doc.widthOfString(sickleavePositionAr) / 2.6, 523, {
      features: ['rtla']
    }); //----------ar-البيانات----------------
    //------------البيانات المدرجة----------

    doc.text(infoid, doc.page.width / 2 - doc.widthOfString(infoid) / 1.6, 224);
    doc.fillColor('#fbfbfb');
    doc.text(infodurationen, doc.page.width / 3 - doc.widthOfString(infodurationen) / 2, 254);
    doc.fillColor('#304378');
    doc.text(infodatemin, doc.page.width / 3 - doc.widthOfString(infodatemin) / 2, 285);
    doc.text(infodatemout, doc.page.width / 3 - doc.widthOfString(infodatemout) / 2, 315);
    doc.text(infodatem, doc.page.width / 2 - doc.widthOfString(infodatem) / 1.6, 345);
    doc.fontSize(7);
    doc.text(infonameen, doc.page.width / 3 - doc.widthOfString(infonameen) / 2, 377);
    doc.fontSize(8);
    doc.text(infonational, doc.page.width / 2 - doc.widthOfString(infonational) / 1.6, 406);
    doc.text(infonationalityen, doc.page.width / 3 - doc.widthOfString(infonationalityen) / 2, 436);
    doc.text(infoemployeren, doc.page.width / 3 - doc.widthOfString(infoemployeren) / 2, 466);
    doc.text(infophysicianen, doc.page.width / 3 - doc.widthOfString(infophysicianen) / 2, 497);
    doc.text(infoPositionEn, doc.page.width / 3 - doc.widthOfString(infoPositionEn) / 2, 528); //------------البيانات المدرجة----------
    //------------ar-البيانات المدرجة----------

    doc.fillColor('#fbfbfb');
    doc.text(infodurationar, doc.page.width / 1.5 - doc.widthOfString(infodurationar) / 1.5, 254, {
      features: ['rtla']
    });
    doc.fillColor('#304378');
    doc.text(infodatehin, doc.page.width / 1.5 - doc.widthOfString(infodatehin) / 1.3, 285, {
      features: ['rtla']
    });
    doc.text(infodatehout, doc.page.width / 1.5 - doc.widthOfString(infodatehout) / 1.3, 315, {
      features: ['rtla']
    });
    doc.fontSize(7.5);
    doc.text(infonamear, doc.page.width / 1.5 - doc.widthOfString(infonamear) / 1.6, 376, {
      features: ['rtla']
    });
    doc.fontSize(8);
    doc.text(infonationalityar, doc.page.width / 1.5 - doc.widthOfString(infonationalityar) / 1.1, 436, {
      features: ['rtla']
    });
    doc.text(infoemployerar, doc.page.width / 1.5 - doc.widthOfString(infoemployerar) / 1.4, 468, {
      features: ['rtla']
    });
    doc.fontSize(7.5);
    doc.text(infophysicianar, doc.page.width / 1.5 - doc.widthOfString(infophysicianar) / 1.4, 497, {
      features: ['rtla']
    });
    doc.fontSize(8);
    doc.text(infoPositionAr, doc.page.width / 1.5 - doc.widthOfString(infoPositionAr) / 1, 528, {
      features: ['rtla']
    }); //-----------CENTRAL NAME ID----------

    doc.fontSize(7);
    doc.font('/font/Cairo-Regular.ttf');
    doc.fillColor('#0f0e0e');
    var imagelogo = '/image/' + logocenter + '.jpg';
    doc.image(imagelogo, 417, 614, {
      width: 75,
      height: 65
    });
    doc.text(infoCentralAr, doc.page.width - doc.page.width / 4 - doc.widthOfString(infoCentralAr) / 1.8, 678, {
      features: ['rtla']
    });
    doc.text(infoCentralEn, doc.page.width - doc.page.width / 4 - doc.widthOfString(infoCentralEn) / 1.8, 689, {
      features: ['rtla']
    });
    doc.text(infoCentralid, doc.page.width - doc.page.width / 4 - doc.widthOfString(infoCentralid) / 1.8, 699, {
      features: ['rtla']
    }); //-----------CENTRAL LOGO----------
    //------------BARCODE NAME ID----------

    doc.fontSize(7);
    var line = '/image/line.jpg';
    doc.image(line, 75, 680, {
      width: 90,
      height: 10
    });
    doc.image(imagesbarcode_new, 86, 570, {
      width: 69,
      height: 70
    }); //logo

    doc.text(infobarcodeen, doc.page.width / 6 - doc.widthOfString(infobarcodeen) / 2.9, 663);
    doc.text(infobarcodear, doc.page.width / 6 - doc.widthOfString(infobarcodear) / 2.5, 649, {
      features: ['rtla']
    });
    doc.fillColor('#0000FF'); // Set font color to blue

    doc.text(infobarcodeweb, doc.page.width / 6 - doc.widthOfString(infobarcodeweb) / 3.6, 674); //------------توقيت الطبيب----------

    doc.fillColor('#0f0e0e');
    doc.fontSize(7);
    doc.text(infotime, 35, 710);
    doc.text(infoDateAr, 35, 720); //------------توقيت الطبيب----------
    // Pipe the document to a blob

    var buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', function () {
      var pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-disposition': "attachment;filename=sickleaves_".concat(infonameen, "_").concat(daynum, "day.pdf")
      });
      res.end(pdfData);
    }); // Finalize the PDF and end the stream

    doc.end();
  })["catch"](function (err) {
    console.log(err);
  });
});
module.exports = router;
//# sourceMappingURL=model_sikleaves.dev.js.map
