import React, { useState, useEffect } from "react";

// import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [region, setRegion] = useState("select");
  const [checked, setChecked] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    setShowTable(false);
    // setErrorMessage([]);
  }, [name, email, dob, region, checked]);

  function onSubmit(e) {
    e.preventDefault();
    setErrorMessage([]);
    setShowTable(false);

    //individual validation
    let isName = validateName();
    let isEmail = validateEmail();
    let isDob = validateDob();
    let isRegion = validateRegion();
    let isTerms = validateTerms();

    // validation for showing table
    if (isName && isEmail && isDob && isRegion && isTerms) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  }

  const validateName = () => {
    var element = document.getElementById("name");
    if (name) {
      var regName = /^[a-z ,.'-]+$/i;
      if (!regName.test(name)) {
        // alert("Invalid name given.");
        element.classList.add("error");
        setErrorMessage((errorMessage) => [
          ...errorMessage,
          "Invalid name entered.",
        ]);
        return false;
      } else {
        // alert("Valid name given.");
        element.classList.remove("error");
        return true;
      }
    } else {
      // alert("Enter your full name");
      element.classList.add("error");
      setErrorMessage((errorMessage) => [
        ...errorMessage,
        "Enter your full name",
      ]);
      return false;
    }
  };

  const validateEmail = () => {
    var element = document.getElementById("email");
    if (email) {
      var regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regEmail.test(email)) {
        // alert("Enter a valid email.");
        element.classList.add("error");
        setErrorMessage((errorMessage) => [
          ...errorMessage,
          "Enter a valid email.",
        ]);
        return false;
      } else {
        // alert("Valid email given.");
        element.classList.remove("error");
        return true;
      }
    } else {
      // alert("Enter your email");
      element.classList.add("error");
      setErrorMessage((errorMessage) => [...errorMessage, "Enter your email"]);
      return false;
    }
  };

  const validateDob = () => {
    var element = document.getElementById("dob");
    if (dob) {
      var today = new Date();
      var birthDate = new Date(dob);
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
      }
      if (age_now < 18) {
        // alert("Your need to be atleast 18");
        element.classList.add("error");
        setErrorMessage((errorMessage) => [
          ...errorMessage,
          "Your need to be atleast 18",
        ]);
        return false;
      } else {
        // alert("Age is above 18");
        element.classList.remove("error");
        return true;
      }
    } else {
      // alert("Enter your date of birth");
      element.classList.add("error");
      setErrorMessage((errorMessage) => [
        ...errorMessage,
        "Enter your date of birth",
      ]);
      return false;
    }
  };

  const validateRegion = () => {
    var element = document.getElementById("region");
    if (region === "select") {
      // alert("Select a region");
      element.classList.add("error");
      setErrorMessage((errorMessage) => [...errorMessage, "Select a region"]);
      return false;
    } else {
      // alert("You have selected a valid region");
      element.classList.remove("error");
      return true;
    }
  };

  const validateTerms = () => {
    var element = document.getElementById("terms");

    if (!checked) {
      // alert("Accept Terms and Conditions");
      element.classList.add("error");
      setErrorMessage((errorMessage) => [
        ...errorMessage,
        "Accept Terms and Conditions",
      ]);
      return false;
    } else {
      // alert("You have accepted Terms and Conditions");
      element.classList.remove("error");
      return true;
    }
  };

  return (
    <div className="App">
      <div className="error-message">
        {errorMessage &&
          errorMessage.map((item, id) => {
            return <p key={id}>{item}</p>;
          })}
      </div>
      <form action="" className="form">
        <div className="form-control">
          <label htmlFor="name">*Full Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">*Email:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter our email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="dob">*Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="region">*Region:</label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="select">Select</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="form-control">
          <input
            type="checkbox"
            id="terms"
            checked={checked}
            onChange={(e) => setChecked(!checked)}
          />
          <label htmlFor="dob">I agree to the Terms and Conditions</label>
        </div>
        <div className="form-control">
          <button onClick={onSubmit}>Submit</button>
        </div>
      </form>
      {showTable ? <Table Key={region} region={region} /> : null}
    </div>
  );
}

export default App;
