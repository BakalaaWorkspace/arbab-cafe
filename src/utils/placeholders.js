// src/utils/placeholders.js
import burger from "@/assets/images/burger/placeholder.jpg";
import pizza from "@/assets/images/pizza/placeholder.jpg";
import milkshake from "@/assets/images/milkshake/placeholder.jpg";
import wings from "@/assets/images/wings/placeholder.jpg";
import potato_wedges from "@/assets/images/potato_wedges/placeholder.jpg";
import mocktail from "@/assets/images/mocktail/placeholder.jpg";
import sandwich from "@/assets/images/sandwich/placeholder.jpg";
import fries from "@/assets/images/fries/placeholder.jpg";
import wraps from "@/assets/images/wrap/placeholder.jpg";
import smash_burger from "@/assets/images/smashed_burger/placeholder.jpg";
import broastedBurger from "@/assets/images/broasted_burger/placeholder.jpg";
import bucketBroast from '@/assets/images/bucket_broast/placeholder.jpg';
import tandooriBroast from '@/assets/images/tandoori_broast/placeholder.jpg';
import broastedStarter from '@/assets/images/broasted_starter/placeholder.jpg';
import broastedArbab from '@/assets/images/broasted_arbab/placeholder.jpg';
import addOn from '@/assets/images/addon/placeholder.jpg';
import momos from '@/assets/images/momos/placeholder.jpg';
import smashedBurgerPremium from '@/assets/images/smashed_premium/placeholder.jpg';
import doubleBurger from '@/assets/images/double_burger/placeholder.jpg';
import broastedSweetChilly from '@/assets/images/broasted_sweet_chily/placeholder.png';
import meals from '@/assets/images/meals/placeholder.png';
import generic from "@/assets/logo.png";

const CATEGORY_PLACEHOLDERS = {
    burger: burger,
    pizza: pizza,
    milkshakes: milkshake,
    wings: wings,
    potato_wedges: potato_wedges,
    mocktails: mocktail,
    sandwich: sandwich,
    fries: fries,
    wraps: wraps,
    smash_burger: smash_burger,
    generic: generic,
    broasted_burger: broastedBurger,
    bucket_broast: bucketBroast,
    tandoori_broast: tandooriBroast,
    broasted_starter: broastedStarter,
    broasted_arbab: broastedArbab,
    add_on: addOn,
    momos: momos,
    smashed_grilled_burger: smashedBurgerPremium,
    double_burger: doubleBurger,
    broasted_with_sweet_chilly: broastedSweetChilly,
    meals: meals
};

export function getCategoryPlaceholder(categoryName) {
    if (!categoryName) return generic;

    const key = categoryName.toLowerCase().trim();
    return CATEGORY_PLACEHOLDERS[key] || generic;
}
