import productModel from "../modules/product.module.js"
import { uploadFile } from "../services/storage.services.js"

export const createProductController = async (req, res) => {
    try {

        const { title, description, brand, category } = req.body

        const fileUrl = await Promise.all(
            (req.files || []).map(async (file) => {
                const res = await uploadFile({
                    buffer: file.buffer,
                    fileName: file.originalname
                })

                return res.url
            })
        )

        const product = await productModel.create({
            title,
            description,
            brand,
            category,
            prices: {
                amount: req.body.prices.amount,
                currency: req.body.prices.currency
            },
            sizes: req.body.sizes,
            images: fileUrl
        })

        return res.status(201).json({
            message: "product created successfully",
            data: product
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "internal server error"
        })
    }
}


export const updateProductController = async (req, res) => {
    try {

        const { id } = req.params

        const { title, description, brand, prices, sizes, category } = req.body

        const updateData = {}

        if (title !== undefined) {
            updateData.title = title
        }

        if (description !== undefined) {
            updateData.description = description
        }

        if (brand !== undefined) {
            updateData.brand = brand
        }

        if (category !== undefined) {
            updateData.category = category
        }

        if (prices !== undefined) {
            updateData.prices = prices
        }

        if (sizes !== undefined) {
            updateData.sizes = sizes
        }

        if (req.files && req.files.length > 0) {

            const fileUrl = await Promise.all(
                req.files.map(async (file) => {
                    const res = await uploadFile({
                        buffer: file.buffer,
                        fileName: file.originalname
                    })

                    return res.url
                })
            )

            updateData.images = fileUrl
        }

        const products = await productModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        )

        if (!products) {
            return res.status(404).json({
                message: "product not found"
            })
        }

        return res.status(200).json({
            message: "product updated successfully",
            data: products
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "internal server error"
        })
    }
}
