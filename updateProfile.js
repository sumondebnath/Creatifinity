const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

const handleUpdateProfile = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const image = document.getElementById("image").files[0];
  const gender = document.getElementById("gender");
  const selected_gender = gender.options[gender.selectedIndex].value;
  const birth_date = getValue("birth_date");
  const bio = getValue("bio");
  const street_address = getValue("street_address");
  const city = getValue("city");
  const postal_code = getValue("postal_code");
  const country = getValue("country");
  const user_id = localStorage.getItem("user_id");
  console.log(user_id);
  console.log(
    username,
    first_name,
    last_name,
    email,
    image,
    selected_gender,
    birth_date,
    bio,
    street_address,
    city,
    postal_code,
    country
  );

  const userFormData = new FormData();
  userFormData.append("username", username);
  userFormData.append("first_name", first_name);
  userFormData.append("last_name", last_name);
  userFormData.append("email", email);

  fetch(`https://creatifinity-api.onrender.com/user/${user_id}/`, {
    method: "PUT",
    body: userFormData,
  })
    .then((res) => res.json())
    .then((user_data) => console.log(user_data))
    .catch((err) => console.log("error", err));

  const accountFormData = new FormData();
  accountFormData.append("image", image);
  accountFormData.append("gender", selected_gender);
  accountFormData.append("birth_data", birth_date);
  accountFormData.append("bio", bio);
  accountFormData.append("user", user_id);

  fetch(
    `https://creatifinity-api.onrender.com/account/account/?user_id=${user_id}`
  )
    .then((res) => res.json())
    .then((acc_data) => {
      console.log(acc_data);
      console.log(acc_data[0].id);
      fetch(
        `https://creatifinity-api.onrender.com/account/account/${acc_data[0].id}/`,
        {
          method: "PUT",
          body: accountFormData,
        }
      )
        .then((res) => res.json())
        .then((acc_data) => console.log(acc_data))
        .catch((err) => console.error("error", err));
    });

  const addressFromData = new FormData();
  addressFromData.append("street_address", street_address);
  addressFromData.append("city", city);
  addressFromData.append("postal_code", postal_code);
  addressFromData.append("country", country);
  addressFromData.append("user", user_id);

  fetch(
    `https://creatifinity-api.onrender.com/account/address/?user_id=${user_id}`
  )
    .then((res) => res.json())
    .then((add_data) => {
      console.log(add_data[0].id);
      fetch(
        `https://creatifinity-api.onrender.com/account/address/${add_data[0].id}/`,
        {
          method: "PUT",
          body: addressFromData,
        }
      )
        .then((res) => res.json())
        .then((add_data) => {
          console.log(add_data);
          
        })
        .catch((err) => console.error("error", err));
        window.location.href = "profile.html";
    })
    .catch((err) => console.error("error", err));

    
};

const updateUserInstance = (data) => {
  console.log(data.username);
  document.getElementById("username").value = data.username;
  document.getElementById("first_name").value = data.first_name;
  document.getElementById("last_name").value = data.last_name;
  document.getElementById("email").value = data.email;
};

const updateAccountInstance = (data) => {
  // console.log(data[0].image);
  document.getElementById("gender").value = data[0].gender;
  document.getElementById("bio").value = data[0].bio;
  document.getElementById("birth_date").value = data[0].birth_date;
};

const updateAddressInstance = (data) => {
  document.getElementById("city").value = data[0].city;
  document.getElementById("street_address").value = data[0].street_address;
  document.getElementById("country").value = data[0].country;
  document.getElementById("postal_code").value = data[0].postal_code;
};

const getUserAllData = (user_id) => {
  fetch(`https://creatifinity-api.onrender.com/user/${user_id}/`)
    .then((res) => res.json())
    .then((user_data) => {
      console.log(user_data);
      updateUserInstance(user_data);
    })
    .catch((err) => console.log("error", err));

  fetch(
    `https://creatifinity-api.onrender.com/account/account/?user_id=${user_id}`
  )
    .then((res) => res.json())
    .then((acc_data) => {
      console.log(acc_data);
      console.log(acc_data[0].id);
      updateAccountInstance(acc_data);
    })
    .catch((err) => console.error("error", err));

  fetch(
    `https://creatifinity-api.onrender.com/account/address/?user_id=${user_id}`
  )
    .then((res) => res.json())
    .then((add_data) => {
      console.log(add_data);
      updateAddressInstance(add_data);
    })
    .catch((err) => console.error("error", err));
};

window.onload = () => {
  const user_id = localStorage.getItem("user_id");
  getUserAllData(user_id);
};
