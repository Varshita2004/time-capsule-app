// ===============================
// REGISTER
// ===============================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("https://time-capsule-app-i50s.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (data.message === "Registration successful") {
          window.location.href = "login.html";
        }
      })
      .catch(err => {
        alert("Registration failed");
        console.error(err);
      });
  });
}

// ===============================
// LOGIN
// ===============================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("https://time-capsule-app-i50s.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        if (data.email) {
          localStorage.setItem("userEmail", data.email);
          window.location.href = "create.html";
        }
      });
  });
}

// ===============================
// CREATE CAPSULE
// ===============================
const form = document.getElementById("capsuleForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const message = document.getElementById("message").value;
    const unlockDate = document.getElementById("unlockDate").value;
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("Please login again");
      window.location.href = "login.html";
      return;
    }

    fetch("https://time-capsule-app-i50s.onrender.com/capsule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, unlockDate, email })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        window.location.href = "capsules.html";
      })
      .catch(err => {
        console.error(err);
        alert("Error saving capsule");
      });
  });
}

// ===============================
// DISPLAY CAPSULES  ✅ THIS WAS MISSING
// ===============================
const capsuleList = document.getElementById("capsuleList");

if (capsuleList) {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    alert("Please login first");
    window.location.href = "login.html";
  }

  fetch(`https://time-capsule-app-i50s.onrender.com/capsules/${email}`)
    .then(res => res.json())
    .then(capsules => {
      if (capsules.length === 0) {
  capsuleList.innerHTML = `
    <div style="text-align:center; margin-top:40px; color:#777;">
      <p>📭 No capsules yet</p>
      <p>Create one for your future self ✨</p>
    </div>
  `;
  return;
}


      const today = new Date();

      capsules.forEach(capsule => {
        const unlockDate = new Date(capsule.unlockDate);
        const div = document.createElement("div");
div.className = "capsule-card";

if (today >= unlockDate) {
  div.innerHTML = `
  <div class="capsule-status ${today >= unlockDate ? "unlocked" : "locked"}">
    ${today >= unlockDate ? "Unlocked 🔓" : "Locked 🔒"}
  </div>

  <div>
    ${
      today >= unlockDate
        ? capsule.message
        : "This capsule will unlock on " + capsule.unlockDate
    }
  </div>
`;

}


       

        capsuleList.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error loading capsules:", err);
    });
}
// ===============================
// LOGOUT
// ===============================
function logout() {
  localStorage.removeItem("userEmail");
  window.location.href = "login.html";
}
