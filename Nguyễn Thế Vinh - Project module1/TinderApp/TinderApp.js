let friendChat;
let users2 = JSON.parse(localStorage.getItem("userTinder"));
let html = "";
let listImg = document.getElementById("list-img");
let pass = document.querySelector(".icon1");
let like = document.querySelector(".icon2");

document.addEventListener("DOMContentLoaded", () => renderUsers2());

// Ẩn hiện match và mess
let match = document.getElementById("match");
let matchId = document.getElementById("top-block");
// let messenger = document.getElementById("messenger");
// let messengerId = document.querySelector(".container-messenger");

// messenger.addEventListener("click", function () {
// matchId.style.display = "none";
// messengerId.style.display = "flex";
// });
match.addEventListener("click", function () {
  matchId.style.display = "flex";
  // messengerId.style.display = "none";
});

// Ẩn hiện profile
let closebtn = document.querySelector(".close");
let showMessenger = document.getElementById("show-messenger");
let showMatch = document.querySelector(".main-div");
// let messengerBtn = document.querySelector(".container-messenger");

closebtn.addEventListener("click", function () {
  showMessenger.style.display = "none";
  showMatch.style.display = "block";
});
// messengerBtn.addEventListener("click", function () {
//   showMessenger.style.display = "flex";
//   showMatch.style.display = "none";
// });

let icon1 = document.querySelector(".icon1");
let icon2 = document.querySelector(".icon2");
let noneUser = document.querySelector(".none-user");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Ấn like
async function likeControl(email) {
  let match = JSON.parse(localStorage.getItem("match"));
  const index = match.findIndex((item) => item.email == userLogin.email);

  // ==========================================================
  // Ấn match hiện thông báo 2s rồi none
  let listMatch = document.getElementById("list-match");
  let successfulMatch = document.getElementById("successful-match");
  successfulMatch.style.display = "block";
  listImg.style.display = "none";
  await delay(1000);
  successfulMatch.style.display = "none";
  listImg.style.display = "block";

  // ==========================================================

  let dataListMatch = [];

  if (!match[index].match.includes(email)) {
    match[index].match.push(email);
    localStorage.setItem("match", JSON.stringify(match));
    // render lai match ==============================================

    const userLogin = JSON.parse(localStorage.getItem("login"));
    const listUserMatch = JSON.parse(localStorage.getItem("match"));
    const userTinder = JSON.parse(localStorage.getItem("userTinder"));

    const data = listUserMatch.find((item) => item.email == userLogin.email);

    for (let i = 0; i < data.match.length; i++) {
      for (let j = 0; j < userTinder.length; j++) {
        if (data.match[i] == userTinder[j].email) {
          dataListMatch.push(userTinder[j]);
        }
      }
    }

    listMatch.innerHTML = "";
    let htmlMatch = "";

    dataListMatch.forEach(function (element, index) {
      htmlMatch =
        htmlMatch +
        `
      <div class="card" id="profile" onclick="openChat('${element.name}')">
        <div>
          <img src="${element.image}" alt="">
          <h6 class="profile name">${element.name}</h6>
        </div>
      </div>`;
    });

    listMatch.innerHTML = htmlMatch;

    let localFormmess = JSON.parse(localStorage.getItem("formmess"));

    let objMatch = {
      chusohuu: [userLogin.email, email],
      noidungchat: [
        {
          chu: userLogin.email,
          noidung: "",
        },
      ],
    };

    localFormmess.push(objMatch);

    localStorage.setItem("formmess", JSON.stringify(localFormmess));

    // ===============================================================
  }

  let countUser = JSON.parse(localStorage.getItem("userTinder"));

  if (dataListMatch.length == countUser.length - 1) {
    users2.shift();
    noneUser.style.display = "block";
    listImg.style.display = "none";
  } else if (users2) {
    users2.shift();
    renderUsers2();
  }
}
// Ấn pass

