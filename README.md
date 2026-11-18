# 🌹 UTM Fragrance House — Official Brand Website

The official, bespoke digital storefront for **UTM Fragrance House** (Universiti Teknologi Malaysia, Skudai, Johor Bahru).

Built from the ground up with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## ✨ Features

- **Luxury Dark Aesthetic:** Deep burgundy (`#160408`) and brushed antique gold (`#D4AF37`) color palette with `Cinzel` serif luxury typography.
- **Drop 01 Live Countdown:** Live countdown to 30 November 2026 @ 6:00 PM for the limited 70-bottle Founders Batch (#01/70 to #70/70).
- **The Debut Collection:** 6 confirmed launch scents (LV Imagination, Dior Sauvage, Versace Eros, JPG Le Male, Armani Acqua Di Gio, YSL MYSLF).
- **Interactive Olfactory Pyramids:** Expandable note breakdowns detailing Top, Heart, and Base dry-down notes.
- **Filter & Search:** Filter by fragrance family (Fresh/Aquatic, Warm/Sweet, Spicy/Amber, Woody/Floral) or search by notes and brands.
- **Transparent Flacon Pricing:** Interactive breakdown for 30ml (RM 39), 50ml (RM 65 ⭐), and 100ml (RM 119) with spray counts and value comparisons.
- **Frictionless WhatsApp Order Builder:** Customers select their perfume, flacon size, quantity, and campus pickup station. It calculates totals and generates an order message sent directly to WhatsApp (`+60 11-4009 7486`) with celebratory confetti.
- **Campus Fulfillment Hubs:** Arked Meranti Hub, PSZ Library Foyer, and Taman Universiti with operating hours and 0 RM delivery.
- **The 20% EDP Standard:** Educational section on European oils, pure cosmetic perfumer's alcohol, and crimped gold atomizers.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Navigate to project directory
cd utm-fragrance-house

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local dev server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📦 Production Build

```bash
npm run build
npm run preview
```

---

## 🌐 Deploying to Your GitHub & Custom Domain

### 1. Push to Your GitHub
```bash
# Create a new repository on github.com (e.g. utm-fragrance-house)
git remote add origin https://github.com/YOUR_USERNAME/utm-fragrance-house.git
git branch -M main
git push -u origin main
```

### 2. Connect to Hosting (Netlify / Vercel / Cloudflare Pages)
- **Netlify:**
  1. Go to `app.netlify.com` -> **Add new site** -> **Import an existing project**.
  2. Select your GitHub repository.
  3. Build command: `npm run build`
  4. Publish directory: `dist`
  5. Click **Deploy**.

### 3. Connect Your Custom Domain
1. In your Netlify / Vercel dashboard, navigate to **Domain Management** -> **Add Custom Domain** (e.g. `utmfragrance.com`).
2. Log in to your domain registrar (e.g. Cloudflare, Namecheap, or Porkbun).
3. Add the DNS records:
   - **CNAME:** `www` -> `[your-app].netlify.app`
   - **A Record:** `@` -> `75.2.60.5` (or the IP provided by your host)
4. Your free SSL certificate will be issued automatically within 10–30 minutes!
