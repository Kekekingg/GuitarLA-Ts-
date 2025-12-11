export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItem = Guitar & {
    quantity: number
}

//Se llama lookup type, pero solo puede tomarse un solo tipo de dato a la vez
// export type GuitarID = Guitar['id'];

//Otra forma de hacerlo seria usando Pick
//export type CartItem = Pick<Guitar, 'id' | 'name' | 'image' | 'description' | 'price'> & { quantity: number };

//Otra forma de hacerlo seria usando Omit
//export type CartItem = Omit<Guitar, 'id' | 'name' | 'price'> & { quantity: number };