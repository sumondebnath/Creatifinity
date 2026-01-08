


const contactHandle=(event)=>{
    event.preventDefault();
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const body = document.getElementById("contact-body").value;
    console.log(name, email, body);

    const info = {
        "name": name,
        "email": email,
        "body": body
    }
    console.log(info);

    fetch("https://creatifinity-api.onrender.com/contact_us/list/", {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(info),
    }).then((res)=>res.json()).then((data)=>{
        // console.log(data)
        window.location.href = "index.html";
    });
};

// contactHandle();