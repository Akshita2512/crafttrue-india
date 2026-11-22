import { Artisan, Category, Product } from '../types';

export const mockCategories: Category[] = [
  {
    id: 'cat-bagru-fadat',
    name: 'Bagru Fadat & Dabu',
    slug: 'bagru-fadat-dabu',
    description: 'Earthy vegetable-dyed block prints with natural indigo, madder red, and fermented iron black on warm cream ground.',
    image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80',
    item_count: 24
  },
  {
    id: 'cat-sanganer-floral',
    name: 'Sanganeri Fine Florals',
    slug: 'sanganeri-fine-florals',
    description: 'Delicate boota, bootie, and floral jaal prints on pure white mulmul and cotton-silk bases with natural plant dyes.',
    image_url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80',
    item_count: 32
  },
  {
    id: 'cat-dabu-resist',
    name: 'Dabu Mud-Resist Indigo',
    slug: 'dabu-mud-resist-indigo',
    description: 'Traditional mud-resist printing using kaali mitti and sawdust, dipped into deep subterranean indigo vats.',
    image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    item_count: 18
  },
  {
    id: 'cat-silk-sarees',
    name: 'GI Hand-Block Silk Sarees',
    slug: 'gi-hand-block-silk-sarees',
    description: 'National award-winning fine block-printed silk and tussar sarees with dual-side print registration.',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    item_count: 14
  }
];

export const mockArtisans: Artisan[] = [
  {
    id: 'BAGRU-LCD-ARTISAN',
    name: "Lalchand 'Chippa' Derawala",
    bio: 'National Award Winner (1999) and National Merit Awardee (2011). 5th-generation traditional Chhipa master printer from Laxmi Nath Chowk, Bagru. Master of classic fadat, dabu resist, and natural indigo vats with over a century of family heritage.',
    region: 'Laxmi Nath Chowk, Bagru',
    state: 'Rajasthan',
    craft_type: 'Bagru Hand-Block Printing (Fadat & Dabu Resist)',
    experience_years: 36,
    avatar_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80',
    is_verified: true,
    award_title: 'National Awardee (1999) & National Merit (2011)',
    story: 'Lalchand-ji preserves the delicate Mughal-era motifs that require up to 8 months of trials from design concept to final strike. He has taught Bagru block printing across Germany, Italy, and South Korea.'
  },
  {
    id: 'SGR-BBU-ARTISAN',
    name: 'Brij Ballabh Udaiwal',
    bio: 'National Award Winner (1991) and State Award Winner (1986). Founder of Shilpi Sansthan NGO in Sanganer, supporting over 85 artisan units and 12 women Self-Help Groups. Pioneer of natural indigo farming and pressure dyeing.',
    region: 'Siliberi, Sanganer',
    state: 'Rajasthan',
    craft_type: 'Sanganeri Hand Block Printing & Natural Indigo',
    experience_years: 34,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=1200&q=80',
    is_verified: true,
    award_title: 'National Awardee (1991) • Pehchan ID NRJPC241207',
    story: 'Holder of Government of India Pehchan ID NRJPC241207, Brij Ballabh-ji specializes in 24-hour fermented indigo stock solutions and exquisite multi-block boota printing on sparkling white river-washed cottons.'
  }
];

export const mockProducts: Product[] = [
  {
    id: 'bbbbbbbb-1111-1111-1111-111111111111',
    title: 'Bagru Classic Fadat Hand-Block Cotton Dupatta',
    slug: 'bagru-classic-fadat-dupatta',
    description: 'Authentic Bagru classic fadat print on harda-treated warm cream cotton. Printed using hand-carved Rorda wood blocks with syahi (iron-jaggery) and begar (alum-madder) vegetable dyes.',
    price_inr: 2850,
    artisan_id: 'BAGRU-LCD-ARTISAN',
    artisan_name: "Lalchand 'Chippa' Derawala",
    category_id: 'cat-bagru-fadat',
    category_name: 'Bagru Fadat & Dabu',
    heritage_origin: 'Laxmi Nath Chowk, Bagru, Jaipur, Rajasthan',
    gi_tag: 'Bagru Hand Block Print (GI No. 183)',
    material: '100% Handloom Cotton (Harda Mordanted)',
    image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    in_stock: true,
    rating: 4.9,
    review_count: 38,
    is_featured: true,
    fair_wage_share_percent: 46,
    making_time_days: 7,
    carbon_footprint_kg: 0.8
  },
  {
    id: 'bbbbbbbb-2222-2222-2222-222222222222',
    title: 'Sanganeri Fine Floral Hand-Block Mulmul Saree',
    slug: 'sanganeri-fine-floral-mulmul-saree',
    description: 'Exquisite Sanganeri floral boota and bootie printing on sparkling white river-washed cotton mulmul. Natural dyes from Manjith, Anar chilka, and Tesu flowers.',
    price_inr: 3450,
    artisan_id: 'SGR-BBU-ARTISAN',
    artisan_name: 'Brij Ballabh Udaiwal',
    category_id: 'cat-sanganer-floral',
    category_name: 'Sanganeri Fine Florals',
    heritage_origin: 'Siliberi, Sanganer, Jaipur, Rajasthan',
    gi_tag: 'Sanganeri Hand Block Printing (GI No. 147)',
    material: '100% Cotton Mulmul (Fine 100s Count)',
    image_url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    in_stock: true,
    rating: 5.0,
    review_count: 52,
    is_featured: true,
    fair_wage_share_percent: 48,
    making_time_days: 10,
    carbon_footprint_kg: 0.9
  },
  {
    id: 'BAGRU-LCD-F002',
    title: 'Bagru Dabu Mud-Resist Indigo Cotton Dupatta',
    slug: 'bagru-dabu-mud-resist-indigo-dupatta',
    description: 'Authentic Bagru dabu resist textile. Hand-printed with kaali mitti mud paste and sawdust, submerged in underground natural indigo vats with organic crackle effects.',
    price_inr: 2950,
    artisan_id: 'BAGRU-LCD-ARTISAN',
    artisan_name: "Lalchand 'Chippa' Derawala",
    category_id: 'cat-dabu-resist',
    category_name: 'Dabu Mud-Resist Indigo',
    heritage_origin: 'Bagru, Jaipur, Rajasthan',
    gi_tag: 'Bagru Hand Block Print (GI No. 183)',
    material: '100% Handloom Cotton',
    image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    in_stock: true,
    rating: 4.8,
    review_count: 29,
    is_featured: true,
    fair_wage_share_percent: 45,
    making_time_days: 8,
    carbon_footprint_kg: 0.7
  },
  {
    id: 'SGR-BBU-F004',
    title: 'National Award Category: Double-Side Block Silk Saree',
    slug: 'award-category-double-side-silk-saree',
    description: 'Museum-grade hand block-printed Bangalore silk saree using natural vegetable extracts with perfect dual-sided block alignment. Inspired by the 1991 National Award.',
    price_inr: 8900,
    artisan_id: 'SGR-BBU-ARTISAN',
    artisan_name: 'Brij Ballabh Udaiwal',
    category_id: 'cat-silk-sarees',
    category_name: 'GI Hand-Block Silk Sarees',
    heritage_origin: 'Sanganer, Jaipur, Rajasthan',
    gi_tag: 'Sanganeri Hand Block Printing (GI No. 147)',
    material: 'Pure Bangalore Silk with Vegetable Dyes',
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    in_stock: true,
    rating: 5.0,
    review_count: 17,
    is_featured: true,
    fair_wage_share_percent: 54,
    making_time_days: 18,
    carbon_footprint_kg: 1.2
  }
];
