document.addEventListener('DOMContentLoaded', function() {
    // Get the maximum screen width
    var maxScreenWidth = window.screen.width || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // Set the variable in CSS
    document.documentElement.style.setProperty('--max-screen-width', maxScreenWidth + 'px');
});

getLoggedInUser();

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

function redirectToRecharge(){
    window.location.href = "http://localhost:3000/Recharge";
}

async function redirectToOrder(ID){
    const response = await fetch('/Home/Rented', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rentedId: ID })
      });
    const responseData = await response.json();
    window.location.href = "http://localhost:3000/Order";
}

// Script của chatbox

document.addEventListener("DOMContentLoaded", function() {
    var chatButton = document.getElementById("chat-button");
    var chatContainer = document.getElementById("chat-container");
    var closeButton = document.getElementById("close-button");
    var userMessageInput = document.getElementById("user-message");
    var sendButton = document.getElementById("send-button");
    var chatMessages = document.getElementById("chat-messages");

    // Biến đếm số lần người dùng đã gửi tin nhắn
    var userMessageCount = 0;

    //Hiển thị chatbox khi nhấp vào Chat-button
    chatButton.addEventListener("click", function() {
        chatContainer.style.display = "block";
        userMessageInput.focus(); // Focus vào ô nhập tin nhắn người dùng khi chatbox hiển thị
        closeButton.style.display = "block"; // Hiển thị nút close khi nhấp vào chat-button
        hatHeader.style.width = chatContainer.offsetWidth + "px"; // Thiết lập độ rộng của chat-header bằng độ rộng của chat-container
    });

    //Ẩn chatbox khi nhấp vào nút CLOSE
    closeButton.addEventListener("click", function() {
        chatContainer.style.display = "none";
        closeButton.style.display = "none"; // Ẩn nút close khi nhấp vào nút close
        chatHeader.style.width = ""; // Xóa độ rộng được thiết lập để chat-header trở về trạng thái mặc định
    });

    //Gửi tin nhắn khi nhấp vào nút gửi hoặc nhấn phim Enter
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
        userMessageCount++;
    
        var chatbotMessage = "";
        if (userMessageCount === 1) {
            chatbotMessage = "Hilay: Xin chào, tôi có thể giúp gì được cho bạn?";
        } else {
            chatbotMessage = "Hilay: " + userMessage;
        }
    
        setTimeout(function() {
            appendChatbotMessage(chatbotMessage);
        }, 500); // Độ trễ trước khi hiển thị phản hồi của chatbot (đơn vị ms)
    }
});

//Go to Game
function scrollToDiv(divId) {
    var targetDiv = document.getElementById(divId);

    targetDiv.scrollIntoView({ behavior: 'smooth'});
}

//lấy dữ liệu từ database để xử lí
var listGame = {};
var listRented_LQM = [];
var listRented_PUBG = [];
var listRented_LMHT = [];
var listRented_NARAKA = [];
var listRented_CSGO = [];
var listCurrent = [0, 0, 0, 0, 0];
var max_list = [];
var user_id = null;
var user_role;

function check_account(email_exist, password_exist, email, password){
    if (email == '') {
        document.getElementById("Message_email").textContent = 'Chưa nhập email tài khoản';
        document.getElementById("Message_password").textContent = '';
    }
    else if (email_exist == false) {
        document.getElementById("Message_email").textContent = 'Tài khoản không tồn tại';
        document.getElementById("Message_password").textContent = '';
    }
    else if (password == '') {
        document.getElementById("Message_email").textContent = '';
        document.getElementById("Message_password").textContent = 'Chưa nhập mật khẩu';
    }
    else if (email_exist == true && password_exist == false) {
        document.getElementById("Message_email").textContent = '';
        document.getElementById("Message_password").textContent = 'Sai mật khẩu';
    }
    else if (email_exist == true && password_exist == true) {
        document.getElementById("Message_email").textContent = '';
        document.getElementById("Message_password").textContent = '';
        redirectToHome();
        setUpLogIn();loginUser();
    }
}

