var UserId = null;
var NewMoneyValue = 0;
var OldMoneyValue = 0;
 
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


