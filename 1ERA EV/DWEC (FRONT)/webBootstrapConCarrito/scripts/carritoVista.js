            async function fetchProducts() {
                try{
                    const response = await fetch("https://api.jsonblob.com/api/v1/products/01a0f28b-99b0-77e5-afdf-7ee34f9acf50");

                    if(!response.ok){
                        throw new Error(`HTTP error! ${response.status}`)
                    }
                    const data = await response.json();

                    if(data != null){
                        displayProducts(data.products, data.currency);
                    }
                        return data;
                    
                }catch(error){
                    console.error("Error: ", error);
                    
                }
            }

            function displayProducts(products, currency = "€"){
                const productsList = document.getElementById("productsList");
                const summaryList = document.getElementById("listaCompra");
                const cartTotal = document.getElementById("cartTotal");

                if (!Array.isArray(products)) {
                    throw new Error("La respuesta de la API no es una lista.");
                }

                productsList.replaceChildren();
                summaryList.replaceChildren();
                const productLines = [];
                const formatPrice = (price) => `${new Intl.NumberFormat("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(price)} ${currency}`;

                function updateCart() {
                    summaryList.replaceChildren();
                    let total = 0;

                    productLines.forEach((line) => {
                        if (line.quantity === 0) return;

                        const subtotal = line.price * line.quantity;
                        total += subtotal;
                        const summaryItem = document.createElement("li");
                        summaryItem.className = "d-flex justify-content-between gap-3 mb-2";
                        const summaryName = document.createElement("span");
                        summaryName.textContent = line.name;
                        const summaryPrice = document.createElement("span");
                        summaryPrice.textContent = formatPrice(subtotal);
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

                    const setQuantity = (quantity) => {
                        line.quantity = Math.max(0, Math.min(99, quantity));
                        quantityInput.value = String(line.quantity);
                        lineTotal.textContent = hasPrice ? formatPrice(line.price * line.quantity) : "-";
                        updateCart();
                    };

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
                    const lineTotal = document.createElement("span");
                    lineTotal.textContent = hasPrice ? formatPrice(0) : "-";
                    totalColumn.append(lineTotal);

                    row.append(details, quantityColumn, unitColumn, totalColumn);
                    item.append(row);
                    productsList.append(item);
                });

                updateCart();
            } 
        document.addEventListener("DOMContentLoaded", fetchProducts);