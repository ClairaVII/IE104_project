
// JavaScript function to scroll to the top of the page
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}
// Show/hide scroll-to-top button based on scroll position
window.onscroll = function () {
    scrollFunction();
};
function scrollFunction() {
    var scrollBtn = document.querySelector('.scroll-to-top-btn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
}
function redirectToLogin() {
    window.location.href = "./login/index.html";
}


// Script của chatbox

document.addEventListener("DOMContentLoaded", function() {
    var chatButton = document.getElementById("chat-button");
    var chatContainer = document.getElementById("chat-container");
    var closeButton = document.getElementById("close-button");
    var userMessageInput = document.getElementById("user-message");
    var sendButton = document.getElementById("send-button");
    var chatMessages = document.getElementById("chat-messages");

    // Show the chatbox when the "Chat" element is clicked
    chatButton.addEventListener("click", function() {
        chatContainer.style.display = "block";
        userMessageInput.focus(); // Focus vào ô nhập tin nhắn người dùng khi chatbox hiển thị
    });

    // Hide the chatbox when the close button is clicked
    closeButton.addEventListener("click", function() {
        chatContainer.style.display = "none";
    });

    // Send message when the send button is clicked or Enter key is pressed
    sendButton.addEventListener("click", sendMessage);
    userMessageInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        var userMessage = userMessageInput.value;
        if (userMessage.trim() !== "") {
            appendUserMessage(userMessage);
            userMessageInput.value = "";
            simulateChatbotResponse(userMessage);
        }
    }

    function appendUserMessage(message) {
        var userMessageElement = document.createElement("div");
        userMessageElement.classList.add("user-message");
        userMessageElement.textContent = message;
        chatMessages.appendChild(userMessageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Tự động cuộn xuống khi có tin nhắn mới
    }

    function appendChatbotMessage(message) {
        var chatbotMessageElement = document.createElement("div");
        chatbotMessageElement.classList.add("chatbot-message");
        chatbotMessageElement.textContent = message;
        chatMessages.appendChild(chatbotMessageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function simulateChatbotResponse(userMessage) {
        var chatbotMessage = "Hiney: " + userMessage;
        setTimeout(function() {
            appendChatbotMessage(chatbotMessage);
        }, 500); // Độ trễ trước khi hiển thị phản hồi của chatbot (đơn vị ms)
    }
});