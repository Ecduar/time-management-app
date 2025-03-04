class ActivityController {
    static activities = [];

    static listActivities(req, res) {
        res.render('activities', { activities: ActivityController.activities });
    }

    static addActivity(req, res) {
        const activity = req.body;
        ActivityController.activities.push(activity);
        res.status(201).send('Activity added');
    }

    static getActivity(req, res) {
        const activityId = req.params.id;
        const activity = ActivityController.activities.find(a => a.id === activityId);
        if (activity) {
            res.render('activityDetail', { activity });
        } else {
            res.status(404).send('Activity not found');
        }
    }

    static updateActivity(req, res) {
        const activityId = req.params.id;
        const activityIndex = ActivityController.activities.findIndex(a => a.id === activityId);
        if (activityIndex !== -1) {
            ActivityController.activities[activityIndex] = { ...ActivityController.activities[activityIndex], ...req.body };
            res.send('Activity updated');
        } else {
            res.status(404).send('Activity not found');
        }
    }

    static deleteActivity(req, res) {
        const activityId = req.params.id;
        ActivityController.activities = ActivityController.activities.filter(a => a.id !== activityId);
        res.send('Activity deleted');
    }
}

module.exports = ActivityController;