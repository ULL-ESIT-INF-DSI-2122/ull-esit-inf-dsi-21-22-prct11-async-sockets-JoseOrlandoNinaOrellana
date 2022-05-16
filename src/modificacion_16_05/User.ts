import { model, Schema } from 'mongoose';
import isEmail from '../../node_modules/@types/validator';

interface UserDocumentInterface extends Document {
    name: string,
    surname: string,
    age: number,
    email: string,
    password: string,
}

const UserSchema = new Schema<UserDocumentInterface>({
    name: {
        type: String,
        require: true,
    },
    surname: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
        /*validate: (value: string) => {
            if(!isEmail(value)) {
                throw new Error('Incorret email');
            }
        },*/
    },
    password: {
        type: String,
        require: true,
    },
});

export const User = model('User', UserSchema);