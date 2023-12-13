const { Service, ServiceFavorite, ServiceDisLikes, ServiceLikes, User, Category, SubCategory } = require("../../database")



class ServiceController {
    static async create(req, res) {
        const {
            createdUser,
            featured,
            title,
            description,
            image,
            tag,
            price,
            deliveryTime,
            discount,
            categId,
            subCategId
        } = req.body

        const isExits = await Service.findOne({
            where: {
                title,
                createdUser
            }
        })
        if (isExits) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "You Already Have This Service"
            })
        }
        const user = await User.findByPk(createdUser)
        if (!user) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "User Not Found"
            })
        }
        const category = await Category.findByPk(categId)
        if (!category) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Category Not Found"
            })
        }
        if (subCategId) {
            const subCategory = await SubCategory.findByPk(subCategId)
            if (!subCategory) {
                return res.status(404).json({
                    error: true,
                    code: 404,
                    message: "Sub Category Not Found"
                })
            }
        }

        const newRecord = await Service.create({
            createdUser: user.id,
            featured,
            title,
            description,
            image,
            tag: JSON.stringify(tag),
            price: Number(price ? price : 0),
            deliveryTime,
            discount: Number(discount ? discount : 0),
            categId: category.id,
            subCategId: subCategId ? Number(subCategId) : null
        })

        return res.status(200).json({
            error: false,
            code: 200,
            message: 'Service Created Successfully',
            data: newRecord
        })


    }
    static async update(req, res) {
        const {
            id,
            featured,
            title,
            description,
            image,
            tag,
            price,
            deliveryTime,
            discount
        } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Service id Is Required"
            })
        }
        const record = await Service.findByPk(id)
        if (!record) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Service Not Found"
            })
        }
        if (featured) {
            record.featured = featured
        }
        if (title) {
            record.title = title
        }
        if (description) {
            record.description = description
        }
        if (image) {
            record.image = image
        }
        if (tag) {
            record.tag = JSON.stringify(tag)
        }
        if (price) {
            record.price = price
        }
        if (deliveryTime) {
            record.deliveryTime = deliveryTime
        }
        if (discount) {
            record.discount = Number(discount)
        }
        await record.save()
        return res.status(200).json({
            error: false,
            code: 200,
            message: 'Service Updated Successfully',
            data: record
        })
    }
    static async delete(req, res) {
        const {
            id,
        } = req.body
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: "Service id Is Required"
            })
        }
        const record = await Service.findByPk(id)
        if (!record) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Service Not Found"
            })
        }
        await record.destroy()
        return res.status(200).json({
            error: false,
            code: 200,
            message: "Service Deleted Successfully "
        })

    }
    static async addOrRemoveLike(req, res) {
        const { id, userId } = req.body
        let record = await Service.scope('ASSOC').findByPk(id)
        if (!record) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Service Not Found"
            })
        }
        const isExits = await ServiceLikes.findOne({
            where: {
                serviceId: record.id,
                userId: userId
            }
        })
        if (!isExits) {
            const findDisLike = await ServiceDisLikes.findOne({
                where: {
                    serviceId: record.id,
                    userId: userId
                }
            })
            if (findDisLike) {
                await findDisLike.destroy()
            }
            await ServiceLikes.create({
                serviceId: record.id,
                userId: userId
            })
        } else {
            await ServiceLikes.destroy({
                where: {
                    serviceId: record.id,
                    userId: userId
                }
            })
        }
        record = await Service.scope('ASSOC').findByPk(id)
        return res.status(200).json({
            error: false,
            code: 200,
            message: `Successfully ${!isExits ? "Added" : "Removed"} Like`,
            data: record
        })
    }
    static async addOrRemoveDisLike(req, res) {
        const { id, userId } = req.body
        let record = await Service.scope('ASSOC').findByPk(id)
        if (!record) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Service Not Found"
            })
        }
        const isExits = await ServiceDisLikes.findOne({
            where: {
                serviceId: record.id,
                userId: userId
            }
        })
        if (!isExits) {
            const findLike = await ServiceLikes.findOne({
                where: {
                    serviceId: record.id,
                    userId: userId
                }
            })
            if (findLike) {
                await findLike.destroy()
            }
            await ServiceDisLikes.create({
                serviceId: record.id,
                userId: userId

            })
        } else {
            await ServiceDisLikes.destroy({
                where: {
                    serviceId: record.id,
                    userId: userId
                }
            })

        }
        record = await Service.scope('ASSOC').findByPk(id)
        return res.status(200).json({
            error: false,
            code: 200,
            message: `Successfully ${!isExits ? "Added" : "Removed"} dislike`,
            data: record
        })
    }
    static async addOrRemoveFavorite(req, res) {
        const { id, userId } = req.body
        let record = await Service.scope('ASSOC').findByPk(id)
        if (!record) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: "Service Not Found"
            })
        }
        const isExits = await ServiceFavorite.findOne({
            where: {
                serviceId: record.id,
                userId: userId
            }
        })

        if (!isExits) {
            await ServiceFavorite.create({
                serviceId: record.id,
                userId: userId
            })
        } else {
            await ServiceFavorite.destroy({
                where: {
                    serviceId: record.id,
                    userId: userId
                }
            })
        }
        record = await Service.scope('ASSOC').findByPk(id)
        return res.status(200).json({
            error: false,
            code: 200,
            message: `Successfully ${!isExits ? "Added" : "Removed"} favorite`,
            data: record
        })
    }
    static async findAll(req, res) {
        const { sort, page, limit, orderBy } = req.query;
        const order = orderBy || 'DESC';
        const sortedBy = sort || 'id';
        const pageNum = page ? parseInt(page) : 1;
        const pageLimit = limit ? parseInt(limit) : 10;
        const offset = (pageNum - 1) * pageLimit;
        const records = await Service.scope('ASSOC').findAll({
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
module.exports = ServiceController