var courseKey = "";
var quizList= document.getElementById("quizList")
async function getAllQuiz() {
    var loginUserId = localStorage.getItem("loginUser")
    await firebase.database().ref("users").child(loginUserId).get()
        .then((snap) => {
            console.log(snap.val())
            courseKey = snap.val()["courseKey"]
            getALlQuiz(courseKey)
        })

}
const getALlQuiz =async (courseKey) => {
    await  firebase.database().ref("Quiz").get().then((snap)=>{
        var db = snap.val()
        // console.log(db)
        const arr = Object.values(db)
        // console.log(arr)
        arr.forEach((v)=>{
            if(v.coursekey==courseKey){
            console.log(v)
            quizList.innerHTML+=`
            <div class='card'>
            ${v.quizName}</div>
            `



            }
        })
    })
}

getAllQuiz()


