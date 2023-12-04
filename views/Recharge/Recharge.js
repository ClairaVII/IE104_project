var UserId = null;
var NewMoneyValue = 0;
var OldMoneyValue = 0;
 
getLoggedInUser();

function checkPlayerId() {
    var Flag_er = 1;
    //lấy giá trị vừa nhập
    var playerId = document.getElementById("playerId").value;

    // kiểm tra id trên server
    fetch('/Data/Renters')
    .then(response => response.json())
    .then(data => {
      // data là một mảng chứa các đối tượng, trong trường hợp này chỉ có một đối tượng
      data.forEach(item => {
        if (playerId == item._id) {
          document.getElementById("Message").textContent = item.name;
          document.getElementById("methodSelection").style.display = "flex";
          Flag_er = 0;
            UserId = item._id;
            OldMoneyValue = item.money;
        }
    });
    })
    .catch(error => console.error('Error fetching data:', error));
      
    if (Flag_er == 1){
      document.getElementById("Message").textContent = 'Tài khoản không tồn tại!';
    }
  }

  function showPaymentOptions() {
    var selectedMethod = document.getElementById("paymentMethod").value;

    if (selectedMethod === "card") {
      document.getElementById("cardAmounts").style.display = "flex";
      document.getElementById("atmOptions").style.display = "none";
    } else if (selectedMethod === "atm") {
      document.getElementById("atmOptions").style.display = "flex";
      document.getElementById("cardAmounts").style.display = "none";
    }
  }

  function generateQRCode() {
    document.getElementById("qrCode").style.display = "flex";

    NewMoneyValue = document.getElementById("atmAmount").value;

    // Simulate generating QR code on the server
    var qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent('http://192.168.105.49:3000/Confirm-QR');
    
    document.getElementById("qrCodeImage").src = qrCodeUrl;
    document.getElementById("qrCode").style.display = "flex";
    document.getElementById("successMessage").textContent = "Quét mã QR để thanh toán.";

    fetch('/Recharge/QR', {
      method: 'POST',
      headers: {
        'Content-Type': 'ID_client',
      },
      body: '',
    })
      .then(response => response.json())
      .then(data => {})
      .catch(error => {console.error('Lỗi khi gửi tín hiệu xác nhận:', error);});

    checkConfirmation();
  }
  
  function checkConfirmation() {
    fetch('/Recharge/Data-QR')
      .then(response => response.json())
      .then(data => {
        if (data.confirmation == 1) {
          Payment_successful();
        } 
        else if (data.confirmation == -1){
          Payment_failed();
        }
        else {
          // Nếu chưa xác nhận, tiếp tục kiểm tra sau 1 giây
          setTimeout(checkConfirmation, 1000);
        }
      })
      .catch(error => {
        console.error('Lỗi khi kiểm tra xác nhận:', error);
      });
  }

  function Payment_successful() { 
    var NewMoney = parseInt(NewMoneyValue, 10);
    NewMoney += OldMoneyValue;
  
    fetch('/Recharge/UpdateMoney', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: UserId, money: NewMoney})
    })
      
    Swal.fire({
      title: 'Thanh toán thành công!',
      text: 'Chọn hành động:',
      showCancelButton: true,
      confirmButtonText: 'Trang chủ',
      cancelButtonText: 'Tiếp tục nạp'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "http://localhost:3000";
      } else {
        window.location.href = "http://localhost:3000/Recharge";
      }
    });
  }

  function Payment_failed() {
    Swal.fire({
      title: 'Thanh toán quá hạn!',
      text: 'Chọn hành động:',
      showCancelButton: true,
      confirmButtonText: 'Trang chủ',
      cancelButtonText: 'Tiếp tục nạp'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "http://localhost:3000";
      } else {
        window.location.href = "http://localhost:3000/Recharge";
      }
    });
  }

  function Check_seri(){
    NewMoneyValue = document.getElementById("cardAmount").value;
    var cardSerial = document.getElementById("cardSerial").value;

    if (cardSerial.trim() === "") {
      document.getElementById("Message_card").textContent = 'Vui lòng nhập số seri của thẻ!';
      return;
    }

    document.getElementById("Message_card").textContent = 'Đã nhận số seri của thẻ!';
    Payment_successful();
  }

  function adjustUserInfo(){
    window.location.href = "http://localhost:3000/Infor";
  }

  function redirectToRecharge(){
    window.location.href = "http://localhost:3000/Recharge";
}

