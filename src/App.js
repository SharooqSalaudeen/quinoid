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

  useEffect(() => {
    setShowTable(false);
  }, [name, email, dob, region, checked]);

  function onSubmit(e) {
    e.preventDefault();
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
    if (name) {
      var regName = /^[a-z ,.'-]+$/i;
      if (!regName.test(name)) {
        alert("Invalid name given.");
        return false;
      } else {
        alert("Valid name given.");
        return true;
      }
    } else {
      alert("Provide your full name");
      return false;
    }
  };

  const validateEmail = () => {
    if (email) {
      var regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regEmail.test(email)) {
        alert("Invalid email given.");
        return false;
      } else {
        alert("Valid email given.");
        return true;
      }
    } else {
      alert("Provide your email");
      return false;
    }
  };

  const validateDob = () => {
    if (dob) {
      var today = new Date();
      var birthDate = new Date(dob);
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
      }
      if (age_now < 18) {
        alert("Your need to be atleast 18");
        return false;
      } else {
        alert("Age is above 18");
        return true;
      }
    }
  };

  const validateRegion = () => {
    if (region === "select") {
      alert("select a region");
      return false;
    } else {
      alert("You have selected a valid region");
      return true;
    }
  };

  const validateTerms = () => {
    if (!checked) {
      alert("Accept Terms and Conditions");
      return false;
    } else {
      alert("You have accepted Terms and Conditions");
      return true;
    }
  };
  return (
    <div className="App">
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
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
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
