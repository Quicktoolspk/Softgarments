# Softgarments — Collection Page Guide

## Page kahan hai?

**URL:** `collection.html`  
**Design:** Farasha-style minimal grid (Pakistani luxury brand look)  
**Products:** 20 items (baqi aap khud add kar sakte ho)

---

## Naya product kaise add karein?

### Step 1 — Photo upload karein

Image save karein is folder mein:

```
assets/images/collection/21.jpg
```

- Size: **800 × 1000 px** (portrait)
- Format: JPG ya WebP
- Naam: number sequence use karein (`21.jpg`, `22.jpg`, …)

### Step 2 — Product data add karein

File kholein: **`assets/collection-products.js`**

`products` array ke end mein naya object paste karein:

```javascript
{
    id: 21,
    name: "Lace Bridal Set",
    price: 3450,
    compareAt: 4600,        // optional — purani price (sale dikhegi)
    category: "shape",      // everyday | night | shape | lingerie
    image: "21.jpg"
}
```

### Step 3 — Save & refresh

Browser mein `collection.html` hard refresh karein. Product count automatically update ho jayega.

---

## Fields explained

| Field       | Required | Example              |
|------------|----------|----------------------|
| `id`       | Yes      | Unique number `21`   |
| `name`     | Yes      | Product title        |
| `price`    | Yes      | `1450` (no commas)   |
| `compareAt`| No       | Old price for sale   |
| `category` | Yes      | Filter ke liye       |
| `image`    | Yes      | `21.jpg` filename    |

---

## Categories (filters)

- `everyday` — Everyday Essentials
- `night` — Night & Lounge  
- `shape` — Shape & Support
- `lingerie` — Lingerie (future use)

Nayi category chahiye ho to filter drawer mein `collection.html` ke HTML mein checkbox add karein.

---

## Images abhi nahi hain?

Jab tak `assets/images/collection/` mein photos nahi hain, page automatically **fallback images** use karega (`assets/images/products/` aur `showcase/` se).

Server par apni photos upload karte hi woh automatically show hongi — code change ki zaroorat nahi.

---

## Homepage se link

`main.page.html` nav mein **New Arrivals** → `collection.html` par jata hai.

Aur links add karne ke liye:

```html
<a href="collection.html">Shop All</a>
```

---

## WhatsApp order

Collection grid se product par click → **detail page** khulta hai.  
Wahan **Add to Cart** ya **Buy It Now** → WhatsApp open hota hai product + size + qty ke sath.

Direct link: `product.html?id=1`

Number change karna ho to `collection-products.js` mein:

```javascript
whatsapp: "923379022920"
```

---

## 84 products tak scale karna

Farasha jaisa 84 products ke liye:

1. Har product ke liye Step 1 + Step 2 repeat karein
2. Sirf `collection-products.js` edit karein — HTML touch nahi karna
3. Grid automatically 4-column (desktop) / 3 / 2 (mobile) adjust hota hai

---

**Questions?** File dekhein: `assets/images/collection/README.txt`
