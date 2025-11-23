lucide.createIcons();

function downloadPDF(btn) {
  const originalText = document.getElementById("btn-text").innerText;
  const originalIcon = btn.innerHTML;

  document.getElementById("btn-text").innerText = "Memproses...";
  btn.disabled = true;
  btn.style.opacity = "0.7";

  const element = document.body;

  element.classList.add("pdf-mode");

  const opt = {
    margin: [0, 0],
    filename: "Portfolio-Husein-Barkah.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      element.classList.remove("pdf-mode");

      document.getElementById("btn-text").innerText = originalText;
      btn.innerHTML = originalIcon;
      btn.disabled = false;
      btn.style.opacity = "1";
      lucide.createIcons();
    })
    .catch((err) => {
      console.error("PDF Error:", err);
      element.classList.remove("pdf-mode");
      alert(
        "Maaf, gagal mengunduh PDF. Silakan coba gunakan fitur Print browser (Ctrl+P)."
      );

      btn.innerHTML = originalIcon;
      btn.disabled = false;
      btn.style.opacity = "1";
      lucide.createIcons();
    });
}



  const iconHtml = isUser
    ? `<div class="w-8 h-8 rounded-full bg-gold flex-shrink-0 flex items-center justify-center border border-white/5"><i data-lucide="user" class="w-4 h-4 text-white"></i></div>`
    : `<div class="w-8 h-8 rounded-full bg-neutral-800 flex-shrink-0 flex items-center justify-center border border-white/5"><i data-lucide="bot" class="w-4 h-4 text-gold"></i></div>`;

  const bubbleClass = isUser
    ? "bg-gold text-white rounded-2xl rounded-tr-none"
    : "bg-neutral-800 text-gray-200 border border-white/5 rounded-2xl rounded-tl-none";

  const contentHtml = isUser ? text : marked.parse(text);

  div.innerHTML = `
                ${iconHtml}
                <div class="${bubbleClass} p-3 text-sm shadow-sm max-w-[85%] prose prose-invert">
                    ${contentHtml}
                </div>
            `;

  chatMessages.appendChild(div);
  lucide.createIcons();
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addLoading() {
  const div = document.createElement("div");
  div.id = "loading-indicator";
  div.className = "flex gap-3";
  div.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-neutral-800 flex-shrink-0 flex items-center justify-center border border-white/5"><i data-lucide="bot" class="w-4 h-4 text-gold"></i></div>
                <div class="bg-neutral-800 border border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-1">
                    <div class="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                    <div class="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                    <div class="w-1.5 h-1.5 bg-gray-400 rounded-full typing-dot"></div>
                </div>
            `;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  lucide.createIcons();
}

function removeLoading() {
  const loading = document.getElementById("loading-indicator");
  if (loading) loading.remove();
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, true);
  chatInput.value = "";
  chatInput.disabled = true;
  sendBtn.disabled = true;
  addLoading();

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `System Context: ${portfolioContext}\n\nUser Question: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    removeLoading();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const botReply = data.candidates[0].content.parts[0].text;
    addMessage(botReply, false);
  } catch (error) {
    removeLoading();
    addMessage(
      "Maaf, terjadi kesalahan koneksi. Silakan coba lagi nanti.",
      false
    );
    console.error(error);
  } finally {
    chatInput.disabled = false;
    sendBtn.disabled = false;
    chatInput.focus();
  }
}

const btn = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");

if (btn && menu) {
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}

function closeMenu() {
  if (menu) {
    menu.classList.add("hidden");
  }
}

const textToType = "Husein Barkah Pambudi";
const typingElement = document.getElementById("typing-text");
let charIndex = 0;
let typingTimer = null;
let isTyping = false;

function stopTyping() {
  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }
  isTyping = false;
}

function startTyping(charDelay = 150, initialDelay = 500) {
  stopTyping();
  if (!typingElement) return;
  typingElement.textContent = "";
  charIndex = 0;
  isTyping = true;

  function step() {
    if (!isTyping) return;
    if (charIndex < textToType.length) {
      typingElement.textContent += textToType.charAt(charIndex);
      charIndex++;
      typingTimer = setTimeout(step, charDelay);
    } else {
      isTyping = false;
    }
  }

  typingTimer = setTimeout(step, initialDelay);
}

if (typingElement) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startTyping(150, 200); //
        } else {
          stopTyping();
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(typingElement);

  window.addEventListener("load", () => startTyping(150, 500));
}

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100; 

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

window.addEventListener("scroll", reveal);
reveal();
