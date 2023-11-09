
let counttry_form = document.querySelectorAll('.list')
let current_country = document.querySelectorAll('.current')
let list_country = document.querySelector('#countries')
let list_states = document.querySelector('#states')
let city = document.querySelector('#city')
let street = document.querySelector('#street')
let zip_code = document.querySelector('#zip')
let additionalinfo = document.querySelector('#additionalDetails')
let email = document.querySelector('#email')
let phone = document.querySelector('#phone-number')

let cart_items = document.querySelector('#list-cart-items')
let total = document.querySelector('.checkout__order__subtotal')
let sub_total = document.querySelector('.checkout__order__total')

current_country[0].innerText = "Nigeria"

counttry_form.forEach(x => {
    x.style.maxHeight = "300px"
    x.style.overflowY = "scroll"
})

let fetchCountries = () => {
    let countries = []

    fetch(`https://restcountries.com/v3.1/all`)
        .then(res => res.json())
        .then(response => {
            response.forEach(x => {
                // console.log(x)
                countries.push(x.name.common)
            })
            countries.sort()
            let count = 1
            countries.forEach(x => {
                if (x != "Nigeria") {
                    count++
                    counttry_form[0].innerHTML += `<option value="${x}" class="option" data-value="" disabled>${x}</option>`
                    list_country.innerHTML += `<option value="${x}" disabled>${x}</option>`
                }
                else {
                    count++
                    console.log(count)
                    counttry_form[0].innerHTML += `<option value="${x}" class="option" data-value="">${x}</option>`
                    list_country.innerHTML += `<option value="${x}">${x}</option>`
                }
            })

        })
}

var headers = new Headers();
headers.append("X-CSCAPI-KEY", "OEtnT29qUGxkTUw3TVk1M0tzUG1rUTFkeWV0emtReks3V3JScFM0cA==");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

// Pass Country Code -- Eg: Country Code : IN
fetch("https://api.countrystatecity.in/v1/countries/161/states", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

let states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT - Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
]
const id = localStorage.getItem("Id")
states.forEach(x => {
    counttry_form[1].innerHTML += `<option value="${x}" class="option" data-value="">${x}</option>`
    list_states.innerHTML += `<option value="${x}">${x}</option>`
});

let items = JSON.parse(localStorage.getItem('cart'))
let uniqueIds = []
let t = 0
items.forEach(x => {
    var id = x.id
    var item_number = items.filter(x => x.id == id)
    t += x.price
    total.children[0].innerHTML = "₦" + t
    sub_total.children[0].innerHTML = "₦" + t
    if (uniqueIds.filter(x => x == id) == 0) {

        uniqueIds.push(id)
        cart_items.innerHTML += `<li>${x.productName}<span>₦${x.price * item_number.length}</span></li>`
    }
})


const my_order_form = document.querySelector('#order-form')
my_order_form.addEventListener('submit', (x) => {
    x.preventDefault();
    let orders = JSON.parse(localStorage.getItem('cart'))
    let procart = []
    let uniqueIds = []
    orders.forEach(x => {
        let id = x.id
        if (uniqueIds.filter(x => x.id == id).length != 0) {

        }
        else {
            let product = {
                productId: x.id,
                quantity: orders.filter(x => x.id == id).length,
            }
            procart.push(product)
            uniqueIds.push(id)
        }
    })
    const test = {
        // country: list_country.value,
        street: street.value,
        city: city.value,
        state: current_country[1].innerText,
        postalCode: zip_code.value,
        additionalDetails: additionalinfo.value,
        // orderRequestModels: procart
    }
    const inputes = {
        // country: list_country.value,
        // street: street.value,
        // city: city.value,
        // state: current_country[1].innerText,
        // postalCode: zip_code.value,
        // additionalDetails: additionalinfo.value,
        address: test,
        orderRequestModels: procart
    }
    console.log('this is the input', inputes);
    console
    const options = {
        method: 'POST',
        body: JSON.stringify(inputes),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // https://localhost:7246/api/Order/CreateOrder/
    fetch(`http://localhost:5141/api/Order/CreateOrder/${id}`, options)
        .then(res => res.json())
        .then(function (response) {
            if (response.status == true) {
                console.log("tetttt", response.data);
                initiatePayment(response.data.id)
                Swal.fire("Success", `${response.message}`, "success");
                localStorage.removeItem('cart');
            }
            else {
                Swal.fire("Opps!", `${response.message}`, "warning");
            }
        })
})


let initiatePayment = (orderId) => {
    console.log(orderId);
    const inputes = {
        amount: t,
        email: email.value,
        phoneNumber: phone.value
    }
    console.log("inputes",inputes)
    const options = {
        method: 'POST',
        body: JSON.stringify(inputes),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(`http://localhost:5141/api/Payment/InitiatePayment/${id}/${orderId}`, options)
        .then(res => res.json())
        .then(function (response) {
            console.log(response)
            if (response.status == true) {
                console.log(response.data.authorization_url);
                location.href = response.data.authorization_url
            }
            else {
                Swal.fire("Opps!", `Something went wrong`, "warning");
            }
        })
}
// })

fetchCountries()