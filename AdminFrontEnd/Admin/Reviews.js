let review = document.querySelector("#reviews");
let message = document.querySelector('#message');

let TEMPLATE = `<a href="#" class="dropdown-item">
<div class="d-flex align-items-center" >
    <img class="rounded-circle" src="http://localhost:5141/assets/images/{{CUSTOMER-IMAGE}}" alt="" style="width: 40px; height: 40px;">
    <div class="ms-2" >
        <h6 class="fw-normal mb-0" style="font-size: .775em;">{{SENDER-NAME}}</h6>       
        <small id="text" class="post-content">{{POST-CONTENT}}</small>
        <div>
        <small>{{POSTED-TIME}}</small>
        </div>
    </div>
</div>
</a>
<hr class="dropdown-divider">`

let displayReview = () => {
    fetch('http://localhost:5141/api/Review/GetAllUnseenReview')
    .then(response => response.json())
    .then(function(response){
        console.log(response)
        
        review.innerHTML = "";
        for(let i = 0; i < response.data.length; i++)
        {
            if(response.data[i].seen == false)
            {
                // message.style.color="green"
                break;
            }
        }
        response.data.forEach(x => {
            
            let reviews = TEMPLATE
            .replace('{{SENDER-NAME}}',x.customerDto.users.userName)
            .replace('{{POST-CONTENT}}',x.comment)
            .replace('{{POSTED-TIME}}',x.createdAt)
            .replace('{{CUSTOMER-IMAGE}}',x.customerDto.users.profilePicture)
            review.innerHTML += reviews;
        })
    })
}

let Update = () => {

    const options = {
        method : 'PUT',
        body : null,
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    fetch('http://localhost:5141/api/Review/Update',options)
    .then(response => response.json())
    .then(function(res){
        if(res.status == true)
        {
            console.log(res.message)
        }
        else if(res.status == false)
        {
            console.log(res.message)
        }
    })
    message.style.color="black"
}

displayReview();