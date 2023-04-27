export interface SignUp {
    name: string,
    password: string,
    email: string
}
export interface login {
    email: String,
    password: String
}

export interface product {
    id: number,
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: string,
    quantity: undefined | number
    productId: undefined | number

}
export interface cart {
    id: number | any,
    name: string,
    price: number,
    color: string,
    category: string,
    description: string,
    image: string,
    quantity: undefined | number,
    userId?: number,
    productId: number
}
export interface priceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}