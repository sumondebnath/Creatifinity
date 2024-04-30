const getValue = (id) =>{
    const value = document.getElementById(id).value;
    return value;
}

const handleRegister = (event) =>{
    event.preventDefault();
    console.log("hello");
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    // const info = {
    //     "username":username,
    //     "first_name":first_name,
    //     "last_name":last_name,
    //     "email":email,
    //     "password":password,
    //     "confirm_password":confirm_password
    // }
    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password
    }
    console.log(info);

    if(password === confirm_password){
        document.getElementById("error").innerText="";
        if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
            console.log(info);
            fetch("https://creatifinity-api.onrender.com/account/register/", {
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(info),
            }).then((res)=>res.json())
            .then((data)=>{
                if(data.username && data.username.length>0){
                document.getElementById("error").innerText = data.username[0];
                }
                else if(data.error){
                    document.getElementById("error").innerText = data.error;
                }
                else{
                    console.log(data);
                    document.getElementById("error").innerText = data;
                }
            })//.catch((error)=>console.log(error));
        }
        else{
            document.getElementById("error").innerText="Password Must be Minimum eight characters, at least one letter and one number";
        }
    }
    else{
        document.getElementById("error").innerText = "Password and Confirm Password Does Not Match.";
    }
}