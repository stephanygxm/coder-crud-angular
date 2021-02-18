export interface Product {
    // a ? é para dizer que o id é opcional, pois quando for criar um produto, não precisa fornecer o id
    id?: number
    name: string
    price: number
}