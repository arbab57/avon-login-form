const form = document.querySelector("#form");
const overlay = document.querySelector("#overlay");

const fname = document.querySelector("#fname");
const errorFname = document.querySelector("#error-fname");
const errorLname = document.querySelector("#error-lname");
const lname = document.querySelector("#lname");

const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const pass = document.querySelector("#pass");
const passConfirm = document.querySelector("#pass-confirm");

const errorEmail = document.querySelector("#error-email");
const errorPhone = document.querySelector("#error-phone");
const errorPass = document.querySelector("#error-pass");
const errorPassConfirm = document.querySelector("#error-pass-confirm");

const btnSubmit = document.querySelector("#btn-submit");
const btnLoginPromt = document.querySelector("#login-prompt");

const passBar = document.querySelector("#pass-bar");

const spaceValidation = /\s/;
const numberValidation = /[0-9]/;
const emptyValidation = /[a-z]/;
const symbolValidation = /[,<>\./?:;"'{[}\]`~#$%^&*()=_!@+-]/;
const phoneCodeValidaton = /(^\+)/;
const upperCaseValidation = /[A-Z]/;

let errors = [
  "Name cannot contain numbers",
  "connot contain spaces",
  "This field cannot be empty",
  "cannot contain any symbols",
  "Phone Number must begin with a +",
  "Must be a valid phone number",
  "Must be atleast 8 characters",
  "Must be shorter than 35 characters",
];
let interval = setInterval(progress, 100);
let passStr = 0;
let multiplier = 7;

function progress() {
  passStr = pass.value.length * multiplier;
  passStr > 60 ? (passStr = 60) : null;
  passStr += pass.value.length / 2.1;
  passStr > 74 ? (passStr = 74) : null;
  numberValidation.test(pass.value) ? (passStr += 13) : null;
  symbolValidation.test(pass.value) ? (passStr += 13) : null;
  upperCaseValidation.test(pass.value) ? (passStr += 13) : null;
  passStr > 98 ? (passStr = 100) : null;

  if (passStr) {
    passBar.classList.add("bg-danger");
    passBar.classList.remove("bg-warning");
    passBar.classList.remove("bg-success");
  }
  if (passStr > 50) {
    passBar.classList.remove("bg-danger");
    passBar.classList.add("bg-warning");
  }
  if (passStr > 75) {
    passBar.classList.remove("bg-warning");
    passBar.classList.add("bg-success");
  }

  console.log(passStr);
  passBar.style.width = passStr + "%";
}

function showPassword() {
  if (pass.type === "password") {
    pass.type = "text";
    passConfirm.type = "text";
  } else {
    pass.type = "password";
    passConfirm.type = "password";
  }
}

btnLoginPromt.onclick = () => {
  window.location.href = "index.html";
};

btnSubmit.onclick = (e) => {
  errorFname.innerText = "";
  errorLname.innerText = "";
  errorEmail.innerText = "";
  errorPhone.innerText = "";
  errorPass.innerText = "";
  errorPassConfirm.innerText = "";

  if (numberValidation.test(fname.value)) {
    errorFname.innerText = errors[0];
    e.preventDefault();
    return;
  }

  if (spaceValidation.test(fname.value)) {
    errorFname.innerText = errors[1];
    e.preventDefault();
    return;
  }
  if (!emptyValidation.test(fname.value)) {
    errorFname.innerText = errors[2];
    e.preventDefault();
    return;
  }
  if (symbolValidation.test(fname.value)) {
    errorFname.innerText = errors[3];
    e.preventDefault();
    return;
  }

  if (numberValidation.test(lname.value)) {
    errorLname.innerText = errors[0];
    e.preventDefault();
    return;
  }
  if (spaceValidation.test(lname.value)) {
    errorLname.innerText = errors[1];
    e.preventDefault();
    return;
  }
  if (!emptyValidation.test(lname.value)) {
    errorLname.innerText = errors[2];
    e.preventDefault();
    return;
  }
  if (symbolValidation.test(lname.value)) {
    errorLname.innerText = errors[3];
    e.preventDefault();
    return;
  }

  if (!emptyValidation.test(email.value)) {
    errorEmail.innerText = errors[2];
    e.preventDefault();
    return;
  }
  if (emptyValidation.test(phone.value)) {
    errorPhone.innerText = errors[5];
    e.preventDefault();
    return;
  }
  if (!numberValidation.test(phone.value)) {
    errorPhone.innerText = errors[2];
    e.preventDefault();
    return;
  }
  if (!phoneCodeValidaton.test(phone.value)) {
    errorPhone.innerText = errors[4];
    e.preventDefault();
    return;
  }
  if (phone.value.length < 10) {
    errorPhone.innerText = errors[5];
    e.preventDefault();
    return;
  }
  if (pass.value.length < 1) {
    errorPass.innerText = errors[2];
    e.preventDefault();
    return;
  }
  if (pass.value.length < 8) {
    errorPass.innerText = errors[6];
    e.preventDefault();
    return;
  }
  if (pass.value.length > 35) {
    errorPass.innerText = errors[7];
    e.preventDefault();
    return;
  }
  if (!upperCaseValidation.test(pass.value)) {
    errorPass.innerText =
      "Must have an uppercase letter, a number and a special character";
    e.preventDefault();
    return;
  }
  if (!numberValidation.test(pass.value)) {
    errorPass.innerText = "Must have a number, and a special character";
    e.preventDefault();
    return;
  }
  if (!symbolValidation.test(pass.value)) {
    errorPass.innerText = "Must have a special character";
    e.preventDefault();
    return;
  }

  if (passConfirm.value !== pass.value) {
    errorPassConfirm.innerText = "Passwords do not match";
    e.preventDefault();
    return;
  }
  e.preventDefault();
  overlay.classList.remove("d-none");
  document.querySelector("#text-fname").innerText = fname.value;
  document.querySelector("#text-lname").innerText = lname.value;
  document.querySelector("#text-email").innerText = email.value;
  document.querySelector("#text-phone").innerText = phone.value;
  document.querySelector("#text-pass").innerText = pass.value;
  if (document.querySelector("#company").value.length > 1) {
    document.querySelector("#text-company").innerText =
      document.querySelector("#company").value;
  } else {
    document.querySelector("#box-company").classList.add("d-none");
  }
};
