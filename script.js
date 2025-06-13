let select = document.querySelector(".select-heading")
let options = document.querySelector(".options")
let arrow = document.querySelector(".select-heading img")
let option = document.querySelectorAll(".option")
let selecttext = document.querySelector(".select-heading span")
let h1 = document.querySelector(".h1")
let chatimg = document.querySelector("#chatboat")
let chatbox = document.querySelector(".chat-box")

chatimg.addEventListener("click", () => {
    chatbox.classList.toggle("active-chat-box")
    if (chatbox.classList.contains("active-chat-box")) {
        chatimg.src = "cross.svg"
    } else {
        chatimg.src = "ai.svg"
    }
})

select.addEventListener("click", () => {
    options.classList.toggle("active-options")
    arrow.classList.toggle("routate")
})

option.forEach((item) => {
    item.addEventListener("click", () => {
        selecttext.innerText = item.innerText
    })
})

//ChatBoat

let prompt = document.querySelector(".prompt")
let chatbtn = document.querySelector(".input-area button")
let chatContainer = document.querySelector(".chat-container")
let userMessage = "";
let Api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDGM4PE4auy7d7EYxGUV4iq6xO-qBq_lmY"


async function genrateApiResponse(aiChatBox) {
    const textElement = aiChatBox.querySelector(".text");
    try {
        const response = await fetch(Api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    "role": "user",
                    "parts": [{ text: `${userMessage} in 10 words` }]
                }]
            })
        });
        const data = await response.json();
        const apiResponse = data.candidates[0].content.parts[0].text.trim();
        textElement.innerText = apiResponse;

    } catch (error) {
        console.log(error);

    } finally {
        const loadingElement = aiChatBox.querySelector(".loading");
        if (loadingElement) {
            loadingElement.style.display = "none";
        }
    }
}

function createChatBox(html, className) {
    const div = document.createElement("div")
    div.classList.add(className)
    div.innerHTML = html;
    return div
}

function showLoading() {
    const html = '<p class="text"></p> <img src="load.gif" class="loading"style=" width:50px;">'
    let aiChatBox = createChatBox(html, "ai-chat-box")
    chatContainer.appendChild(aiChatBox)
    genrateApiResponse(aiChatBox)
}

chatbtn.addEventListener("click", () => {
    h1.style.display = "none"
    userMessage = prompt.value;
    const html = '<p class = "text"></p>'
    let userChatBox = createChatBox(html, "user-chatbox")
    userChatBox.querySelector(".text").innerText = userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value = ""
    setTimeout(showLoading, 500)
})




//Virtual Assitent  

let ai = document.querySelector(".virtual-assistent img")
let speakpage = document.querySelector(".speak-page")
let content = document.querySelector(".speak-page h1")



function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 2
    text_speak.lang = "hi -GB"
    window.speechSynthesis.speak(text_speak)
}
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    speakpage.style.display = "none"
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())


}


function takeCommand(message) {
    if (message.includes("open") && message.includes("chat")) {
        speak("okay sir")
        chatbox.classList.add("active-chat-box")
    } else if (message.includes("close") && message.includes("chat")) {
        speak("okay sir")
        chatbox.classList.remove("active-chat-box")

    } else if (message.includes("who are you ") && message.includes("tum kon ho")) {
        speak("i am jarvs your virtual assitent,created by harsh sir ")
        window.open("file:///C:/Users/hares/OneDrive/Desktop/Project/Virtual%20assistent/index.html")
    } else if (message.includes("back") && message.includes("workout")) {
        speak("okay sir")
        window.open("file:///C:/Users/hares/OneDrive/Desktop/Project/Virtual%20assistent/backworkout.html")
    } else if (message.includes("chest") && message.includes("workout")) {
        speak("okay sir")
        window.open("file:///C:/Users/hares/OneDrive/Desktop/Project/Virtual%20assistent/chest.html")
    } else if (message.includes("biceps") && message.includes("triceps workout")) {
        speak("okay sir")
        window.open("file:///C:/Users/hares/OneDrive/Desktop/Project/Virtual%20assistent/bi.html")
    } else if (message.includes("shoulder") && message.includes("workout")) {
        speak("okay sir")
        window.open("file:///C:/Users/hares/OneDrive/Desktop/Project/Virtual%20assistent/shoulder.html")
    } else if (message.includes("leg") && message.includes("workout")) {
        speak("okay sir")
        window.open("file:///C:/Users/hares/OneDrive/Desktop/Project/Virtual%20assistent/leg.html")
    } else if (message.includes("youtube")) {
        speak("okaysir")
        window.open("https://www.youtube.com/")
    } else if (message.includes("instgram")) {
        speak("okay sir")
        window.open("https://www.instagram.com/")

    } else {
        speak("This is what i found on internet  regarding")
        window.open('https://www.google.com/search?q=' + message)
    }
}


ai.addEventListener("click", () => {
    recognition.start()
    speakpage.style.display = "flex";
    console.log("Recogntion start and speakpage displayed");
})