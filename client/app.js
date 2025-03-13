const myForm = document.getElementById("promptForm");
const responsesContainer = document.getElementById("responsesContainer");

myForm.addEventListener("submit", sendChatRequest);

async function sendChatRequest(event) {
    event.preventDefault();
    const userPrompt = event.target.promptInput.value;
    console.log("the prompt is:", userPrompt);

    const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt }),
    });

    //getting data back from the server
    const data = await response.json();
    console.log("the data recieved back is:", data);
    //add a <p> tag to a page, and putting the data inside of it
    const responseP = document.createElement("p");
    responseP.textContent = data
    responsesContainer.appendChild(responseP);
}