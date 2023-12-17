const EventEmitter = require('events');
const { User } = require('../database');

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
exports.CreateUser = async (data) => {
    const newUser = await User.create(data)
    eventEmitter.emit('userCreated', newUser);
    return newUser
};

// Example of using the event
eventEmitter.on('userCreated', (newUser) => {
    // eslint-disable-next-line no-console
    console.log(`User created: ${newUser.username}`);
});
