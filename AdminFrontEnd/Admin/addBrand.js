const myform = document.querySelector("#add-brand")
myform.addEventListener('submit', (x) => {
    x.preventDefault()
    let sendForm = new FormData(myform)
    console.log(sendForm.get("name"))
    fetch(`http://localhost:5141/api/Brand/AddBrand`,
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
            if (value.status == true) {
                window.alert(value.message);
            }
            else {
                window.alert(value.message);
            }

        })
        .catch((res) => {
            window.alert("UnAuthorized")

            // localStorage.clear();
            // location.href = "/Login/login.html"
        })
})