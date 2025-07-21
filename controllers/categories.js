/* import category from "../models/categories.js";


export default {
  async getAllCategories(req, res) {
    try{
        const categories = await category.find ({ isActive:true});
        res.json(categories);
    }catch (error){
        res.status(500).json({msg:"Error al obtener categorias"})
    }
  },

  async createCategory(req, res){
      try{
        const {name, description}=req.body;

        const newCategory =({
            name,
            isActive:true,
            createdBy: req.userId
        })
      }
  }
} */