function passControl(email) {
  console.log("==>", email);

  let userLogin = JSON.parse(localStorage.getItem("login"));
  let match = JSON.parse(localStorage.getItem("match"));

  let index = match.findIndex((item) => item.email == userLogin.email);

  match[index].unlike.push(email);

  localStorage.setItem("match", JSON.stringify(match));

  if (users2.length === 1) {
    users2.shift();
    noneUser.style.display = "block";
    listImg.style.display = "none";
  } else if (users2) {
    users2.shift();
    renderUsers2();
  }
}
// Đăng xuất
let logOut = document.getElementById("logout");
logOut.addEventListener("click", function () {
  window.location.href =
    "http://127.0.0.1:5500/Trang%20ch%E1%BB%A7%20tinder/Trang%20ch%E1%BB%A7%20Tinder.html";
});

// Thay đổi avt khi đăng nhập user khác
let userTinder = JSON.parse(localStorage.getItem("userTinder"));
let userLogin = JSON.parse(localStorage.getItem("login"));
let matchUser = JSON.parse(localStorage.getItem("match"));

let foundObject = null;

for (let i = 0; i < userTinder.length; i++) {
  if (userTinder[i].email === userLogin.email) {
    foundObject = userTinder[i];
    break;
  }
}
document.getElementById("avatar").src = foundObject.image;
document.getElementById("name_user").innerHTML = foundObject.name;

// =============================================

let foundMatch = [];

for (let i = 0; i < matchUser.length; i++) {
  if (matchUser[i].email === userLogin.email) {
    foundMatch = matchUser[i].match;
    break;
  }
}

// Ấn like sẽ tìm email user
let inforListFoundMatch = [];

for (let i = 0; i < foundMatch.length; i++) {
  for (let j = 0; j < userTinder.length; j++) {
    if (foundMatch[i] == userTinder[j].email) {
      inforListFoundMatch.push(userTinder[j]);
    }
  }
}

// ấn avt match thì hiện mess

let listMatch = document.getElementById("list-match");

function renderMatchUsers() {
  listMatch.innerHTML = "";
  let htmlMatch = "";

  inforListFoundMatch.forEach(function (element, index) {
    htmlMatch =
      htmlMatch +
      `
      <div class="card" id="profile" onclick="openChat('${element.name}')">
        <div>
          <img src="${element.image}" alt="">
          <h6 class="profile name">${element.name}</h6>
        </div>
      </div>`;
  });

  listMatch.innerHTML = htmlMatch;
}

function openChat(name) {
  friendChat = name;
  showMessenger.style.display = "flex";
  showMatch.style.display = "none";
  renderMess(name);
  renderMessRight();
}

renderMatchUsers();

