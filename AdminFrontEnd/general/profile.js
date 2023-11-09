var id = localStorage.getItem("Id");
let user_name = document.querySelector("#user_name");
let user_role = document.querySelector(".user_role");
let profile_image = document.querySelector("#user_profile-image");
let my_profile = document.querySelector("#my-profile");

let profile = () => {
  // profile_image.innerHTML = "";
  const role = localStorage.getItem("Role");
  fetch(`
  http://localhost:5141/api/Manager/Get/${id}`)
    .then((response) => response.json())
    .then(function (response) {
      user_name.innerText += response.data.userDto.userName;
      user_role.innerText += role;
      profile_image.innerHTML += `<img class="rounded-circle" src="http://localhost:5141/assets/images/${response.data.userDto.profilePicture}" alt="" style="width: 40px; height: 40px;">`;
      console.log(user_name);
    });
};

let TEMP = `<img class="rounded-circle me-lg-2" src="http://localhost:5141/assets/images/{{IMAGE}}" alt=""
style="width: 40px; height: 40px;">
<span class="d-none d-lg-inline-flex">{{NAME}}</span>`;
let ViewProfile = () => {
  var ide = localStorage.getItem("Id");
  const role = localStorage.getItem("Role");
  fetch(`http://localhost:5141/api/Manager/Get/${ide}`)
    .then((response) => response.json())
    .then(function (res) {
      let myprofile = TEMP.replace("{{IMAGE}}", res.data.userDto.profilePicture).replace(
        "{{NAME}}",
        role.toUpperCase()
      );
      my_profile.innerHTML = myprofile;
    });
};

profile();
ViewProfile();
