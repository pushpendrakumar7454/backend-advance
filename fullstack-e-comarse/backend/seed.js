import mongoose from "mongoose";
import { config } from "./src/config/config.js";
import productModel from "./src/modules/product.module.js";

const products = [
  {
    title: "New Look Shirt Woow Very Cool",
    description: "A stylish casual shirt designed for everyday comfort and a modern look.",
    images: [
      "https://ik.imagekit.io/ewzcmruzzm/image/robert-richman-vcTKFYNZop4-unsplash_vBoJDrvxD.jpg",
      "https://ik.imagekit.io/ewzcmruzzm/image/robert-richman-vcTKFYNZop4-unsplash_TIKFvA2GG.jpg"
    ],
    category: "shirts",
    brand: "Puma",
    price: { amount: 450, currency: "INR" },
    sizes: [{ size: "M", stock: 50 }],
    publiashed: true
  },
  {
    title: "Classic Cotton T Shirt",
    description: "A comfortable cotton t shirt suitable for casual outings and everyday wear.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    category: "tshirts",
    brand: "Nike",
    price: { amount: 599, currency: "INR" },
    sizes: [{ size: "S", stock: 20 }, { size: "M", stock: 30 }, { size: "L", stock: 25 }],
    publiashed: true
  },
  {
    title: "Premium Black Hoodie",
    description: "A warm and stylish black hoodie for comfortable winter and casual outfits.",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7"],
    category: "hoodies",
    brand: "Adidas",
    price: { amount: 1299, currency: "INR" },
    sizes: [{ size: "M", stock: 15 }, { size: "L", stock: 20 }, { size: "XL", stock: 10 }],
    publiashed: true
  },
  {
    title: "Slim Fit Blue Jeans",
    description: "Modern slim fit blue jeans offering a versatile style for daily outfits.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d"],
    category: "jeans",
    brand: "Levis",
    price: { amount: 1599, currency: "INR" },
    sizes: [{ size: "S", stock: 10 }, { size: "M", stock: 20 }, { size: "L", stock: 15 }],
    publiashed: true
  },
  {
    title: "White Casual Sneakers",
    description: "Minimal white sneakers that pair easily with jeans and casual clothing.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
    category: "shoes",
    brand: "Nike",
    price: { amount: 2199, currency: "INR" },
    sizes: [{ size: "M", stock: 10 }, { size: "L", stock: 15 }],
    publiashed: true
  },
  {
    title: "Running Sports Shoes",
    description: "Lightweight running shoes designed for daily walks and workout sessions.",
    images: ["https://images.unsplash.com/photo-1460353581641-37baddab0fa2"],
    category: "shoes",
    brand: "Puma",
    price: { amount: 2499, currency: "INR" },
    sizes: [{ size: "M", stock: 18 }, { size: "L", stock: 12 }],
    publiashed: true
  },
  {
    title: "Elegant Summer Dress",
    description: "A beautiful summer dress with a comfortable fit for outings and celebrations.",
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446"],
    category: "dresses",
    brand: "Zara",
    price: { amount: 1799, currency: "INR" },
    sizes: [{ size: "S", stock: 12 }, { size: "M", stock: 15 }, { size: "L", stock: 8 }],
    publiashed: true
  },
  {
    title: "Women's Casual Top",
    description: "A fashionable casual top suitable for everyday styling and weekend outings.",
    images: ["https://images.unsplash.com/photo-1551163943-3f6a855d1153"],
    category: "tops",
    brand: "H&M",
    price: { amount: 799, currency: "INR" },
    sizes: [{ size: "XS", stock: 10 }, { size: "S", stock: 15 }, { size: "M", stock: 20 }],
    publiashed: true
  },
  {
    title: "Classic Denim Jacket",
    description: "A timeless denim jacket that adds a smart casual touch to any outfit.",
    images: ["https://images.unsplash.com/photo-1523205771623-e0faa4d2813d"],
    category: "jackets",
    brand: "Levis",
    price: { amount: 2299, currency: "INR" },
    sizes: [{ size: "M", stock: 10 }, { size: "L", stock: 12 }, { size: "XL", stock: 8 }],
    publiashed: true
  },
  {
    title: "Formal White Shirt",
    description: "A clean and elegant formal shirt for office meetings and special occasions.",
    images: ["https://images.unsplash.com/photo-1598033129183-c4f50c736f10"],
    category: "shirts",
    brand: "Van Heusen",
    price: { amount: 1199, currency: "INR" },
    sizes: [{ size: "S", stock: 10 }, { size: "M", stock: 20 }, { size: "L", stock: 15 }],
    publiashed: true
  },
  {
    title: "Relaxed Fit Cargo Pants",
    description: "Practical cargo pants with a relaxed fit for comfortable everyday streetwear.",
    images: ["https://images.unsplash.com/photo-1517438476312-10d79c077509"],
    category: "trousers",
    brand: "H&M",
    price: { amount: 1399, currency: "INR" },
    sizes: [{ size: "M", stock: 12 }, { size: "L", stock: 18 }],
    publiashed: true
  },
  {
    title: "Lightweight Summer Shorts",
    description: "Breathable shorts designed for relaxed summer days and outdoor activities.",
    images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b"],
    category: "shorts",
    brand: "Puma",
    price: { amount: 699, currency: "INR" },
    sizes: [{ size: "S", stock: 10 }, { size: "M", stock: 15 }, { size: "L", stock: 10 }],
    publiashed: true
  },
  {
    title: "Cozy Winter Sweater",
    description: "A soft winter sweater that provides warmth while keeping your style simple.",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27"],
    category: "sweaters",
    brand: "Zara",
    price: { amount: 1499, currency: "INR" },
    sizes: [{ size: "S", stock: 8 }, { size: "M", stock: 15 }, { size: "L", stock: 10 }],
    publiashed: true
  },
  {
    title: "Everyday Polo T Shirt",
    description: "A smart polo t shirt that works well for casual wear and relaxed office days.",
    images: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d"],
    category: "tshirts",
    brand: "Puma",
    price: { amount: 899, currency: "INR" },
    sizes: [{ size: "M", stock: 20 }, { size: "L", stock: 15 }],
    publiashed: true
  },
  {
    title: "Classic Leather Wallet",
    description: "A compact everyday wallet designed to keep cards and cash neatly organized.",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93"],
    category: "accessories",
    brand: "Wildcraft",
    price: { amount: 499, currency: "INR" },
    sizes: [],
    publiashed: true
  },
  {
    title: "Minimalist Wrist Watch",
    description: "A versatile wrist watch with a clean design suitable for daily and formal wear.",
    images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314"],
    category: "watches",
    brand: "Fossil",
    price: { amount: 2999, currency: "INR" },
    sizes: [],
    publiashed: true
  },
  {
    title: "Stylish Sunglasses",
    description: "Modern sunglasses that complement casual outfits and sunny outdoor adventures.",
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083"],
    category: "accessories",
    brand: "Ray-Ban",
    price: { amount: 1299, currency: "INR" },
    sizes: [],
    publiashed: true
  },
  {
    title: "Everyday Travel Backpack",
    description: "A spacious backpack for carrying daily essentials during travel and college.",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    category: "bags",
    brand: "Wildcraft",
    price: { amount: 1599, currency: "INR" },
    sizes: [],
    publiashed: true
  },
  {
    title: "Comfortable Sports Socks",
    description: "Soft everyday sports socks designed for comfort during walking and exercise.",
    images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82"],
    category: "socks",
    brand: "Adidas",
    price: { amount: 249, currency: "INR" },
    sizes: [],
    publiashed: true
  },
  {
    title: "Premium Leather Belt",
    description: "A classic belt that complements formal trousers and everyday smart outfits.",
    images: ["https://images.unsplash.com/photo-1624222247344-550fb8d7e5f0"],
    category: "accessories",
    brand: "Levis",
    price: { amount: 599, currency: "INR" },
    sizes: [],
    publiashed: true
  },
  {
    title: "Graphic Print T Shirt",
    description: "A trendy graphic print t shirt for a relaxed look and expressive personal style.",
    images: ["https://images.unsplash.com/photo-1503341504253-dff4815485f1"],
    category: "tshirts",
    brand: "Nike",
    price: { amount: 699, currency: "INR" },
    sizes: [{ size: "S", stock: 15 }, { size: "M", stock: 20 }, { size: "L", stock: 12 }],
    publiashed: true
  },
  {
    title: "Women's Denim Jeans",
    description: "Versatile denim jeans designed for everyday comfort and easy outfit combinations.",
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246"],
    category: "jeans",
    brand: "Levis",
    price: { amount: 1499, currency: "INR" },
    sizes: [{ size: "XS", stock: 8 }, { size: "S", stock: 12 }, { size: "M", stock: 15 }],
    publiashed: true
  },
  {
    title: "Elegant Party Heels",
    description: "Stylish heels designed to complete party outfits and special evening looks.",
    images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2"],
    category: "footwear",
    brand: "Zara",
    price: { amount: 1899, currency: "INR" },
    sizes: [{ size: "S", stock: 8 }, { size: "M", stock: 10 }],
    publiashed: true
  },
  {
    title: "Classic Running Cap",
    description: "A lightweight cap for outdoor activities, workouts and everyday casual styling.",
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b"],
    category: "accessories",
    brand: "Nike",
    price: { amount: 399, currency: "INR" },
    sizes: [],
    publiashed: true
  },
  {
    title: "Casual Summer Sandals",
    description: "Comfortable sandals for everyday use during warm weather and casual outings.",
    images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306"],
    category: "footwear",
    brand: "Puma",
    price: { amount: 799, currency: "INR" },
    sizes: [{ size: "M", stock: 12 }, { size: "L", stock: 10 }],
    publiashed: true
  },
  {
    title: "Modern Oversized Hoodie",
    description: "An oversized hoodie offering a relaxed silhouette for modern streetwear outfits.",
    images: ["https://images.unsplash.com/photo-1578681994506-b8f463449011"],
    category: "hoodies",
    brand: "Adidas",
    price: { amount: 1699, currency: "INR" },
    sizes: [{ size: "M", stock: 12 }, { size: "L", stock: 15 }, { size: "XL", stock: 10 }],
    publiashed: true
  },
  {
    title: "Professional Office Trousers",
    description: "Smart formal trousers designed for a polished appearance throughout the workday.",
    images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a"],
    category: "trousers",
    brand: "Van Heusen",
    price: { amount: 1299, currency: "INR" },
    sizes: [{ size: "M", stock: 12 }, { size: "L", stock: 18 }],
    publiashed: true
  },
  {
    title: "Premium Crossbody Bag",
    description: "A compact crossbody bag for carrying essentials while travelling or going out.",
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa"],
    category: "bags",
    brand: "Zara",
    price: { amount: 1199, currency: "INR" },
    sizes: [],
    publiashed: true
  },
  {
    title: "Soft Cotton Nightwear",
    description: "Comfortable cotton nightwear designed to provide a relaxed fit for restful evenings.",
    images: ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace"],
    category: "nightwear",
    brand: "H&M",
    price: { amount: 999, currency: "INR" },
    sizes: [{ size: "S", stock: 10 }, { size: "M", stock: 15 }, { size: "L", stock: 10 }],
    publiashed: true
  },
  {
    title: "Lightweight Windbreaker Jacket",
    description: "A lightweight outer layer for breezy weather, outdoor activities and travel.",
    images: ["https://images.unsplash.com/photo-1544923246-77307dd654cb"],
    category: "jackets",
    brand: "Nike",
    price: { amount: 1999, currency: "INR" },
    sizes: [{ size: "M", stock: 10 }, { size: "L", stock: 12 }, { size: "XL", stock: 8 }],
    publiashed: true
  },
  {
    title: "Everyday Casual Sneakers",
    description: "Versatile casual sneakers designed to pair comfortably with everyday clothing.",
    images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"],
    category: "shoes",
    brand: "Adidas",
    price: { amount: 1899, currency: "INR" },
    sizes: [{ size: "M", stock: 12 }, { size: "L", stock: 15 }],
    publiashed: true
  }
];

async function seedData() {
  try {
    await mongoose.connect(config.MONGO_URI);

    console.log("MongoDB connected successfully");

    const result = await productModel.insertMany(products);

    console.log(`${result.length} products inserted successfully`);
  } catch (error) {
    console.log("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  }
}

seedData();