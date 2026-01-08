

const blogHandle = ()=>{
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    if(token && user_id){
        // document.querySelector(".blog-create").style.display = "block";
        document.getElementById("blog-create-container").style.display = "block";
    }
    fetch("https://creatifinity-api.onrender.com/blog/list/").then((res)=> res.json()).then((data)=> {
        console.log(data.next);
        AllBlogs(data.results);
        handlePagination(data);
    }).catch((err)=>console.log(err));
};

const AllBlogs=(blogs)=>{
    blogs.forEach((blog)=>{
        console.log(blog.id);
        const parent = document.querySelector(".blog-container");
        const div = document.createElement("div");
        div.classList.add("main-blog");
        div.innerHTML = `
            <h2>${blog.title}</h2>
            <img src="${blog.image}" alt="blog-image">
            <p>${blog.body.slice(0, 150)}...<a href="blogDetails.html?blog_id=${blog.id}">see more</a></p>
        `;
        parent.appendChild(div);
    });
};

const handlePagination=(data)=>{
    console.log(data.next);
};

blogHandle();