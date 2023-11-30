var express = require('express');
var session = require('express-session');
var router = express.Router();
var Renter = require('../models/renters')
var Rented = require('../models/rented_persons')
var Service = require('../models/services')
const path = require('path');

var confirmationSignal = -1;
var time = 0;
/* GET home page. */
//----------function----------
function removeRoute(routePath) {
  router.stack.forEach((layer, index, stack) => {
    if (layer.route && layer.route.path === routePath && layer.route.methods.get) {
        stack.splice(index, 1); // Remove the route from the stack
    }
  });

  console.log(`Route ${routePath} đã bị xóa.`);
}

async function updateMoneyById(ID_client, NewMoneyValue) {
  const filter = { _id: ID_client };
  const update = { $set: { money: NewMoneyValue } };

  const result = await Renter.updateMany(filter, update);
  console.log(`${result.modifiedCount} documents were updated`);
}

//----------Send full html----------
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/Home/Home.html'));
});

router.get('/Recharge', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/Recharge/Recharge.html'));
});

router.get('/Order', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/player_orderConfirmation/Order.html'));
});

router.get('/Infor', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/Change_info/Infor.html'));
});

//----------Get database----------
router.get('/Data/Renters', async (req, res) => {
  try {
    const data = await Renter.find({}); // Lấy dữ liệu từ database
    res.json(data); // Gửi dữ liệu dưới dạng JSON về client
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/Data/Rented_persons', async (req, res) => {
  try {
    const data = await Rented.find({}); // Lấy dữ liệu từ database
    res.json(data); // Gửi dữ liệu dưới dạng JSON về client
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/Data/Services', async (req, res) => {
  try {
    const data = await Service.find({}); // Lấy dữ liệu từ database
    res.json(data); // Gửi dữ liệu dưới dạng JSON về client
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//----------session----------
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

router.use(express.json());

router.post('/Login', (req, res) => {
  const userId = req.body.userId;
  const type = req.body.type;

  if (userId) {
    req.session.userId = userId;
    req.session.type = type;
    res.send('Đăng nhập thành công');
  } else {
    res.status(400).send('Thiếu thông tin đăng nhập');
  }
});

router.get('/Logged-In-User', (req, res) => {
  const loggedInUser = req.session.userId;
  const typeInUser = req.session.type;

  if (loggedInUser) {
    res.json({ loggedIn: true, type: typeInUser, userId: loggedInUser });
  } else {
    res.json({ loggedIn: false });
  }
});

//----------Recharge----------

router.get('/Recharge/data-QR', (req, res) => {
    res.json({confirmation: confirmationSignal});
  });

router.post('/Recharge/Confirm', (req, res) => {
  confirmationSignal = 1;
  res.json({ success: true});
});

router.post('/Recharge/QR', async (req, res) => {
  confirmationSignal = 0;
  time = 0;

  router.get('/Recharge/Confirm-QR', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/Recharge/Confirm_QR.html'));
  });

  var waitPay = setInterval(() => {  //sau 30s không thanh toán thì thanh toán không thành công
    time = time + 1;
    if (time == 30){
      confirmationSignal = -1;
      removeRoute('/Recharge/Confirm-QR'); // Xóa route sau 2 phút
      clearInterval(waitPay);
    }
    else if (confirmationSignal == 1){
      removeRoute('/Recharge/Confirm-QR');
      clearInterval(waitPay);
    }
  }, 1000); // 30 giây
});

router.post('/Recharge/UpdateMoney', (req, res) => {
  const _id = req.body._id;
  const NewMoney = req.body.money;
  updateMoneyById(_id, NewMoney);
});




module.exports = router;
