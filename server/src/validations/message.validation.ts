import Joi from 'joi'
import { IMessage } from '~/models/message.model'
import { MESSAGE_STATUS, MESSAGE_TYPES } from '~/constants/message.constant'

const createMessageValidation = async (data: IMessage) => {
  const schema = Joi.object({
    chat_id: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.values(MESSAGE_TYPES))
      .required(),
    content: Joi.string().required(),
    // sender_id: Joi.string().required(),
    status: Joi.string()
      .valid(...Object.values(MESSAGE_STATUS))
      .default(MESSAGE_STATUS.SENT),
    is_deleted: Joi.boolean().optional(),
    is_edited: Joi.boolean().optional()
  })
  return await schema.validateAsync(data)
}

export { createMessageValidation }
