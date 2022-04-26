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
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(402);
    }
}

const deletePlan = async (req, res) => {
    res.send(200);
}

const publishPlan = async (req, res) => {
    res.send(200);
}