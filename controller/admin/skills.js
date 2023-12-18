const { Skills } = require("../../database")

class AdminSkillsController {
    static async findAll(req, res) {
        let { page, limit } = req.query
        const skills = await Skills.findAndCountAll({
            where: {},
            limit: limit ? parseInt(limit) : 10,
            offset: (page ? parseInt(page) : 1 - 1) * (limit ? parseInt(limit) : 10),
        },

        )
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Skills fetched successfully",
            data: skills
        })
    }
    static async create(req, res) {
        const { name } = req.body
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
        const { id, name } = req.body
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