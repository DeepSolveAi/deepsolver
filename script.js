let imageData = null
let chats = JSON.parse(localStorage.getItem("deepsolver_chats")) || []
let currentChat = []

async function askAI(){

let question = document.getElementById("question").value
let chat = document.getElementById("chatArea")

if(!question) return

// USER MESSAGE
let userMsg = document.createElement("div")
userMsg.className = "message user"
userMsg.innerText = question
chat.appendChild(userMsg)

// BOT MESSAGE
let botMsg = document.createElement("div")
botMsg.className = "message bot"
botMsg.innerHTML = "DeepSolver is typing..."
chat.appendChild(botMsg)

chat.scrollTo({
top: chat.scrollHeight,
behavior: "smooth"
})

try{

let response = await fetch("http://localhost:3000/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
message: question,
image: imageData
})
})

if(!response.ok){
throw new Error("Server returned status " + response.status)
}

let data = await response.json()

let answer = data.reply

// AI TYPING EFFECT
typeText(botMsg, answer)

currentChat.push({
question: question,
answer: answer
})

chats[chats.length - 1] = currentChat
localStorage.setItem("deepsolver_chats", JSON.stringify(chats))

loadChats()

document.getElementById("question").value=""

chat.scrollTo({
top: chat.scrollHeight,
behavior:"smooth"
})

}catch(error){

console.error("AI request failed:", error)
botMsg.innerText = "Error contacting AI server."

}

}

// AI TYPING FUNCTION
function typeText(element, text){

let i = 0
element.innerHTML = ""

function typing(){

if(i < text.length){
element.innerHTML = marked.parse(text.substring(0,i))
i++
setTimeout(typing,10)
}

}

typing()

}

// NEW CHAT
function newChat(){

let chatArea = document.getElementById("chatArea")

chatArea.innerHTML = "<div class='message bot'>Hello! I'm DeepSolver AI. Ask me anything.</div>"

currentChat=[]

chats.push(currentChat)

localStorage.setItem("deepsolver_chats", JSON.stringify(chats))

loadChats()

}

// ENTER KEY SEND
document.getElementById("question").addEventListener("keypress", function(e){

if(e.key === "Enter"){
askAI()
}

})

// LOAD CHAT HISTORY
function loadChats(){

let chatlist = document.getElementById("chatlist")

if(!chatlist) return

chatlist.innerHTML=""

chats.forEach((chat,i)=>{

let item = document.createElement("div")

item.className="chat-item"

item.innerText = chat[0] ? chat[0].question.substring(0,40) : "New Chat"

item.onclick=function(){

let chatArea = document.getElementById("chatArea")
chatArea.innerHTML=""

chat.forEach(msg=>{

let q=document.createElement("div")
q.className="message user"
q.innerText=msg.question

let a=document.createElement("div")
a.className="message bot"
a.innerHTML=marked.parse(msg.answer)

chatArea.appendChild(q)
chatArea.appendChild(a)

})

}

chatlist.appendChild(item)

})

}

loadChats()

// FILE UPLOAD
document.getElementById("fileInput").addEventListener("change", handleFile)

function handleFile(event){

let file = event.target.files[0]

if(!file) return

let reader = new FileReader()

reader.onload = function(e){

imageData = e.target.result

let chat = document.getElementById("chatArea")

let img = document.createElement("img")
img.src = imageData
img.style.maxWidth = "200px"
img.style.borderRadius = "10px"

let msg = document.createElement("div")
msg.className = "message user"

msg.appendChild(img)

chat.appendChild(msg)

chat.scrollTop = chat.scrollHeight

}

reader.readAsDataURL(file)

}