import Joi from 'joi'
import { CHAT_TYPES } from '~/constants/chat.constant'

const createChatValidation = async (data: object) => {

  const schema = Joi.object({
    members: Joi.array().items(Joi.string().required()).required(),
    chat_name: Joi.string().optional(),
    chat_type: Joi.string()
      .valid(...Object.values(CHAT_TYPES))
      .default(CHAT_TYPES.DIRECT),
    last_message: Joi.string().optional(),
    last_message_at: Joi.date().optional(),
    last_message_by: Joi.string().optional()
  })
  return await schema.validateAsync(data)
}

export { createChatValidation }
/** 
  members: string[]
  chat_name: string
  chat_type?: string
  last_message?: string
  last_message_at?: Date
  last_message_by?: string


*/