function signUp(fromWeb, email, password, role){
    if (fromWeb != 'register'){
        var role = document.getElementById("role").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
    }

    var exist = false;
    var email_exist = false;
    var password_exist = false; 
    user_role = role;

    if (role == 'renter'){
        document.getElementById("Message_role").textContent = '';
        
        fetch('/Data/Renters')
        .then(response => response.json())
        .then(data => {
        // data là một mảng chứa các đối tượng, trong trường hợp này chỉ có một đối tượng
            data.forEach(item => {
                if (email == item.email) {email_exist = true; exist = true;}
                
                if (email_exist == true && password == item.password){
                    password_exist = true; 
                    user_id = item._id;
                    email_exist = false;
                }
                else {
                    email_exist = false;
                }
            });
            check_account(exist, password_exist, email, password);
        })
        .catch(error => console.error('Lỗi:', error));
    }   
    else if (role == 'rented'){
        document.getElementById("Message_role").textContent = '';

        fetch('/Data/Rented_persons')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (email == item.email) {email_exist = true; exist = true;}
                
                if (email_exist == true && password == item.password){
                    password_exist = true; 
                    user_id = item._id;
                    email_exist = false;
                }
                else {
                    email_exist = false;
                }
            });
            check_account(exist, password_exist, email,  password);
        })
        .catch(error => console.error('Lỗi:', error));
    }
    else {
        document.getElementById("Message_role").textContent = 'Chưa chọn loại tài khoản';
        document.getElementById("Message_email").textContent = '';
        document.getElementById("Message_password").textContent = '';
    }
}

async function Register(){
    var name = document.getElementById("res_name").value;
    var role = document.getElementById("res_role").value;
    var birthday = document.getElementById("res_birthday").value;
    var gender = document.getElementById("res_gender").value;
    var phone = document.getElementById("res_phone").value;
    var address = document.getElementById("res_address").value;
    var email = document.getElementById("res_email").value;
    var password = document.getElementById("res_password").value;
    var res_success = true;

    document.getElementById("Message_res_name").textContent = "";
    document.getElementById("Message_res_role").textContent = "";
    document.getElementById("Message_res_birthday").textContent = "";
    document.getElementById("Message_res_gender").textContent = "";
    document.getElementById("Message_res_phone").textContent = "";
    document.getElementById("Message_res_address").textContent = "";
    document.getElementById("Message_res_email").textContent = "";
    document.getElementById("Message_res_password").textContent = "";

    if (name == "") {document.getElementById("Message_res_name").textContent = "Chưa nhập họ tên"; res_success = false;}
    if (role == "none") {document.getElementById("Message_res_role").textContent = "Chưa chọn loại tài khoản"; res_success = false;}
    if (birthday == "") {document.getElementById("Message_res_birthday").textContent = "Chưa nhập ngày sinh"; res_success = false;}
    if (gender == "") {document.getElementById("Message_res_gender").textContent = "Chưa chọn giới tính"; res_success = false;}
    if (phone == "") {document.getElementById("Message_res_phone").textContent = "Chưa nhập số điện thoại"; res_success = false;}
    if (address == "") {document.getElementById("Message_res_address").textContent = "Chưa nhập địa chỉ"; res_success = false;}
    if (email == "") {document.getElementById("Message_res_email").textContent = "Chưa nhập email"; res_success = false;}
    if (password == "") {document.getElementById("Message_res_password").textContent = "Chưa nhập mật khẩu"; res_success = false;}

    if (!email.endsWith("@gmail.com") && email != "") {
        document.getElementById("Message_res_email").innerText = "Email không hợp lệ";
        res_success = false;
    } 

    if (password.length < 5 && password != ""){document.getElementById("Message_res_password").textContent = "Độ dài mật khẩu phải lớn hơn 5"; res_success = false;}

    if (role == "renter"){
        const response = await fetch('/Data/Renters');
        const result = await response.json();

        result.forEach(item => {
            if (email == item.email) {
                document.getElementById("Message_res_email").innerText = "Email đã tồn tại"; 
                res_success = false;
            }
        });
    }
    else if (role == "rented"){
        const response = await fetch('/Data/Rented_persons');
        const result = await response.json();

        result.forEach(item => {
            if (email == item.email) {
                document.getElementById("Message_res_email").innerText = "Email đã tồn tại";
                res_success = false;
            }
        });
    }

    if (res_success == true){
        const response = await fetch('/Register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                res_role: role,
                res_name: name,
                res_birthday: birthday,
                res_gender: gender,
                res_address: address,
                res_phone: phone,
                res_email: email,
                res_password: password
            })
          });
        const responseData = await response.json();
        if (responseData.success == true){signUp('register', email, password, role);console.log("Đăng kí thành công");}
        else {console.log("Đăng ký không thành công");}
    }
    else {
        console.log("Đăng ký không thành công");
    }

}

