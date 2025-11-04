// Tab switching
const chatTab = document.getElementById("chatTab");
const videoTab = document.getElementById("videoTab");
const chatSection = document.getElementById("chatSection");
const videoSection = document.getElementById("videoSection");

chatTab.addEventListener("click", () => {
  chatTab.classList.add("active");
  videoTab.classList.remove("active");
  chatSection.classList.add("active");
  videoSection.classList.remove("active");
});

videoTab.addEventListener("click", () => {
  videoTab.classList.add("active");
  chatTab.classList.remove("active");
  videoSection.classList.add("active");
  chatSection.classList.remove("active");
});

// Chat AI logic
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

  appendMessage("Thinking...", "ai");

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const aiMessage = data.reply || "Sorry, I couldn’t process that.";
    replaceLastMessage(aiMessage, "ai");
  } catch (error) {
    replaceLastMessage("Error connecting to AI.", "ai");
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

// Video generator (mocked for now)
const generateVideoBtn = document.getElementById("generateVideoBtn");
generateVideoBtn.addEventListener("click", async () => {
  const prompt = document.getElementById("videoPrompt").value.trim();
  const videoOutput = document.getElementById("videoOutput");
  if (!prompt) return alert("Please describe the video.");

  videoOutput.innerHTML = "<p>Generating video...</p>";

  // Placeholder for real API
  setTimeout(() => {
    videoOutput.innerHTML = `
      <video controls autoplay>
        <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <p>Video generated for: "${prompt}"</p>
    `;
  }, 3000);
});
