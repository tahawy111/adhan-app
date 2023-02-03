import {
  IonApp,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonTitle,
  IonToolbar,
  isPlatform,
  setupIonicReact,
} from "@ionic/react";
import "./App.css";
import {
  AdMob,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from "@capacitor-community/admob";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import PrayDates from "./components/PrayDates";
import { useEffect, useState } from "react";

setupIonicReact();
const App: React.FC = () => {
  const [mainDate, setMainDate] = useState(new Date());
  const monthList = [
    { hijri: "محرم", coptic: "توت", ar: `يـنايـر`, en: "January" },
    { hijri: "صفر", coptic: "بابه", ar: `فـبرايـر`, en: "February" },
    { hijri: "ربيع الأول", coptic: "هاتور", ar: `مـارس`, en: "March" },
    { hijri: "ربيع الآخر", coptic: "كيهك", ar: `أبـريـل`, en: "April" },
    { hijri: "جمادى الأولى", coptic: "طوبة", ar: `مـايـو`, en: "May" },
    { hijri: "جمادى الآخرة", coptic: "أمشير", ar: `يـونـيـو`, en: "June" },
    { hijri: "رجب", coptic: "برمهات", ar: `يـولـيـو`, en: "July" },
    { hijri: "شعبان", coptic: "برمودة", ar: `أغـسـطـس`, en: "August" },
    { hijri: "رمضان", coptic: "بشنس", ar: `سبـتـمبر`, en: "September" },
    { hijri: "شوال", coptic: "بؤونة", ar: `أكـتـوبر`, en: "October" },
    { hijri: "ذو القعدة", coptic: "أبيب", ar: `نـوفمبـر`, en: "November" },
    { hijri: "ذو الحجة", coptic: "مسري", ar: `ديـسـمـبر`, en: "December" },
  ];

  const daysList = [
    { ar: `الأحد`, en: "Sunday" },
    { ar: `الأثنين`, en: "Monday" },
    { ar: `الثلاثاء`, en: "Tuesday" },
    { ar: `الاربعاء`, en: "Wednesday" },
    { ar: `الخميس`, en: "Thursday" },
    { ar: `الجمعة`, en: "Friday" },
    { ar: `السبت`, en: "Saturday" },
  ];

  let hijri = new Intl.DateTimeFormat("ar-SA-u-nu-latn");

  const hijriDay = parseInt(hijri.format(mainDate).split("/")[0]);
  const hijriMonth = parseInt(hijri.format(mainDate).split("/")[1]);
  const hijriYear = parseInt(
    hijri.format(mainDate).split("/")[2].split(" ")[0]
  );
  const copticDate = new Intl.DateTimeFormat("ar", {
    calendar: "coptic",
  }).format(mainDate);

  const copticDay = parseInt(copticDate.split("/")[0]);
  const copticMonth = parseInt(copticDate.split("/")[1]);
  const copticYear = parseInt(copticDate.split("/")[2]);

  useEffect(() => {
    const asyncFunc = async () => {
      const { status } = await AdMob.trackingAuthorizationStatus();
      if (status === "notDetermined") {
        console.log("Display information before ads load first time");
      }

      AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ["Pixel API 31"],
        initializeForTesting: true,
      });
    };
    asyncFunc();
  });
  const showBanner = async () => {
    const adId = isPlatform("ios")
      ? "ca-app-pub-3802151240515348~9440455297"
      : "ca-app-pub-3802151240515348/2525361455";

    const options: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true,
    };

    await AdMob.showBanner(options);
  };

  console.log("trying to add ads");

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-primary text-center">
            بلوك النتيجة ببلاش
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div dir="rtl" className="mb-3 d-flex">
          <label htmlFor="dateInput" className="form-label">
            أدخل التاريخ الذي تريد الانتقال إليه
          </label>
          <input
            onChange={(e: any) => setMainDate(new Date(e.target.value))}
            type="date"
            className="form-control"
          />
        </div>

        <div className="dates border border-3 border-dark rounded-3 d-flex justify-content-between text-center">
          <div className="left d-flex flex-column justify-content-center fw-bold">
            <div className="fs-1">
              {hijriDay.toLocaleString("ar-eg").replace("٬", "")}
            </div>
            <div className="fs-4">{monthList[hijriMonth - 1].hijri}</div>
            <div className="fs-3 mt-2">
              {hijriYear.toLocaleString("ar-eg").replace("٬", "")}
            </div>
          </div>
          <div className="center d-flex flex-column justify-content-center fw-bold">
            <div className="fs-4">{daysList[mainDate.getDay()].ar}</div>
            <div className="fs-6">
              {daysList[mainDate.getDay()].en.toUpperCase()}
            </div>
            <div className="fs-4">{mainDate.getDate()}</div>
            <div className="fs-6">
              {monthList[mainDate.getMonth()].en.toUpperCase() + " "}
              {mainDate.getFullYear()}
            </div>
            <div className="border-2 border-dark border-top p-1 d-flex justify-content-center">
              {copticDay.toLocaleString("ar-eg").replace("٬", "") + " "}
              {monthList[copticMonth - 1].coptic + " "}
              {copticYear.toLocaleString("ar-eg").replace("٬", "")}
            </div>
          </div>
          <div className="right d-flex flex-column justify-content-center fw-bold">
            <div className="fs-1">
              {mainDate.getDate().toLocaleString("ar-eg")}
            </div>
            <div className="fs-2">{monthList[mainDate.getMonth()].ar}</div>
            <div className="fs-3 mt-2">
              {mainDate.getFullYear().toLocaleString("ar-eg").replace("٬", "")}
            </div>
          </div>
        </div>

        <PrayDates date={mainDate} />
      </IonContent>
      <IonFooter>
        <IonToolbar className="text-center fst-italic">
          Copyright by{" "}
          <a
            href="https://web.facebook.com/profile.php?id=100011964761632"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amer Tahawy
          </a>{" "}
          {new Date().getFullYear()} &{" "}
          <a
            href="https://github.com/tahawy111"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </IonToolbar>
      </IonFooter>
    </IonApp>
  );
};

export default App;
