
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

//Login/register
function redirectToLogin() {
    const modal_log = document.querySelector('.modal_log');
    const modal_overlay_log = document.querySelector('.modal_overlay_log');
    const modal_body_log = document.querySelector('.modal_body_log');

    const modal_reg = document.querySelector('.modal_reg');
    const modal_overlay_reg = document.querySelector('.modal_overlay_reg');
    const modal_body_reg = document.querySelector('.modal_body_reg');

    modal_reg.style.display = "none";
    modal_overlay_reg.style.display = "none";
    modal_body_reg.style.display = "none";

    modal_log.style.display = "flex";
    modal_overlay_log.style.display = "flex";
    modal_body_log.style.display = "flex";
}

function redirectToReg() {
    const modal_log = document.querySelector('.modal_log');
    const modal_overlay_log = document.querySelector('.modal_overlay_log');
    const modal_body_log = document.querySelector('.modal_body_log');

    const modal_reg = document.querySelector('.modal_reg');
    const modal_overlay_reg = document.querySelector('.modal_overlay_reg');
    const modal_body_reg = document.querySelector('.modal_body_reg');

    modal_log.style.display = "none";
    modal_overlay_log.style.display = "none";
    modal_body_log.style.display = "none";

    modal_reg.style.display = "flex";
    modal_overlay_reg.style.display = "flex";
    modal_body_reg.style.display = "flex";
}

