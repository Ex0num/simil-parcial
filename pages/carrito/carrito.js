//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() 
{
    let carritoObtenido = localStorage.getItem("carrito");
    let carritoParseado = JSON.parse(carritoObtenido);
    return carritoParseado;
}

function cargarProductosCarrito() 
{
    let carritoParseado = obtenerCarrito();

    let referenciaTabla = document.getElementById("tabla-carrito");

    let precioProductoString = "";
    let precioProductoNumber = 0;
    let precioFinalProducto = 0;
    
    let acumuladorPrecioTotal = 0;

    if (carritoParseado)
    {
        for (const element of carritoParseado) 
        {
            //--- Creo la nueva fila ---//
            let nuevaFila = document.createElement("tr");

            //--- Creo las celdas que necesito y les meto el dato ---//
            let celdaNombre = document.createElement("td");
            celdaNombre.innerText = element.nombre;

            let celdaCantidad = document.createElement("td");
            celdaCantidad.innerText = element.cantidad;

            let celdaPrecio = document.createElement("td");
            celdaPrecio.innerText = element.precio;

            //--- Agrego como hijas las celdas a la fila ---//
            nuevaFila.appendChild(celdaNombre);
            nuevaFila.appendChild(celdaCantidad);
            nuevaFila.appendChild(celdaPrecio);
            
            //--- Agrego la fila final a la tabla ---//
            referenciaTabla.appendChild(nuevaFila);

            precioProductoString = element.precio;
            precioProductoString = precioProductoString.replace("$","");
            precioProductoNumber = parseFloat(precioProductoString);
            precioFinalProducto = precioProductoNumber * element.cantidad;

            acumuladorPrecioTotal = acumuladorPrecioTotal + precioFinalProducto;
        }

        let textoValorFinal = document.getElementById("valor-final");
        textoValorFinal.innerText = `El valor final a pagar es de: ${acumuladorPrecioTotal}`;
    }
    else
    {
        alert("No hubo elementos en el carrito");
    }

}

function limpiarCarrito() 
{
    localStorage.removeItem("carrito");
    alert("Carrito limpiado correctamente");
    
    let referenciaTabla = document.getElementById("tabla-carrito");
    referenciaTabla.style.display = "none";

    let textoValorFinal = document.getElementById("valor-final");
    textoValorFinal.innerText = `El valor final a pagar es de: $0`;
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});