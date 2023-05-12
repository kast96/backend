import { Request, Response, Router } from "express"

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
	if (req.query.title) {
		let searchString = req.query.title.toString()
		res.send(products.filter(item => item.title.indexOf(searchString) > -1))
	} else {
		res.send(products)
	}
})

productsRouter.post('/', (req: Request, res: Response) => {
	const product = {
		id: +(new Date()),
		title: req.body.title
	}
	products.push(product)
	res.status(201).send(product)
})

productsRouter.get('/:id', (req: Request, res: Response) => {
	let product = products.find(item => item.id === +req.params.id)
	if (product) {
		res.send(product)
	} else {
		res.send(404)
	}
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
	for (let i=0; i < products.length; i++) {
		if (products[i].id === +req.params.id) {
			products.splice(i, 1)
			res.send(204)
			return
		}
	}
	
	res.send(404)
})

productsRouter.put('/:id', (req: Request, res: Response) => {
	let product = products.find(item => item.id === +req.params.id)
	if (product) {
		product.title = req.body.title
		res.send(product)
	} else {
		res.send(404)
	}
})