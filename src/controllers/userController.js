import { User } from '../models/index.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user with this id' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: 'No user with that id' });
        }

        res.json({ message: 'User successfully deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
}

export const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user with that id' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const removeFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { _id: req.params.friendId } } },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user with that id' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);   
    }
}