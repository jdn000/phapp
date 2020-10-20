import { Joi } from 'celebrate';
import jobs from '../../loaders/jobs';
import { join } from 'path';

export const validators = {
  test: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        infinityId: Joi.number().required(),
      }),
    },
    put: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.boolean().required(),
        infinityId: Joi.number().required(),
      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
  },
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
        profileImage: Joi.string(),
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
        profileImage: Joi.string().allow(null),
        roleId: Joi.number().required(),
        status: Joi.boolean()
      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
  },
  fonasa: {
    code: {
      get: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      post: {
        body: Joi.object({
          code: Joi.string().required(),
          description: Joi.string().required(),
          sectionId: Joi.number().required(),
        }),
      },
      put: {
        body: Joi.object({
          code: Joi.string().required(),
          description: Joi.string().required(),
          status: Joi.boolean().required(),
          sectionId: Joi.number().required(),
        }),
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
    },
    section: {
      get: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      post: {
        body: Joi.object({
          code: Joi.string().required(),
          description: Joi.string().required(),
          isMicro: Joi.boolean(),
        }),
      },
      put: {
        body: Joi.object({
          code: Joi.string().required(),
          description: Joi.string().required(),
          isMicro: Joi.boolean().required(),
          status: Joi.boolean().required(),
        }),
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
    },
    code_test: {
      post: {
        body: Joi.object({
          testId: Joi.number().required(),
        }),
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      get: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
    },
  },
  role: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
      }),
    },
    put: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.boolean().required(),
      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
  },
  demographic: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        alias: Joi.string(),
        type: Joi.string().required(),
        infinityId: Joi.number().required(),
      }),
    },
    put: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        alias: Joi.string().required(),
        type: Joi.string().required(),
        status: Joi.boolean().required(),
        infinityId: Joi.number().required(),
      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
  },
  group: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        userId: Joi.number().required(),
      }),
    },
    put: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.boolean().required(),
        userId: Joi.number().required(),
      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    demographic: {
      get: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      post: {
        body: Joi.object({
          demographicId: Joi.number().required(),
        }),
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
      delete: {
        body: Joi.object({
          demographicId: Joi.number().required(),
        }),
        params: Joi.object({
          id: Joi.number().required(),
        }),
      },
    },
  },
  parameters: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
      }),
    },
    put: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
  },
  report: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        code: Joi.string().required(),
        description: Joi.string().required(),
        type: Joi.string().required(),
        userId: Joi.number().required(),
      }),
    },
    demographic: {
      post: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
        body: Joi.object({
          demographicsId: Joi.array().items(Joi.number()),
          groupsId: Joi.array().items(Joi.number()),
        }),
      },
    },
    fonasa: {
      post: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
        body: Joi.object({
          fonasaId: Joi.array().items(Joi.number()),
        }),
      },
    },
    field: {
      post: {
        params: Joi.object({
          id: Joi.number().required(),
        }),
        body: Joi.object({
          fieldsId: Joi.array().items(Joi.number()),
        }),
      },
    },
    testFilter: {
      post: {
        params: Joi.object({
          testid: Joi.number().required(),
          reportId: Joi.number().required(),
        }),
        body: Joi.object({
          logicOperator: Joi.string().required(),
          infinityFieldId: Joi.string().required(),
          filterOperatorId: Joi.string().required(),
          value: Joi.string().required(),
        }),
      },
      get: {
        params: Joi.object({
          testid: Joi.number().required(),
          reportId: Joi.number().required(),
        }),
      },
      put: {
        params: Joi.object({
          testid: Joi.number().required(),
          reportId: Joi.number().required(),
        }),
        body: Joi.object({
          logicOperator: Joi.string().required(),
          infinityFieldId: Joi.string().required(),
          filterOperatorId: Joi.string().required(),
          value: Joi.string().required(),
        }),
      },
    },
  },
  field: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        infinityKey: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string().required(),
      }),
    },
    put: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
      body: Joi.object({
        infinityKey: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string().required(),
      }),
    },
  },
  filter: {
    get: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
    },
    post: {
      body: Joi.object({
        description: Joi.string().required(),
        value: Joi.string().required(),
      }),
    },
    put: {
      params: Joi.object({
        id: Joi.number().required(),
      }),
      body: Joi.object({
        description: Joi.string().required(),
        value: Joi.string().required(),
      }),
    },
  },
};
