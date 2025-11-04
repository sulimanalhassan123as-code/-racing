document.addEventListener("DOMContentLoaded", () => {
  const chatTab = document.getElementById("chatTab");
  const videoTab = document.getElementById("videoTab");
  const chatSection = document.getElementById("chatSection");
  const videoSection = document.getElementById("videoSection");
  const sendBtn = document.getElementById("sendBtn");
  const userInput = document.getElementById("userInput");
  const chatContainer = document.getElementById("chatContainer");
  const generateVideoBtn = document.getElementById("generateVideoBtn");
  const videoPrompt = document.getElementById("videoPrompt");
  const videoOutput = document.getElementById("videoOutput");

  function setActiveTab(tab) {
    if (tab === "chat") {
      chatTab.classList.add("active");
      videoTab.classList.remove("active");
      chatSection.classList.add("active");
      videoSection.classList.remove("active");
    } else {
      chatTab.classList.remove("active");
      videoTab.classList.add("active");
      chatSection.classList.remove("active");
      videoSection.classList.add("active");
    }
  }

  chatTab.addEventListener("click", () => setActiveTab("chat"));
  videoTab.addEventListener("click", () => setActiveTab("video"));

  sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;
    addMessage("user", message);
    userInput.value = "";
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      addMessage("ai", data.reply || "No reply.");
    } catch {
      addMessage("ai", "Error connecting to chat AI.");
    }
  });

  generateVideoBtn.addEventListener("click", async () => {
    const prompt = videoPrompt.value.trim();
    if (!prompt) return;
    videoOutput.innerHTML = "Generating video...";
    try {
      const res = await fetch("/api/memories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.videoUrl) {
        videoOutput.innerHTML = `<video controls src="${data.videoUrl}"></video>`;
      } else {
        videoOutput.textContent = "Failed to generate video.";
      }
    } catch (error) {
      videoOutput.textContent = "Error connecting to video AI.";
    }
  });

  function addMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
});
