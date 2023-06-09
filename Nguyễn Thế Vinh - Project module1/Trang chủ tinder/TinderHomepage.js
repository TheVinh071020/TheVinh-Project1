
// Sign in
let users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);
let formSign = document.querySelector(".mainFormSign");
let signbtn = document.getElementById("signbtn");
let errorSign = document.querySelector(".errorsign");

// sign in
signbtn.onclick = function (e) {
  e.preventDefault();

  let email = formSign.signemail.value;
  let password = formSign.signpassword.value;
  let confirmPassword = formSign.signconfirmPassword.value;
  let errorsign = "";

  let passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!passRegex.test(password)) {
    errorsign = errorsign + "Mật khẩu không hợp lệ! <br/>";
  }
  if (!emailRegex.test(email)) {
    errorsign = errorsign + "Email không hợp lệ! <br/>";
  }
  if (password !== confirmPassword) {
    errorsign = errorsign + "Xác nhận mật khẩu không hợp lệ! ";
  }
  if (
    passRegex.test(password) &&
    emailRegex.test(email) &&
    password === confirmPassword
  ) {
    error = "";
    let newUser = {
      id: Math.floor(Math.random() * 10000000),
      email: email,
      password: password,
    };
    users.push(newUser);
    localStorage.users = JSON.stringify(users);
    window.location.href =
      "http://127.0.0.1:5500/Trang%20ch%E1%BB%A7%20tinder/Trang%20ch%E1%BB%A7%20Tinder.html";
  }
  errorSign.innerHTML = errorsign;
};

// Login
let users1 = JSON.parse(localStorage.getItem("users")) || [];
let formLogin = document.querySelector(".mainformLogin");
let loginbtn = document.getElementById("loginbtn");
let errorlogin = document.querySelector(".errorlogin");

console.log(loginbtn);
// Login
loginbtn.onclick = function (e) {
  e.preventDefault();

  let email = formLogin.loginemail.value;
  let password = formLogin.loginpassword.value;

  let check = false;
  for (let i = 0; i < users.length; i++) {
    console.log("==>", users[i]);
    if (users[i].email == email && users[i].password == password) {
      check = true;
      console.log("==>", check);
    }
  }

  if (check) {
    // luu thong tin
    localStorage.setItem(
      "login",
      JSON.stringify({ email: email, password: password })
    );

    window.location.href = "http://127.0.0.1:5500/TinderApp/TinderApp.html";
  } else {
    errorlogin.innerHTML = "Vui lòng nhập lại ";
  }
};
