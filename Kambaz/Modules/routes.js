import ModulesDao from "../Modules/dao.js";
export default function ModulesRoutes(app, db) {
    const dao = ModulesDao(db);
    const findModulesForCourse = (req, res) => {
        const { courseId } = req.params;
        const modules = dao.findModulesForCourse(courseId);
        res.json(modules);
    }
    const createModuleForCourse = (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        console.log(module);
        const newModule = dao.createModule(module);
        res.send(newModule);
    }
    const deleteModule = (req, res) => {
        const { moduleId } = req.params;
        dao.deleteModule(moduleId);
        res.sendStatus(204);
    }
    const updateModule = (req, res) => {
        const { moduleId } = req.params;
        const module = req.body;
        dao.updateModule(moduleId, module);
        res.sendStatus(204);
    }
    app.put("/api/modules/:moduleId", updateModule);
    app.delete("/api/modules/:moduleId", deleteModule);
    app.post("/api/courses/:courseId/modules", createModuleForCourse);
    app.get("/api/courses/:courseId/modules", findModulesForCourse);
}