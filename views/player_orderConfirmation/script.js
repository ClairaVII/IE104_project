document.addEventListener("DOMContentLoaded", function() {
    var chatMessages = document.getElementById("chat-messages");
    var userMessageInput = document.getElementById("user-message");
    var sendButton = document.getElementById("send-button");

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
    }

    function appendChatbotMessage(message) {
        var chatbotMessageElement = document.createElement("div");
        chatbotMessageElement.classList.add("chatbot-message");
        chatbotMessageElement.textContent = message;
        chatMessages.appendChild(chatbotMessageElement);
    }

    function simulateChatbotResponse(userMessage) {
        var chatbotMessage = "Hiney: " + userMessage; 
        setTimeout(function() {
            appendChatbotMessage(chatbotMessage);
        }, 500); // độ trễ trước khi hiển thị phản hồi của chatbot (đơn vị ms)
    }

    var closeButton = document.getElementById("close-button");
    closeButton.addEventListener("mouseenter", function() {
        closeButton.classList.add("hover-effect");
    });

    closeButton.addEventListener("mouseleave", function() {
        closeButton.classList.remove("hover-effect");
    });

    closeButton.addEventListener("click", function() {
        var chatContainer = document.getElementById("chat-container");
        chatContainer.style.display = "none";
    });
});