import User from "../models/userModel.js";

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to get user" });
    }
};

// Create a new User
export const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = await User.create({ username, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to create user" });
    }
};
