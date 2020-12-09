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
        secondSurname: Joi.string(),
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
        secondSurname: Joi.string(),
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
  indicator: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    }, getByObjectiveId: {
      params: Joi.object({
        objectiveId: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        objectiveId: Joi.number().optional(),

      })
    },
    put: {
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        objectiveId: Joi.number().optional(),
        status: Joi.boolean().optional()

      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
  },
  learningObjective: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    getBySubjectId: {
      params: Joi.object({
        subjectId: Joi.number().required(),
      }),
    },
    getByGradeIdAndSubjectId: {
      params: Joi.object({
        subjectId: Joi.number().required(),
        gradeId: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        gradeId: Joi.number().required(),
        subjectId: Joi.number().required(),
        description: Joi.string().optional(),
        name: Joi.string().required(),
      })
    },
    put: {
      body: Joi.object({
        gradeId: Joi.number().required(),
        subjectId: Joi.number().required(),
        description: Joi.string().optional(),
        name: Joi.string().required(),
      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
  },
  calification: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    getByAlumnId: {
      params: Joi.object({
        alumnId: Joi.number().required(),
      }),
    },
    getByCalificationId: {
      params: Joi.object({
        calificationId: Joi.number().required(),
      }),
    },
    getByCalificationIdAlumnId: {
      params: Joi.object({
        calificationId: Joi.number().required(),
        alumnId: Joi.number().required(),
      }),
    },
    getByGradeAndSubject: {
      params: Joi.object({
        gradeId: Joi.number().required(),
        subjectId: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        califications: Joi.array().items(
          Joi.object({
            alumnId: Joi.number().required(),
            value: Joi.number().required(),
          })),
        indicators: Joi.array().items(
          Joi.number().optional().allow(null),
        ),
        mainCalification: Joi.object({
          subjectId: Joi.number().required(),
          isCummulative: Joi.boolean().optional().allow(null),
          objectiveId: Joi.number().optional().allow(null),
          evaluationNumber: Joi.number().optional().allow(null),
          gradeId: Joi.number().required(),
          indicators: Joi.array().items(
            Joi.number().optional().allow(null),
          ),
        }),
      })
    },

    put: {
      body: Joi.array().items({
        id: Joi.number().required(),
        value: Joi.number().required(),
      }
      ),


    },
    postCummulative: {
      body: Joi.object({
        califications: Joi.array().items(
          Joi.object({
            alumnId: Joi.number().required(),
            value: Joi.number().required(),
          })),
        indicators: Joi.array().items(
          Joi.number().optional().allow(null),
        ),
        mainCalification: Joi.object({
          id: Joi.number().required(),
          subjectId: Joi.number().required(),
          isCummulative: Joi.boolean().optional().allow(null),
          objectiveId: Joi.number().optional().allow(null),
          evaluationNumber: Joi.number().optional().allow(null),
          gradeId: Joi.number().required(),
          indicators: Joi.array().items(
            Joi.number().optional().allow(null),
          ),
        }),
      })
    },
  },
};