// In phần match ng dùng
function shuffleArray(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

function renderUsers2() {
  listImg.innerHTML = "";
  html = "";

  let userLogin = JSON.parse(localStorage.getItem("login"));
  let listUser = users2.filter((item) => item.email != userLogin.email);
  let matchUser = JSON.parse(localStorage.getItem("match"));
  let obj = matchUser.find((item) => item.email == userLogin.email);
  listUser = listUser.filter((item) => !obj.match.includes(item.email));

  let list = shuffleArray(listUser);

  let userConLai = list.filter((item) => !obj.unlike.includes(item.email));

  console.log("==>", userConLai);

  if (userConLai.length === 0) {
    noneUser.style.display = "block";
    listImg.style.display = "none";
  }

  userConLai.forEach(function (element, index) {
    html += `<div class="carousel-item `;
    if (index == 0) {
      html += "active";
    }
    html += `">
      <div>
        <div class="infor">
          <h5> ${element.name}  ${element.age}</h5>
          <div>
            <i class="fa-solid fa-house"></i> ${element.address}
            <i class="fa-solid fa-location-dot"></i> ${element.location} 
          </div>
          </div>
            <div class="icon-item">
            <div class="icon1" onclick="passControl('${element.email}')">
              <i class="fa-regular fa-circle-xmark"
                style="color: #ff0f0f">
              </i>
            </div>
            <div class="icon2" onclick="likeControl('${element.email}')">
              <i class="fa-solid fa-heart" style="color: #fd44a7"></i>
            </div>
          </div>
        </div>
        <img src="${element.image}" class="d-block" alt="..."/>
      </div>`;
  });
  listImg.innerHTML = html;
}

//mỗi khi match ng dùng thì hiện phần profile bên phải

let profileMessImg = document.querySelector(".main-right");

function renderMessRight() {
  let profileMessImg = document.querySelector(".main-right");
  profileMessImg.innerHTML = "";
  let htmlMatch = "";

  let userTinder = JSON.parse(localStorage.getItem("userTinder"));
  let dataProfile = userTinder.find((item) => item.name == friendChat);

  htmlMatch = `
      <div>
      <img src='${dataProfile?.image}'>
      <div class="">
        <h5>${dataProfile?.name} ${dataProfile?.age}</h5>
        <div>
          <i class="fa-solid fa-house"></i>
          Sống tại ${dataProfile?.address}
        </div>
        <div>
          <i class="fa-solid fa-location-dot"></i>
          Cách ${dataProfile?.location}
        </div>
      </div>

    </div>
    `;
  profileMessImg.innerHTML = htmlMatch;
}
renderMessRight();

// Ấn avt profile sẽ hiện tin nhắn
let btnMess = document.getElementById("btnMess");
let avtMess = document.getElementById("avatar");

btnMess.addEventListener("click", function () {
  console.log("==> vao");

  let inputMessenger = document.getElementById("input-text");
  let inputValue = inputMessenger.value;
  if (inputValue == "") {
  } else {
    // ban len
    let objMess = {
      chu: userLogin.email,
      noidung: inputValue,
    };
    let dataMess = JSON.parse(localStorage.getItem("formmess"));
    let userTinder = JSON.parse(localStorage.getItem("userTinder"));

    // tim dung cuoc hoi thoai va them tin nhan vao
    let dataFriendChat = userTinder.find((item) => item.name == friendChat);

    let indexChat = dataMess.findIndex(
      (obj) =>
        obj.chusohuu.includes(dataFriendChat.email) &&
        obj.chusohuu.includes(userLogin.email)
    );
    dataMess[indexChat].noidungchat.push(objMess);

    localStorage.setItem("formmess", JSON.stringify(dataMess));
    inputMessenger.value = "";
    renderMess(friendChat);
  }
});

// khi ib thì sẽ hiện người dùng và mess
function renderMess(name) {
  let dataUserChu;
  let dataUserKhach;

  const userLogin = JSON.parse(localStorage.getItem("login"));
  const userTinder = JSON.parse(localStorage.getItem("userTinder"));

  for (let i = 0; i < userTinder.length; i++) {
    if (userLogin.email == userTinder[i].email) {
      dataUserChu = userTinder[i];
      break;
    }
  }

  for (let i = 0; i < userTinder.length; i++) {
    if (name == userTinder[i].name) {
      dataUserKhach = userTinder[i];
      break;
    }
  }

  let chat = JSON.parse(localStorage.getItem("formmess")) || [];

  let indexChat = chat.findIndex(
    (obj) =>
      obj.chusohuu.includes(dataUserKhach.email) &&
      obj.chusohuu.includes(userLogin.email)
  );

  let listChat = chat[indexChat].noidungchat;

  document.querySelector(".chat-content").innerHTML = "";
  let chuoi = "";
  listChat.forEach(function (element, index) {
    if (element.chu == userLogin.email) {
      chuoi += `
      <div class="users2" class="right">
        <div>${element.noidung}</div>
        <img src="${dataUserChu.image}" alt="">
      </div>
      `;
    } else {
      chuoi += `
      <div class="users1" class="left">
        <img src="${dataUserKhach.image}" alt="">
        <div>${element.noidung}</div>
      </div>
      `;
    }
    document.querySelector(".chat-content").innerHTML = chuoi;
  });
}
