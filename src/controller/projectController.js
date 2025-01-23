const Project = require('../db/models/project');
const { default: AppError } = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const createProject = catchAsync(
    async (req, res) => {
        const body = req.body;
        const userId = req.user.id;

        const newProject = await Project.create({
            title: body.title,
            productImage: body.productImage,
            price: body.price,
            shortDescription: body.shortDescription,
            description: body.description,
            productUrl: body.productUrl,
            category: body.category,
            tags: body.tags,
            createdBy: userId
        });
        res.status(201).json({
            status: 'success',
            message: 'Project created successfully',
            data: newProject
        });
    }
)

const getAllProjects = catchAsync(
    async (req, res) => {
        const result = await Project.findAll({ include: 'User', where: { createdBy: req.user.id } });
        if(!result) {
            throw new AppError('No projects found', 404);
        }
        return res.status(200).json({
            status: 'success',
            message: 'All projects',
            data: result
        });
    }
)

const getProjectById = catchAsync(
    async (req, res) => {
        const projectId = req.params.id;
        const result = await Project.findByPk(projectId, { include: 'User' });
        if(!result) {
            throw new AppError(`No project found with id ${projectId}`, 404);
        }
        return res.status(200).json({
            status: 'success',
            message: `Project with id ${projectId}`,
            data: result
        });
    }
)

const updateProject = catchAsync(
    async (req, res) => {
        const projectId = req.params.id;
        const body = req.body;
        const userId = req.user.id;

        const result = await Project.findByPk(projectId);
        if(!result) {
            throw new AppError(`No project found with id ${projectId}`, 404);
        }

        if(result.createdBy !== userId) {
            throw new AppError('You are not authorized to update this project', 401);
        }

        result.title = body.title;
        result.productImage = body.productImage;
        result.price = body.price;
        result.shortDescription = body.shortDescription;
        result.description = body.description;
        result.productUrl = body.productUrl;
        result.category = body.category;
        result.tags = body.tags;
        result.updatedAt = new Date();

        const updatedResult = await result.save();

        return res.json({
            status: 'success',
            message: 'Project updated successfully',
            data: updatedResult
        });
    }
)

const deleteProject = catchAsync(
    async (req,res) => {
        const projectId = req.params.id;
        const userId = req.user.id;

        const result = await Project.findByPk(projectId);
        if(!result) {
            throw new AppError(`No project found with id ${projectId}`, 404);
        }

        if(result.createdBy !== userId) {
            throw new AppError('You are not authorized to delete this project', 401);
        }

        await result.destroy();
        return res.json({
            status: 'success',
            message: `Project with id ${projectId} deleted successfully`
        });
    }
)

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
}