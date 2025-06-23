import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function ConfirmPage() {
  const { orderCode } = useParams();
  const [status, setStatus] = useState("loading"); // loading | success | already | error
  const [fullName, setFullName] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // אם כבר ביצענו fetch - לא נעשה שוב
    hasFetched.current = true;

    fetch(`${process.env.REACT_APP_API_URL}/orders/confirm/${orderCode}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setFullName(data.fullName);
        setStatus(data.alreadyConfirmed ? "already" : "success");
      })
      .catch(err => {
        console.error(err);
        setStatus("error");
      });
  }, [orderCode]);

  if (status === "loading") return <p>טוען...</p>;
  if (status === "error") return <p>שגיאה בשרת</p>;

  return (
    <div
      dir="rtl"
      style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}
    >
      {status === "already" ? (
        <h2 style={{ color: "#252e49" }}>ההזמנה כבר אושרה כסופקה.</h2>
      ) : (
        <>
          <h2 style={{ color: "#252e49" }}>תודה רבה, {fullName}!</h2>
          <p style={{ fontSize: 18 }}>אישרת בהצלחה את קבלת ההזמנה.</p>
        </>
      )}
    </div>
  );
}
