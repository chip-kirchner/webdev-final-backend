import * as usersDao from "../daos/users-dao.js";


const signup = async (req, res) => {
    const credentials = req.body;
    const existingUser = await usersDao.findUserByEmail(credentials.email);
    console.log(existingUser);
    if (existingUser) {
        return res.sendStatus(403);
    } else {
        const newUser = await usersDao.createUser(credentials);
        req.session['profile'] = newUser
        res.json(newUser);
    }
}

const login = async (req, res) => {
    const credentials = req.body;
    const profile = await usersDao.findUserByCredentials(credentials.email, credentials.password);
    if (profile) {
        req.session['profile'] = profile;
        res.json(profile);
        return;
    } else {
        res.sendStatus(403);
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
}

const profile = async (req, res) => {
    const profile = req.session['profile'];
    if (profile) {
        res.json(profile);
    } else {
        res.sendStatus(503);
    }
}

const authController = (app) => {
    app.post("/api/signup", signup);
    app.post("/api/login", login);
    app.post("/api/logout", logout);
    app.post("/api/profile", profile);
}
export default authController;