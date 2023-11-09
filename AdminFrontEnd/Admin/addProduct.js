let image = document.querySelector("#ImageUrl")
const myform = document.querySelector('#add-form');
myform.addEventListener('submit', (x) => {
    x.preventDefault();
    console.log(myform);
    // let Token = localStorage.getItem("token");
    // console.log(Token);
    let sendForm = new FormData(myform);
    // window.alert(sendForm.get("categoryName"))
    // window.alert(image.value);
    fetch(`http://localhost:5141/api/Product/AddProduct`,
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
                swal("Success", `${value.message}`, "success");
                displayProduct();
            }
            else {
                swal("Opps!", `${value.message}`, "warning");
            }

        })
        .catch((res) => {
            window.alert("UnAuthorized")

            // localStorage.clear();
            // location.href = "/Login/login.html"
        })

})