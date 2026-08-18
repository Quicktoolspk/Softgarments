# Softgarments — Product Detail Page Guide

## Page kahan hai?

**URL format:** `product.html?id=1`  
**Example:** `product.html?id=1` → Everyday Comfort Bra  
**Design:** Farasha-style product page (gallery, options, accordions, related products)

Collection se kisi bhi product par click karein → detail page khulega.

---

## Naya product add karna (full detail ke sath)

### Step 1 — Photos upload karein

```
assets/images/collection/21.jpg
assets/images/collection/21b.jpg   ← optional extra gallery images
```

- Main image: **800 × 1000 px** (portrait)
- Extra angles: same size, naam `21b.jpg`, `21c.jpg` etc.

### Step 2 — `assets/collection-products.js` mein product add karein

**Basic fields (collection grid ke liye zaroori):**

```javascript
{
    id: 21,
    name: "Lace Comfort Set",
    price: 2450,
    compareAt: 3200,        // optional — sale price dikhegi
    category: "everyday",   // everyday | night | shape | lingerie
    image: "21.jpg"
}
```

**Detail page fields (optional — na ho to automatic defaults lagenge):**

```javascript
{
    id: 21,
    name: "Lace Comfort Set",
    price: 2450,
    compareAt: 3200,
    category: "everyday",
    image: "21.jpg",
    images: ["21.jpg", "21b.jpg"],          // gallery — ek ho to thumb strip hide
    optionGroups: [
        { key: "pack", label: "Pack", options: ["Single", "Pack of 2"], default: "Single" },
        { key: "size", label: "Size", options: ["S", "M", "L", "XL"], default: "M" }
    ],
    description: "Full product description yahan likhein...",
    modelSize: "Medium — bust 34\"",
    pleaseNote: "Colour thori vary ho sakti hai. Gentle hand wash.",
    deliveryInfo: "Nationwide COD. 3–5 working days delivery."
}
```

### Step 3 — Save & test

Browser mein kholein:

```
product.html?id=21
```

Collection page par bhi automatically naya product show hoga.

---

## Fields explained

| Field | Required | Kya karta hai |
|-------|----------|---------------|
| `id` | Yes | Unique number — URL mein use hota hai |
| `name` | Yes | Product title |
| `price` | Yes | Rs. mein, bina comma |
| `compareAt` | No | Purani price (strikethrough) |
| `category` | Yes | Filter + related products |
| `image` | Yes | Main photo filename |
| `images` | No | Gallery array — warna sirf `image` |
| `optionGroups` | No | Pack, Size waghera buttons |
| `description` | No | Accordion — Description |
| `modelSize` | No | Accordion — Model Size |
| `pleaseNote` | No | Accordion — Please Note |
| `deliveryInfo` | No | Accordion — Delivery Information |

---

## Option groups (Farasha jaisa)

Har group ek row banata hai — label + selectable buttons:

```javascript
optionGroups: [
    { key: "pack", label: "Pack", options: ["Single", "Pack of 3"], default: "Single" },
    { key: "size", label: "Size", options: ["S", "M", "L", "XL"], default: "M" }
]
```

- `key` — internal ID (unique per product)
- `label` — screen par dikhta hai ("Pack:", "Size:")
- `options` — button labels
- `default` — pehle se selected option

Agar `optionGroups` na ho to category ke hisaab se default sizes lag jate hain.

---

## WhatsApp order

- **Add to Cart** → WhatsApp message with product + selected options + qty
- **Buy It Now** → same, "buy now" wording ke sath

Number change: `collection-products.js` → `whatsapp: "923379022920"`

---

## Related products

Neeche **You May Also Like** section automatically:
1. Same category ke 4 products
2. Agar kam hon to doosri products se fill

Koi extra code nahi chahiye.

---

## Size chart

Har product par **Size Chart** button → modal with S/M/L/XL table.  
Table edit karna ho to `product.html` mein `.pd-size-table` section.

---

## Files summary

| File | Kaam |
|------|------|
| `product.html` | Detail page layout + header/footer |
| `assets/product-page.js` | Gallery, options, accordions, related |
| `assets/collection-products.js` | **Sirf yahan products edit karein** |
| `collection.html` | Grid — cards ab `product.html?id=X` par jate hain |

---

## Quick checklist — naya product

- [ ] Photo upload `assets/images/collection/XX.jpg`
- [ ] `collection-products.js` mein object add (unique `id`)
- [ ] Optional: `description`, `images`, `optionGroups`
- [ ] Test: `product.html?id=XX`
- [ ] Test: `collection.html` par card dikhe

---

**Pehle se guide:** `COLLECTION-GUIDE.md` (collection grid ke liye)
