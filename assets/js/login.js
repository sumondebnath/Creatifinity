const handleLogin = (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username, password);

  fetch("https://creatifinity-api.onrender.com/account/login/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // console.log(data.token, data.user_id);
      if (data.token && data.user_id) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "../../index.html";
      }
    })
    .catch((error) => console.log(data));
};

// const handleLogin = async (event) => {
//   event.preventDefault();

//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const errorEl = document.getElementById("error");

//   errorEl.innerText = "";

//   try {
//     const response = await fetch(
//       "https://creatifinity-api.onrender.com/account/login/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       }
//     );

//     const data = await response.json();
//     console.log(data);

//     if (data.token && data.user_id) {
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user_id", data.user_id);
//       window.location.href = "index.html";
//     } else if (data.error) {
//       errorEl.innerText = data.error;
//     } else {
//       errorEl.innerText = "Invalid username or password";
//     }
//   } catch (error) {
//     console.error(error);
//     errorEl.innerText = "Login failed. Please try again.";
//   }
// };
