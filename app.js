const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const habitsRouter = require('./routes/habits');
const activitiesRouter = require('./routes/activities');
const projectsRouter = require('./routes/projects');
const categoriesRouter = require('./routes/categories');
const activityLogsRouter = require('./routes/activity-logs');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/habits', habitsRouter);
app.use('/activities', activitiesRouter);
app.use('/projects', projectsRouter);
app.use('/categories', categoriesRouter);
app.use('/activity-logs', activityLogsRouter);

module.exports = app;