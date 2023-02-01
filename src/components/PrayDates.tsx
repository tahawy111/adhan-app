import { useEffect, useState } from "react";
import { Adhan } from "islamic-adhan";
import "./PrayDates.css";
import { IonSelect, IonSelectOption } from "@ionic/react";

interface IParams {
  date: Date;
}

const PrayDates: React.FC<IParams> = ({ date }) => {
  if (localStorage.gov === undefined) {
    localStorage.setItem("gov", JSON.stringify("01"));
  }
  const Prayer = new Adhan("Egypt");
  interface ITimes {
    fajr: { iso: Date; formatedTime: string };
    sunrise: { iso: Date; formatedTime: string };
    dhuhr: { iso: Date; formatedTime: string };
    asr: { iso: Date; formatedTime: string };
    sunset: { iso: Date; formatedTime: string };
    maghrib: { iso: Date; formatedTime: string };
    isha: { iso: Date; formatedTime: string };
    gov?: string;
  }

  const govPrayTimes = (govNum: string, date?: Date): ITimes | any => {
    if (govNum > "27") return false;
    const govesArr: any = {
      "01": { ar: "القاهرة", en: "Cairo", lat: 30.033333, lng: 31.2394 },
      "02": { ar: "الإسكندرية", en: "Alexandria", lat: 31.223, lng: 30.0355 },
      "03": { ar: "بورسعيد", en: "Port Said", lat: 31.25, lng: 32.2833 },
      "04": { ar: "السويس", en: "Suez", lat: 29.9667, lng: 32.5333 },
      "05": { ar: "دمياط", en: "Damietta", lat: 31.4167, lng: 31.8214 },
      "06": { ar: "الدقهلية", en: "Dakahlia", lat: 30.7192, lng: 31.2628 },
      "07": { ar: "الشرقية", en: "Ash Sharqīyah", lat: 30.5667, lng: 31.5 },
      "08": { ar: "القليوبية", en: "Qalyubia", lat: 30.1286, lng: 31.2422 },
      "09": { ar: "كفر الشيخ", en: "Kafr El-Sheikh", lat: 31.1, lng: 30.95 },
      "10": { ar: "الغربية", en: "Al Gharbīyah", lat: 30.9667, lng: 31.1667 },
      "11": { ar: "المنوفية", en: "Menoufia", lat: 30.4667, lng: 30.9333 },
      "12": { ar: "البحيرة", en: "Al Buḩayrah", lat: 31.05, lng: 30.4667 },
      "13": { ar: "الإسماعيلية", en: "Ismailia", lat: 30.5833, lng: 32.2667 },
      "14": { ar: "الجيزة", en: "Giza", lat: 29.987, lng: 31.2118 },
      "15": { ar: "بني سويف", en: "Bani Sweif", lat: 29.0667, lng: 31.0833 },
      "16": { ar: "الفيوم", en: "Fayoum", lat: 29.3, lng: 30.8333 },
      "17": { ar: "المنيا", en: "Minya", lat: 28.0833, lng: 30.75 },
      "18": { ar: "أسيوط", en: "Asyut", lat: 27.1869, lng: 31.1714 },
      "19": { ar: "سوهاج", en: "Sohag", lat: 26.5606, lng: 31.6917 },
      "20": { ar: "قنا", en: "Qena", lat: 26.1667, lng: 32.7167 },
      "21": { ar: "أسوان", en: "Aswan", lat: 24.0889, lng: 32.8997 },
      "22": { ar: "الأقصر", en: "Luxor", lat: 25.6969, lng: 32.6422 },
      "23": {
        ar: "البحر الأحمر",
        en: "The Red Sea",
        lat: 27.2578,
        lng: 33.8117,
      },
      "24": {
        ar: "الوادى الجديد",
        en: "Al Wādī al Jadīd",
        lat: 25.44,
        lng: 30.55,
      },
      "25": { ar: "مطروح", en: "Matrouh", lat: 29.2, lng: 25.5167 },
      "26": {
        ar: "شمال سيناء",
        en: "Shamāl Sīnā’",
        lat: 31.1249,
        lng: 33.8006,
      },
      "27": { ar: "جنوب سيناء", en: "Janūb Sīnā’", lat: 28.2333, lng: 33.6167 },
    };
    const times: ITimes = Prayer.getTimes(
      date || new Date() /* the Date */,
      [govesArr[govNum].lat, govesArr[govNum].lng],
      "auto" /* => timezone */
    );

    return { ...times, gov: govesArr[govNum].ar };
  };
  const cairo = "01";
  const [gov, setGov] = useState(JSON.parse(localStorage.gov));

  useEffect(() => {
    localStorage.setItem("gov", JSON.stringify(gov || null));
  }, [gov]);

  const govOptionList = [
    { num: "01", gov: "القاهرة" },
    { num: "02", gov: "الإسكندرية" },
    { num: "03", gov: "بورسعيد" },
    { num: "04", gov: "السويس" },
    { num: "05", gov: "دمياط" },
    { num: "06", gov: "الدقهلية" },
    { num: "07", gov: "الشرقية" },
    { num: "08", gov: "القليوبية" },
    { num: "09", gov: "كفر الشيخ" },
    { num: "10", gov: "الغربية" },
    { num: "11", gov: "المنوفية" },
    { num: "12", gov: "البحيرة" },
    { num: "13", gov: "الإسماعيلية" },
    { num: "14", gov: "الجيزة" },
    { num: "15", gov: "بني سويف" },
    { num: "16", gov: "الفيوم" },
    { num: "17", gov: "المنيا" },
    { num: "18", gov: "أسيوط" },
    { num: "19", gov: "سوهاج" },
    { num: "20", gov: "قنا" },
    { num: "21", gov: "أسوان" },
    { num: "22", gov: "الأقصر" },
    { num: "23", gov: "البحر الأحمر" },
    { num: "24", gov: "الوادى الجديد" },
    { num: "25", gov: "مطروح" },
    { num: "26", gov: "شمال سيناء" },
    { num: "27", gov: "جنوب سيناء" },
  ];

  const formatNum = (num: number): string =>
    +num < 10 ? `0${+num}` : `${num}`;

  return (
    <div>
      <IonSelect
        placeholder="اختر محافظتك"
        interface="action-sheet"
        onIonChange={(e: any) => setGov(e.detail.value)}
        value={gov}
      >
        {govOptionList.map(({ gov, num }) => (
          <IonSelectOption value={num}>{gov}</IonSelectOption>
        ))}
      </IonSelect>

      <table className="table table-bordered border-dark" dir="rtl">
        <thead>
          <tr>
            <th className="bg-dark text-white">المواقيت</th>
            <th>الفجر</th>
            <th>الظهر</th>
            <th>العصر</th>
            <th>المغرب</th>
            <th>العشاء</th>
          </tr>
        </thead>
        <tbody>
          <tr className="fw-bold text-dark">
            <th scope="row">{`${govPrayTimes(gov, date).gov}`}</th>
            <td>
              {`${govPrayTimes(gov, date).fajr.iso.toLocaleTimeString("ar-sa", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </td>
            <td>
              {`${govPrayTimes(gov, date).dhuhr.iso.toLocaleTimeString(
                "ar-sa",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}`}
            </td>
            <td>
              {`${govPrayTimes(gov, date).asr.iso.toLocaleTimeString("ar-sa", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </td>
            <td>
              {`${govPrayTimes(gov, date).maghrib.iso.toLocaleTimeString(
                "ar-sa",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}`}
            </td>
            <td>
              {`${govPrayTimes(gov, date).isha.iso.toLocaleTimeString("ar-sa", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </td>
          </tr>
          {gov !== cairo && (
            <tr>
              <th scope="row">{`${govPrayTimes(cairo, date).gov}`}</th>
              <td>
                {`${govPrayTimes(cairo, date).fajr.iso.toLocaleTimeString(
                  "ar-sa",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}`}
              </td>
              <td>
                {`${govPrayTimes(cairo, date).dhuhr.iso.toLocaleTimeString(
                  "ar-sa",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}`}
              </td>
              <td>
                {`${govPrayTimes(cairo, date).asr.iso.toLocaleTimeString(
                  "ar-sa",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}`}
              </td>
              <td>
                {`${govPrayTimes(cairo, date).maghrib.iso.toLocaleTimeString(
                  "ar-sa",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}`}
              </td>
              <td>
                {`${govPrayTimes(cairo, date).isha.iso.toLocaleTimeString(
                  "ar-sa",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}`}
              </td>
            </tr>
          )}
          <tr>
            <th scope="row">{`${
              govPrayTimes(formatNum(+gov + 1), date) === false
                ? govPrayTimes(formatNum(+gov - 1)).gov
                : govPrayTimes(formatNum(+gov + 1)).gov
            }`}</th>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 1), date) === false
                  ? govPrayTimes(
                      formatNum(+gov - 1),
                      date
                    ).fajr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 1),
                      date
                    ).fajr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 1)) === false
                  ? govPrayTimes(
                      formatNum(+gov - 1),
                      date
                    ).dhuhr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 1),
                      date
                    ).dhuhr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 1)) === false
                  ? govPrayTimes(
                      formatNum(+gov - 1),
                      date
                    ).asr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 1),
                      date
                    ).asr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 1)) === false
                  ? govPrayTimes(
                      formatNum(+gov - 1),
                      date
                    ).maghrib.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 1),
                      date
                    ).maghrib.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 1)) === false
                  ? govPrayTimes(
                      formatNum(+gov - 1),
                      date
                    ).isha.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 1),
                      date
                    ).isha.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
          </tr>
          <tr>
            <th scope="row">{`${
              govPrayTimes(formatNum(+gov + 2)) === false
                ? govPrayTimes(formatNum(+gov - 2)).gov
                : govPrayTimes(formatNum(+gov + 2)).gov
            }`}</th>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 2)) === false
                  ? govPrayTimes(
                      formatNum(+gov - 2),
                      date
                    ).fajr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 2),
                      date
                    ).fajr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 2)) === false
                  ? govPrayTimes(
                      formatNum(+gov - 2),
                      date
                    ).dhuhr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 2),
                      date
                    ).dhuhr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 2)) === false
                  ? govPrayTimes(
                      formatNum(+gov - 2),
                      date
                    ).asr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 2),
                      date
                    ).asr.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 2)) === false
                  ? govPrayTimes(
                      formatNum(+gov - 2),
                      date
                    ).maghrib.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 2),
                      date
                    ).maghrib.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
            <td>
              {`${
                govPrayTimes(formatNum(+gov + 2)) === false
                  ? govPrayTimes(
                      formatNum(+gov - 2),
                      date
                    ).isha.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : govPrayTimes(
                      formatNum(+gov + 2),
                      date
                    ).isha.iso.toLocaleTimeString("ar-sa", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
              }`}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrayDates;
