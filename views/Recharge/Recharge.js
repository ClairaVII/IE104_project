var Rent = require('../models/renters');

var UserId = null;
var NewMoneyValue = 0;
var OldMoneyValue = 0;

async function updateMoneyById(UserId, NewMoney) {
    try {
  
      const result = await Rent.updateMany(
        { _id: UserId },
        { $set: { money: NewMoney } }
      );
  
      console.log(`Cập nhật xu id ${UserId} thành ${NewMoney}`);
    } catch (error) {
      console.error('lỗi cập nhật xu:', error.message);
    }
  }

function checkPlayerId() {
    var Flag_er = 1;
    //lấy giá trị vừa nhập
    var playerId = document.getElementById("playerId").value;

    // kiểm tra id trên server
    fetch('/data')
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
    var qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent('http://localhost:3000/Confirm-QR');
    
    document.getElementById("qrCodeImage").src = qrCodeUrl;
    document.getElementById("qrCode").style.display = "block";
    document.getElementById("successMessage").textContent = "Quét mã QR để thanh toán.";

    fetch('/QR', {
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
    fetch('/data-QR')
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
    updateMoneyById(UserId, NewMoney);

    Swal.fire({
      title: 'Thanh toán thành công!',
      text: 'Chọn hành động:',
      showCancelButton: true,
      confirmButtonText: 'Đi sang trang Home',
      cancelButtonText: 'Tiếp tục nạp tiền'
    }).then((result) => {
      if (result.isConfirmed) {
        alert("Đi sang trang Home!");
      } else {
        Continue_pay();
      }
    });
  }

  function Payment_failed() {
    Swal.fire({
      title: 'Thanh toán quá hạn!',
      text: 'Chọn hành động:',
      showCancelButton: true,
      confirmButtonText: 'Đi sang trang Home',
      cancelButtonText: 'Tiếp tục nạp tiền'
    }).then((result) => {
      if (result.isConfirmed) {
        alert("Đi sang trang Home!");
      } else {
        Continue_pay();
      }
    });
  }

  function Continue_pay(){
    document.getElementById("qrCode").style.display = "none";
    document.getElementById("atmOptions").style.display = "none";
    document.getElementById("cardAmounts").style.display = "none";
    document.getElementById("methodSelection").style.display = "none";
    var selectElement = document.getElementById("paymentMethod");
    selectElement.value = "none";
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

