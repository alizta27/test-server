const { Job, Skill, Company, Op } = require('../models');
class Controller {
   static async home(req, res, next) {
      try {
         const allData = await Job.findAll({
            include: [
               {
                  model: Company,
                  attributes: ['name', "companyLogo"]
               },
               {
                  model: Skill,
                  attributes: ['name', "level"]
               }
            ],
            attributes: {
               exclude: ['createdAt', 'updatedAt']
            }
         })

         res.status(200).json({ message: "OK", allData })
      } catch (error) {
         next(error)
      }
   }

   static async detail(req, res, next) {
      try {
         const id = req.params.id
         const job = await Job.findOne({
            where: {
               id
            },
            include: [
               {
                  model: Company,
                  attributes: ['name', "companyLogo"]
               },
               {
                  model: Skill,
                  attributes: ['name', "level"]
               }
            ],
            attributes: {
               exclude: ['createdAt', 'updatedAt']
            }
         })

         if (!job) {
            throw {
               name: "Job Not Found",
            }
         }
         res.status(200).json({ message: "OK", job })
      } catch (error) {
         next(error)
      }
   }

   static async search(req, res, next) {
      try {
         const allData = await Job.findAll({
            where: {
               [Op.ilike]: {
                  title: `%${req.query.search}%`
               }
            },
            include: [
               {
                  model: Company,
                  attributes: ['name', "companyLogo"]
               },
               {
                  model: Skill,
                  attributes: ['name', "level"]
               }
            ],
            attributes: {
               exclude: ['createdAt', 'updatedAt']
            }
         })
         res.status(200).json({ message: "OK", allData })
      } catch (error) {
         next(error)
      }
   }
}
module.exports = Controller;