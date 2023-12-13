const { User } = require("../../database");



class AdminUsersController {
    static async findAll(req, res) {
        const { sort, page, limit, orderBy } = req.query;
        const order = orderBy || 'DESC';
        const sortedBy = sort || 'id';
        const pageNum = page ? parseInt(page) : 1;
        const pageLimit = limit ? parseInt(limit) : 10;
        const offset = (pageNum - 1) * pageLimit;

        const users = await User.findAll({
            where: {},
            include: [
                {
                    all: true
                }
            ],
            attributes: {
                exclude: ['password', 'new_email', 'update_email_token', 'update_email_code', 'updatedAt']
            },
            order: [[sortedBy, order]],
            limit: pageLimit,
            offset,
        })
        const pagination = {
            page: pageNum,
            itemPerPage: pageLimit,
            totalItems: users.length,
            count: users?.length,
            nextPage: pageNum + 1,
            previousPage: pageNum - 1,
            hasNextPage: pageLimit * pageNum < users.length,
            hasNextTwoPage: pageLimit * (pageNum + 2) < users.length,
            hasNextThreePage: pageLimit * (pageNum + 3) < users.length,
            hasPreviousPage: pageNum > 1,
            hasPagenation: users.length > pageLimit,
        }
        return res.json({
            error: false,
            code: 200,
            data: users,
            pagination
        })
    }
}

module.exports = AdminUsersController