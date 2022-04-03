const { Job, Skill, Company, sequelize } = require('../models');
class CompaniesController {
   static async allCompanies(req, res, next) {
      try {
         const companies = await Company.findAll({
            attributes: {
               exclude: ['createdAt', 'updatedAt']
            }
         })
         res.status(200).json({ companies })
      } catch (error) {
         next(error)
      }
   }

   static async addCompany(req, res, next) {
      try {
         const { name, location, description, companyLogo, email } = req.body
         await Company.create({
            name,
            location,
            description,
            companyLogo,
            email
         })
         res.status(201).json({ message: "Created" })
      } catch (error) {
         next(error)
      }
   }

   static async deleteCompanies(req, res, next) {
      const t = await sequelize.transaction();
      try {
         const { id } = req.params
         let skillData = []
         const jobData = await Job.findAll({
            where: {
               companyId: id
            }
         }, { transaction: t }) 
         if (jobData.length > 0) {
            skillData = await Skill.findAll({
               where: {
                  jobId: jobData[0].id
               }
            }, { transaction: t })
         }
         if(skillData.length > 0) {
            await Skill.destroy({
               where: {
                  jobId: jobData[0].id
               }
            }, { transaction: t })
         }
         await Job.destroy({
            where: {
               companyId: id
            }
         }, { transaction: t })

         await Company.destroy({
            where: {
               id
            }
         })
         res.status(200).json({ message: "Deleted" })
      } catch (error) {
         next(error)
      }
   }

   static async detailCompanies(req, res, next) {
      try {
         const { id } = req.params
         const company = await Company.findByPk(id)
         res.status(200).json({ company })
      } catch (error) {
         next(error)
      }
   }
}
module.exports = CompaniesController;