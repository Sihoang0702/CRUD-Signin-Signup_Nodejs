import dotenv from "dotenv";
import product from "../models/product.js";
import productSchema from "../validation/product.js";
dotenv.config();

export const getAll = async (req, res) => {
  try {
    // const { data } = await axios.get(`${API_URL}/products`);
    const data = await product.find({});
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Gọi danh sách sản phẩm thành công!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    // const { data } = await axios.get(`${API_URL}/products/${id}`);
    const data = await product.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.status(200).json({
      message: "Gọi chi tiết sản phẩm thành công!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const addNew = async (req, res) => {
  try {
    const body = req.body;
    // const { data } = await axios.post(`${API_URL}/products`, body);
    const { error } = productSchema.validate(body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const data = await product.create(body);
    if (!data) {
      return res.status(404).json({
        message: "Tạo mới sản phẩm thất bại!",
      });
    }
    return res.status(200).json({
      message: "Tạo mới sản phẩm thành công!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    // const { data } = await axios.put(`${API_URL}/products/${id}`, body);
    const { error } = productSchema.validate(body);
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    const data = await product.findByIdAndUpdate(id, body, { new: true });
    console.log(data);
    if (!data) {
      return res.status(404).json({
        message: "Cập nhật sản phẩm thất bại!",
      });
    }
    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công!",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    // const { status } = await axios.delete(`${API_URL}/products/${id}`);
    const data = await product.findByIdAndDelete(id);
    console.log(data);
    if (!data) {
      return res.status(404).json({
        message: "Xoá sản phẩm thất bại!",
      });
    }
    return res.status(200).json({
      message: "Xoá sản phẩm thành công!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Xoá sản phẩm thất bại!",
    });
  }
};
