const express = require('express');
const router = express.Router();
const moment = require('moment-hijri');
const Customer = require('../models/customerSchema.cjs');

////////////////////delete////////////////////
router.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  Customer.deleteOne({
      _id: id
    })
    .then(data => {
      if (data) {
       res.redirect('/main');
        console.log(data);
      } else {
        res.status(404).json({
          message: 'error'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
      console.log('error3');
    });
});
////////////////////edit////////////////////
router.post('/editqr/:id', (req, res) => {
  Customer.updateOne({_id: req.params.id }, req.body).then(() => {
    res.redirect('/main');
  }).catch(err => {
    console.log(err);
  })
});
//////////////////////post/////////////////////
router.post('/user/addqr', () => {
  Customer.create(req.body).then(() => {
    res.redirect('/main');
  }).catch(err => {
    console.log(err);
  });
});
//اضافة معلومات الاستعلام الى قاعدة البيانات
router.post('/infosick', function (req, res) {
  var gsl = req.body.gsl;
  var id = req.body.id;
  Customer.findOne({
      inputgsl: gsl,
      inputidentity: id
    })
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: 'error'
        });
        console.log('error');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
      console.log('error');
    });
});

router.post('/toolsinfo', async function (req, res) {
  var namee = req.body.namee;
  var idf = req.body.idf;
  var datain = req.body.datain;
  var dataout = req.body.dataout;
  var empolye = req.body.empolye;
  var doctorenumper = req.body.doctor;
  var nationalitynumper = req.body.Nationalnum;
  var centernum = req.body.center;

  // ==========================كود الترجمة======================================
  async function GTranslate(text, sourceLang, targetLang) {
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
      sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(text);
    try {
      const response = await fetch(url);
      const data = await response.json();
      var translatedText = data[0][0][0];
      return translatedText;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  //=========================نهاية كود الترجمة ==============================
  //==================كود تحويل التاريخ===================

  var dateh = datain;
  var datehout = dataout;
  var hijriDate = moment(dateh, 'YYYY-MM-DD').locale('en').format('iDD-iMM-iYYYY');
  var hijriDateout = moment(datehout, 'YYYY-MM-DD').locale('en').format('iDD-iMM-iYYYY');

  function reverseYear(year) {
    return year.split('').reverse().join('');
  }
  var hijriDatedu = moment(dateh, 'YYYY-MM-DD').locale('en').format('iYYYY-iMM-iDD'); //لمدة الاجازة
  var hijriDateoutdu = moment(datehout, 'YYYY-MM-DD').locale('en').format('iYYYY-iMM-iDD'); //لمدة الاجازة

  //==================ترجمة الاسم===================
  var textToTranslate = namee;
  var nameer = await GTranslate(textToTranslate, "ar", "en");
  let nameenupper = nameer.toUpperCase();

  //==================ترجمة الاسم===================

  //===================كود حساب عدد الايام==========
  var date1 = new Date(datain);
  var date2 = new Date(dataout);
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  var daynamper = diffDays + 1;
  var daytorev = daynamper;
  var dayrev = (daytorev).toString();
  var reversedNum = dayrev.split("").reverse().join("");
  //===================نهاية كود حساب عدد الايام==========
  //=================كود عكس التاريخ==================
  function convertDate(dateString) {
    var arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    var englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var convertedDateString = "";
    // تحويل الأرقام العربية إلى الأرقام الإنجليزية
    for (var i = 0; i < dateString.length; i++) {
      var char = dateString[i];
      var index = arabicNumbers.indexOf(char);
      if (index != -1) {
        char = englishNumbers[index];
      }
      convertedDateString += char;
    }
    // عكس تنسيق التاريخ
    var dateParts = convertedDateString.split("-");
    convertedDateString = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
    return convertedDateString;
  }
  var datam = convertDate(datain); //عكس تاريخ الدخول ميلادي
  var datamout = convertDate(dataout); //عكس تاريخ الخروج ميلادي
  var revhin = reverseYear(hijriDatedu); //عكس تاريخ الدخول هجري
  var revhout = reverseYear(hijriDateoutdu); //عكس تاريخ الخروج هجري
  var reversedYearhin = convertDate(revhin);
  var reversedYearhout = convertDate(revhout);
  //=================نهاية كود عكس التاريخ==================
  //==================التاريخ===============
  var datem = datam; //تاريخ الاصدار ميلادي
  var datemin = datam; //تاريخ الدخول ميلادي

  //==================التاريخ===============
  var dayodays = (daynamper >= 3) ? "days" : "day";
  //=================تاريخ الاجازة مع الايام=============
  var daydateh = reversedNum + " يوم " + " )" + reversedYearhin + " الى " + reversedYearhout + " ( ";
  var daydatem = daynamper + " " + dayodays + " " + "( " + datem + " to " + datamout + " )";
  //=================الجنسية=============
  var Nationalitys = {
    "1": {
      arabic: "السعودية",
      english: "SAUDI ARABIA"
    },
    "2": {
      arabic: "المصرية",
      english: "EGYPT"
    },
    "3": {
      arabic: "السودانية",
      english: "SUDAN"
    },
    "4": {
      arabic: "اليمنية",
      english: "YEMEN"
    },
    "5": {
      arabic: "السورية",
      english: "SYRIA"
    },
    "6": {
      arabic: "الفلسطينية",
      english: "PALESTIN"
    },
    "7": {
      arabic: "الكويت",
      english: "KUWAIT"
    }
  };
  var nationality = Nationalitys[nationalitynumper];
  var nationalityar = nationality.arabic;
  var nationalityen = nationality.english;
  //============الدكتور==================
  var doctors = {
    "1": {
      arabic: "محمد راشد السر",
      english: "Muhammad Rashid Al-Sir",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "2": {
      arabic: "صالح عبدالوهاب عوض سليمان",
      english: "SALEH ABDLWAHAB AWAD SLEMAN",
      positionar: "طبيب عام",
      positionen: "General"
    },
    "3": {
      arabic: "حسن ضيف الله الفاضل",
      english: "HASAN DAYF ALLAH ALFADIL",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "4": {
      arabic: "عبدالله مفرح علي عسير",
      english: "ABDULLAH MUFRAH ALI ASIR",
      positionar: "طبيب عام",
      positionen: "General"
    },
    "5": {
      arabic: "عبدالله محمد العمري",
      english: "ABDULLAH MOHAMMED AL-OMARI",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "6": {
      arabic: "خالد علي العنزي ",
      english: "KHALID ALI AL-ANZI",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "7": {
      arabic: "احمد اسامة ابوالعينين",
      english: "AHMED OSAMA ABU ALAYNIN",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "8": {
      arabic: "فيصل وليد غالب شهوان",
      english: "FAISAL WALID GHALIB SHAHWAN",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "9": {
      arabic: "محمد الكاف",
      english: "MUHAMMAD AL-KAF",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "10": {
      arabic: "احمد العنزي",
      english: "AHMAD AL-ANZI",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "11": {
      arabic: "يوسف العمري",
      english: "YOUSSEF AL OMARI",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "12": {
      arabic: "محمد سليمان البشير",
      english: "MUHAMMAD SULEIMAN AL-BASHIR",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "13": {
      arabic: "مهدي الجارودي",
      english: "MAHDI AL-JAROUDI",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "14": {
      arabic: "اماني الحربي",
      english: "AMANI AL-HARBI",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "15": {
      arabic: "سعود رخيص خليف العنزي",
      english: "SAUD RKHIYES KH ALANAZI",
      positionar: "طبيب عام",
      positionen: "General"
    },
    "16": {
      arabic: "الاء علي الحارثي",
      english: "ALAA ALI Al HARITHI",
      positionar: "طب الاسنان والتخصصات المساندة",
      positionen: "Dentistry and Related Specialties"
    },
    "17": {
      arabic: "جمال راشد السر",
      english: "JAMAL RASHID AL SIR",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "18": {
      arabic: "مصباح عباس الحنبلي",
      english: "MISBAH ABBAS AL HANBALI",
      positionar: "استشاري",
      positionen: "Consultant"
    },
    "19": {
      arabic: "محمد الصياد",
      english: "MOHAMMED AL SAYYAD",
      positionar: "استشاري",
      positionen: "Consultant"
    },
  }
  var doctor = doctors[doctorenumper];
  if (doctor) {
    var doctorar = doctor.arabic;
    var doctoren = doctor.english.toUpperCase();
    var positonar = doctor.positionar;
    var positonen = doctor.positionen;

  } else {
    console.log("Unknown doctor");
  }
  //=====================المركز=====================
  var centers = {
    "1": {
      arabic: "المركز السعودي الطبي",
      english: "Saudi Medical Center",
      license: "رقم الترخيص : 1940021021010141",
      logocenter: "1",
      gsl: "PSL"
    },
    "2": {
      arabic: "مستشفى الملك فهد العام",
      english: "King Fahd General Hospital",
      license: "رقم الترخيص : 1842521031020141",
      logocenter: "1",
      gsl: "GSL"
    },
    "3": {
      arabic: "مستشفى الملك عبدالعزيز العام",
      english: "King Abdulaziz General Hospital",
      license: "رقم الترخيص : 1843521034020141",
      logocenter: "1",
      gsl: "GSL"
    },
    "4": {
      arabic: "مستشفى الملك سعود العام",
      english: "King Saud General Hospital",
      license: "رقم الترخيص : 1842501531920141",
      logocenter: "1",
      gsl: "GSL"
    },
    "5": {
      arabic: "مستشفى الملك خالد العام",
      english: "King Khalid General Hospital",
      license: "رقم الترخيص : 1847521041020141",
      logocenter: "1",
      gsl: "GSL"
    },
    "6": {
      arabic: "مستشفى الملك سلمان العام",
      english: "King Salman General Hospital",
      license: "رقم الترخيص : 1848525031040141",
      logocenter: "1",
      gsl: "GSL"
    },
    "7": {
      arabic: "مستشفى الملك فهد التخصصي",
      english: "King Fahd Specialist Hospital ",
      license: "رقم الترخيص : 1811627501120241",
      logocenter: "1",
      gsl: "GSL"
    },
    "8": {
      arabic: "مستشفى الملك عبدالعزيز التخصصي",
      english: "King Abdulaziz Specialist Hospital ",
      license: "رقم الترخيص : 1811627501120241",
      logocenter: "1",
      gsl: "GSL"
    },
    "9": {
      arabic: "مستشفى الملك سعود التخصصي",
      english: "King Saud Specialist Hospital ",
      license: "رقم الترخيص : 1811627501120241",
      logocenter: "1",
      gsl: "GSL"
    },
    "10": {
      arabic: "مستشفى الملك خالد التخصصي",
      english: "King Khalid Specialist Hospital ",
      license: "رقم الترخيص : 1811627501120241",
      logocenter: "1",
      gsl: "GSL"
    },
    "11": {
      arabic: "مستشفى الملك سلمان التخصصي",
      english: "King Salman Specialist Hospital ",
      license: "رقم الترخيص : 1811627501120241",
      logocenter: "1",
      gsl: "GSL"
    },
    "12": {
      arabic: "مستشفى الملك عبدالله التخصصي",
      english: "King Abdullah Specialist Hospital ",
      license: "رقم الترخيص : 1811627501120241",
      logocenter: "1",
      gsl: "GSL"
    },
    "13": {
      arabic: "مستشفى الملك فهد الجامعي",
      english: "King Fahd University Hospital ",
      license: "رقم الترخيص : 1811627501120241",
      logocenter: "1",
      gsl: "GSL"
    },
    "14": {
      arabic: "مستشفى الصادق",
      english: "Al-Sadiq Hospital ",
      license: "رقم الترخيص : 1821728502230241",
      logocenter: "2",
      gsl: "PSL"
    },
    "15": {
      arabic: "مستشفى الأمير سلطان",
      english: "Prince Sultan Hospital ",
      license: "رقم الترخيص : 1821728502230241",
      logocenter: "1",
      gsl: "GSL"
    },
    "16": {
      arabic: "مستشفى خميس مشيط العام",
      english: "Khamis Mushait General Hospital ",
      license: "رقم الترخيص : 1821728502230241",
      logocenter: "1",
      gsl: "GSL"
    },
    "17": {
      arabic: "مستشفى الخفجي العام",
      english: "Al-Khafji General Hospital ",
      license: "رقم الترخيص : 1221728802230241",
      logocenter: "1",
      gsl: "GSL"
    },
    "18": {
      arabic: "مستشفى جازان العام",
      english: "Jazan General Hospital ",
      license: "رقم الترخيص : 1825728522230241",
      logocenter: "1",
      gsl: "GSL"
    },
    "19": {
      arabic: "مستشفى عسير المركزي",
      english: "Asir Central Hospital ",
      license: "رقم الترخيص : 5421728504230241",
      logocenter: "14",
      gsl: "GSL"
    },
    "20": {
      arabic: "مستشفى الدمام المركزي",
      english: "Dammam Central Hospital ",
      license: "رقم الترخيص : 1821328562430841",
      logocenter: "1",
      gsl: "GSL"
    },
    "21": {
      arabic: "مستشفى حراء العام",
      english: "Hiraa General Hospital ",
      license: "رقم الترخيص : 1821748542331241",
      logocenter: "1",
      gsl: "GSL"
    },
    "22": {
      arabic: "مستشفى القصيم الوطني",
      english: "Al Qassim National Hospital",
      license: "رقم الترخيص : 1821747452362241",
      logocenter: "4",
      gsl: "GSL"
    },
    "23": {
      arabic: "مجمع رهف الطبي",
      english: "Rahaf Medical Complex",
      license: "رقم الترخيص : 1821747452362241",
      logocenter: "3",
      gsl: "PSL"
    },
    "24": {
      arabic: "مستشفى الحياة الوطني",
      english: "Hayat National Hospital",
      license: "رقم الترخيص : 1821747452362241",
      logocenter: "6",
      gsl: "GSL"
    },
    "25": {
      arabic: "مجمع الدمام الاهلي",
      english: "Dammam National Medical Complex",
      license: "رقم الترخيص : 1821747452362241",
      logocenter: "7",
      gsl: "PSL"
    },
    "26": {
      arabic: "مستشفى الظافر بنجران",
      english: "Alzafer Hospital Najran",
      license: "رقم الترخيص : 1821747452362241",
      logocenter: "8",
      gsl: "GSL"
    },
    "27": {
      arabic: "مدينة الملك سعود الطبية",
      english: "King Saud Medical City",
      license: "رقم الترخيص : 1821799455363241",
      logocenter: "9",
      gsl: "GSL"
    },
    "28": {
      arabic: "مدينة الملك عبدالله الطبية",
      english: "King Abdullah Medical City",
      license: "رقم الترخيص : 1811791422363241",
      logocenter: "10",
      gsl: "GSL"
    },
    "29": {
      arabic: "مستشفى القوات المسلحة",
      english: "Armed Forces Hospital",
      license: "رقم الترخيص : 1811791422363241",
      logocenter: "5",
      gsl: "GSL"
    },
    "30": {
      arabic: "مستشفى الامير منصور العسكري",
      english: "Prince Mansour Military Hospital",
      license: "رقم الترخيص : 1811791422363241",
      logocenter: "5",
      gsl: "GSL"
    },
    "31": {
      arabic: "مستشفى النماص العام",
      english: "Al-Namas General Hospital",
      license: "رقم الترخيص : 1811791444363241",
      logocenter: "11",
      gsl: "GSL"
    },
    "32": {
      arabic: "مجمع العالمي الطبي",
      english: "Al Alami Medical Complex",
      license: "رقم الترخيص : 1811791444363241",
      logocenter: "12",
      gsl: "PSL"
    },
    "33": {
      arabic: "مجمع العائلة الطبي",
      english: "Family Medical Complex",
      license: "رقم الترخيص : 1811791444363241",
      logocenter: "13",
      gsl: "PSL"
    },
    "34": {
      arabic: "مستشفى الملك خالد بالخبر",
      english: "King Khalid Hospital in AlKhobar",
      license: "رقم الترخيص : 1847521041020141",
      logocenter: "1",
      gsl: "GSL"
    },
    "35": {
      arabic: "مستشفى محايل عسير العام",
      english: "Mahayil Asir General Hospital",
      license: "رقم الترخيص : 1847521041020141",
      logocenter: "1",
      gsl: "GSL"
    },
    "36": {
      arabic: "مستشفى قنفذة العام",
      english: "Qunfudhah General Hospital",
      license: "رقم الترخيص : 1847521041020141",
      logocenter: "1",
      gsl: "GSL"
    },
    "37": {
      arabic: "مجمع الدمام الطبي",
      english: "Dammam Medical Complex",
      license: "رقم الترخيص : 1847521041020141",
      logocenter: "18",
      gsl: "PSL"
    },
    "38": {
      arabic: "مستشفى دلة الصحي",
      english: "Dallah Health Hospital",
      license: "رقم الترخيص : 1847521041020141",
      logocenter: "16",
      gsl: "GSL"
    },
    "39": {
      arabic: "مستشفى د.سليمان حبيب",
      english: "Dr.Sulaiman Habib Hospital",
      license: "رقم الترخيص : 1847521041020141",
      logocenter: "15",
      gsl: "PSL"
    },
    "40": {
      arabic: "السعودي الالماني الصحي",
      english: "Saudi German Health",
      license: "رقم الترخيص : 1847521041020141",
      logocenter: "17",
      gsl: "PSL"
    },
    "41": {
      arabic: "مستشفى عرعر المركزي",
      english: "Arar Central Hospital",
      license: "رقم الترخيص : 1847621542120241",
      logocenter: "1",
      gsl: "GSL"
    },
    "42": {
      arabic: "مستشفى رفحاء المركزي",
      english: "Rafha Central Hospital",
      license: "رقم الترخيص : 1847521142040141",
      logocenter: "20",
      gsl: "GSL"
    },
    "43": {
      arabic: "مستشفى شقراء العام",
      english: "Shaqra General Hospital",
      license: "رقم الترخيص : 1848511541020241",
      logocenter: "19",
      gsl: "GSL"
    },
    "44": {
      arabic: "مستشفى ضباء العام",
      english: "Duba General Hospital",
      license: "رقم الترخيص : 1847621041220141",
      logocenter: "1",
      gsl: "GSL"
    },
    "45": {
      arabic: "العيادات المتقدمة الاستشارية",
      english: "Advanced consulting clinics",
      license: "رقم الترخيص : 1847621041220141",
      logocenter: "21",
      gsl: "PSL"
    },
    "46": {
      arabic: "مستشفى الامير محمد بن عبدالعزيز",
      english: "Prince Mohammed Bin Abdulaziz Hospital",
      license: "رقم الترخيص : 1847621041220141",
      logocenter: "1",
      gsl: "GSL"
    },
    "47": {
      arabic: "مستشفى صبيا العام",
      english: "Sabia General Hospital",
      license: "رقم الترخيص : 1847621041220141",
      logocenter: "1",
      gsl: "GSL"
    },
    // "41": {arabic: "",english: "",license:"",logocenter:""},
  }
  var centerst = centers[centernum];
  var centerar = centerst.arabic;
  var centeren = centerst.english;
  var license = centerst.license;
  var logocenter = centerst.logocenter;
  var gslcenter = centerst.gsl;
  //============================انتاج gsl=============================
  var randomCode = gslcenter + '24022' + Math.floor(100000 + Math.random() * 900000);
  //==============================gsl end================================
  //==================التاريخ كتابي===============
  var formattedDate = new Date(datain).toLocaleDateString("en-US", {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  var splitDate = formattedDate.split(" ");
  var day = splitDate[2].replace(',', '').padStart(2, '0');
  var reorderedDate = [splitDate[0], day, splitDate[1], splitDate[3]].join(" ");
  //==========الوقت==========================
  var time = new Date();
  var formattedTime = time.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  //==========================================


  try {
    await Customer.create({
      inputgsl: randomCode,
      inputnamear: namee,
      inputnameen: nameenupper,
      inputworkar: empolye,
      inputidentity: idf,
      inputdatesick: datam,
      inputdatemin: datemin,
      inputdatemout: datemin,
      inputdatehin: hijriDate,
      inputdatehout: hijriDate,
      inputindurationh: daydateh,
      inputdurationm: daydatem,
      inputdoctorar: doctorar,
      inputdatefrom: datain,
      inputdateto: dataout,
      inputdoctoren: doctoren,
      inputworktypear: positonar,
      inputworktypeen: positonen,
      inputnationalityar: nationalityar,
      inputnationalityen: nationalityen,
      inputcentralnamear: centerar,
      inputcentralnameen: centeren,
      inputcentralid: license,
      inputdaynum: daynamper,
      inputdateparint: reorderedDate,
      inputtimeparint: formattedTime,
      inputcentralnum: logocenter
    });
    console.log("Data saved successfully");
    res.redirect('/main');
  } catch (error) {
    res.status(500).send("Error saving data");
  }
});
module.exports = router;