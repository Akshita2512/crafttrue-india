# CRAFTTRUE INDIA 🇮🇳
**Digital Craft Authenticity, Traceability & Protection Platform**  
*A Doctoral Research Intervention for Combating Craftwashing in Bagru & Sanganeri Hand-Block Printed Textiles, Rajasthan*

---

## 🏛️ Research Background & Theoretical Contribution

Traditional Indian hand-block printing (Bagru & Sanganeri GI clusters) faces an existential crisis of **craftwashing**: industrial mill-woven fabrics printed with high-speed chemical rotary screens are marketed to unsuspecting consumers at exhibitions and online with misleading claims like *"100% Ancestral Handmade Bagru Natural Dye"*.

Existing certification schemes (GI registration, Handloom Mark, Craftmark) often fail at the consumer touchpoint because:
1. **They conflate weaving with printing:** Handloom describes fabric construction; hand-block printing describes surface decoration.
2. **Binary certifications ("Authentic vs. Fake") obscure reality:** A product may be genuine hand-block printed on mill-made cotton using pigment dyes.
3. **Static QR codes are easily photocopied:** Anyone can print a QR code without linked evidence or anomaly detection.

### The CRAFTTRUE Solution: The 7-Layer Authenticity Evaluation Framework (AEF)
Instead of a generic green checkmark, CRAFTTRUE introduces:
1. **Geographical Authenticity:** Proximity to Bagru or Sanganer GI cluster boundaries.
2. **Artisan / Workshop Identity:** Validated traditional Chhipa block-printer lineage.
3. **Printing Process Authenticity:** Carved wooden block impressions vs. mechanized screen/digital printing.
4. **Material & Dye Composition:** Handloom vs. Mill fabric; Natural vegetable Dabu vs. Synthetic pigment.
5. **GI Authorised-User Status:** Verified registration with the Geographical Indications Registry.
6. **Supply-Chain Traceability:** Documented custody from mud application to river washing.
7. **Commercial Claim Authenticity:** Auditing whether seller claims match documented facts.

---

## 🚀 Interactive Ph.D. Demonstration Scenarios

To demonstrate the platform to your supervisor, committee, or research participants, test these 4 pre-configured scenarios at `/scan`:

| Scenario | Tag ID | Status | Key Demonstration Concept |
| :--- | :--- | :--- | :--- |
| **Product A** | `CTI-BAG-000184` | **VERIFIED** | Authentic Bagru Dabu Dupatta: 6-step natural indigo vat immersion, Chhipa workshop, verified GI authorised user. |
| **Product B** | `CTI-SAN-000291` | **PARTIALLY VERIFIED** | Sanganeri Floral Fabric: Hand-block printing is 100% genuine, but transparently discloses mill-made cotton and pigment dyes. |
| **Product C** | `CTI-MIS-000305` | **CRAFTWASHING / CONTRADICTED** | Exhibition Stole: Rotary screen print on poly-blend falsely marketed as "handmade natural dye Bagru craft". |
| **Product D** | `CTI-DUP-000412` | **DUPLICATE QR ALERT** | Security Anomaly: Flags cloned label when 28 scans occur across Delhi, Mumbai, and Bengaluru within 45 minutes. |

---

## 📂 System Architecture & Routes

```
src/
├── app/
│   ├── page.tsx                     # Thesis Homepage & Theoretical Framework
│   ├── scan/page.tsx                # Optical Camera & Preset Tag ID Scanner
│   ├── verify/[id]/page.tsx         # 7-Layer Scorecard, Price Breakdown & Survey Modal
│   ├── artisan/register-product/    # Product Registration & Printable Hangtag Generator
│   ├── admin/page.tsx               # Verifier Audit Trail, Anomaly Monitor & Complaints
│   └── research/page.tsx            # Empirical Survey Metrics & SPSS/R CSV Exporter
├── components/
│   ├── Navbar.tsx                   # Bilingual Navigation & 1-Click Role Switcher
│   └── Footer.tsx                   # Cluster Info & Academic Ethics Disclaimer
├── lib/
│   ├── types.ts                     # 7-Layer AEF TypeScript Interfaces
│   └── data/craftData.ts            # High-Fidelity Demonstration Dataset & Fallbacks
└── supabase/
    ├── schema.sql                   # 12-Table PostgreSQL Schema with RLS Policies
    └── seed.sql                     # Research Demonstration Seed Records
```

---

## 🛠️ Running the Application Locally

```powershell
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🗄️ Setting Up Your Live Supabase Database

1. Open your Supabase SQL Editor:  
   👉 **[https://supabase.com/dashboard/project/zzexcarynrzsmdnykadt/sql](https://supabase.com/dashboard/project/zzexcarynrzsmdnykadt/sql)**
2. Click **New query**, paste the contents of `supabase/schema.sql`, and click **Run**.
3. Click **New query**, paste the contents of `supabase/seed.sql`, and click **Run**.

---

## 📑 Research Data Collection & Export

1. When visitors inspect a product at `/verify/[id]`, they can complete the **Doctoral Perception Survey** (Measuring Authenticity Comprehension, Perceived Transparency, Trust, and Willingness to Pay).
2. Go to `/research` and click **"Export Anonymized CSV"** to instantly generate clean datasets formatted for **SPSS**, **R**, or **Excel** regression modeling.

---
*Notice: Built strictly in compliance with academic ethics guidelines and the Digital Personal Data Protection (DPDP) Act, 2023. All demo products are visibly marked `DEMO DATA — NOT REAL CERTIFICATION`.*
