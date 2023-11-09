// let confirmpassword = document.querySelector('#confirm-password')
let password = document.querySelector('#loggingPassword')
let error = document.querySelector('#error-message')

let mailInput = document.querySelector('#LoggingEmailAddress')
let token = location.href.split('=')[1]
fetch(`http://localhost:5141/api/User/GetUserByToken?token=${token}`)
    .then(res => res.json())
    .then(function (response) {
        mailInput.value = response.data.email
    })

const myform = document.querySelector('#sign-up-form');
myform.addEventListener('submit', (x) => {
    x.preventDefault();
    console.log(myform);
    // let Token = localStorage.getItem("token");
    // console.log(Token);
    let sendForm = new FormData(myform);
    fetch(`http://localhost:5141/api/Manager/CompleteRegistration
    `,
        {
            method: "POST",
            body: sendForm,
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then(function (value) {
            console.log(value.status);
            if (value.status == true) {
                location.href = "http://127.0.0.1:5500/themebootstrap/html/login.html"
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