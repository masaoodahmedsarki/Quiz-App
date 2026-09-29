var Username =""
async function getCurrentUser() {
    var username = document.getElementById("studentName")
    var studentEmail = document.getElementById("studentEmail")
    var stdImage = document.getElementById("stdImage")
    var studentCourse = document.getElementById("studentCourse")
    var userId = localStorage.getItem("loginUser")
   
    await firebase.database().ref("users").child(userId)
        .get()
        .then((db) => {
            console.log(db.val())
            Username= db.val()["name"]
            username.innerText += db.val()["name"]
            studentEmail.innerText=db.val()["email"]
            stdImage.src=db.val()["imageUrl"]

              studentCourse.innerText=db.val()["courseName"]

            new QRCode(document.getElementById("qrcode"),{
                text:JSON.stringify({
                    name :db.val()["name"],
                    email:db.val()["email"],

                }),
                width:75,
                heigth:50
            })

        

        })
}

function pdfDownload(){
    var card = document.getElementById("card")
    html2canvas(card,{
        scale: 3,
        useCORS: true
    }).then((canvas)=>{
        const image= canvas.toDataURL("image/png")
        const {jsPDF} = window.jspdf
        const pdf = new jsPDF()

        pdf.addImage(image,"PNG",50,50,100,61)
     pdf.save(`${Username}.pdf`)
    })

}

// a=>97
// A=>65

getCurrentUser()