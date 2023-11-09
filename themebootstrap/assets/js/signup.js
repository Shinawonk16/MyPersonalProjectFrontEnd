// window.alert("welcome");
let password = document.querySelector('#loggingPassword')
let error = document.querySelector('#error-message')

let code = "";
const myform = document.querySelector('#sign-up-form');
myform.addEventListener('submit', (x) => {
    x.preventDefault();
    console.log(myform);
    // let Token = localStorage.getItem("token");
    // console.log(Token);
    let sendForm = new FormData(myform);
    console.log(sendForm.get("userName"));
    fetch(`http://localhost:5141/api/Customer/RegisterCustomer
    `,
        {
            method: "POST",
            body: sendForm,
            
        })
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then(function (value) {
            console.log(value.status);
            console.log(value.data.users.id);
            // window.alert(value.data.users.id)

            if (value.status == true) {
                localStorage.setItem('registrationid',value.data.users.id);
                location.href = "http://127.0.0.1:5500/AdminFrontEnd/vrification.html"
            }
            else {
                window.alert(value.message);
            }

        })
        .catch((res) => {
            window.alert("UnAuthorized")

        })

})

let checkingForPassword = (confirmpassword) => {
    if (confirmpassword != password.value) {
        error.innerText = "Password not match"
    }
    else {
        error.innerText = ""
    }
}
