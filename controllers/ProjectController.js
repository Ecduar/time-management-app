class ProjectController {
    static projects = [];

    static listProjects(req, res) {
        res.render('projects', { projects: ProjectController.projects });
    }

    static addProject(req, res) {
        const project = req.body;
        ProjectController.projects.push(project);
        res.status(201).send('Project added');
    }

    static getProject(req, res) {
        const projectId = req.params.id;
        const project = ProjectController.projects.find(p => p.id === projectId);
        if (project) {
            res.render('projectDetail', { project });
        } else {
            res.status(404).send('Project not found');
        }
    }

    static updateProject(req, res) {
        const projectId = req.params.id;
        const projectIndex = ProjectController.projects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
            ProjectController.projects[projectIndex] = { ...ProjectController.projects[projectIndex], ...req.body };
            res.send('Project updated');
        } else {
            res.status(404).send('Project not found');
        }
    }

    static deleteProject(req, res) {
        const projectId = req.params.id;
        ProjectController.projects = ProjectController.projects.filter(p => p.id !== projectId);
        res.send('Project deleted');
    }
}

module.exports = ProjectController;