import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function ConfirmTransferPage() {
  const { orderCode } = useParams();
  const [status, setStatus] = useState("loading"); // loading | success | already | error
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch(`${process.env.REACT_APP_API_URL}/orders/confirm-transfer/${orderCode}`)
      .then(res => {
        if (!res.ok) throw new Error("ההזמנה לא נמצאה או כבר אושרה");
        return res.text(); // מחזיר טקסט פשוט
      })
      .then(() => setStatus("success"))
      .catch(err => {
        console.error(err);
        setStatus("error");
      });
  }, [orderCode]);

  if (status === "loading") return <p>טוען...</p>;
  if (status === "error") return <p>ההזמנה לא נמצאה או כבר אושרה.</p>;

  return (
    <div
      dir="rtl"
      style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}
    >
      <h2 style={{ color: "#0D1E46" }}>ההזמנה אושרה בהצלחה</h2>
      <p style={{ fontSize: 18 }}>נשלח מייל ללקוח עם פרטי ההזמנה</p>
    </div>
  );
}
