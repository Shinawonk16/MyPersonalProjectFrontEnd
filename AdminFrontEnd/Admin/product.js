let pname = document.querySelector("#Name");
let price = document.querySelector("#Price");
let description = document.querySelector("#Description");
let categoryList = document.querySelector(".images");
let category = document.querySelector("#category");
let brand = document.querySelector("#brand");

let update_category = document.querySelector("#update-category");
const PRODUCTTEMPLATE = `<div class="post-image">
<div class="nav-item dropdown">
<a href="#" class="nav-link" data-bs-toggle="dropdown" style="padding:0px !important;"><i class="fas fa-ellipsis-v" style="align-self: end;padding-right: 10px;padding-top: 10px;margin-left: 250px !important;"></i></a>
<div class="dropdown-menu bg-transparent border-0" style="margin-left: 170px !important;">
                        <div class="" id="updated-product" onclick="showForm({{ID}})">
                            <a href="#" class="dropdown-item">UPDATE</a>
                        </div>
                        <div>
                        <a class="dropdown-item" onclick="remove({{PRODUCT-ID}})" style="cursor: pointer">DELETE</a>
                        </div>
                    </div>
</div>
<img src="http://localhost:5141/assets/images/{{PRODUCT-IMAGE}}" alt="">
<h6>{{PRODUCT-TYPE}}</h6>
<p>{{CATEGORY}}</p>
<p>{{BRAND}}</p>
<p>{{PRODUCT-QUANTITY}}</p>
<p>&#8358;{{PRODUCT-PRICE}}</p>
</div>`;

/**fetch product category */
function fetchCategory() {
  // window.alert("hi")
  fetch("http://localhost:5141/api/Category/GetAll")
    .then((res) => res.json())
    .then(function (response) {
      category.innerHTML = "";
      response.data.forEach((x) => {
        category.innerHTML += `<option value="${x.categoryName}">${x.categoryName}</option>`;
      });
    });
}
function fetchBrand() {
  // window.alert("hi")
  fetch("http://localhost:5141/api/Brand/GetAll")
    .then((res) => res.json())
    .then(function (response) {
      brand.innerHTML = "";
      response.data.forEach((x) => {
        brand.innerHTML += `<option value="${x.brandName}">${x.brandName}</option>`;
      });
    });
}
/**add a new category */
let displayFormaddCategory = () => {
  window.alert("testing");
  let form = document.createElement("div");
  form.innerHTML = `<div class="">
  <form action="" id="add-category">
      <div class="form_wrap">
          <div class="form_item">
              <input type="text" name="categoryname" id="CName" required class="form-control" placeholder="Category Name">
          </div>
      </div>
      </br>
      <div class="form_wrap">
          <div class="form_item">
              <input type="text" name="categorydescription" id="CDescription" required class="form-control" placeholder="Category Description">

          </div>
      </div>
  </form>
</div>`;
  swal({
    title: "Add Category",
    text: null,
    showCancelButton: true,
    closeOnConfirm: false,
    content: form,
    buttons: {
      cancel: "Cancel",
      catch: {
        text: "Submit",
      },
    },
  }).then(function (isConfirm) {
    let dname = document.querySelector("#CName");
    let ddescription = document.querySelector("#CDescription");
    if (isConfirm) {
      let values = {
        Name: dname.value,
        Description: ddescription.value,
      };
      const options = {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`http://localhost:5141/api/Category/AddCategory`, options)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then(function (value) {
          console.log(value.status);
          if (value.status == true) {
            window.alert(value.message);
          } else {
            window.alert(value.message);
          }
        })
        .catch((res) => {
          window.alert("UnAuthorized");

          // localStorage.clear();
          // location.href = "/Login/login.html"
        });
    }
  });
};

