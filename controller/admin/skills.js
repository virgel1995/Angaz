const { Skills } = require("../../database")

class AdminSkillsController {
    static async findAll(req, res) {
        const { sort, page, limit, orderBy } = req.query;
        const order = orderBy || 'ASC';
        const sortedBy = sort || 'id';
        const pageNum = page ? parseInt(page) : 1;
        const pageLimit = limit ? parseInt(limit) : 10;
        const offset = (pageNum - 1) * pageLimit;
        const categories = await Skills.findAll({
            where: {},
            order: [[sortedBy, order]],
            limit: pageLimit,
            offset,
        })

        const pagination = {
            page: pageNum,
            itemPerPage: pageLimit,
            totalItems: categories.length,
            count: categories?.length,
            nextPage: pageNum + 1,
            previousPage: pageNum - 1,
            hasNextPage: pageLimit * pageNum < categories.length,
            hasNextTwoPage: pageLimit * (pageNum + 2) < categories.length,
            hasNextThreePage: pageLimit * (pageNum + 3) < categories.length,
            hasPreviousPage: pageNum > 1,
            hasPagenation: categories.length > pageLimit,
        }
        return res.json({
            error: false,
            code: 200,
            message: "Skills fetched successfully",
            data: categories,
            pagination
        })
    }
    static async create(req, res) {
        let { name } = req.body
        name = name.toLowerCase()
        if (!name) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Name is required"
            })
        }
        const isExits = await Skills.findOne({ where: { name } })
        if (isExits) {
            return res.status(417).json({
                error: true,
                code: 417,
                message: "Skill already exists"
            })
        }
        const newSkill = await Skills.create({ name })
        return res.status(201).json({
            error: false,
            code: 201,
            message: "Skill created successfully",
            data: newSkill
        })
    }
    static async update(req, res) {
        let { id, name } = req.body
        name = name.toLowerCase()
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Id is required"
            })
        }
        if (!name) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Name is required"
            })
        }
        const skill = await Skills.findByPk(id)
        if (!skill) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Skill not found"
            })
        }
        if (name == skill.name) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "No Changes To Update skill"
            })
        }
        await skill.update({ name })
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Skill updated successfully",
            data: skill
        })
    }
    static async delete(req, res) {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Id is required"
            })
        }
        const skill = await Skills.findByPk(id)
        if (!skill) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Skill not found"
            })
        }
        await skill.destroy()
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Skill deleted successfully"
        })

    }
}

module.exports = AdminSkillsController