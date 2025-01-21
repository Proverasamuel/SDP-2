const User = require('../models/User');

exports.createUser = (data) => new User(data).save();
exports.getUsers = () => User.find();
exports.getUserById = (id) => User.findById(id);
exports.updateUser = (id, data) => User.findByIdAndUpdate(id, data, { new: true });
exports.deleteUser = (id) => User.findByIdAndDelete(id);
