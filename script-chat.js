const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  userInput.value = "";
  appendMessage("Suleiman AI is thinking...", "ai");

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    replaceLastMessage(data.reply || "Sorry, I couldn’t process that.", "ai");
  } catch {
    replaceLastMessage("Network error connecting to Suleiman AI.", "ai");
  }
}

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function replaceLastMessage(text, sender) {
  const messages = chatContainer.querySelectorAll(".message." + sender);
  const last = messages[messages.length - 1];
  if (last) last.textContent = text;
  chatContainer.scrollTop = chatContainer.scrollHeight;
                            }