function redirectToHome() {
    const modal_log = document.querySelector('.modal_log');
    const modal_overlay_log = document.querySelector('.modal_overlay_log');
    const modal_body_log = document.querySelector('.modal_body_log');

    const modal_reg = document.querySelector('.modal_reg');
    const modal_overlay_reg = document.querySelector('.modal_overlay_reg');
    const modal_body_reg = document.querySelector('.modal_body_reg');

    modal_log.style.display = "none";
    modal_overlay_log.style.display = "none";
    modal_body_log.style.display = "none";

    modal_reg.style.display = "none";
    modal_overlay_reg.style.display = "none";
    modal_body_reg.style.display = "none";
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
            event.preventDefault(); // Ngăn chặn việc gửi form khi nhấn Enter
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
        var messageContent = document.createElement("div");
        messageContent.classList.add("message-content");
        messageContent.textContent = message;
        userMessageElement.appendChild(messageContent);
        chatMessages.appendChild(userMessageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Tự động cuộn xuống khi có tin nhắn mới
    }

    function appendChatbotMessage(message) {
        var chatbotMessageElement = document.createElement("div");
        chatbotMessageElement.classList.add("chatbot-message");
        var messageContent = document.createElement("div");
        messageContent.classList.add("message-content");
        messageContent.textContent = message;
        chatbotMessageElement.appendChild(messageContent);
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

//Go to Game
function scrollToDiv(divId) {
    var targetDiv = document.getElementById(divId);
    targetDiv.scrollIntoView({ behavior: 'smooth' });
}

//lấy dữ liệu từ database để xử lí
let listGame = {};
let listRented_LQM = [];
let listRented_PUBG = [];
let listRented_LMHT = [];
let listRented_NARAKA = [];
let listRented_CSGO = [];
var listCurrent = [0, 0, 0, 0, 0];
var max_list = [];

//hàm thêm vào list theo từng loại game
function pushRented(game, id){
    if (game == 'Liên minh huyền thoại'){listRented_LMHT.push(id);}
    else if (game == 'Liên quân mobile'){listRented_LQM.push(id);}
    else if (game == 'PUBG'){listRented_PUBG.push(id);}
    else if (game == 'CSGO'){listRented_CSGO.push(id);}
    else {listRented_NARAKA.push(id);}
}

function change_displayRented(list, n, k){
    fetch('/Data/Rented_persons')
        .then(response => response.json())
        .then(data => {
            const rented = document.getElementById('rented-persons');
            var playerCount = 0;

            const playerDiv = document.getElementById('list' + String(k));
            playerDiv.innerHTML = ``;
            data.forEach(player => {
                if (list.includes(player._id) ){
                    if (playerCount >= (n * 5)){
                        if (playerCount == (n * 5 + 5)) {
                            return;
                        }
                        console.log(player._id);
                        const Birthday = new Date(player.birthday);
                        const year = Birthday.getFullYear();
                        const month = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
                        const day = Birthday.getDate().toString().padStart(2, '0');

                        playerDiv.innerHTML += `
                            <div class="player">
                                <div class="player-img"><img src="${player.avatar}" alt=""></div>
                                <div class="info">
                                    <div>${player.name}</div>
                                    <div class="detail">
                                        <div>⭐${player.evaluate}</div>
                                        <div>|</div>
                                        <div>Đã phục vụ: ${player.number_of_rentals}</div>
                                    </div>
                                </div>
                                    <div>🪙 ${day}-${month}-${year}</div>
                            </div>`;
                    }
                    playerCount++;
                }
            });
        })
    .catch(error => console.error('Error fetching data:', error));
}

function calFrame(list){
    x = Math.floor(list.length/5);
    if (list.length%5 == 0 && x > 0){x--;}
    return x;
}

function scrollPlayers(scroll, k){
    max_list.push(calFrame(listRented_LQM));
    max_list.push(calFrame(listRented_PUBG));
    max_list.push(calFrame(listRented_LMHT));
    max_list.push(calFrame(listRented_NARAKA));
    max_list.push(calFrame(listRented_CSGO));
    var change = 0;

    if (scroll == 'left' && listCurrent[k] > 0 && listCurrent[k] <= max_list[k]) {listCurrent[k]--;change = 1;}
    else if (scroll == 'left' && listCurrent[k] == 0 && max_list[k] > 0) {listCurrent[k] = max_list[k];change = 1;}
    else if (scroll == 'right' && listCurrent[k] == 0 && max_list[k] > 0) {listCurrent[k]++;change = 1;}
    else if (scroll == 'right' && listCurrent[k] == max_list[k] && max_list[k] > 0) {listCurrent[k] = 0;change = 1;}
    
    if (change == 1){
        if (k == 0){
            change_displayRented(listRented_LQM, listCurrent[0], 0);
        }
        else if (k == 1){
            change_displayRented(listRented_PUBG, listCurrent[1], 1);
        }
        else if (k == 2){
            change_displayRented(listRented_LMHT, listCurrent[2], 2);
        }
        else if (k == 3){
            change_displayRented(listRented_NARAKA, listCurrent[3], 3);
        }
        else {
            change_displayRented(listRented_CSGO, listCurrent[4], 4);
        }
    }

}

function displayRented(list, n, game, id, k){
    fetch('/Data/Rented_persons')
        .then(response => response.json())
        .then(data => {
            const rented = document.getElementById('rented-persons');
            var playerCount = 0;
            
            const nameDiv = document.createElement('div'); 
            nameDiv.classList.add('player-title');
            nameDiv.innerHTML = `
                <div class="moreLeft" onclick="scrollPlayers('left', ${k})">◄</div>
                <div class="moreRight" onclick="scrollPlayers('right', ${k})">►</div>
                <div class="name" id="${id}">${game}</div>`;
            rented.appendChild(nameDiv);

            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player-container');
            playerDiv.id = 'list' + String(k);
            data.forEach(player => {
                if (list.includes(player._id) ){
                    if (playerCount >= (n * 5)){
                        console.log(player.name);
                        if (playerCount == (n * 5 + 5)) {
                            return;
                        }

                        const Birthday = new Date(player.birthday);
                        const year = Birthday.getFullYear();
                        const month = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
                        const day = Birthday.getDate().toString().padStart(2, '0');

                        playerDiv.innerHTML += `
                            <div class="player">
                                <div class="player-img"><img src="${player.avatar}" alt=""></div>
                                <div class="info">
                                    <div>${player.name}</div>
                                    <div class="detail">
                                        <div>⭐${player.evaluate}</div>
                                        <div>|</div>
                                        <div>Đã phục vụ: ${player.number_of_rentals}</div>
                                    </div>
                                </div>
                                    <div>🪙 ${day}-${month}-${year}</div>
                            </div>`;
                    }
                    playerCount++;
                }
            });
            rented.appendChild(playerDiv);
        })
    .catch(error => console.error('Error fetching data:', error));
}

//lấy dữ liệu game hiển thị và lưu vào object listGame
async function fetchGame() {
    const response = await fetch('/Data/Services');
    const data = await response.json();
    const game_intro = document.getElementById('game-intro');
    data.forEach(game => {
        listGame[game._id] = game.name;

        // Xuất ra màng hình
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `
                    <div class="game-img"><img src="${game.img}" alt="${game.name}"></div>
                    <div class="game-text">${game.name}</div>
                `;
        game_intro.appendChild(gameDiv);
    });
}

// Hàm fetch dữ liệu người cho thuê và trả về Promise
async function fetchRentedPersons() {
    const response = await fetch('/Data/Rented_persons');
    return await response.json();
}

// Hàm chờ cho đến khi cả hai Promise đều đã hoàn thành
Promise.all([fetchGame(), fetchRentedPersons()])
    .then(([gameData, rentedData]) => {
        // Xử lý dữ liệu và đưa vào các mảng listRented
        for (let key in listGame) {
            rentedData.forEach(player => {
                player.service.forEach(service => {
                    if (service == key) {
                        pushRented(listGame[key], player._id);
                    }
                });
            });
        }

        // Log và hiển thị dữ liệu sau khi đã cập nhật
        displayRented(listRented_LQM, listCurrent[0], 'Liên quân mobile', 'LQM', 0);
        displayRented(listRented_PUBG, listCurrent[1], 'PUBG', 'PUBG', 1);
        displayRented(listRented_LMHT, listCurrent[2], 'Liên minh huyền thoại', 'LMHT', 2);
        displayRented(listRented_NARAKA, listCurrent[3], 'Naraka', 'NARAKA', 3);
        displayRented(listRented_CSGO, listCurrent[4], 'CSGO', 'CSGO', 4);
    })
    .catch(error => console.error('Error fetching data:', error));