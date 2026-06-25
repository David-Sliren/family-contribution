export const cleanIdPlugin = (schema) => {
  const existOptions = schema.get("toJSON") || {};

  const options = {
    ...existOptions,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      return ret;
    },
  };
  schema.set("toJSON", options);
};

export const cleanUser = (schema) => {
  const existOptions = schema.get("toJSON") || {};

  const options = {
    ...existOptions,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.password;
      return ret;
    },
  };

  schema.set("toJSON", options);
};
