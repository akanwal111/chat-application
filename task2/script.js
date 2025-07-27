const socket = io();
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");
const usernameInput = document.getElementById("username");

function appendMessage({ username, text }) {
  const msgElement = document.createElement("div");
  msgElement.innerHTML = `<strong>${username}:</strong> ${text}`;
  chatBox.appendChild(msgElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

socket.on("load messages", (messages) => {
  messages.forEach(appendMessage);
});

socket.on("new message", appendMessage);

function sendMessage() {
  const text = messageInput.value.trim();
  const username = usernameInput.value.trim() || "Anonymous";

  if (text) {
    socket.emit("send message", { username, text });
    messageInput.value = "";
  }
}
