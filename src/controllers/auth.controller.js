const register = (req, res) => {
    res.status(201).send("Register");
};

const login = (req, res) => {
    res.status(201).send("Login");
};

module.exports = { register, login };