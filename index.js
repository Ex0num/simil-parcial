//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    let carritoObtenido = localStorage.getItem("carrito");
    let carritoParseado = JSON.parse(carritoObtenido);
    return carritoParseado;
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) 
{
   let carritoTransformadoAString = JSON.stringify(carrito);
   localStorage.setItem("carrito", carritoTransformadoAString);
}

function sumarAlCarrito(e) 
{
    console.log("Sumar a carrito llamado");

    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let itemContenedor = elementoClickeado.parentNode;
    
    let arrayHijosItemContenedor = itemContenedor.childNodes;

    let elementoNombre = itemContenedor.querySelector(".nombre-producto");
    let elementoPrecio = itemContenedor.querySelector(".precio-producto");
    let elementoDescripcion = itemContenedor.querySelector(".descripcion-producto");

    let nombreDelProducto = elementoNombre.textContent;
    let precioDelProducto = elementoPrecio.textContent;
    let textoDescripcion = elementoDescripcion.textContent;

    let productoPreExistente = false;

    let carritoParseado = obtenerCarrito();


    // Me fijo si habia algo cargado en el LocalStorage como "carrito"
    if (carritoParseado)
    {
        // Buscar si el elemento existia (para sumarle 1)
        for (let element of carritoParseado) 
        {
            if (element.nombre == nombreDelProducto) //Ya existe el producto clickeado
            {
                console.log("Elemento ya preexistia");
                element.cantidad = element.cantidad + 1;
                productoPreExistente = true;
                break;
            }
        }
    }
    else
    {
        //--- No existe el carrito ---//
        carritoParseado = [];
    }

    if (productoPreExistente == false)
    {
        //--- Ya existia el carrito ---//
        let nuevoProducto = 
        {
            "nombre": nombreDelProducto,
            "precio": precioDelProducto,
            "descripcion": textoDescripcion,
            "cantidad": 1
        }

        carritoParseado.push(nuevoProducto);
    }

    guardarCarrito(carritoParseado);
    alert(`Un/una ${nombreDelProducto} fue agregado al carrito`);
}

function restarDelCarrito(e) 
{
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    console.log("Restar a carrito llamado");

    let itemContenedor = elementoClickeado.parentNode;
    
    let arrayHijosItemContenedor = itemContenedor.childNodes;

    let elementoNombre = itemContenedor.querySelector(".nombre-producto");
    let elementoPrecio = itemContenedor.querySelector(".precio-producto");
    let elementoDescripcion = itemContenedor.querySelector(".descripcion-producto");

    let nombreDelProducto = elementoNombre.textContent;
    let precioDelProducto = elementoPrecio.textContent;
    let textoDescripcion = elementoDescripcion.textContent;

    let productoPreExistente = false;

    let carritoParseado = obtenerCarrito();


    // Me fijo si habia algo cargado en el LocalStorage como "carrito"
    if (carritoParseado)
    {
        // Buscar si el elemento existia (para sumarle 1)
        for (let element of carritoParseado) 
        {
            if (element.nombre == nombreDelProducto) //Ya existe el producto clickeado
            {
                console.log("Elemento ya preexistia");
                element.cantidad = element.cantidad + -1;
                productoPreExistente = true;
                break;
            }
        }
    }
    else
    {
        //--- No existe el carrito ---//
        carritoParseado = [];
    }

    if (carritoParseado.length == 0)
    {
        alert("No hay ningun producto en el carrito");
    }

    if (productoPreExistente == false)
    {
        //--- Ya existia el carrito ---//
        alert("No hay ningun producto cargado con ese nombre");
    }
    else
    {
        carritoParseado = carritoParseado.filter( (element) => 
        {
            if (element.cantidad == 0)
            {
                return false;
            }
            else
            {
                return true;
            }
        });
    }

    guardarCarrito(carritoParseado);
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => 
{
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});
