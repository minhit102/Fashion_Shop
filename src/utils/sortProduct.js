const sortProduct = (products, sort) => {
    if (sort === "nameAsc") {
        products.sort((a, b) => a.nameProduct.localeCompare(b.nameProduct));
    }

    if (sort === "nameDsc") {
        products.sort((a, b) => b.nameProduct.localeCompare(a.nameProduct));
    }

    if (sort === "priceAsc") {
        products.sort((a, b) => a.price - b.price);
    }

    if (sort === "priceDsc") {
        products.sort((a, b) => b.price - a.price);
    }

    return products;
};

module.exports = sortProduct; 
