/**
 * Softgarments — Collection page product list
 * ───────────────────────────────────────────
 * HOW TO ADD A NEW PRODUCT:
 * 1. Upload image to: assets/images/collection/  (e.g. 21.jpg)
 * 2. Copy one object below and paste at end of `products` array
 * 3. Update: id, name, price, compareAt (optional), category, image
 * 4. Save file — page updates automatically (no HTML edit needed)
 *
 * Categories: everyday | night | shape | lingerie
 */
window.SG_COLLECTION = {
    title: "Softgarments Collection '26",
    tagline: "Premium innerwear · Nationwide COD",
    whatsapp: "923379022920",
    imageFolder: "assets/images/collection/",
    /* Fallback images used until you upload to collection/ folder */
    imageFallbacks: [
        "assets/images/products/01-everyday-comfort-bra.jpg",
        "assets/images/products/02-cotton-panty-pack.jpg",
        "assets/images/products/03-bra-panty-set.jpg",
        "assets/images/products/04-night-wear.jpg",
        "assets/images/showcase/bras.jpg",
        "assets/images/showcase/panties.jpg",
        "assets/images/showcase/sets.jpg",
        "assets/images/showcase/nighties.jpg",
        "assets/images/showcase/bodyshaper.jpg",
        "assets/images/showcase/lingerie.jpg",
        "assets/images/showcase/01-everyday-comfort-bra.jpg",
        "assets/images/showcase/02-cotton-panty-pack.jpg",
        "assets/images/showcase/03-bra-panty-set.jpg",
        "assets/images/showcase/04-night-wear.jpg",
        "assets/images/categories/bras.jpg",
        "assets/images/categories/panties.jpg",
        "assets/images/categories/sets.jpg",
        "assets/images/categories/nighties.jpg",
        "assets/images/categories/bodyshaper.jpg",
        "assets/images/categories/lingerie.jpg"
    ],
    products: [
        {
            id: 1,
            name: "Everyday Comfort Bra",
            price: 1450,
            compareAt: 2000,
            category: "everyday",
            image: "01.jpg",
            images: [
                "assets/images/products/01-everyday-comfort-bra.jpg",
                "assets/images/products/03-bra-panty-set.jpg",
                "assets/images/showcase/bras.jpg"
            ],
            optionGroups: [
                { key: "pack", label: "Pack", options: ["Single", "Pack of 2"], default: "Single" },
                { key: "size", label: "Size", options: ["S", "M", "L", "XL"], default: "M" }
            ],
            description: "Soft cotton everyday bra with breathable fabric and gentle support. Ideal for daily wear under kurtas and western tops. Hook-and-eye closure, adjustable straps.",
            modelSize: "Medium — bust 34\"",
            pleaseNote: "Actual colour may vary slightly from photos. Gentle hand wash recommended. Nationwide Cash on Delivery available.",
            deliveryInfo: "Delivery within Pakistan: 3–5 working days. Free delivery on orders over Rs. 3,000. Pay when your order arrives at your door."
        },
        { id: 2,  name: "Soft Cotton Panty Pack",     price: 950,  category: "everyday", image: "02.jpg" },
        { id: 3,  name: "Breathable Bra & Panty Set", price: 2100, compareAt: 2800, category: "everyday", image: "03.jpg" },
        { id: 4,  name: "Seamless T-Shirt Bra",       price: 1750, category: "everyday", image: "04.jpg" },
        { id: 5,  name: "Daily Wear Cotton Bra",      price: 1250, category: "everyday", image: "05.jpg" },
        { id: 6,  name: "Hipster Panty Pack",         price: 1100, category: "everyday", image: "06.jpg" },
        { id: 7,  name: "Non-Padded Comfort Bra",     price: 1350, category: "everyday", image: "07.jpg" },
        { id: 8,  name: "Cotton Camisole",            price: 1150, category: "everyday", image: "08.jpg" },
        { id: 9,  name: "Relaxed Fit Night Wear",     price: 1850, compareAt: 2600, category: "night", image: "09.jpg" },
        { id: 10, name: "Satin Night Suit",           price: 3200, compareAt: 4000, category: "night", image: "10.jpg" },
        { id: 11, name: "Cotton Nighty",              price: 2150, compareAt: 2900, category: "night", image: "11.jpg" },
        { id: 12, name: "Lounge Shorts Set",          price: 1950, compareAt: 2600, category: "night", image: "12.jpg" },
        { id: 13, name: "Printed Sleep Shirt",        price: 1650, compareAt: 2200, category: "night", image: "13.jpg" },
        { id: 14, name: "Modal Pyjama Set",           price: 2450, compareAt: 3500, category: "night", image: "14.jpg" },
        { id: 15, name: "Sleeveless Nighty",          price: 1750, compareAt: 2500, category: "night", image: "15.jpg" },
        { id: 16, name: "Soft Robe",                  price: 2850, compareAt: 3800, category: "night", image: "16.jpg" },
        { id: 17, name: "Full Body Shaper",           price: 2950, compareAt: 4200, category: "shape", image: "17.jpg" },
        { id: 18, name: "Tummy Control Shapewear",    price: 2350, compareAt: 3350, category: "shape", image: "18.jpg" },
        { id: 19, name: "Thigh Shaper",               price: 1950, compareAt: 2600, category: "shape", image: "19.jpg" },
        { id: 20, name: "Padded Push-Up Bra",         price: 1850, compareAt: 2450, category: "shape", image: "20.jpg" }
    ]
};
