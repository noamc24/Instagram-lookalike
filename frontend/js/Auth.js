const API_BASE="http://localhost:3000"

document.addEventListener("DOMContentLoaded", () => {
  // ---------------- LOGIN ----------------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      if (!username || !password) {
        alert("אנא מלא את כל השדות");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok && data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("loggedInUser", data.user.username);
          localStorage.setItem("profilePic", data.user.profilePic);
          if (data.user.fullName) {
            localStorage.setItem("fullName", data.user.fullName);
          } else {
            localStorage.removeItem("fullName");
          }
          alert("התחברת בהצלחה!");
          window.location.href = "/feed";
        } else {
          alert(data.error || "שגיאת התחברות");
        }
      } catch (err) {
        console.error("❌ login error:", err);
        alert("שגיאת שרת. נסה שוב מאוחר יותר.");
      }
    });
  }

  // ---------------- REGISTER ----------------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
console.log("Ss")
    // קלטים
    const email = document.getElementById("email").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const errorBox = document.getElementById("errorBox");
    errorBox.innerHTML = ""; // איפוס

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      errorBox.innerHTML = "📧 כתובת אימייל לא תקינה";
      return;
    }

    if (fullName.length < 4) {
      errorBox.innerHTML = "👤 שם מלא חייב להכיל לפחות 4 תווים";
      return;
    }

    if (username.length < 3) {
      errorBox.innerHTML = "🔑 שם משתמש חייב להכיל לפחות 3 תווים";
      return;
    }

    if (password.length < 8) {
      errorBox.innerHTML = "🔒 סיסמה חייבת להיות באורך של לפחות 8 תווים";
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, fullName, email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("נרשמת בהצלחה! התחבר כעת");
        window.location.href = "/login";
      } else {
        errorBox.innerHTML = data.error || "שגיאת הרשמה";
      }
    } catch (err) {
      console.error("❌ register error:", err);
      errorBox.innerHTML = "שגיאת שרת. נסה שוב מאוחר יותר.";
    }
  });
}
});