import { PRODUCTS } from "./products";

export const POPULAR_BESTSELLERS = PRODUCTS.filter((product) => product.bestSeller).slice(0, 4);
export const MARQUEE_WORDS = ["Rings", "UORA", "Necklaces", "Bracelet", "Earrings", "Chain Bracelet"];