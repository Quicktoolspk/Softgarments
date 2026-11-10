/**
 * Softgarments — Collection page product list
 * ───────────────────────────────────────────
 * HOW TO ADD A NEW PRODUCT:
 * 1. Upload image to: assets/images/collection/  (e.g. 21.webp)
 * 2. Copy one object below and paste at end of `products` array
 * 3. Update: id, name, price, compareAt (optional), category, image
 * 4. Save file — page updates automatically (no HTML edit needed)
 *
 * Categories: everyday | night | shape | occasion
 */
window.SG_COLLECTION = {
    title: "Softgarments Collection '26",
    tagline: "Premium clothing · Nationwide COD",
    whatsapp: "923379022920",
    imageFolder: "assets/images/collection/",
    /* Fallback images used until you upload to collection/ folder */
    imageFallbacks: [
        "assets/images/products/01-everyday-comfort-bra.webp",
        "assets/images/products/02-cotton-panty-pack.webp",
        "assets/images/products/03-bra-panty-set.webp",
        "assets/images/products/04-night-wear.webp",
        "assets/images/showcase/bras.webp",
        "assets/images/showcase/panties.webp",
        "assets/images/showcase/sets.webp",
        "assets/images/showcase/nighties.webp",
        "assets/images/showcase/bodyshaper.webp",
        "assets/images/showcase/lingerie.webp",
        "assets/images/showcase/01-everyday-comfort-bra.webp",
        "assets/images/showcase/02-cotton-panty-pack.webp",
        "assets/images/showcase/03-bra-panty-set.webp",
        "assets/images/showcase/04-night-wear.webp",
        "assets/images/categories/bras.webp",
        "assets/images/categories/panties.webp",
        "assets/images/categories/sets.webp",
        "assets/images/categories/nighties.webp",
        "assets/images/categories/bodyshaper.webp",
        "assets/images/categories/lingerie.webp"
    ],
    products: [
        {
            id: 1,
            name: "Everyday Comfort Bra",
            price: 1450,
            compareAt: 2000,
            category: "everyday",
            image: "01.webp",
            images: [
                "assets/images/products/01-everyday-comfort-bra.webp",
                "assets/images/products/03-bra-panty-set.webp",
                "assets/images/showcase/bras.webp"
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
        { id: 2,  name: "Soft Cotton Panty Pack",     price: 950,  category: "everyday", image: "02.webp" },
        { id: 3,  name: "Breathable Bra & Panty Set", price: 2100, compareAt: 2800, category: "everyday", image: "03.webp" },
        { id: 4,  name: "Seamless T-Shirt Bra",       price: 1750, category: "everyday", image: "04.webp" },
        { id: 5,  name: "Daily Wear Cotton Bra",      price: 1250, category: "everyday", image: "05.webp" },
        { id: 6,  name: "Hipster Panty Pack",         price: 1100, category: "everyday", image: "06.webp" },
        { id: 7,  name: "Non-Padded Comfort Bra",     price: 1350, category: "everyday", image: "07.webp" },
        { id: 8,  name: "Cotton Camisole",            price: 1150, category: "everyday", image: "08.webp" },
        { id: 9,  name: "Relaxed Fit Night Wear",     price: 1850, compareAt: 2600, category: "night", image: "09.webp" },
        { id: 10, name: "Satin Night Suit",           price: 3200, compareAt: 4000, category: "night", image: "10.webp" },
        { id: 11, name: "Cotton Nighty",              price: 2150, compareAt: 2900, category: "night", image: "11.webp" },
        { id: 12, name: "Lounge Shorts Set",          price: 1950, compareAt: 2600, category: "night", image: "12.webp" },
        { id: 13, name: "Printed Sleep Shirt",        price: 1650, compareAt: 2200, category: "night", image: "13.webp" },
        { id: 14, name: "Modal Pyjama Set",           price: 2450, compareAt: 3500, category: "night", image: "14.webp" },
        { id: 15, name: "Sleeveless Nighty",          price: 1750, compareAt: 2500, category: "night", image: "15.webp" },
        { id: 16, name: "Soft Robe",                  price: 2850, compareAt: 3800, category: "night", image: "16.webp" },
        { id: 17, name: "Full Body Shaper",           price: 2950, compareAt: 4200, category: "shape", image: "17.webp" },
        { id: 18, name: "Tummy Control Shapewear",    price: 2350, compareAt: 3350, category: "shape", image: "18.webp" },
        { id: 19, name: "Thigh Shaper",               price: 1950, compareAt: 2600, category: "shape", image: "19.webp" },
        { id: 20, name: "Padded Push-Up Bra",         price: 1850, compareAt: 2450, category: "shape", image: "20.webp" }
    ]
};
