const {Cart} = require('../models/Carrito');
const { param } = require('../routes/ProductRoutes');

//controlador para ver el carrito
const getCarritoId = async (req, res) => {
    const id = req.params.id
    try {
        const carrito = await Cart.findById (id)
        if(!carrito) {
            return res.status(404).json({
                mensaje: "no se encontró carrito según id ingresado",
                status: "no ok"
            })
        }
        return res.status(200).json({
            mensaje: "carrito encontrado",
            status:"ok",
            data: carrito
        })
    } catch (error) {
        console.error(error)
        return res.status (500).json ({
            mensaje: "revisar logs",
            status: "no ok"
        })
    }
}

//controlador para agregar producto al carrito

const agregarProductoCarrito = async (req, res) => {
    const carritoId =req.params.id
    const {productId, quantity, userId} = req.body
    if(!productId||!quantity||!userId){
        return res.status(422).json({
            mensaje: "Ingrese productId, quantity y userId",
            status: "no ok"
        })

    }
    try {
        const carritoCreado = new Cart({
            items:[{
                productId,
                quantity
                
            }],
            userId
        })
        await carritoCreado.save()
        return res.status(201).json(carritoCreado)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensaje: "Algo salió mal, revisar los logs",
            status:"no ok"
        })
    }
  
}

//ruta para adicionar producto al carrito

const cantidadProductoCarrito = async (req, res) => {
    const id =req.params.id
    res.send(`adicionar o sustraer de a un producto al carrito: ${id}`)
}

//ruta para eliminar productos del carrito

const eliminarProductoCarrito = async (req, res) => {
    const carritoId =req.params.id
    const id = req.params.id
    try {
        const carrito = await Cart.findByIdAndDelete (id)
        if(!carrito){
            return res.status(404).json({
                mensaje: "no se logra eliminar, carrito no encontrado",
                status: "no ok"
            })
        }
        return res.status(200).json({
            mensaje: "carrito eliminado",
            status: "ok"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            mensaje: "algo salió mal, revisar logs",
            status: "no ok"
        })
    }
}

module.exports = {
    getCarritoId,
    agregarProductoCarrito,
    cantidadProductoCarrito,
    eliminarProductoCarrito,
}