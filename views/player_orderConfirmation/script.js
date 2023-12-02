var rented_id = null;
var user_id = null;
var user_role = null;
getRentedCurrent();
getLoggedInUser();

function reloadCoins() {
    // Your coin reload logic goes here
    alert('Coins reloaded!');
}

function shareUserInfo() {
    // Thêm logic xử lý cho chức năng chia sẻ thông tin
    alert('Thông tin đã được chia sẻ!');
}

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const brand = document.querySelector('.brand h1');

    // Thêm hoặc xóa lớp scrolled khi cuộn trang
    nav.classList.toggle('scrolled', window.scrollY > 0);
    brand.classList.toggle('scrolled', window.scrollY > 0);
});

function filterSkills() {
    const input = document.querySelector('.skills-list input');
    const filter = input.value.toLowerCase();
    const skills = document.querySelectorAll('.scrollable-skills p');

    skills.forEach(skill => {
        const skillText = skill.innerText.toLowerCase();
        skill.style.display = skillText.includes(filter) ? 'block' : 'none';
    });
}

function displayImage(imagePath) {
    // Cập nhật đường dẫn ảnh trong phần tử hiển thị
    document.getElementById('selectedImage').src = imagePath;
}

function reloadCoins() {
    // Thêm logic xử lý cho chức năng nạp xu
    alert('Coins reloaded!');
}

function placeOrder() {
    // Thêm logic xử lý cho chức năng đặt đơn
    // Ở đây, chúng ta sẽ chuyển hướng sang trang web khác
    window.location.href = 'Dat Don.html';
}

function openChat() {
    // Chuyển sang trang chat.html
    window.location.href = "Chat.html";
}

function shareUserInfo() {
    // Lấy ID từ nơi bạn lưu trữ ID (trong trường hợp này, tôi giả sử bạn đã có một phần tử với ID 'userIdContainer')
    var userId = document.getElementById('userIdContainer').innerText;

    // Gọi hàm để sao chép vào Clipboard
    copyToClipboard(userId);

    // Thông báo cho người dùng biết rằng ID đã được sao chép
    alert('ID đã được sao chép vào Clipboard!');
}

function copyToClipboard(text) {
    // Tạo một thẻ textarea ẩn để chứa văn bản cần sao chép
    var textarea = document.createElement('textarea');
    textarea.value = text;

    // Thêm textarea vào trang web
    document.body.appendChild(textarea);

    // Chọn nội dung của textarea
    textarea.select();

    // Thực hiện thao tác sao chép vào Clipboard
    document.execCommand('copy');

    // Xóa textarea sau khi đã sao chép
    document.body.removeChild(textarea);
}

const orderData = {
    playerName: "User123",
};

let price;

function displayOrderDetails() {
    // Mock data, replace with actual data from your application
    const orderData = {
        playerName: "User123",
    };

    // Lấy giá trị từ data attributes của option được chọn
    var selectedOption = document.getElementById("gameSelect").options[document.getElementById("gameSelect").selectedIndex];
    var gameName = selectedOption.getAttribute("data-name");
    price = selectedOption.getAttribute("data-price");
    price = parseFloat(price);
    const orderDetails = document.getElementById("order-details");
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.value = 1;
    quantityInput.id = "quantityInput";

    orderDetails.innerHTML = `
    <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://data-resize.lita.cool/user/12487481/album/photo_20231114_163248_624_R48916.jpg.resize/299*" alt="" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
        <p><strong>${orderData.playerName}</strong></p>
    </div>
    <div style="margin-bottom: 10px;">
        <p>Dịch Vụ: ${gameName}</p>
        <p>Đơn Giá: ${price} 💰/trận</p>
    </div>
    <div style="margin-bottom: 10px;">
        <p>Số Lượng: <input type="number" min="1" value="1" id="quantityInput"></p>
    </div>`;

    const totalValueElement = document.createElement("p");
    totalValueElement.id = "totalValue";
    orderDetails.appendChild(totalValueElement);

    document.getElementById("quantityInput").addEventListener("input", updateTotalValue);

    openModal();
    updateTotalValue();
}

function updateTotalValue() {
    const quantityInput = document.getElementById("quantityInput");
    const totalValueElement = document.getElementById("totalValue");
    const quantity = parseInt(quantityInput.value);

    if (!isNaN(quantity) && quantity >= 1) {
        const totalValue = quantity * price;
        totalValueElement.textContent = `Tổng Giá Trị: ${totalValue} 💰`;
    }
}

function confirmOrder() {
    alert('Đơn hàng đã được xác nhận!');
    closeModal();

    // Show a success feedback pop-up
    const feedbackPopup = document.createElement("div");
    feedbackPopup.innerHTML = "<p>Đã đặt thành công!</p>";
    feedbackPopup.style.position = "fixed";
    feedbackPopup.style.top = "50%";
    feedbackPopup.style.left = "50%";
    feedbackPopup.style.transform = "translate(-50%, -50%)";
    feedbackPopup.style.backgroundColor = "#4CAF50";
    feedbackPopup.style.color = "#fff";
    feedbackPopup.style.padding = "15px";
    feedbackPopup.style.borderRadius = "10px";
    document.body.appendChild(feedbackPopup);

    // Automatically close the feedback pop-up after 3 seconds
    setTimeout(() => {
        document.body.removeChild(feedbackPopup);
    }, 3000);
    // Thêm hàm này để cập nhật số người theo dõi và số xu

function updateStats() {
        // Giả sử bạn có các biến để lưu trữ số người theo dõi và số xu
        const followersCount = 200;
        const coinsCount = 1000;
        const followingCount = 100
        // Cập nhật các phần tử HTML
        document.getElementById('followersCount').innerText = followersCount;
        document.getElementById('coinsCount').innerText = coinsCount;
}

    // Gọi hàm updateStats khi trang web tải xong
    document.addEventListener('DOMContentLoaded', updateStats);
}

