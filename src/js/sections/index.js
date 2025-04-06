import { register, load } from "@shopify/theme-sections"; // Import the register and load functions from Shopify's theme-sections library
import FeaturedProducts from "./featured-products";

register("featured-products", FeaturedProducts);

// Load all sections dynamically on the page
load("*");