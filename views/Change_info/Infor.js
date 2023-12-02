var user_id = null;
var user_role = null;
getLoggedInUser();

const info = document.querySelector('.info');
const wallet = document.querySelector('.wallet');
const changePass = document.querySelector('.change-pass');
const logout = document.querySelector('.logout');

const infoDisplay = 'flex';
const walletDisplay = 'flex';
const changePassDisplay = 'flex';

const editProfileSection = document.querySelector('.edit-profile');
const walletInfoSection = document.querySelector('.wallet-info');
const changePasswordSection = document.querySelector('.change-password');

info.classList.add('selected-li');
        
walletInfoSection.style.display = 'none';
changePasswordSection.style.display = 'none';

info.addEventListener('click', function () {
    info.classList.add('selected-li');
    wallet.classList.remove('selected-li');
    changePass.classList.remove('selected-li');
    editProfileSection.style.display = infoDisplay;
    walletInfoSection.style.display = 'none';
    changePasswordSection.style.display = 'none';
});

wallet.addEventListener('click', function () {
    info.classList.remove('selected-li');
    wallet.classList.add('selected-li');
    changePass.classList.remove('selected-li');
    editProfileSection.style.display = 'none';
    walletInfoSection.style.display = walletDisplay;
    changePasswordSection.style.display = 'none';
});
        
changePass.addEventListener('click', function () {
    info.classList.remove('selected-li');
    wallet.classList.remove('selected-li');
    changePass.classList.add('selected-li');
    editProfileSection.style.display = 'none';
    walletInfoSection.style.display = 'none';
    changePasswordSection.style.display = changePassDisplay;
});

logout.addEventListener('click', function () {
});

function updateServiceInPage_add(sv){
    if (sv == '6558bafe119a10741addee4d'){
        document.getElementById("LMHT").style.display = "flex";
        document.getElementById("img_LMHT").style.display = "none";
    }
    else if (sv == '6558bb3c119a10741ade0c94'){
        document.getElementById("PUBG").style.display = "flex";
        document.getElementById("img_PUBG").style.display = "none";
    }
    else if (sv == '6566122c36d1e73951e9d381'){
        document.getElementById("NARAKA").style.display = "flex";
        document.getElementById("img_NARAKA").style.display = "none";
    }
    else if (sv == '6566124436d1e73951e9d382'){
        document.getElementById("LQM").style.display = "flex";
        document.getElementById("img_LQM").style.display = "none";
    }
    else if (sv == '6566128036d1e73951e9d383'){
        document.getElementById("CSGO").style.display = "flex";
        document.getElementById("img_CSGO").style.display = "none";
    }
}

function updateServiceInPage_sub(sv){
    if (sv == '6558bafe119a10741addee4d'){
        document.getElementById("LMHT").style.display = "none";
        document.getElementById("img_LMHT").style.display = "flex";
    }
    else if (sv == '6558bb3c119a10741ade0c94'){
        document.getElementById("PUBG").style.display = "none";
        document.getElementById("img_PUBG").style.display = "flex";
    }
    else if (sv == '6566122c36d1e73951e9d381'){
        document.getElementById("NARAKA").style.display = "none";
        document.getElementById("img_NARAKA").style.display = "flex";
    }
    else if (sv == '6566124436d1e73951e9d382'){
        document.getElementById("LQM").style.display = "none";
        document.getElementById("img_LQM").style.display = "flex";
    }
    else if (sv == '6566128036d1e73951e9d383'){
        document.getElementById("CSGO").style.display = "none";
        document.getElementById("img_CSGO").style.display = "flex";
    }
}

async function setUpLogIn(){
    if (user_role == "renter"){
        const response = await fetch('/Data/Renters');
        const result = await response.json();
        document.getElementById("tools-button").style.display = "flex";
        document.getElementById("chat").style.display = "flex";
        document.getElementById("recharge-button").style.display = "flex";
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
    document.getElementById("login-button").style.display = "none";
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

function change_infor(){
    var link_img = document.getElementById("link_img").value;
    var adjust_name = document.getElementById("adjust_name").value;
    var adjust_gender = document.getElementById("adjust_gender").value;
    var adjust_birthday = document.getElementById("adjust_birthday").value;
    var adjust_phone = document.getElementById("adjust_phone").value;
    var adjust_address = document.getElementById("adjust_address").value;

    fetch('Infor/updateInfor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: user_id, link_img: link_img, adjust_name: adjust_name, adjust_gender: adjust_gender, adjust_birthday: adjust_birthday, adjust_phone: adjust_phone, adjust_address: adjust_address, role: user_role})
      })
}

async function lognout() {
    const response = await fetch('/Logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: null, type: null })
    });

    document.getElementById("tools-button").style.display = "none";
    document.getElementById("chat").style.display = "none";
    document.getElementById("recharge-button").style.display = "none";
    document.getElementById("login-button").style.display = "flex";

    window.location.href = "http://localhost:3000";
}

async function addService(ID, update){
    console.log(ID);
    console.log(update);
    const response = await fetch('/Infor/updateService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ serviceId: ID, update: update})
      });
}

function confirmChange(Number) {
    var serviceId = null;
    
    if (Number == 1){serviceId = '6558bafe119a10741addee4d'}
    else if (Number == 2){serviceId = '6558bb3c119a10741ade0c94'}
    else if (Number == 3){serviceId = '6566122c36d1e73951e9d381'}
    else if (Number == 4){serviceId = '6566124436d1e73951e9d382'}
    else {serviceId = '6566128036d1e73951e9d383'}

    var result = confirm("Bạn có chắc chắn muốn thay đổi không?");
    if (result) {
        alert('Thay đổi thành công');
        addService(serviceId, 'add');
        updateServiceInPage_add(serviceId);
    } else {
        alert('Hủy thành công');
    }
}

function confirmDelete(Number) {
    var serviceId = null;
    
    if (Number == 1){serviceId = '6558bafe119a10741addee4d'}
    else if (Number == 2){serviceId = '6558bb3c119a10741ade0c94'}
    else if (Number == 3){serviceId = '6566122c36d1e73951e9d381'}
    else if (Number == 4){serviceId = '6566124436d1e73951e9d382'}
    else {serviceId = '6566128036d1e73951e9d383'}

    var result = confirm("Bạn có chắc chắn muốn thay đổi không?");
    if (result) {
        alert('Thay đổi thành công');
        addService(serviceId, 'sub');
        updateServiceInPage_sub(serviceId);
    } else {
        alert('Hủy thành công');
    }
}