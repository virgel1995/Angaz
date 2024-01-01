const { Op } = require("sequelize")
const { Project, User, Category, SubCategory, ProjectSkill, ProjectAttachments, Skills } = require("../../database")

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
            subCategId,
            attachments
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
        if (attachments) {
            const attachmentsArr = attachments.map((url) => {
                return {
                    projectId: newProject.id,
                    url: url
                }
            })
            await ProjectAttachments.bulkCreate(attachmentsArr)
        }
        const skilsArr = skills.map((skill) => {
            return {
                projectId: newProject.id,
                skillId: skill.id,
            }
        })
        await ProjectSkill.bulkCreate(skilsArr)
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
            skills,
            attachments
        } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "projectId is required"
            })
        }
        const project = await Project.scope('ASSOC').findByPk(id)
        if (!project) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "project is not Exist"
            })
        }
        // add or delete skills
        if (skills) {
            const existingSkills = project.skills.map(s => s.id);
            // Add any new skills
            const newSkills = skills.filter(s => !existingSkills.includes(s.id));
            if (newSkills.length > 0) {
                await Promise.all(
                    newSkills.map(s => ProjectSkill.create({
                        projectId: id,
                        skillId: s.id
                    }))
                );
            }
            // Remove old skills
            const removedSkills = existingSkills.filter(id => !skills.map(s => s.id).includes(id));
            if (removedSkills.length > 0) {
                await Promise.all(
                    removedSkills.map(s => ProjectSkill.destroy({
                        where: { projectId: id, skillId: s }
                    }))
                );
            }
        }
        // add or delete attachments
        if (attachments) {
            const exitingAttachments = project.attachments.map(a => a.url);
            const newAttachments = attachments.filter(a => !exitingAttachments.includes(a));
            if (newAttachments.length > 0) {
                await Promise.all(
                    newAttachments.map(a => ProjectAttachments.create({
                        projectId: id,
                        url: a
                    }))
                );
            }
            const removedAttachments = exitingAttachments.filter(a => !attachments.includes(a));
            if (removedAttachments.length > 0) {
                await Promise.all(
                    removedAttachments.map(a => ProjectAttachments.destroy({
                        where: {
                            projectId: id,
                            url: a
                        }
                    }))
                );
            }
        }
        if (title == project.title &&
            description == project.description &&
            expectedBudget == project.expectedBudget &&
            estimatedDeliveryTime == project.estimatedDeliveryTime && !skills) {
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
            project.estimatedDeliveryTime = estimatedDeliveryTime
        }
        await project.save()
        // get updated project with new associations data
        const updated = await Project.scope('ASSOC').findByPk(id)
        return res.status(200).json({
            error: false,
            code: 200,
            message: "project is Updated",
            data: updated
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
        let {
            sort,
            page,
            limit,
            orderBy,
            title,
            type,
            expectedBudget,
            budgetType,
            estimatedDeliveryTime,
            skills,
            category,
            subCategory
        } = req.query;

        let _Skills = skills ? JSON.parse(skills.replace(/'/g, '"')) : null;
        if (type && ['approved', 'pending'].indexOf(type) === -1) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "type must be 'approved' or 'pending'"
            })
        }
        const whereCluse = {}
        const order = orderBy || 'DESC';
        const sortedBy = sort || 'id';
        const pageNum = page ? parseInt(page) : 1;
        const pageLimit = limit ? parseInt(limit) : 10;
        const offset = (pageNum - 1) * pageLimit;
        const filterType = type || 'approved'
        let filter = {
            order: [[sortedBy, order]],
            limit: pageLimit,
            offset,
        }
        if (title) {
            whereCluse.title = {
                [Op.like]: `%${title}%`
            }
        }
        if (expectedBudget) {
            if (['less', 'more'].indexOf(budgetType) === -1) {
                return res.status(400).json({
                    error: true,
                    code: 400,
                    message: "budgetType must be 'less' or 'more'"
                })
            }
            whereCluse.expectedBudget = {
                [budgetType === 'less' ? Op.lte : Op.gte]: expectedBudget
            }
        }
        if (estimatedDeliveryTime) {
            whereCluse.estimatedDeliveryTime = {
                [Op.gte]: estimatedDeliveryTime
            }
        }
        if (_Skills) {
            filter.include = [{
                model: Skills,
                as: "skills",
                where: {
                    name: {
                        [Op.in]: _Skills
                    }
                }
            }]
        }
        if (category) {
            whereCluse.categId = category
        }
        if (subCategory) {
            whereCluse.subCategId = subCategory
        }
        filter.where = whereCluse
        const records = await Project.scope(filterType).findAll(filter)
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
            count: records.length,
            data: records,
            pagination
        })
    }
}

module.exports = ProjectController