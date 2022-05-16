import { connect } from 'mongoose';
import { User } from './User';

connect('mongodb://127.0.0.1:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Connected to the database');
}).catch(() => {
    console.log('Something went wrong when conecting to the database');
});

const user = new User({
    name: 'cristian',
    surname: 'alvarez rguez',
    age: 18,
    email: 'cristian@gmail.com',
    password: '1234',
});

const addUser = (user) => {
    return new Promise<string>((resolve, reject) => {
        user.save().then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

const removeUser = (email: string) => {
    return new Promise<string>((resolve, reject) => {
        User.deleteOne({ email: email }).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

const updateUser = (user, id) => {
    return new Promise<string>((resolve, reject) => {
        User.updateOne({ _id: id }).set(user).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getUser = (id) => {
    return new Promise<string>((resolve, reject) => {
        User.findOne({ _id: id }).then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};

addUser(user).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

removeUser('orlando@gmail.com').then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

getUser('62821c86aa9c6735f80a62d5').then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});