import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { usernames, getRandomUsername, getRandomThought } from './data.js';

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    let thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck?.length) {
        await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db?.listCollections({ name: 'users'}).toArray();
    if (userCheck?.length) {
        await connection.dropCollection('users');
    }

    const users = [];
    const thoughts = getRandomThought(5);

    await Thought.insertMany(thoughts);
    const thoughtData = await Thought.find({});

    for (let i = 0; i < 10; i++) {
        const username = usernames[i];
        const email = `${username.toLowerCase()}@gmail.com`;
        const userThoughts = thoughtData.find((thought) => thought.username === username);

        if (userThoughts !== undefined) {
            users.push({
                username,
                email,
                thoughts: userThoughts._id
            });   
        } else {
            users.push({
                username,
                email
            });
        }
    }

    await User.insertMany(users);

    console.table(users);
    console.table(thoughts);
    console.info(`-------Seeding complete!-------`);
    process.exit(0);
})