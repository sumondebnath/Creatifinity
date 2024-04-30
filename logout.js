

const handleLogout = (event) =>{
    event.preventDefault();
    const token = localStorage.getItem("token");
    // const user_id = localStorage.getItem("user_id");
    console.log("one");
    fetch("https://creatifinity-api.onrender.com/account/logout/", {
        method:"POST",
        headers:{
            Authorization:`Token ${token}`,
            "Content-Type":"application/json",
        },
    }).then((res)=> res.json()).then((data)=>{
        console.log(data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        window.location.href="login.html";
    });
}