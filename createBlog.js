
// const categoryValue=(value)=>{
//     return value;
// };

const handleCategory=()=>{
    fetch("https://creatifinity-api.onrender.com/category/list/").then((res)=>res.json()).then((data)=>{
        console.log(data);
        data.forEach((item)=>{
            const parent = document.getElementById("category-selector");
            const option = document.createElement("option");
            // option.classList.add("dropdown-item");
            option.value = item.id;
            // option.innerHTML = `
            //     <li onclick="categoryValue('${item.name}')">${item.name}</li>
            // `;
            option.innerText = item.name;
            console.log(item.id);
            parent.appendChild(option);
        });
    });
};


const createBlog=(event)=>{
    event.preventDefault();
    const category = document.getElementById("category-selector");
    const selected_category = category.options[category.selectedIndex].value;
    const title = document.getElementById("title-input").value;
    const body = document.getElementById("body-input").value;
    const image_file = document.getElementById('image-input').files[0];

    // const image= image_file.files[0]
    // console.log(imageFile.name);

    const user_id = localStorage.getItem("user_id");

    const formData = new FormData();
    formData.append("title",title);
    formData.append("image", image_file);
    formData.append("body", body);
    formData.append("user", user_id);
    formData.append("category",selected_category);

    // const cate_info = {
    //     "title": title,
    //     "image": image_file,
    //     "body": body,
    //     "user": user_id,
    //     "category": [selected_category.value,]
    // };
    console.log(formData);

    fetch("https://creatifinity-api.onrender.com/blog/list/",{
        method : "POST",
        // headers : {"Content-type" : "multipart/form-data"},
        // body : JSON.stringify(cate_info),
        body:formData,
    }).then((res)=>res.json()).then((data)=>{
        console.log(data);
        window.location.href = "myBlog.html"; 
    });
};







handleCategory();