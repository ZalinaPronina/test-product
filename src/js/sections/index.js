import { register, load } from "@shopify/theme-sections";
import FeaturedProducts from "./featured-products";

register("featured-products", FeaturedProducts);
load("*");