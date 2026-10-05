const cacheKey = "carroVista.products";

const storedData = localStorage.getItem(cacheKey);

let cachedData;

let cachedDuration = 5 * 60 * 60 * 1000;
        
// Primer try, para comprobar si hay datos almacenados
try{
    if(storedData){
        const data = JSON.parse(storedData);

        if(data && Array.isArray(data.products)){
            cachedData = data;

            displayProducts(data.products, data.currency);

            const cachedAge = (Date.now() - cachedData._cachedAt);

                if(Number.isFinite(data._cachedAt) && cachedAge >= 0 && cachedAge < cachedDuration){
                    return data;
                }
        }else{
            localStorage.removeItem(cacheKey);
        }
    }
} catch (error){
    console.error("Atense los cinturones, toca trabajo", error);
}

// Después de comprobar la caché, intentamos el fetch a la url
try{
    fetch("https://agoodshop.free.beeceptor.com")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data || !Array.isArray(data.products)) {
                throw new Error("La respuesta no contiene una lista de productos.");
            }

            displayProducts(data.products, data.currency);

            localStorage.setItem(cacheKey, JSON.stringify({
                ...data,
                _cachedAt: Date.now()
            }));
        })
        .catch(error => {
            console.error("Error al obtener los productos:", error);
        });
}catch(error){
    console.error("Atense los cinturones, toca trabajo", error);
}

