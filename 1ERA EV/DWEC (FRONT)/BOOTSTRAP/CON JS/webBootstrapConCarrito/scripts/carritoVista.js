// ------FUNCIÓN PARA OBTENER PRODUCTOS MEDIANTE CONEXIÓN A API (SE USA BEECEPTOR (GRATUITO SIN LOGUEAR, LÍMITE DE 50 PETICIONES/DÍA))---------
function fetchProducts() {
    const cacheKey = "carroVista.products";
    const cachedDuration = 5 * 60 * 60 * 1000;
    let cachedData;

    try {//INTENTAR OBTENER DATOS GUARDADOS EN LOCALSTORAGE
        const storedData = localStorage.getItem(cacheKey);
        if (storedData) {
            const data = JSON.parse(storedData);

            if (data && Array.isArray(data.products)) {
                cachedData = data;
                displayProducts(data.products, data.currency);

                const cachedAge = Date.now() - data._cachedAt;
                if (Number.isFinite(data._cachedAt) && cachedAge >= 0 && cachedAge < cachedDuration) {
                    return Promise.resolve(data);
                }
            } else {
                localStorage.removeItem(cacheKey);
            }
        }
    } catch (error) {
        console.error("Error al leer la caché de productos:", error);
    }
    //SI NO HAY DATOS LOCALOS, SE RETORNA UNA PROMESA TIPO FETCH, PARA OBTENER PRODUCTOS
    return fetch("https://agoodshop.free.beeceptor.com", { cache: "no-store" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}`);
            }
            return response.json();//CONVERTIRLA A FORMATO JSON
        })
        .then(data => {
            if (!data || !Array.isArray(data.products)) {
                throw new Error("La respuesta no contiene una lista de productos.");
            }

            displayProducts(data.products, data.currency);//SI HAY DATOS, MOSTRARLOS

            try {//Y GUARDARLOS EN LOCALSTORAGE
                localStorage.setItem(cacheKey, JSON.stringify({
                    ...data,
                    _cachedAt: Date.now()
                }));
            } catch (error) {
                console.error("Error al guardar la caché de productos:", error);
            }
            return data;
        })
        .catch(error => {
            console.error("Error al obtener los productos:", error);
            return cachedData;
        });
}

// ------FUNCIÓN PARA MOSTRAR PRODUCTOS UNA VEZ OBTENIDOS---------
            function displayProducts(products, currency = "€") {
                const productsList = document.getElementById("productsList");
                const summaryList = document.getElementById("listaCompra");
                const cartTotal = document.getElementById("cartTotal");

                if (!Array.isArray(products)) {//SI NO ES UNA LISTA
                    throw new Error("La respuesta de la API no es una lista.");
                }

                productsList.replaceChildren();
                summaryList.replaceChildren();

                const productLines = [];

                const formatPrice = (price) => { 
                    const formattedPrice = new Intl.NumberFormat("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(price);

                    return `${formattedPrice} ${currency}`;
                };

                function updateCart() {
                    summaryList.replaceChildren();
                    let total = 0;

                    productLines.forEach((line) => {
                        if (line.quantity === 0) return;

                        const summaryItem = document.createElement("li");
                        summaryItem.className = "d-flex justify-content-between gap-3 mb-2";
                        const summaryName = document.createElement("span");
                        summaryName.textContent = line.name;
                        const summaryPrice = document.createElement("span");

                        const subtotal = line.price * line.quantity;
                        summaryPrice.textContent = formatPrice(subtotal);

                        total += subtotal;
                        summaryItem.append(summaryName, summaryPrice);
                        summaryList.append(summaryItem);
                    });

                    cartTotal.textContent = formatPrice(total);
                }

                products.forEach((product) => {
                    const item = document.createElement("div");
                    item.className = "list-group-item px-0";

                    const row = document.createElement("div");
                    row.className = "row align-items-center g-2";

                    const details = document.createElement("div");
                    details.className = "col-12 col-md-5";

                    const name = document.createElement("h3");
                    name.className = "h5 mb-1";
                    name.textContent = product.name ?? product.title ?? "Producto sin nombre";
                    details.append(name);

                    const reference = product.SKU ?? product.sku;
                    if (reference) {
                        const referenceText = document.createElement("p");
                        referenceText.className = "text-secondary small mb-0";
                        referenceText.textContent = `Ref: ${reference}`;
                        details.append(referenceText);
                    }

                    const rawPrice = product.price ?? product.precio;
                    const price = Number(rawPrice);
                    const hasPrice = rawPrice !== undefined && rawPrice !== null && Number.isFinite(price);

                    const line = { name: name.textContent, price: hasPrice ? price : 0, quantity: 0 };
                    productLines.push(line);

                    const quantityColumn = document.createElement("div");
                    quantityColumn.className = "col-6 col-md-3 d-flex justify-content-md-center";

                    const quantityControls = document.createElement("div");
                    quantityControls.className = "input-group input-group-sm";
                    quantityControls.style.maxWidth = "9rem";

                    const decrease = document.createElement("button");
                    decrease.className = "btn btn-outline-secondary";
                    decrease.type = "button";
                    decrease.textContent = "-";
                    decrease.setAttribute("aria-label", `Quitar una unidad de ${line.name}`);

                    const quantityInput = document.createElement("input");
                    quantityInput.className = "form-control text-center";
                    quantityInput.type = "number";
                    quantityInput.min = "0";
                    quantityInput.max = "99";
                    quantityInput.step = "1";
                    quantityInput.value = "0";
                    quantityInput.setAttribute("aria-label", `Cantidad de ${line.name}`);

                    const increase = document.createElement("button");
                    increase.className = "btn btn-outline-secondary";
                    increase.type = "button";
                    increase.textContent = "+";
                    increase.setAttribute("aria-label", `Añadir una unidad de ${line.name}`);

                    const lineTotal = document.createElement("span");
                    lineTotal.textContent = hasPrice ? formatPrice(0) : "-";

                    function setQuantity(quantity) {
                        line.quantity = Math.max(0, Math.min(99, Math.trunc(quantity)));
                        quantityInput.value = String(line.quantity);
                        lineTotal.textContent = hasPrice ? formatPrice(line.price * line.quantity) : "-";
                        updateCart();
                    }

                    decrease.disabled = !hasPrice;
                    increase.disabled = !hasPrice;
                    quantityInput.disabled = !hasPrice;

                    decrease.addEventListener("click", () => setQuantity(line.quantity - 1));
                    increase.addEventListener("click", () => setQuantity(line.quantity + 1));
                    quantityInput.addEventListener("change", () => {
                        const quantity = Number(quantityInput.value);
                        setQuantity(Number.isInteger(quantity) ? quantity : 0);
                    });

                    quantityControls.append(decrease, quantityInput, increase);
                    quantityColumn.append(quantityControls);

                    const unitColumn = document.createElement("div");
                    unitColumn.className = "col-3 col-md-2 text-nowrap";
                    unitColumn.textContent = hasPrice ? formatPrice(line.price) : "-";

                    const totalColumn = document.createElement("div");
                    totalColumn.className = "col-3 col-md-2 text-end text-nowrap fw-semibold";
                    totalColumn.append(lineTotal);

                    row.append(details, quantityColumn, unitColumn, totalColumn);
                    item.append(row);
                    productsList.append(item);
                });

                updateCart();
            }

        // Espera a que el HTML esté cargado antes de buscar sus elementos y obtener los productos.
        document.addEventListener("DOMContentLoaded", fetchProducts);