

const autoLoader=()=>{
    const token = localStorage.getItem("token");
    // console.log(token);
    const user_id = localStorage.getItem("user_id");
    // console.log(user_id);

    if(token && user_id){
        document.getElementById("lp-btn").style.display="block";
    }
    else{
        document.getElementById("lg-btn").style.display="block";
    }
}

const handleSearchBar=(event)=>{
    event.preventDefault();
    const search_item = document.getElementById("search-box").value;
    console.log(search_item);

    fetch(`https://creatifinity-api.onrender.com/blog/list/?search=${search_item}`).then((res)=>res.json()).then((data)=>{
        console.log(data);
        const parent = document.querySelector(".search-items-container");
        parent.innerHTML = "";
        
        if(data.results.length){
            data.results.forEach((blog)=>{
                console.log(blog.category[0]);
                fetch(`https://creatifinity-api.onrender.com/category/list/${blog.category[0]}/`).then((res)=>res.json()).then((cate_data)=>{
                    // console.log(cate_data.name);
                        const div = document.createElement("div");
                        div.classList.add("search-items");
                        div.innerHTML = `
                            <div class="left-part">
                            <img src="${blog.image}" alt="blog-image">
                            </div>
                            <div class="rignt-part">
                            <h3>${cate_data.name}</h3>
                            <h1>${blog.title}</h1>
                            <a href="blogDetails.html?blog_id=${blog.id}">See More</a>
                            </div>
                        `;
                        parent.appendChild(div);
                    
                }).catch((err)=>console.log("error", err));
                
            });
        }
        
    }).catch((err)=>console.log("error", err));
};



autoLoader();


