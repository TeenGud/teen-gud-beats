import { BeatType } from "@/shared/constants/beat";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { Mood } from "@prisma/client";

export interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  disabled?: boolean;
  beatType: BeatType;
  moods: CartStateItem['moods'];

}
