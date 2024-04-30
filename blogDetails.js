

const handleBlogDetails=()=>{
    const blog_id = new URLSearchParams(window.location.search).get("blog_id");
    console.log(blog_id);

    fetch(`https://creatifinity-api.onrender.com/blog/list/${blog_id}/`).then((res)=>res.json()).then((data)=>{
        console.log(data);

        const datetime = new Date(data.created);
        console.log(datetime.toLocaleDateString());

        const parent = document.querySelector(".user-blog-details-container");
        const div = document.createElement("div");
        div.classList.add("user-blog-details");
        div.innerHTML = `
            <img src="${data.image}" alt="blog-image">
            <h5>${datetime.toLocaleString()}</h5>
            <h2>${data.title}</h2>
            <p>${data.body}</p>
        `;
        parent.appendChild(div);
    }).catch((err)=>console.error("error", err));
    handleReview(blog_id);

    const token = localStorage.getItem("token");
    if(token){
        document.querySelector(".blog-review-container").style.display="block";
    }
    else{
        document.querySelector(".blog-review-container").style.display="none";
    }
};

const handleReview=(blog_id)=>{
    fetch(`https://creatifinity-api.onrender.com/blog/review/?blog_id=${blog_id}`).then((res)=>res.json()).then((data)=>{
        console.log(data.length);
        if(data){
            let sum = 0;
            data.forEach((review)=>{
                console.log(review.rating);
                sum += review.rating;
            })
            const rating = sum/data.length;
            const parent = document.querySelector(".blog-avarage-review");
            const div = document.createElement("div");
            // document.querySelector(".user-blog-review-container")
            div.classList.add("avarage-review");
            div.innerHTML = `
                <h3>Average Rating </h3>
                <h1>${rating.toFixed(1)} / 5</h1>
            `;
            parent.appendChild(div);
        }
        else{
            document.querySelector(".user-blog-review-container").innerHTML = `
                <h2>Avarage Rating : 0</h2>
            `;
        }
    }).catch((err)=>console.error("erorr", err));
};


const handleUserReview=(event)=>{
    event.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const rating = event.target.value;
    console.log(user_id, rating);
    const blog_id = new URLSearchParams(window.location.search).get("blog_id");
    console.log(blog_id);

    const review = {
        rating : rating,
        user : user_id,
        blog : blog_id,
    };

    fetch(`https://creatifinity-api.onrender.com/blog/review/`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(review),
    }).then((res)=>res.json()).then((data)=>{
        console.log(data);
        window.location.href="myBlog.html";
    }).catch((err)=>console.error("error", err));
};

handleBlogDetails();
// handleUserReview()