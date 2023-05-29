import { Request, Response, Router } from "express"
import { productsRepository } from "../repositories/products-repository"

export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
	let foundProducts = productsRepository.findProducts(req.query.title?.toString())
	res.send(foundProducts)
})

productsRouter.post('/', (req: Request, res: Response) => {
	let newProduct = productsRepository.createProduct(req.body.title)
	res.status(201).send(newProduct)
})

productsRouter.get('/:id', (req: Request, res: Response) => {
	let product = productsRepository.getProductById(+req.params.id)
	if (product) {
		res.send(product)
	} else {
		res.send(404)
	}
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
	const isDeleted = productsRepository.deleteProduct(+req.params.id)
	if (isDeleted) {
		res.send(204)
	} else {
		res.send(404)
	}
})

productsRouter.put('/:id', (req: Request, res: Response) => {
	let product = productsRepository.updateProduct(+req.params.id, req.body.title)
	if (product) {
		res.send(product)
	} else {
		res.send(404)
	}
})