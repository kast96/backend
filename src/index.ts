import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3000

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: 'Moscow'}, {id: 2, value: 'Kazan'}]

const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World!')
})

app.get('/products', (req: Request, res: Response) => {
	if (req.query.title) {
		let searchString = req.query.title.toString()
		res.send(products.filter(item => item.title.indexOf(searchString) > -1))
	} else {
		res.send(products)
	}
})

app.post('/products/', (req: Request, res: Response) => {
	const product = {
		id: +(new Date()),
		title: req.body.title
	}
	products.push(product)
	res.status(201).send(product)
})

app.get('/products/:id', (req: Request, res: Response) => {
	let product = products.find(item => item.id === +req.params.id)
	if (product) {
		res.send(product)
	} else {
		res.send(404)
	}
})

app.delete('/products/:id', (req: Request, res: Response) => {
	for (let i=0; i < products.length; i++) {
		if (products[i].id === +req.params.id) {
			products.splice(i, 1)
			res.send(204)
			return
		}
	}
	
	res.send(404)
})

app.put('/products/:id', (req: Request, res: Response) => {
	let product = products.find(item => item.id === +req.params.id)
	if (product) {
		product.title = req.body.title
		res.send(product)
	} else {
		res.send(404)
	}
})

app.get('/addresses', (req: Request, res: Response) => {
	res.send(addresses)
})

app.get('/addresses/:id', (req: Request, res: Response) => {
	let address = addresses.find(item => item.id === +req.params.id)
	if (address) {
		res.send(address)
	} else {
		res.send(404)
	}
})


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})