class HabitController {
    static habits = [];

    static listHabits(req, res) {
        res.render('habits', { habits: HabitController.habits });
    }

    static addHabit(req, res) {
        const habit = req.body;
        HabitController.habits.push(habit);
        res.status(201).send('Habit added');
    }

    static getHabit(req, res) {
        const habitId = req.params.id;
        const habit = HabitController.habits.find(h => h.id === habitId);
        if (habit) {
            res.render('habitDetail', { habit });
        } else {
            res.status(404).send('Habit not found');
        }
    }

    static updateHabit(req, res) {
        const habitId = req.params.id;
        const habitIndex = HabitController.habits.findIndex(h => h.id === habitId);
        if (habitIndex !== -1) {
            HabitController.habits[habitIndex] = { ...HabitController.habits[habitIndex], ...req.body };
            res.send('Habit updated');
        } else {
            res.status(404).send('Habit not found');
        }
    }

    static deleteHabit(req, res) {
        const habitId = req.params.id;
        HabitController.habits = HabitController.habits.filter(h => h.id !== habitId);
        res.send('Habit deleted');
    }
}

module.exports = HabitController;