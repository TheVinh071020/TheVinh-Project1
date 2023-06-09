// Login
let users1 = JSON.parse(localStorage.getItem("users1")) || [];
let formLogin = document.querySelector(".mainformLogin");
let loginbtn = document.getElementById("loginbtn");
let errorlogin = document.querySelector(".errorlogin");
console.log(loginbtn);
// Login
loginbtn.onclick = function (e) {
  e.preventDefault();

  let email = formLogin.loginemail.value;
  let password = formLogin.loginpassword.value;
  let errorlogin = "";

  let passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!passRegex.test(password)) {
    errorlogin = errorlogin + "Mật khẩu không hợp lệ! <br/>";
  }
  if (!emailRegex.test(email)) {
    errorlogin = errorlogin + "Email không hợp lệ! <br/>";
  }
  if (
    emailRegex.test(email) &&
    passRegex.test(password) &&
    password === password
  ) {
    error = "";
    let newUser = {
      id: Math.floor(Math.random() * 1000000),
      email: email,
      password: password,
    };
    users1.push(newUser);
    localStorage.users = JSON.stringify(users1);
    window.location.href = "http://127.0.0.1:5500/TinderApp/TinderApp.html";
  }
  errorlogin.innerHTML = errorlogin;
};
