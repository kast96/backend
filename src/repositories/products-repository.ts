const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
  findProducts(title: string | null | undefined) {
    if (title) {
      let filtredProducts = products.filter(item => item.title.indexOf(title) > -1)
      return filtredProducts
    } else {
      return products
    }
  },
  getProductById(id: number) {
    let product = products.find(item => item.id === id)
    return product
  },
  createProduct(title: string) {
    const product = {
      id: +(new Date()),
      title: title
    }
    products.push(product)
    return product
  },
  updateProduct(id: number, title: string) {
    let product = products.find(item => item.id === id)
    if (product) {
      product.title = title
      return product
    } else {
      return false
    }
  },
  deleteProduct(id: number) {
    for (let i=0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1)
        return true
      }
    }
    return false
  }
}