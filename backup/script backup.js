const chatLog = document.getElementById("chatLog");
const composer = document.getElementById("composer");
const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");

// শুধু এই সেশনের জন্য কথোপকথনের হিস্টোরি মেমোরিতে রাখা হচ্ছে
let history = [];

function scrollToBottom() {
  chatLog.scrollTop = chatLog.scrollHeight;
}

function addMessage(role, text) {
  const wrapper = document.createElement("div");
  wrapper.className = `msg ${role === "user" ? "user" : "bot"}`;

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "তু" : "CR";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  chatLog.appendChild(wrapper);
  scrollToBottom();
  return bubble;
}

function addTypingIndicator() {
  const wrapper = document.createElement("div");
  wrapper.className = "msg bot";
  wrapper.id = "typingIndicator";

  const avatar = document.createElement("span");
  avatar.className = "avatar";
  avatar.textContent = "CR";

  const bubble = document.createElement("div");
  bubble.className = "bubble typing";
  bubble.innerHTML = "<span></span><span></span><span></span>";

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  chatLog.appendChild(wrapper);
  scrollToBottom();
}

function removeTypingIndicator() {
  const el = document.getElementById("typingIndicator");
  if (el) el.remove();
}

async function sendMessage(message) {
  addMessage("user", message);
  history.push({ role: "user", text: message });

  msgInput.value = "";
  msgInput.disabled = true;
  sendBtn.disabled = true;
  addTypingIndicator();

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });

    const data = await res.json();
    removeTypingIndicator();

    if (!res.ok) {
      const bubble = addMessage("bot", data.error || "একটা সমস্যা হয়েছে, আবার চেষ্টা করো।");
      bubble.classList.add("error");
      return;
    }

    addMessage("bot", data.reply);
    history.push({ role: "model", text: data.reply });
  } catch (err) {
    removeTypingIndicator();
    const bubble = addMessage("bot", "সার্ভারের সাথে সংযোগ করা যায়নি। ইন্টারনেট/সার্ভার চেক করো।");
    bubble.classList.add("error");
  } finally {
    msgInput.disabled = false;
    sendBtn.disabled = false;
    msgInput.focus();
  }
}

composer.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = msgInput.value.trim();
  if (!message) return;
  sendMessage(message);
});
