import { Joi } from 'celebrate';

export const validators = {
  user: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        fisrtName: Joi.string().required(),
        lastName: Joi.string(),
        secondSurName: Joi.string(),
        email: Joi.string(),
        // profileImage: Joi.string(),
        roleId: Joi.number().required()
      })
    },
    put: {
      body: Joi.object({
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        secondSurName: Joi.string(),
        email: Joi.string(),
        //     profileImage: Joi.string().allow(null),
        roleId: Joi.number().required(),
        status: Joi.boolean()
      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
  },
  alumn: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    }, getByRun: {
      params: Joi.object({
        run: Joi.string().required(),
      }),
    },
    post: {
      body: Joi.object({
        run: Joi.string().required(),
        names: Joi.string().required(),
        lastName: Joi.string().required(),
        secondSurname: Joi.string().optional(),
        gradeId: Joi.number().optional(),

      })
    },
    put: {
      body: Joi.object({
        run: Joi.string().required(),
        names: Joi.string().required(),
        lastName: Joi.string().required(),
        secondSurname: Joi.string().optional(),
        gradeId: Joi.number(),

      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
  },
};
