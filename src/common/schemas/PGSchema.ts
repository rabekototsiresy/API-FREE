import * as Joi from 'joi';


const pliGeneriqueObject = {
    codeArticle: Joi.string().required(),
    quantite: Joi.number().required(),
}

export const pliGeneriqueSchema = Joi.object(pliGeneriqueObject)

