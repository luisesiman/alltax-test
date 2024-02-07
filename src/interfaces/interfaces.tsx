export interface Category {
    name: string
    products: Array<Product>
}

export interface Product {
    name: string;
    brands: Array<Brand>;
}

export interface Brand {
    name: string;
    sales: Array<Sale>;
}

export interface Sale {
    month: string;
    quantity: number
}