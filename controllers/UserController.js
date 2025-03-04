class UserController {
    static users = [];

    static listUsers(req, res) {
        res.render('users', { users: UserController.users });
    }

    static addUser(req, res) {
        const user = req.body;
        UserController.users.push(user);
        res.status(201).send('User added');
    }

    static getUser(req, res) {
        const userId = req.params.id;
        const user = UserController.users.find(u => u.id === userId);
        if (user) {
            res.render('userDetail', { user });
        } else {
            res.status(404).send('User not found');
        }
    }

    static updateUser(req, res) {
        const userId = req.params.id;
        const userIndex = UserController.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            UserController.users[userIndex] = { ...UserController.users[userIndex], ...req.body };
            res.send('User updated');
        } else {
            res.status(404).send('User not found');
        }
    }

    static deleteUser(req, res) {
        const userId = req.params.id;
        UserController.users = UserController.users.filter(u => u.id !== userId);
        res.send('User deleted');
    }
}

module.exports = UserController;