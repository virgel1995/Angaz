const Helper = require("../../app/Helper")
const { Project, User, Category, SubCategory } = require("../../database")

class ProjectController {
    static async create(req, res) {
        let {
            title,
            description,
            skills,
            expectedBudget,
            estimatedDeliveryTime,
            createdUser,
            categId,
            subCategId
        } = req.body
        const userExist = await User.findByPk(createdUser)
        if (!userExist) {
            return res.status(417).json({
                error: true,
                code: 417,
                message: "User is Not Exist"
            })
        }
        const checkCategory = await Category.findByPk(categId)
        if (!checkCategory) {
            return res.status(417).json({
                error: true,
                code: 417,
                message: "Category is Not Exist"
            })
        }
        if (subCategId) {
            const checkSubCategory = await SubCategory.findByPk(subCategId)
            if (!checkSubCategory) {
                return res.status(417).json({
                    error: true,
                    code: 417,
                    message: "SubCategory is Not Exist"
                })
            }
        }
        const newProject = await Project.create({
            title,
            description,
            skills,
            expectedBudget,
            estimatedDeliveryTime,
            createdUser,
            categId,
            subCategId: subCategId ? subCategId : null
        })
        return res.status(201).json({
            error: false,
            code: 201,
            message: "Project Created",
            data: newProject
        })
    }
    static async update(req, res) {
        const {
            id,
            title,
            description,
            expectedBudget,
            estimatedDeliveryTime,
            categId,
            skills,
            subCategId
        } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "projectId is required"
            })
        }
        const project = await Project.findByPk(id)
        if (!project) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "project is not Exist"
            })
        }
        // if (req.user.id !== project.createdUser) {
        //     return res.status(503).json({
        //         error: true,
        //         code: 503,
        //         message: "Forbidden : You are not allowed to update this project"
        //     })
        // }
        if (title == project.title &&
            description == project.description &&
            expectedBudget == project.expectedBudget &&
            estimatedDeliveryTime == project.estimatedDeliveryTime &&
            categId == project.categId &&
            subCategId == project.subCategId &&
            skills == project.skills) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "No Changes To Update Project"
            })

        }
        if (title) {
            project.title = title
        }
        if (description) {
            project.description = description
        }
        if (expectedBudget) {
            if (isNaN(expectedBudget)) {
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: "expectedBudget mut be a number"
                })
            }
            project.expectedBudget = expectedBudget
        }
        if (estimatedDeliveryTime) {
            if (!Helper.validateDate(estimatedDeliveryTime)) {
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: "Estimated Delivery Time is required and must be a date."
                });
            }
            if (!Helper.compareTwoDates(estimatedDeliveryTime, Helper.getCurrentDate())) {
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: "Estimated Delivery Time must be greater than the current date and the project creation date."
                });
            }
            project.estimatedDeliveryTime = estimatedDeliveryTime
        }
        if (categId) {
            const checkCategory = await Category.findByPk(categId)
            if (!checkCategory) {
                return res.status(417).json({
                    error: true,
                    code: 417,
                    message: "Category is Not Exist"
                })
            }
            project.categId = categId
        }
        if (subCategId) {
            project.subCategId = subCategId
        }
        if (skills) {
            project.skills = skills
        }
        await project.save()
        return res.status(200).json({
            error: false,
            code: 200,
            message: "project is Updated",
            data: project
        })

    }
    static async delete(req, res) {
        let { id } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "projectId is required"
            })
        }
        let projectExist = await Project.findByPk(id)
        if (!projectExist) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "project is not Exist"
            })
        }
        // if (req.user.id !== projectExist.createdUser) {
        //     return res.status(503).json({
        //         error: true,
        //         code: 503,
        //         message: "Forbidden : You are not allowed to delete this project"
        //     })
        // }
        await projectExist.destroy()
        return res.status(200).json({
            error: false,
            code: 200,
            message: "project is Deleted",
        })
    }
    static async getById(req, res) {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "project id is required"
            })
        }
        const projectExist = await Project.scope('ASSOC').findByPk(id)
        if (!projectExist) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "project is not found"
            })
        }
        return res.json({
            error: false,
            code: 200,
            message: "Done",
            projectExist
        })
    }
    static async findAll(req, res) {
        const { sort, page, limit, orderBy } = req.query;
        const order = orderBy || 'DESC';
        const sortedBy = sort || 'id';
        const pageNum = page ? parseInt(page) : 1;
        const pageLimit = limit ? parseInt(limit) : 10;
        const offset = (pageNum - 1) * pageLimit;
        const records = await Project.scope('ASSOC').findAll({
            order: [[sortedBy, order]],
            limit: pageLimit,
            offset,
        })
        const pagination = {
            page: pageNum,
            itemPerPage: pageLimit,
            totalItems: records.length,
            count: records?.length,
            nextPage: pageNum + 1,
            previousPage: pageNum - 1,
            hasNextPage: pageLimit * pageNum < records.length,
            hasNextTwoPage: pageLimit * (pageNum + 2) < records.length,
            hasNextThreePage: pageLimit * (pageNum + 3) < records.length,
            hasPreviousPage: pageNum > 1,
            hasPagenation: records.length > pageLimit,
        }
        return res.json({
            error: false,
            code: 200,
            data: records,
            pagination
        })
    }
}

module.exports = ProjectController