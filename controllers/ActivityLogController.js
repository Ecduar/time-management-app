class ActivityLogController {
    static activityLogs = [];

    static listActivityLogs(req, res) {
        res.render('activity-logs', { activityLogs: ActivityLogController.activityLogs });
    }

    static addActivityLog(req, res) {
        const activityLog = req.body;
        ActivityLogController.activityLogs.push(activityLog);
        res.status(201).send('Activity log added');
    }

    static getActivityLog(req, res) {
        const logId = req.params.id;
        const activityLog = ActivityLogController.activityLogs.find(l => l.id === logId);
        if (activityLog) {
            res.render('activityLogDetail', { activityLog });
        } else {
            res.status(404).send('Activity log not found');
        }
    }

    static updateActivityLog(req, res) {
        const logId = req.params.id;
        const logIndex = ActivityLogController.activityLogs.findIndex(l => l.id === logId);
        if (logIndex !== -1) {
            ActivityLogController.activityLogs[logIndex] = { ...ActivityLogController.activityLogs[logIndex], ...req.body };
            res.send('Activity log updated');
        } else {
            res.status(404).send('Activity log not found');
        }
    }

    static deleteActivityLog(req, res) {
        const logId = req.params.id;
        ActivityLogController.activityLogs = ActivityLogController.activityLogs.filter(l => l.id !== logId);
        res.send('Activity log deleted');
    }
}

module.exports = ActivityLogController;