// Construye en la página la lista de productos recibida.
            function displayProducts(products, currency = "€") {
                // Obtiene los elementos HTML donde se mostrarán los productos y el carrito.
                const productsList = document.getElementById("productsList");
                const summaryList = document.getElementById("listaCompra");
                const cartTotal = document.getElementById("cartTotal");

                // Comprueba que products sea realmente una lista antes de recorrerla.
                if (!Array.isArray(products)) {
                    throw new Error("La respuesta de la API no es una lista.");
                }

                // Limpia el contenido anterior para evitar duplicarlo al volver a mostrar productos.
                productsList.replaceChildren();
                summaryList.replaceChildren();

                // Guarda los datos que se necesitan para calcular cada producto del carrito.
                const productLines = [];

                // Formatea importes según el formato español y añade el símbolo de moneda.
                const formatPrice = (price) => {
                    const formattedPrice = new Intl.NumberFormat("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(price);

                    return `${formattedPrice} ${currency}`;
                };

                // Vuelve a dibujar el resumen y recalcula el importe total del carrito.
                function updateCart() {
                    // El resumen se reconstruye con las cantidades actuales.
                    summaryList.replaceChildren();
                    let total = 0;

                    // Recorre los productos añadidos al carrito.
                    productLines.forEach((line) => {
                        // No incluye en el resumen los productos con cantidad cero.
                        if (line.quantity === 0) return;

                        // Crea una fila con el nombre del producto y su subtotal.
                        const summaryItem = document.createElement("li");
                        summaryItem.className = "d-flex justify-content-between gap-3 mb-2";
                        const summaryName = document.createElement("span");
                        summaryName.textContent = line.name;
                        const summaryPrice = document.createElement("span");

                        // El subtotal es el precio unitario multiplicado por la cantidad.
                        const subtotal = line.price * line.quantity;
                        summaryPrice.textContent = formatPrice(subtotal);

                        // Añade el subtotal al total general y la fila a la lista del resumen.
                        total += subtotal;
                        summaryItem.append(summaryName, summaryPrice);
                        summaryList.append(summaryItem);
                    });

                    // Actualiza el total que aparece debajo del resumen.
                    cartTotal.textContent = formatPrice(total);
                }

                // Recorre la lista recibida y crea los elementos HTML de cada producto.
                products.forEach((product) => {
                    // Contenedor principal de la fila del producto.
                    const item = document.createElement("div");
                    item.className = "list-group-item px-0";

                    // Fila de Bootstrap que distribuye los datos en columnas.
                    const row = document.createElement("div");
                    row.className = "row align-items-center g-2";

                    // Columna donde se muestra el nombre y, si existe, la referencia.
                    const details = document.createElement("div");
                    details.className = "col-12 col-md-5";

                    // Usa name o title como nombre; si faltan ambos, muestra un texto alternativo.
                    const name = document.createElement("h3");
                    name.className = "h5 mb-1";
                    name.textContent = product.name ?? product.title ?? "Producto sin nombre";
                    details.append(name);

                    // Acepta SKU o sku como referencia y la muestra si tiene valor.
                    const reference = product.SKU ?? product.sku;
                    if (reference) {
                        const referenceText = document.createElement("p");
                        referenceText.className = "text-secondary small mb-0";
                        referenceText.textContent = `Ref: ${reference}`;
                        details.append(referenceText);
                    }

                    // Acepta price o precio y comprueba que se pueda convertir a número.
                    const rawPrice = product.price ?? product.precio;
                    const price = Number(rawPrice);
                    const hasPrice = rawPrice !== undefined && rawPrice !== null && Number.isFinite(price);

                    // Guarda el estado de este producto para poder actualizar cantidad y subtotal.
                    const line = { name: name.textContent, price: hasPrice ? price : 0, quantity: 0 };
                    productLines.push(line);

                    // Columna que contiene los controles para cambiar la cantidad.
                    const quantityColumn = document.createElement("div");
                    quantityColumn.className = "col-6 col-md-3 d-flex justify-content-md-center";

                    // Agrupa los botones y el campo numérico como un control de Bootstrap.
                    const quantityControls = document.createElement("div");
                    quantityControls.className = "input-group input-group-sm";
                    quantityControls.style.maxWidth = "9rem";

                    // Botón para restar una unidad.
                    const decrease = document.createElement("button");
                    decrease.className = "btn btn-outline-secondary";
                    decrease.type = "button";
                    decrease.textContent = "-";
                    decrease.setAttribute("aria-label", `Quitar una unidad de ${line.name}`);

                    // Campo para escribir directamente la cantidad deseada.
                    const quantityInput = document.createElement("input");
                    quantityInput.className = "form-control text-center";
                    quantityInput.type = "number";
                    quantityInput.min = "0";
                    quantityInput.max = "99";
                    quantityInput.step = "1";
                    quantityInput.value = "0";
                    quantityInput.setAttribute("aria-label", `Cantidad de ${line.name}`);

                    // Botón para sumar una unidad.
                    const increase = document.createElement("button");
                    increase.className = "btn btn-outline-secondary";
                    increase.type = "button";
                    increase.textContent = "+";
                    increase.setAttribute("aria-label", `Añadir una unidad de ${line.name}`);

                    // Muestra el subtotal de este producto; inicialmente la cantidad es cero.
                    const lineTotal = document.createElement("span");
                    lineTotal.textContent = hasPrice ? formatPrice(0) : "-";

                    // Actualiza la cantidad, el campo, el subtotal y el resumen del carrito.
                    function setQuantity(quantity) {
                        // Limita la cantidad a un entero entre 0 y 99.
                        line.quantity = Math.max(0, Math.min(99, Math.trunc(quantity)));
                        quantityInput.value = String(line.quantity);
                        lineTotal.textContent = hasPrice ? formatPrice(line.price * line.quantity) : "-";
                        updateCart();
                    }

                    // Desactiva los controles cuando el producto no tiene un precio válido.
                    decrease.disabled = !hasPrice;
                    increase.disabled = !hasPrice;
                    quantityInput.disabled = !hasPrice;

                    // Asocia los botones y el campo con la función que actualiza la cantidad.
                    decrease.addEventListener("click", () => setQuantity(line.quantity - 1));
                    increase.addEventListener("click", () => setQuantity(line.quantity + 1));
                    quantityInput.addEventListener("change", () => {
                        const quantity = Number(quantityInput.value);
                        // Si el valor introducido no es un entero, se establece en cero.
                        setQuantity(Number.isInteger(quantity) ? quantity : 0);
                    });

                    // Inserta los controles dentro de su columna.
                    quantityControls.append(decrease, quantityInput, increase);
                    quantityColumn.append(quantityControls);

                    // Columna que muestra el precio por unidad.
                    const unitColumn = document.createElement("div");
                    unitColumn.className = "col-3 col-md-2 text-nowrap";
                    unitColumn.textContent = hasPrice ? formatPrice(line.price) : "-";

                    // Columna que muestra el subtotal para la cantidad seleccionada.
                    const totalColumn = document.createElement("div");
                    totalColumn.className = "col-3 col-md-2 text-end text-nowrap fw-semibold";
                    totalColumn.append(lineTotal);

                    // Reúne las columnas en la fila, y la fila en la lista de productos.
                    row.append(details, quantityColumn, unitColumn, totalColumn);
                    item.append(row);
                    productsList.append(item);
                });

                // Muestra el total inicial, que será cero hasta que se añadan productos.
                updateCart();
            }

        // Espera a que el HTML esté cargado antes de buscar sus elementos y obtener los productos.
        document.addEventListener("DOMContentLoaded", fetchProducts);