async function setUpLogIn(interact){
    if (user_role == "renter"){
        const response = await fetch('/Data/Renters');
        const result = await response.json();
        document.getElementById("tools-button").style.display = "flex";
        document.getElementById("recharge-button").style.display = "flex";
        document.getElementById("login-button").style.display = "none";

        result.forEach(item => {
            if (item._id == user_id){
                const Birthday = new Date(item.joining_date);
                const year = Birthday.getFullYear();
                const month = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
                const day = Birthday.getDate().toString().padStart(2, '0');

                document.getElementById("money").textContent = item.money;
                if (item.avatar != ''){
                    document.getElementById("avatar1").src = item.avatar;
                    document.getElementById("avatar2").src = item.avatar;
                }
                document.getElementById("user-info-name").textContent = item.name;
                document.getElementById("user-info-id").textContent = "ID: " + item._id;
                document.getElementById("joining-date").textContent = "Ngày tham gia: " + day + "-" + month + "-" + year;
            }
        })
    }
    else if (user_role == "rented"){
        const response = await fetch('/Data/Rented_persons');
        const result = await response.json();
        document.getElementById("tools-button").style.display = "flex";
        document.getElementById("login-button").style.display = "none";

        result.forEach(item => {
            if (item._id == user_id){
                const Birthday = new Date(item.joining_date);
                const year = Birthday.getFullYear();
                const month = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
                const day = Birthday.getDate().toString().padStart(2, '0');

                document.getElementById("money").textContent = item.money;
                if (item.avatar != ""){
                    document.getElementById("avatar1").src = item.avatar;
                    document.getElementById("avatar2").src = item.avatar;
                }
                document.getElementById("user-info-name").textContent = item.name;
                document.getElementById("user-info-id").textContent = "ID: " + item._id;
                document.getElementById("joining-date").textContent = "Ngày tham gia: " + day + "-" + month + "-" + year;
            }
        })
    }
    setTimeout(() => {
            if (interact == "login"){redirectToLogin();}
            else if (interact == "LMHT"){scrollToDiv('LMHT')}
            else if (interact == "CSGO"){scrollToDiv('CSGO')}
            else if (interact == "NARAKA"){scrollToDiv('NARAKA')}
            else if (interact == "PUBG"){scrollToDiv('PUBG')}
            else if (interact == "LQM"){scrollToDiv('LQM')}
    }, 1000);
}

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

                        const Birthday = new Date(player.birthday);
                        const year = Birthday.getFullYear();
                        const month = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
                        const day = Birthday.getDate().toString().padStart(2, '0');

                        playerDiv.innerHTML += `
                            <div class="player" onclick="redirectToOrder('${player._id}')">
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
                        if (playerCount == (n * 5 + 5)) {
                            return;
                        }

                        const Birthday = new Date(player.birthday);
                        const year = Birthday.getFullYear();
                        const month = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
                        const day = Birthday.getDate().toString().padStart(2, '0');

                        playerDiv.innerHTML += `
                            <buttun class="player" onclick="redirectToOrder('${player._id}')">
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
                            </button>`;
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

//Kiểm tra session đã có id chưa
async function logout() {
    const response = await fetch('/Logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: null, type: null })
    });

    document.getElementById("tools-button").style.display = "none";
    document.getElementById("recharge-button").style.display = "none";
    document.getElementById("login-button").style.display = "flex";
}

async function loginUser() {
    const response = await fetch('/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: user_id, type: user_role })
    });
}

function adjustUserInfo(){
    window.location.href = "http://localhost:3000/Infor";
}

  // lấy id khi reload lại trang
async function getLoggedInUser() {
    const response = await fetch('Logged-In-User');
    const result = await response.json();

    if (result.loggedIn) {
      console.log('Logged In User:', result.userId);
      user_id = result.userId;
      user_role = result.type;
    } else {
      console.log('User not logged in');
    }

    setUpLogIn(result.interact);
}

getTopStar();
async function getTopStar(){
    const response = await fetch('/Data/Rented_persons');
    const data = await response.json();
    var rented = [];

    data.sort((a, b) => b.number_of_rentals - a.number_of_rentals);

    data.forEach(item => {
        rented.push(item._id);
    })

    const start_list = document.getElementById("star_list");
    const fiveLargest = rented.slice(0, 5);

    const selectElement = document.createElement("ul");
    selectElement.classList.add("star-list");
    fiveLargest.forEach(fl => {
        data.forEach(item => {
            if (fl == item._id){
                selectElement.innerHTML += `
                    <li onclick="redirectToOrder('${item._id}')">${item.name} - ${item.number_of_rentals} lượt thuê</li>`;
            }
        })
    })
    start_list.appendChild(selectElement);
}