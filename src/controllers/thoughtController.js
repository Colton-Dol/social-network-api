import { User, Thought } from '../models/index.js';

export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );

        if (!user) {
            res
            .status(404)
            .json({ message: 'Thought created, but found no user with that ID' });
        } else {
            res.json('Thought created!');
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought with that id.' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'No thought with that id' });
        }

        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );

        if (!user) {
            res
            .status(404)
            .json({ message: 'Thought created, but no user with that id' });
        }

        res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
        res.status(500).json(err)
    }
}

export const addThoughtReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )

        if (!thought) {
            res.status(404).json({ message: 'No thought with that id' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const removeThoughtReaction = async (req, res)=> {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought with that id' });
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
}