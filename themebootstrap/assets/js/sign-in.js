let role = document.querySelector('#admin_role');

function Submit() {
  let inputemail = document.querySelector('#Email');
  let inputpassword = document.querySelector('#Password');
  let button = document.querySelector('#button');

  const user = {
    email: inputemail.value,
    password: inputpassword.value,
  }
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch('http://localhost:5141/api/User/Login', options)
    .then(res => res.json())
    .then(function (res) {
      // console.log(res);

      if (res.status == true) {
        localStorage.setItem("Id", res.data.id);
        localStorage.setItem("Role", res.data.role);
        localStorage.setItem("ProfilePicture", res.data.profilePicture)
        localStorage.setItem("Token", res.data.token)

        // window.swal({
        //   title: "Checking...",
        //   text: "Please wait",
        //   imageUrl: "images/ajaxloader.gif",
        //   showConfirmButton: false,
        //   allowOutsideClick: false
        // });

        // setTimeout(() => {
        //   window.swal({
        //     icon: "success",
        //     title: "Successfuly logged in!",
        //     showConfirmButton: false,
        //     timer: 2000
        //   });
        // }, 2000);
        // Swal.fire(
        //   'The Internet?',
        //   'That thing is still around?',
        //   'question'
        // )
      }
      if (res.status == true && res.data.role == "Customer") {
        location.href = "http://127.0.0.1:5500/dashboard/index.html"
      }
      else if (res.status == true && res.data.role == "Super-Admin") {

        location.href = "http://127.0.0.1:5500/AdminFrontEnd/index.html"
      }
      else if (res.status == true && res.data.role == "sales manager") {
        location.href = "../SalesManagerFrontEnd/dashboard.html"
      }

      else if (res.status == true && res.data.role == "warehouse manager") {
        location.href = "../RawMaterialManagerFrontEnd/dashboard.html"
      }

      else if (res.status == true && res.data.role == "production manager") {
        location.href = "../ProductionManagerFrontEnd/dashboard.html"
      }
      else {
        window.alert(res.message)
      }
    })
    .catch((resp) => {

      console.log(resp.message);
      // location.reload()
    })
}
// localStorage.clear();

