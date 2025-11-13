import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    unique: true,
    required: true
  },
  items: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true
      },
      cantidad: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }
  ]
}, { timestamps: true });

// Asegurar que items siempre sea un array
carritoSchema.pre("save", function (next) {
  if (!Array.isArray(this.items)) {
    this.items = [];
  }
  next();
});

export default mongoose.model("Carrito", carritoSchema);
