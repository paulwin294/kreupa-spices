import cardamom from "@/assets/p-cardamom.jpg";

export type Category = {
  slug: string;
  name: string;
  blurb: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  weight: string;
  origin: string;
  image: string;
  short: string;
  description: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
};

export const categories: Category[] = [
  {
    slug: "premium",
    name: "Premium Green Cardamom",
    blurb: "Selected whole green cardamom pods from Kerala.",
  },
  {
    slug: "retail",
    name: "Retail Packs",
    blurb: "Convenient packs for homes and small businesses.",
  },
  {
    slug: "bulk",
    name: "Bulk & Wholesale",
    blurb: "Larger quantities for retailers and business buyers.",
  },
];

export const products: Product[] = [
  {
    id: "kr-card-050",
    slug: "premium-green-cardamom-50g",
    name: "KREUPA Premium Green Cardamom",
    category: "retail",
    price: 149,
    weight: "50 g",
    origin: "Kerala, India",
    image: cardamom,
    short: "Aromatic whole green cardamom for everyday use.",
    description:
      "Premium whole green cardamom selected for its fresh aroma, natural colour and characteristic sweet-spicy flavour.",
    stock: 100,
    rating: 0,
    reviewCount: 0,
    tags: ["green cardamom", "retail", "50g"],
  },

  {
    id: "kr-card-100",
    slug: "premium-green-cardamom-100g",
    name: "KREUPA Premium Green Cardamom",
    category: "premium",
    price: 279,
    compareAt: 299,
    weight: "100 g",
    origin: "Kerala, India",
    image: cardamom,
    short: "Premium whole pods with rich natural aroma.",
    description:
      "Carefully selected green cardamom pods designed for customers who want premium quality in a convenient household pack.",
    stock: 100,
    rating: 0,
    reviewCount: 0,
    tags: ["bestseller", "green cardamom", "premium"],
  },

  {
    id: "kr-card-250",
    slug: "premium-green-cardamom-250g",
    name: "KREUPA Premium Green Cardamom",
    category: "retail",
    price: 649,
    weight: "250 g",
    origin: "Kerala, India",
    image: cardamom,
    short: "A larger premium pack for regular cardamom users.",
    description:
      "Whole green cardamom selected and packed for customers who use cardamom regularly in tea, desserts and cooking.",
    stock: 75,
    rating: 0,
    reviewCount: 0,
    tags: ["green cardamom", "250g"],
  },

  {
    id: "kr-card-500",
    slug: "premium-green-cardamom-500g",
    name: "KREUPA Premium Green Cardamom",
    category: "retail",
    price: 1249,
    weight: "500 g",
    origin: "Kerala, India",
    image: cardamom,
    short: "Premium cardamom for families and frequent users.",
    description:
      "A value-focused larger pack containing whole green cardamom pods for regular household and food-service use.",
    stock: 50,
    rating: 0,
    reviewCount: 0,
    tags: ["green cardamom", "500g"],
  },

  {
    id: "kr-card-1kg",
    slug: "premium-green-cardamom-1kg",
    name: "KREUPA Premium Green Cardamom",
    category: "bulk",
    price: 2399,
    weight: "1 kg",
    origin: "Kerala, India",
    image: cardamom,
    short: "One-kilogram pack for serious cardamom users.",
    description:
      "A larger pack intended for restaurants, bakeries, retailers and high-volume household customers.",
    stock: 30,
    rating: 0,
    reviewCount: 0,
    tags: ["green cardamom", "1kg", "bulk"],
  },

  {
    id: "kr-card-5kg",
    slug: "green-cardamom-wholesale-5kg",
    name: "KREUPA Green Cardamom Wholesale",
    category: "bulk",
    price: 0,
    weight: "5 kg",
    origin: "Kerala, India",
    image: cardamom,
    short: "Bulk quantity for retailers and business buyers.",
    description:
      "Bulk green cardamom for retailers, distributors, restaurants and other business buyers. Contact KREUPA for current pricing and availability.",
    stock: 20,
    rating: 0,
    reviewCount: 0,
    tags: ["wholesale", "bulk", "5kg"],
  },

  {
    id: "kr-card-25kg",
    slug: "green-cardamom-wholesale-25kg",
    name: "KREUPA Green Cardamom Wholesale",
    category: "bulk",
    price: 0,
    weight: "25 kg",
    origin: "Kerala, India",
    image: cardamom,
    short: "Large-volume cardamom supply for business buyers.",
    description:
      "Large-volume green cardamom enquiry for distributors, retailers and international buyers. Contact KREUPA for current quotation and supply details.",
    stock: 10,
    rating: 0,
    reviewCount: 0,
    tags: ["wholesale", "bulk", "25kg", "export"],
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(
  slug: string
): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(
  slug: string
): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function searchProducts(
  query: string,
  category?: string
): Product[] {
  const q = query.trim().toLowerCase();

  return products.filter((p) => {
    const matchesCategory =
      !category ||
      category === "all" ||
      p.category === category;

    if (!matchesCategory) return false;

    if (!q) return true;

    return [
      p.name,
      p.short,
      p.origin,
      p.category,
      p.weight,
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}

export function formatPrice(value: number): string {
  if (value === 0) {
    return "Contact for price";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}