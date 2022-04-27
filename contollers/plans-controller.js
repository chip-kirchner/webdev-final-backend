import * as plansDao from "../daos/plans-dao.js";

const getPlans = async (req, res) => {
    try{
        const plans = await plansDao.findAll();
        res.json(plans);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const getOnePlan = async (req, res) => {
    try {
        const planId = req.params.pid;
        const plan = await plansDao.findOne(planId);
        if (plan) {
            res.json(plan);
        } else {
            res.sendStatus(400);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const createPlan = async (req, res) => {
    const {plan} = req.body;
    const user = req.session['profile'];

    if (user) {
        const newPlan = {...plan, user: user};
        try{
            const response = await plansDao.createPlan(newPlan);
            res.json(response);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
}

const deletePlan = async (req, res) => {
    const {plan} = req.body;
    const response = await plansDao.deletePlan(plan);
    res.send(response);
}

const publishPlan = async (req, res) => {
    const {plan} = req.body;
    const user = req.session['profile'];
    try {
        const currentPlan = await plansDao.findOne(plan._id);
        if (user && currentPlan) {
            if(currentPlan.toObject().user.equals(user._id)) {
                const response = await plansDao.publishPlan(currentPlan._id);
                res.send(response);
                return;
            }
        }
        res.sendStatus(401);
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
}

const planController= (app) => {
    app.get("/api/plans", getPlans);
    app.get("/api/plans/:pid", getOnePlan);
    app.post("/api/plans", createPlan);
    app.delete("/api/plans", deletePlan);
    app.put("/api/plans/publish", publishPlan);
}

export default planController;