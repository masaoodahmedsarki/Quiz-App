var signup = document.getElementById("signup")
var email = document.getElementById("email")
var username = document.getElementById("name")
var password = document.getElementById("password")
var imageUpload = document.getElementById("imageUpload")
var courseList = document.getElementById("courseList")



signup.addEventListener("click", async function(){
    console.log(email.value, password.value)

      var courseKey = courseList.options[courseList.selectedIndex].getAttribute('key')
   console.log(courseKey)
   console.log(courseList.value)

    await firebase.auth().createUserWithEmailAndPassword(email.value,password.value)
    .then(async(result)=>{
        console.log(result.user.uid) //database id
      if(result.user.uid){
        var imageUrl = await uploadimage() // Call the uploadimage function and wait for it to complete
 
await firebase.database().ref("users").child(result.user.uid).set({
    email:email.value,
    name:username.value,
    password:password.value,
    imageUrl: imageUrl,
    courseName :courseList.value,
    courseKey :courseKey
})
         alert("signup successgully")


        setTimeout(()=>{
              // window.location.href="login.html"
            window.location.replace("login.html")
        },2000)

      }

       
    })
    .catch((error)=>{
        console.log(error)
    })
})


async function uploadimage(){
    const fileInput = document.getElementById("imageUpload")
    const file = fileInput.files[0]

    if(!file) {
       return alert("Please select an image file")  
    }

    const cloudName = "ynjb1sz5"
    const uploadfolder= "storageQuiz-app"

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", uploadfolder)

//  var loading = document.getElementById("loading")
//  var btn = document.getElementById("btn")
//  btn.style.display = "none"
//  loading.style.display = "inline"

     try{
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        console.log(data);
        alert("Image uploaded successfully. URL: " + data.secure_url);
        // window.location.href = data.secure_url; // Redirect to the uploaded image URL
        return data.secure_url;
    }
     catch (error) {
        alert("Error uploading image:", error);
    }
}




let getAlLCourses = async () => {
    await firebase.database().ref("course").get().then((db) => {
        console.log(db.val()) //firebase data base human read form convert
        var arrList = Object.values(db.val()) //object to array
        console.log(arrList)
        for (var value of arrList) {
            console.log(value)
            courseList.innerHTML+=`
          <option key=${value.coursekey}>${value.courseName}</option>
            `
        }
        courseList.style.display="inline"
    })
    
        .catch((err) => {
            console.log(err)
        })
}

getAlLCourses()