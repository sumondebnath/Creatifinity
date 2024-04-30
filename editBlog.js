
const handleCategory=()=>{
    fetch("https://creatifinity-api.onrender.com/category/list/").then((res)=>res.json()).then((data)=>{
        // console.log(data);
        data.forEach((item)=>{
            const parent = document.getElementById("category-selector");
            const option = document.createElement("option");
            // option.classList.add("dropdown-item");
            option.value = item.id;
            // option.innerHTML = `
            //     <li onclick="categoryValue('${item.name}')">${item.name}</li>
            // `;
            option.innerText = item.name;
            // console.log(item.id);
            parent.appendChild(option);
        });
    });
};


const handleEditBlog=(event)=>{
    event.preventDefault();
    const blog_id = new URLSearchParams(window.location.search).get("blog_id");
    console.log(blog_id);
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);

    const category = document.getElementById("category-selector");
    const selected_category = category.options[category.selectedIndex].value;
    const title = document.getElementById("title-input").value;
    const body = document.getElementById("body-input").value;
    const imageFile = document.getElementById("image-input").files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageFile);
    formData.append("body", body);
    formData.append("user", user_id);
    formData.append("category", selected_category);

    fetch(`https://creatifinity-api.onrender.com/blog/list/${blog_id}/`,{
        method:"PUT",
        // headers:{"Content-Type":"application/json"},
        body:formData,
    }).then((res)=>res.json()).then((data)=>{
        console.log(data);
        window.location.href = "myBlog.html";
    });
};



const formInstance=(blogData)=>{
    document.getElementById("category-selector").value = blogData.category[0];
    // const selected_category = category.options[category.selectedIndex].value = blogData.category[0];
    document.getElementById("title-input").value = blogData.title;
    document.getElementById("body-input").value = blogData.body;
    console.log(blogData.category[0], blogData.title, blogData.body);
};

const getBlogData = (blog_id) => {
    // console.log(blog_id);

    fetch(`https://creatifinity-api.onrender.com/blog/list/${blog_id}/`).then((res)=>res.json()).then((data)=>{
        // console.log(data);
        formInstance(data);
    }).catch((err)=>console.error("get blog data", err));
};

window.onload=()=>{
    const blog_id = new URLSearchParams(window.location.search).get("blog_id");
    // console.log(blog_id);
    getBlogData(blog_id);
};



handleCategory();
// handleEditBlog();