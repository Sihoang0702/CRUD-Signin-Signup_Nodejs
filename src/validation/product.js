import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required().min(5).max(200).messages({
    "string.empty": "Không được để trống tên sản phẩm",
    "string.min": "Không dưới 5 kí tự",
    "string.max": "Không quá 200 kí tự",
  }),
  desc: Joi.string().required().min(5).max(1000).messages({
    "string.empty": "Không được để trống tên sản phẩm",
    "string.min": "Không dưới 5 kí tự",
    "string.max": "Không quá 1000 kí tự",
  }),
  price: Joi.number().required().messages({
    "number.empty": "Không được để trống giá sản phẩm",
  }),
});
export default productSchema;
