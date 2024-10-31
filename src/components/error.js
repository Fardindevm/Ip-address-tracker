import React from "react";
import emailjs from 'emailjs-com';
import { useState } from "react";
export default function Error() {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission
    emailjs.sendForm(process.env.REACT_APP_MAIL_SERVICE, process.env.REACT_APP_MAIL_TEMPLATE, e.target, process.env.REACT_APP_MAIL_ID)
      .then(() => {
        alert("Notification sent successfully!");
        setIsButtonDisabled(true)
      }, () => {
        alert("Failed to send notification.");
      });
  };

  return (
    <div className="error" onSubmit={sendEmail} style={{ zIndex: 1000202301032 }}>
      {!isButtonDisabled ?
        <>
          <h1 className="text-center leading-relaxed tracking-wider">Api credit has finished!
            <br /> Let authors know by clicking the button below.
            <br /> Thank you!
          </h1>
        </>
        : <p className="text-blue-200 mt-3 tracking-wider text-center">Thank you for Clicking! <br /> We will fix it as soon as possible.</p>}
      <form>
        <button
          className="bg-green-700 px-3 py-1 rounded-2xl mt-2 tracking-wider hover:opacity-85"
          type="submit"
          style={isButtonDisabled ? { backgroundColor: 'gray', cursor: 'not-allowed' } : {}}
          disabled={isButtonDisabled}
        >Click here
        </button>
      </form>
    </div>
  )
}