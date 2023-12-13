const { SubCategory, Category } = require("../../database")



class AdminSubCategoreisController {
    static async create(req, res) {
        const { title, description, categId } = req.body
        const isExites = await SubCategory.findOne({
            where: {
                title,
                categId
            }
        })
        if (isExites) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "SubCategory Already Exist For This Category"
            })
        }
        const findCategory = await Category.findByPk(categId)
        if (!findCategory) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Category Not Found"
            })
        }
        const newCategory = await SubCategory.create({
            title,
            desc: description,
            categId : findCategory.id
        })
        return res.json({
            error: false,
            code: 200,
            message: "SubCategory Added Successfully",
            data: newCategory
        })
    }
    static async update(req, res) {
        const { id, title, description } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                message: 'SubCategory id is Required',
                code: 400
            })
        }
        const category = await SubCategory.findOne({ where: { id } })
        if (!category) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "SubCategory Not Found"
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
            message: "SubCategory Updated Successfully",
            data: category
        })
    }
    static async delete(req, res) {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                message: 'SubCategory id is Required',
                code: 400
            })
        }
        const category = await SubCategory.findOne({ where: { id } })
        if (!category) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "SubCategory Not Found"
            })
        }
        await category.destroy()
        return res.json({
            error: false,
            code: 200,
            message: "SubCategory Deleted Successfully"
        })
    }
    static async findAll(req, res) {
        const { sort, page, limit, orderBy } = req.query;
        const order = orderBy || 'DESC';
        const sortedBy = sort || 'id';
        const pageNum = page ? parseInt(page) : 1;
        const pageLimit = limit ? parseInt(limit) : 10;
        const offset = (pageNum - 1) * pageLimit;

        const categories = await SubCategory.findAll({
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
module.exports = AdminSubCategoreisController