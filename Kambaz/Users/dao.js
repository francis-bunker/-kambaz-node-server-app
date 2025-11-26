import db from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function UsersDAO() {
    let { users } = db;
    const findUsersByPartialName = (partialName) => {
        const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
        return model.find({
            $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
        });
    };
    const findAllUsers = () => model.find();
    const findUserById = (userId) => model.findById(userId);
    const findUserByUsername = (username) => model.findOne({ username: username });
    const findUserByCredentials = (username, password) => model.findOne({ username, password });
    const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user }); const findUsersByRole = (role) => model.find({ role: role });
    const deleteUser = (userId) => model.findByIdAndDelete(userId);
    const createUser = (user) => {
        const newUser = { ...user, _id: uuidv4() };
        return model.create(newUser);
    }
    return { createUser, findAllUsers, findUserById, findUserByUsername, findUserByCredentials, updateUser, deleteUser, findUsersByRole, findUsersByPartialName, };
}
