import type { Guitar } from '../../types';

type GuitarProps = {
    guitar: Guitar, 
    addToCart: (item: Guitar) => void 
}

function Guitars ({guitar, addToCart} : GuitarProps) {

    const {name, image, description, price } = guitar;

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>{description}</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        //Forma 1 de pasar las guitarras al carrito
                        onClick={() => addToCart(guitar)}

                        //Forma 2 de pasar las guitarras al carrito
                        //onClick={() => addToCart((prevCart) => [...prevCart, guitar])} //El ...prevCart es para no sobreescribir el estado anterior y mantiene los elementos que ya estaban en el carrito
                    >Agregar al Carrito</button>
                </div>
            </div>
    )
}
export default Guitars;