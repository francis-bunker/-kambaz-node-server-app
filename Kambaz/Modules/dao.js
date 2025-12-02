import { v4 as uuidv4 } from "uuid";
import courseModel from "../Courses/model.js";
export default function ModulesDao() {

    async function deleteModule(courseId, moduleId) {
        const status = await courseModel.updateOne(
            { _id: courseId },
            { $pull: { modules: { _id: moduleId } } }
        );
        return status;
    }

    async function findModulesForCourse(courseId) {
        const course = await courseModel.findById(courseId);
        return course.modules;
    }

    async function createModule(courseId, module) {
        const newModule = { ...module, _id: uuidv4() };
        await courseModel.updateOne(
            { _id: courseId },
            { $push: { modules: newModule } }
        );
        return newModule;
    }
    async function updateModule(courseId, moduleId, moduleUpdates) {
        // const { modules } = db;
        // const module = modules.find((module) => module._id === moduleId);
        const course = await courseModel.findById(courseId);
        const module = course.modules.id(moduleId);
        Object.assign(module, moduleUpdates);
        await course.save();
        return module;
    }

    return {
        createModule, findModulesForCourse, deleteModule, updateModule,
    };
}