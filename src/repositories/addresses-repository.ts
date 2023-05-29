const addresses = [{id: 1, value: 'Moscow'}, {id: 2, value: 'Kazan'}]

export const addressesRepository = {
  getAdresses() {
    return addresses
  },
  getAddressById(id: number) {
    let address = addresses.find(item => item.id === id)
    return address
  },
}