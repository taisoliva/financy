import { 
  Briefcase, Car, Heart, PiggyBank, ShoppingCart, 
  Ticket, Archive, Utensils, PawPrint, Home, 
  Gift, Dumbbell, Book, ShoppingBag, Wallet, Scroll,
  Tag
} from "lucide-react";

export const CATEGORY_ICONS = {
  briefcase: Briefcase,
  car: Car,
  heart: Heart,
  piggybank: PiggyBank,
  "shopping-cart": ShoppingCart,
  ticket: Ticket,
  archive: Archive,
  utensils: Utensils,
  paw: PawPrint,
  home: Home,
  gift: Gift,
  dumbbell: Dumbbell,
  book: Book,
  "shopping-bag": ShoppingBag,
  wallet: Wallet,
  scroll: Scroll,
  tag: Tag,
} as const;

export type CategoryIconId = keyof typeof CATEGORY_ICONS;

export const ICONS_LIST = Object.entries(CATEGORY_ICONS).map(([id, icon]) => ({
  id: id as CategoryIconId,
  icon,
}));
