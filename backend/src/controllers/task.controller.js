import { Op, Model, where } from 'sequelize';
import * as Yup from 'yup';
import Address from '../models/Address';
import User from '../models/User';
import Tasks from '../models/Task';
import { Errors } from '../utils/errors';
import moment from 'moment';
import * as uuid from 'uuid';

let TaskController = {
  addTask: async (req, res) => {
    try {
      const { body } = req;
      //console.log(req);
      const id = uuid.v4();
      console.log({ task_create: body });
      const schema = Yup.object().shape({
        status: Yup.string().required(),
        type: Yup.string().required(),
        description: Yup.string().required(),
        userId: Yup.string().uuid(),
        createdBy: Yup.string().uuid(),
      });
      if (!(await schema.isValid(body)))
        return res.status(400).json({ error: Errors.VALIDATION_FAILS });
      const task = await Tasks.create({
        id: id,
        userId: body.userId,
        description: body.description,
        createdBy: body.createdBy,
        status: body.status,
        type: body.type,
      });
      console.log(task);
      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },

  get: async (req, res) => {
    //get paginated
    try {
      const page = req.query.page ? req.query.page : 1;
      const status = req.query.status;
      const type = req.query.type;
      const userId = req.query.userId;
      const limit = 3;
      let whereClause = {};
      if (status && status.length > 0)
        whereClause.status = { [Op.iLike]: `%${status}%` };
      if (type && type.length > 0) whereClause.type = type;
      if (userId && userId.length > 0) whereClause.userId = userId;
      whereClause.deletedAt = null; //dont show soft deleted entries
      let tasks_response = await Tasks.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: User,
            required: false, //this should be true as we always have a user but doesnt really affect execution for now keeping it this way
          },
        ],
        order: [['createdAt', 'DESC']],
        distinct: 'Tasks.id',
        offset: page * limit - limit,
        limit: limit,
      });
      console.log(tasks_response);
      let meta = {
        success: true,
        totalCount: tasks_response.count,
        pageCount: Math.ceil(tasks_response.count / limit),
        currentPage: page,
        perPage: limit,
      };
      tasks_response.meta = meta;
      return res.status(200).json(tasks_response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },

  find: async (req, res) => {
    //find by id to show edit/view page
    try {
      const { id } = req.params;
      console.log({ get_task_by_id_params: id });
      //const task = await Tasks.findByPk(id);
      const task = await Tasks.findOne({
        where: { id: id },
        include: [
          {
            model: User,
            required: false,
          },
        ],
      });
      //   const result = await Tasks.findOne({
      //     where: { id: id },
      //   });
      if (!task)
        return res.status(400).send({ error: Errors.NONEXISTENT_USER });
      return res.status(200).json(task);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },

  update: async (req, res) => {
    //edit task
    try {
      const { body } = req;
      console.log({ task_update: body });
      const schema = Yup.object().shape({
        status: Yup.string().required(),
        type: Yup.string().required(),
        description: Yup.string().required(),
        userId: Yup.string().uuid(),
        createdBy: Yup.string().uuid(),
        id: Yup.string().uuid(),
      });
      if (!(await schema.isValid(body)))
        return res.status(400).json({ error: Errors.VALIDATION_FAILS });
      const task = await Tasks.findByPk(body.id);
      if (!task)
        return res.status(400).send({ error: Errors.NONEXISTENT_TASK });
      const task_updated = await task.update({
        userId: body.userId,
        description: body.description,
        createdBy: body.createdBy,
        status: body.status,
        type: body.type,
      });
      return res.status(200).json(task_updated);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Tasks.findByPk(id);
      if (!task)
        return res.status(400).send({ error: Errors.NONEXISTENT_TASK });
      task.update({
        deletedAt: moment().format(),
      });
      return res.status(200).json({ msg: 'Soft Deleted Task' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: Errors.SERVER_ERROR });
    }
  },
};

export default TaskController;
