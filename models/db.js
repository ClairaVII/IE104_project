const mongoose = require("mongoose"); //Thư viện kết nối database nosql mongodb

//license
mongoose.connect('mongodb+srv://vanle246811:000999888@cluster0.ehghzeg.mongodb.net/IE104', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Connect MongoDB
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected");
});

/*const User = require('../models/rented_persons'); 
   const dummyUser = {
     name: 'Bảo Vy',
     birthday: new Date('2001-8-04'),
     gender: 'Female',
     address: 'Thanh Hóa',
     phone: '09849307307',
     email: 'BV123@gmail.com',
     joining_date: new Date(),
     evaluate: 4.73,
     number_of_rentals: 102,
     service: ['6558bafe119a10741addee4d'],
     password:'BV123',
     avatar: 'https://data-resize.lita.cool/user/9837505/album/photo_20231109_173344_310_R45502.jpg.resize/299*'
   };
//   /////////### Add record/// thêm thằng thông dô db
User.create(dummyUser)
.then((createdUser) => {
  console.log('Dummy data inserted successfully:', createdUser);
})
.catch((err) => {
  console.error('Error inserting dummy data:', err);
}); */

/*const User = require('../models/renters'); 
   const dummyUser = {
     name: 'Huy',
     birthday: new Date('2002-12-23'),
     gender: 'Male',
     address: 'Quãng Ngải',
     phone: '09800022200',
     email: 'tung12345@gmail.com',
     joining_date: new Date(),
     money: 0,
     rented_object: []
   };
//   /////////### Add record/// thêm thằng thông dô db
User.create(dummyUser)
.then((createdUser) => {
  console.log('Dummy data inserted successfully:', createdUser);
})
.catch((err) => {
  console.error('Error inserting dummy data:', err);
}); */

/*const User = require('./rented_persons'); 
   const dummyUser = {
     name: 'Hồ Khả Trình',
     birthday: new Date('2002-4-1'),
     gender: 'Male',
     address: 'Phú Yên',
     phone: '098111111',
     email: 'trinhfuckboy@gmail.com',
     joining_date: new Date(),
     evaluate: 0,
     number_of_rentals: 0,
     service: [],
     status: 'available',
     date_available: 6
   };
  /////////### Add record/// thêm thằng thông dô db
User.create(dummyUser)
.then((createdUser) => {
  console.log('Dummy data inserted successfully:', createdUser);
})
.catch((err) => {
  console.error('Error inserting dummy data:', err);
});*/
