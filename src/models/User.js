import { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /\S+@\S+\.\S+/
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
});

const users = model('users', userSchema);

export default users;