'use client'

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./CartDrawerItem";
import { useCartStore } from "@/shared/store";
import { moods } from "@/prisma/constants";
import Image from "next/image";
import { Title } from "./Title";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks";

interface Props {
  className: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const {totalAmount, items, removeCartItem} = useCart();
  const [ redirecting, setRedirecting ] = useState(false)
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-slate-900">
        <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
          {totalAmount > 0 &&
          <SheetHeader>
            <SheetTitle>
              There are <span className="font-bold">{items.length} beats</span> in your cart
            </SheetTitle>
          </SheetHeader>}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="The cart is empty" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Add at least one beat to order
              </p>
              <SheetClose>
                <Button>
                  <ArrowLeft className="w-5 mr-2" />
                  Turn back
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && <>
          <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
            {items.map((item) => (
              <div className="mb-2" key={item.name}>
                <CartDrawerItem
                  key={item.name}
                  className={""}
                  id={item.id}
                  imageUrl={
                    item.imageUrl
                  }
                  disabled={item.disabled}
                  details={""}
                  name={item.name}
                  price={item.price}
                  beatType={item.beatType}
                  moods={item.moods}
                  onClickRemove={() => removeCartItem(item.id)}
                />
              </div>
            ))}
          </div>

          <SheetFooter className="-mx-6 bg-slate-950 p-8">
            <div className="w-full">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Total
                  <div className="flex-1 border-b border-dashed border-b-neutral-950 relative -top-1 mx-2" />
                </span>
                <span className="font-bold text-lg">{totalAmount}$</span>
              </div>
              <Link href="/checkout">
                <Button onClick={() => setRedirecting(true)} loading={redirecting} type="submit" className="w-full h-12 text-base">
                  Order <ArrowRight className="w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </SheetFooter>
          </>}
        </div>
      </SheetContent>
    </Sheet>
    
  );
};
