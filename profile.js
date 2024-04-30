const profileLoader = () => {
  const user_id = localStorage.getItem("user_id");
//   console.log(user_id);

  fetch(`https://creatifinity-api.onrender.com/blog/list/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      userblogs(data.results);
    });
};

const userblogs = (data) => {
  // console.log(data);
  const parent = document.querySelector(".post-container");
  data.forEach((blog) => {
    // console.log(blog);
    const div = document.createElement("div");
    div.classList.add("post-blog");
    div.innerHTML = `
            <div class="blog-settings">
            <div><h2>${blog.title}</h2></div>
            <div class="dropdown">
            <button class="btn btn-secondary  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-ui-radios-grid" viewBox="0 0 16 16">
                <path d="M3.5 15a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m9-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5M16 3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-9 9a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m5.5 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-9-11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 2a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                </svg>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="editBlog.html?blog_id=${blog.id}">Edit</a></li>
              <li onclick="handleDeleteBlog(${blog.id})"><a class="dropdown-item" href="#">Delete</a></li>
            </ul>
          </div>
            </div>
            
            <img src="${blog.image}" alt="blog-image">
            <p>${blog.body}</p>
        `;
    parent.appendChild(div);
  });
};

const addCategory = (event) => {
  event.preventDefault();
  const name = document.getElementById("cate-input").value;
  const slug = generateSlug(name);
  console.log(slug);
  fetch("https://creatifinity-api.onrender.com/category/list/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name: name, slug: slug }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = "createBlog.html";
    });
};

const generateSlug = (str) => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};


const userProfile = () =>{
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    fetch(`https://creatifinity-api.onrender.com/user/${user_id}`).then((res)=>res.json()).then((user_data)=>{
        console.log(user_data);
        const parent = document.querySelector(".top-container");
        const div = document.createElement("div");
        div.classList.add("inner-bottom-container");
        div.innerHTML = `
            <p>username : ${user_data.username}</p>
            <h3>${user_data.first_name} ${user_data.last_name}</h3>
            <p id="user_gender">Gender</p>
            <h5>${user_data.email}</h5>
        `;
        parent.appendChild(div);
    });
    fetch(`https://creatifinity-api.onrender.com/account/account/?user_id=${user_id}`).then((res)=>res.json()).then((acc_data)=>{
        console.log(acc_data);
        const parent = document.querySelector(".top-container");
        const div = document.createElement("div");
        div.classList.add("inner-top-profile");
        div.innerHTML = `
        <img src="${acc_data[0].image}" alt="profile-picture">
        `;
        parent.appendChild(div);

        const other_parent = document.getElementById("user_gender");
        if(other_parent){
            // other_parent.innerText = "";
            other_parent.innerText = `${acc_data[0].gender}`;
        }
    });
    // fetch("https://creatifinity-api.onrender.com/blog/list/").then((res)=>res.json()).then((add_data)=>{
    //     console.log(add_data.results.blog_id);
    // })
};

  // delete function
const handleDeleteBlog=(blog_id)=>{
  console.log(blog_id);

  fetch(`https://creatifinity-api.onrender.com/blog/list/${blog_id}/`, {
    method:"DELETE",
  }).then((res)=>console.log(res, "post deleted.")).catch((err)=>console.error("error", err));
  window.location.href = "index.html";
};






// userblogs();
userProfile();
profileLoader();
