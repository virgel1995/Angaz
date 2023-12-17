const { Op } = require("sequelize");
const { SiteSettings } = require("../../database");


class SiteSettingsController {

    static async create(req, res) {
        const { name, value } = req.body;
        if (!name) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: 'Site Setting Name Is Required'
            })
        } else if (!value) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: 'Site Setting Value Is Required'
            })
        }
        const isExits = await SiteSettings.findOne({
            where: {
                name
            }
        });
        if (isExits) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: 'Site Setting Already Exists'
            })
        }
        const newSetting = await SiteSettings.create({
            name,
            value
        })
        return res.status(200).json({
            error: false,
            code: 200,
            message: 'Site Setting Created Successfully',
            data: newSetting
        })
    }
    static async update(req, res) {
        const { id, value } = req.body;
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: 'Site Setting Id Is Required'
            })
        }
        const setting = await SiteSettings.findByPk(id);
        if (!setting) {
            return res.status(404).json({
                error: true,
                code: 404,
                message: 'Site Setting Not Found'
            })
        }
        if (value === setting.value) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: 'No Changes'
            })
        }
        if (value) {
            setting.value = value;
        }
        await setting.save();
        return res.status(200).json({
            error: false,
            code: 200,
            message: 'Site Setting Updated Successfully',
            data: setting
        })
    }
    static async delete(req, res) {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: 'Site Setting Id Is Required'
            })
        }
        const setting = await SiteSettings.findByPk(id);
        if (!setting) {
            return res.status(400).json({
                error: true,
                message: 'Site Setting Not Found'
            })
        }
        await setting.destroy();
        return res.status(200).json({
            error: false,
            message: 'Site Setting Deleted Successfully'
        })
    }
    static async findAll(req, res) {
        const { keys } = req.query
        const _Keys = keys ? JSON.parse(keys.replace(/'/g, '"')) : null
        const whereCluse = {}
        if (_Keys) {
            whereCluse.name = {
                [Op.in]: _Keys
            }
        }
        const settings = await SiteSettings.findAll({
            where: whereCluse
        });
        return res.status(200).json({
            error: false,
            code: 200,
            message: 'Site Settings Fetched Successfully',
            data: settings
        })
    }
}

module.exports = SiteSettingsController