let displayFormaddBrand = () => {
  let form = document.createElement("div");
  form.innerHTML = `<div class="">
  <form action="" id="add-brand">
      <div class="form_wrap">
          <div class="form_item">
              <input type="text" name="brandname" id="BName" required class="form-control" placeholder="Brand Name">
          </div>
      </div>
      </br>
      <div class="form_wrap">
          <div class="form_item">
              <input type="text" name="branddescription" id="BDescription" required class="form-control" placeholder="Brand Description">

          </div>
      </div>
  </form>
</div>`;
  swal({
    title: "Add Brand",
    text: null,
    showCancelButton: true,
    closeOnConfirm: false,
    content: form,
    buttons: {
      cancel: "Cancel",
      catch: {
        text: "Submit",
      },
    },
  }).then(function (isConfirmed) {
    let dname = document.querySelector("#BName");
    let ddescription = document.querySelector("#BDescription");
    if (isConfirmed) {
      let values = {
        Name: dname.value,
        Description: ddescription.value,
      };
      const options = {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`http://localhost:5141/api/Brand/AddBrand`, options)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then(function (value) {
          console.log(value.status);
          if (value.status == true) {
            window.alert(value.message);
          } else {
            window.alert(value.message);
          }
        })
        .catch((res) => {
          window.alert("UnAuthorized");

          // localStorage.clear();
          // location.href = "/Login/login.html"
        });
    }
  });
};

function fetchupdateCategory() {
  // window.alert("hi")
  fetch("http://localhost:5141/api/Category/GetAll")
    .then((res) => res.json())
    .then(function (response) {
      update_category.innerHTML = "";
      response.data.forEach((x) => {
        update_category.innerHTML += `<option value="${x.categoryname}">${x.categoryName}</option>`;
      });
    });
}

function fetchupdateBrand() {
  // window.alert("hi")
  fetch("http://localhost:5141/api/Brand/GetAll")
    .then((res) => res.json())
    .then(function (response) {
      update_category.innerHTML = "";
      response.data.forEach((x) => {
        update_category.innerHTML += `<option value="${x.brandName}">${x.brandName}</option>`;
      });
    });
}

/**Removes the product */
let remove = (id) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, Customers will not be able to see it",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const options = {
        method: "DELETE",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`http://localhost:5141/api/Product/Delete/${id}`, options)
        .then((res) => res.json())
        .then(function (response) {
          if (response.status == true) {
            swal(`${response.message}`, {
              icon: "success",
            });
            displayProduct();
          } else {
            swal(`${response.message}`, {
              icon: "warning",
            });
          }
        });
    }
  });
};
function showForm(id) {
  let btn = document.querySelector("#updated-product");
  let box = document.querySelector(".update-modal-box");
  box.classList.toggle("show-modal");
  btn.classList.add("show-modal");
  fetch(`http://localhost:5141/api/Product/GetProductById/${id}`)
    .then((res) => res.json())
    .then(function (value) {
      console.log(value.data.categoryName);
      // console.log(update_category.innerHTML)
      pname.value = value.data.name;
      price.value = value.data.price;
      description.value = value.data.description;
      update_category.innerHTML = `<option value="${value.data.categoryName}">${value.data.categoryName}</option>`;
      localStorage.removeItem("productId");
      localStorage.setItem("productId", id);
    });
}

let displayProduct = () => {
  fetch("http://localhost:5141/api/Product/GetAll")
    .then((res) => res.json())
    .then(function (response) {
      console.log(response);
      categoryList.innerHTML = "";
      response.data.forEach((x) => {
        let product = PRODUCTTEMPLATE.replace("{{PRODUCT-IMAGE}}", x.image)
          .replace("{{PRODUCT-TYPE}}", x.productName)
          .replace("{{PRODUCT-QUANTITY}}", x.quantity)
          .replace("{{PRODUCT-DESCRIPTION}}", x.description)
          .replace("{{BRAND}}", x.brandsDto.brandName)
          .replace("{{CATEGORY}}", x.categoryDto.categoryName)
          .replace("{{PRODUCT-PRICE}}", x.price)
          .replace("{{PRODUCT-ID}}", x.id)
          .replace("{{ID}}", x.id);
        categoryList.innerHTML += product;
      });
    });
};

let update = (id) => {
  const myform = document.querySelector("#update-form");
  myform.addEventListener("submit", (x) => {
    x.preventDefault();
    // console.log(myform);
    // let Token = localStorage.getItem("token");
    // console.log(Token);
    let sendForm = new FormData(myform);
    console.log(sendForm.get("name"));
    fetch(`http://localhost:5141/api/Product/UpdateProduct/${id}`, {
      method: "PUT",
      body: sendForm,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(function (value) {
        console.log(value.success);
        if (value.success == true) {
          window.alert(value.message);
          displayProduct();
        } else {
          window.alert(value.message);
        }
      })
      .catch((res) => {
        window.alert("UnAuthorized");

        // localStorage.clear();
        // location.href = "/Login/login.html"
      });
  });
};
// fetchCategory()
displayProduct();
