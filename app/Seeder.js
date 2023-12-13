const EventEmitter = require('events');
const { Teacher, Plans, Subscription, Student } = require('../database');

const eventEmitter = new EventEmitter();

const UserData = Array.from({ length: 50 }, (_, index) => {
 const role = index % 2 === 0 ? 'teach' : 'personal';
 const status = 'pending';
 return {
  name: 'test',
  number: `2010${generateRandomNumber(9)}`,
  email: generateRandomEmail(),
  status: status,
  role: role,
 };
});

function generateRandomEmail() {
 const emailProviders = [
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'example.com',
 ];
 const randomProvider =
  emailProviders[Math.floor(Math.random() * emailProviders.length)];
 const randomUsername = Math.random().toString(36).substring(7);
 return `${randomUsername}@${randomProvider}`;
}


function generateRandomNumber(length) {
 const min = 10 ** (length - 1);
 const max = 10 ** length - 1;
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.TeachersDataSeeder = async () => {
 for (const user of UserData) {
  const whatsExists = await Teacher.findOne({
   where: {
    whats_app: user.number,
   },
  });
  if (!whatsExists) {
   let monthes = '3';
   let chosedPlane = await Plans.findByPk(1);
   const newUser = await Teacher.create({
    name: `${user.name} Teacher`,
    whats_app: user.number,
    password: '12345678',
    email: user.email,
    status: user.status,
    is_active: user.status === 'active' ? 1 : 0,
    verify_date: new Date(),
    planId: 1,
    monthes: 3,
   });
   let price;
   if (monthes === '1') {
    price = chosedPlane.permonth;
   } else if (monthes === '3') {
    price = chosedPlane.per3month;
   } else if (monthes === '6') {
    price = chosedPlane.per6month;
   } else if (monthes === '12') {
    price = chosedPlane.per12month;
   }
   await Subscription.create({
    name: newUser.name,
    price: price,
    monthes: monthes,
    currency: chosedPlane.currency,
    is_active: false,
    is_free: false,
    first_register: true,
    TeacherId: newUser.id,
    PlanId: chosedPlane.id,
   });
   eventEmitter.emit('userCreated', newUser);
  }
 }
};
exports.StudentsDataSeeder = async () => {
 for (const user of UserData) {
  const whatsExists = await Student.findOne({
   where: {
    whats_app: user.number,
   },
  });
  if (!whatsExists) {
   let monthes = '3';
   let chosedPlane = await Plans.findByPk(1);
   const newUser = await Student.create({
    name: `${user.name} Student`,
    whats_app: user.number,
    password: '12345678',
    email: user.email,
    status: user.status,
    is_active: user.status === 'active' ? 1 : 0,
    verify_date: new Date(),
    planId: 1,
    monthes: 3,
   });
   let price;
   if (monthes === '1') {
    price = chosedPlane.permonth;
   } else if (monthes === '3') {
    price = chosedPlane.per3month;
   } else if (monthes === '6') {
    price = chosedPlane.per6month;
   } else if (monthes === '12') {
    price = chosedPlane.per12month;
   }
   await Subscription.create({
    name: newUser.name,
    price: price,
    monthes: monthes,
    currency: chosedPlane.currency,
    is_active: false,
    is_free: false,
    first_register: true,
    StudentId: newUser.id,
    PlanId: chosedPlane.id,
   });
   eventEmitter.emit('userCreated', newUser);
  }
 }
};

// Example of using the event
eventEmitter.on('userCreated', (newUser) => {
 // eslint-disable-next-line no-console
 console.log(`User created: ${newUser.name}`);
});