document.getElementById("gameSelect").addEventListener("change", function () {
    // Lấy giá trị từ data attributes của option được chọn
    selectedOption = this.options[this.selectedIndex];
    var imageSource = selectedOption.getAttribute("data-image");
    var gameName = selectedOption.getAttribute("data-name");
    var price = selectedOption.getAttribute("data-price");

    // Hiển thị thông tin của game được chọn
    document.getElementById("gameImage").src = imageSource;
    document.getElementById("gameName").textContent = "Tên Game: " + gameName;
    document.getElementById("gamePrice").textContent = "Đơn giá: " + price;
});

// Hiển thị thông tin khi trang web được tải
window.onload = function () {
    // Mặc định hiển thị thông tin của game đầu tiên
    document.getElementById("gameImage").src = document.getElementById("gameSelect").options[0].getAttribute("data-image");
    document.getElementById("gameName").textContent = "Tên Game: " + document.getElementById("gameSelect").options[0].getAttribute("data-name");
    document.getElementById("gamePrice").textContent = "Đơn giá: " + document.getElementById("gameSelect").options[0].getAttribute("data-price");
};

// Show modal function
function openModal() {
    document.getElementById('confirmationModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

async function setUpLogIn(){
    if (user_role == "renter"){
        const response = await fetch('/Data/Renters');
        const result = await response.json();
        document.getElementById("tools-button").style.display = "flex";
        document.getElementById("chat").style.display = "flex";
        document.getElementById("recharge-button").style.display = "flex";

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
    else {
        const response = await fetch('/Data/Rented_persons');
        const result = await response.json();
        document.getElementById("tools-button").style.display = "flex";
        document.getElementById("chat").style.display = "flex";
        result.forEach(item => {
            if (item._id == user_id){
                const Birthday = new Date(item.joining_date);
                const year = Birthday.getFullYear();
                const month = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
                const day = Birthday.getDate().toString().padStart(2, '0');

                document.getElementById("money").textContent = item.money;
                if (item.avatar != ""){
                    console.log(item.avatar);
                    document.getElementById("avatar1").src = item.avatar;
                    document.getElementById("avatar2").src = item.avatar;
                }
                document.getElementById("user-info-name").textContent = item.name;
                document.getElementById("user-info-id").textContent = "ID: " + item._id;
                document.getElementById("joining-date").textContent = "Ngày tham gia: " + day + "-" + month + "-" + year;
            }
        })
    }
    document.getElementById("login-button").style.display = "none";
}

async function getRentedData(){
    const response = await fetch('/Data/Rented_persons');
    const result = await response.json();

    result.forEach(item => {
        if (item._id == rented_id){
            const Birthday = new Date(item.birthday);
            const year_birthday = Birthday.getFullYear();
            const month_birthday = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
            const day_birthday = Birthday.getDate().toString().padStart(2, '0');

            const Joing = new Date(item.joining_date);
            const year_joing = Joing.getFullYear();
            const month_joing = (Joing.getMonth() + 1).toString().padStart(2, '0'); 
            const day_joing = Joing.getDate().toString().padStart(2, '0');

            document.getElementById("user_name").textContent = item.name;
            document.getElementById("user_id").textContent = "ID: " + item._id;
            document.getElementById("user_avatar1").src = item.avatar;
            document.getElementById("user_avatar2").src = item.avatar;

            document.getElementById("pr_name").textContent = "Họ tên: " + item.name;
            document.getElementById("pr_birthday").textContent = "Ngày sinh: " + day_birthday + "-" + month_birthday + "-" + year_birthday;
            document.getElementById("pr_address").textContent = "Địa chỉ" + item.address;
            document.getElementById("pr_phone").textContent = "Số điện thoại: " +item.phone;
            document.getElementById("pr_email").textContent = "Email: " + item.email;
            document.getElementById("pr_joningDay").textContent = "Ngày đăng kí: " + day_joing + "-" + month_joing + "-" + year_joing;
            document.getElementById("pr_numberOfRentals").textContent = "Đã phục vụ: " + item.number_of_rentals;
            document.getElementById("pr_evaluate").textContent = "Đánh giá: " + item.evaluate + "⭐";
        }
    })
}

async function getLoggedInUser() {
    const response = await fetch('/Logged-In-User');
    const result = await response.json();

    if (result.loggedIn) {
      user_id = result.userId;
      user_role = result.type;
      setUpLogIn();
    } else {
      console.log('Không có user trên server');
    }
}

async function getRentedCurrent() {
    const response = await fetch('/Home/Rented_Current');
    const result = await response.json();

    if (result.rentedId != ""){
        rented_id = result.rentedId;
        getRentedData();
    }
}