const { Job, Skill, Company, sequelize } = require('../models');

class JobController {
   static async allJob(req, res, next) {
      try {
         const jobs = await Job.findAll({
            include: [
               {
                  model: Company,
                  attributes: ["name"]
               },
               {
                  model: Skill,
                  attributes: ["id", "name", "level"]
               }
            ],
            attributes: {
               exclude: ["createdAt", "updatedAt"]
            }
         })
         res.status(200).json({ jobs })
      } catch (error) {
         next(error)
      }
   }
   static async addJob(req, res, next) {
      const t = await sequelize.transaction();
      try {
         const { title, description, companyId, jobType } = req.body
         let authorId = req.userAccessLogin.id
         const newJob = await Job.create(
            {
               title,
               description,
               companyId,
               authorId,
               jobType
            }, { transaction: t })
         let jobId = newJob.id
         let skill = req.body.skill
         let newSkil = skill.map(el => {
            return {
               ...el,
               jobId: jobId
            }
         })
         await Skill.bulkCreate(newSkil, { transaction: t })

         await t.commit();

         res.status(201).json({ message: "Created", newJob })
      } catch (error) {
         await t.rollback();
         next(error)
      }
   }

   static async editJob(req, res, next) {
      const t = await sequelize.transaction();
      try {
         const id = req.params.id
         const authorId = req.userAccessLogin.id
         const { title, description, companyId, jobType } = req.body

         const updateJob = await Job.update({
            title,
            description,
            companyId,
            authorId,
            jobType
         }, {
            where: { id },
            transaction: t
         })

         let skill = req.body.skill
         let newSkil = skill.map(el => {
            return {
               ...el,
               jobId: id
            }
         })

         await Skill.bulkCreate(newSkil, { updateOnDuplicate: ["name", "level"] }, { transaction: t })

         await t.commit();

         res.status(201).json({ message: "Created", updateJob })
      } catch (error) {
         await t.rollback();
         next(error)
      }
   }

   static async deleteJob(req, res, next) {
      try {
         const id = req.params.id
         await Job.destroy({
            where: { id }
         })
         res.status(200).json({ message: "Deleted", })
      } catch (error) {
         next(error)
      }
   }

   static async detailJob(req, res, next) {
      try {
         const id = req.params.id
         const job = await Job.findOne({
            where: { id },
            include: {
               model: Company,
               attributes: ["name", "companyLogo"]
            },
            attributes: {
               exclude: ["createdAt", "updatedAt"]
            }
         })
         res.status(200).json({ job })
      } catch (error) {
         next(error)
      }
   }
}
module.exports = JobController;