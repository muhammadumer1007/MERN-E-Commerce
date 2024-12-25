import React, { useState } from "react";
import accImg from "../../assets/account.jpg";
import Address from "@/components/layouts/shoping-view/address";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import UserCartItemsContent from "@/components/layouts/shoping-view/cart-item-content";
import { useToast } from "@/hooks/use-toast";
import { createNewOrder } from "@/store/shop-slice/orders-slice";
import { fetchCartItems } from "@/store/shop-slice/cart-slice";


function ShoppingViewCheckout() {
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
        (sum, currentItem) =>
          sum +
          (currentItem?.salePrice > 0
            ? currentItem?.salePrice
            : currentItem?.price) *
          currentItem?.quantity,
        0
      )
      : 0;

  function handleInitiatePaypalPayment() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }
    setIsPaymemntStart(true);

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createNewOrder(orderData)).then((res) => {
      if (res?.payload?.status == "Success") {
        toast({
          title: "Success!",
          description: res.payload?.message,
        });
      } else {
        toast({
          title: "Error!",
          description: res.payload?.message,
          variant: "destructive",
        });
      }
    })
      .catch((err) => {
        toast({
          title: "Error!",
          description: err.message,
        });
      });
    dispatch(fetchCartItems(user._id));
    setIsPaymemntStart(false);

  }



  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={accImg} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
              <UserCartItemsContent cartItem={item} />
            ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingViewCheckout;
