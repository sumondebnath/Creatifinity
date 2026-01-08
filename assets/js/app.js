

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
                            <h1>${blog.title.slice(0, 30)}...</h1>
                            <a href="blogDetails.html?blog_id=${blog.id}">See More</a>
                            </div>
                        `;
                        parent.appendChild(div);
                        document.getElementById("no-data-block").style.display="none";
                }).catch((err)=>console.log("error", err));
                
            });
        }
        else{
            // document.getElementById("no-data-block").innerHTML="";
            document.getElementById("no-data-block").style.display="block";
        }
        
    }).catch((err)=>console.log("error", err));
};

const handleBlogSlider=()=>{
    fetch(`https://creatifinity-api.onrender.com/blog/list/`).then((res)=>res.json()).then((data)=>{
        console.log(data.results);
        const parent = document.querySelector(".slider-container");
        data.results.forEach((blog)=>{
            console.log(blog);
            const li = document.createElement("li");
            li.innerHTML = `
            <div class="card border-0">
                <div class="ratio ratio-1x1">
                    <img src="${blog.image}" class="card-img-top" loading="lazy" alt="blog-image">
                </div>
                <div class="card-body p-0 pt-2">
                    <div class="d-flex">
                        <h3 class="flex-grow-1 h5">${blog.title.slice(0, 20)}...</h3>
                        
                    </div>
                    <p class="card-text">${blog.body.slice(0, 20)}...</p>
                </div>
            </div>
            `;
            parent.appendChild(li);
        });
    })
};

autoLoader();
handleBlogSlider();

