var express = require('express');
var router = express.Router();
var Renter = require('../models/renters')
const path = require('path');

var confirmationSignal = -1;
/* GET home page. */
// Hàm xóa route
function removeRoute(routePath) {
  const removedRoutes = router.stack.filter(layer => {
    return layer.route && layer.route.path === routePath;
  });

  removedRoutes.forEach(route => {
    router.stack.splice(router.stack.indexOf(route), 1);
  });

  console.log(`Route ${routePath} đã bị xóa.`);
}

const currentDirectory = path.basename(__dirname);
const customDirectory = path.resolve(__dirname, '../views/Home/Code');
router.get('/', (req, res) => {
  res.sendFile(path.join(customDirectory, 'index.html'));
});

router.get('/data', async (req, res) => {
  try {
    const data = await Renter.find({}); // Lấy dữ liệu từ database
    res.json(data); // Gửi dữ liệu dưới dạng JSON về client
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/QR', (req, res) => {
  confirmationSignal = 0;

  router.get('/Confirm-QR', (req, res) => {
    res.sendFile(path.join(customDirectory, 'Confirm_QR.html'));
    // Xóa route sau 2 phút
    setTimeout(() => {
      removeRoute('/Confirm-QR');
    }, 30 * 1000); // 2 phút
  });

  router.get('/data-QR', (req, res) => {
    res.json({confirmation: confirmationSignal});
  });

  setTimeout(() => {
    confirmationSignal = -1;
  }, 30 * 1000); // 2 phút
});

router.post('/confirm', (req, res) => {
  confirmationSignal = 1;
  res.json({ success: true});
});

module.exports = router;
