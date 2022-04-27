import * as usersDao from "../daos/users-dao.js";

const signup = async (req, res) => {
    const credentials = req.body;
    const existingUser = await usersDao.findUserByEmail(credentials.email);
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
        res.sendStatus(402);
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
        res.sendStatus(401);
    }
}

const updateProfile = async (req, res) => {
    const oldProfile = req.session['profile'];
    const {profile} = req.body;
    if (oldProfile && profile) {
        try {
            const newProfile = {...oldProfile, ...profile};
            const response = await usersDao.updateUser(oldProfile._id, newProfile);
            req.session['profile'] = response;
            res.json(response);
        } catch (e) {
            res.sendStatus(503);
        }
    } else {
        res.sendStatus(401);
    }
}

const authController = (app) => {
    app.post("/api/signup", signup);
    app.post("/api/login", login);
    app.post("/api/logout", logout);
    app.post("/api/profile", profile);
    app.put("/api/profile/update", updateProfile);
}
export default authController;