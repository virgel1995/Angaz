const { Category } = require("../../database")



class AdminCategoreisController {
    static async create(req, res) {
        const { title, description } = req.body
        const isExites = await Category.findOne({ where: { title } })
        if (isExites) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Category Already Exist"
            })
        }
        const newCategory = await Category.create({
            title,
            desc: description
        })
        return res.json({
            error: false,
            code: 200,
            message: "Category Added Successfully",
            data: newCategory
        })
    }
    static async update(req, res) {
        const { id, title, description } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                message: 'Category id is Required',
                code: 400
            })
        }
        const category = await Category.findOne({ where: { id } })
        if (!category) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Category Not Found"
            })
        }
        if (title === category.title && category.desc === description) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "No Changes To Update Category"
            })
        }
        if (title) {
            category.title = title
        }
        if (description) {
            category.desc = description
        }
        await category.save()
        return res.json({
            error: false,
            code: 200,
            message: "Category Updated Successfully",
            data: category
        })
    }
    static async delete(req, res) {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                message: 'Category id is Required',
                code: 400
            })
        }
        const category = await Category.findOne({ where: { id } })
        if (!category) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Category Not Found"
            })
        }
        await category.destroy()
        return res.json({
            error: false,
            code: 200,
            message: "Category Deleted Successfully"
        })
    }
    static async findAll(req, res) {
        const { sort, page, limit, orderBy } = req.query;
        const order = orderBy || 'ASC';
        const sortedBy = sort || 'id';
        const pageNum = page ? parseInt(page) : 1;
        const pageLimit = limit ? parseInt(limit) : 10;
        const offset = (pageNum - 1) * pageLimit;
        const categories = await Category.findAll({
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
            data: categories,
            pagination
        })
    }

}
module.exports = AdminCategoreisController