async function setUpLogIn(){
  document.getElementById("login_button").style.display = "none";
  if (user_role == "renter"){
      const response = await fetch('/Data/Renters');
      const result = await response.json();
      document.getElementById("tools-button").style.display = "flex";
      // document.getElementById("chat").style.display = "flex";
      document.getElementById("recharge-button").style.display = "flex";
      result.forEach(item => {
          if (item._id == user_id){
              const Joning_day = new Date(item.joining_date);
              const year_j = Joning_day.getFullYear();
              const month_j = (Joning_day.getMonth() + 1).toString().padStart(2, '0'); 
              const day_j = Joning_day.getDate().toString().padStart(2, '0');

              document.getElementById("money").textContent = item.money;
              if (item.avatar != ''){
                  document.getElementById("avatar1").src = item.avatar;
                  document.getElementById("avatar2").src = item.avatar;
              }
              document.getElementById("user-info-name").textContent = item.name;
              document.getElementById("user-info-id").textContent = "ID: " + item._id;
              document.getElementById("joining-date").textContent = "Ngày tham gia: " + day_j + "-" + month_j + "-" + year_j;

              const Birthday = new Date(item.birthday);
              const year_b = Birthday.getFullYear();
              const month_b = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
              const day_b = Birthday.getDate().toString().padStart(2, '0');
              const adjust_birthday = year_b + '-' + month_b + '-' + day_b;
              document.getElementById("adjust_name").value = item.name;
              document.getElementById("adjust_gender").value = item.gender;
              document.getElementById("adjust_birthday").value = adjust_birthday;
              document.getElementById("adjust_phone").value = item.phone;
              document.getElementById("adjust_address").value = item.address;
          }
      })
  }
  else {
      const response = await fetch('/Data/Rented_persons');
      const result = await response.json();
      document.getElementById("tools-button").style.display = "flex";
      // document.getElementById("chat").style.display = "flex";
      document.getElementById("wallet_id").style.display = "flex";
      result.forEach(item => {
          if (item._id == user_id){
              const Joning_day = new Date(item.joining_date);
              const year_j = Joning_day.getFullYear();
              const month_j = (Joning_day.getMonth() + 1).toString().padStart(2, '0'); 
              const day_j = Joning_day.getDate().toString().padStart(2, '0');

              document.getElementById("money").textContent = item.money;
              if (item.avatar != ''){
                  document.getElementById("avatar1").src = item.avatar;
                  document.getElementById("avatar2").src = item.avatar;
              }
              document.getElementById("user-info-name").textContent = item.name;
              document.getElementById("user-info-id").textContent = "ID: " + item._id;
              document.getElementById("joining-date").textContent = "Ngày tham gia: " + day_j + "-" + month_j + "-" + year_j;

              const Birthday = new Date(item.birthday);
              const year_b = Birthday.getFullYear();
              const month_b = (Birthday.getMonth() + 1).toString().padStart(2, '0'); 
              const day_b = Birthday.getDate().toString().padStart(2, '0');
              const adjust_birthday = year_b + '-' + month_b + '-' + day_b;
              document.getElementById("adjust_name").value = item.name;
              document.getElementById("adjust_gender").value = item.gender;
              document.getElementById("adjust_birthday").value = adjust_birthday;
              document.getElementById("adjust_phone").value = item.phone;
              document.getElementById("adjust_address").value = item.address;

              //đăng kí thêm dịch vụ
              item.service.forEach(sv => {
                  updateServiceInPage_add(sv);
              })
          }
      })
  }
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

async function redirectToHome(interact){
  const response = await fetch('/Order/interactHome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ interact: interact })
  });

  window.location.href = "http://localhost:3000";
}

async function lognout() {
  const response = await fetch('/Logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: null, type: null })
  });
  window.location.href = "http://localhost:3000";
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

getTopStar();
async function getTopStar(){
    const response = await fetch('/Data/Rented_persons');
    const data = await response.json();
    var rented = [];

    data.forEach(item => {
        rented.push(item._id);
    })

    rented.sort((a, b) => b - a);

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



