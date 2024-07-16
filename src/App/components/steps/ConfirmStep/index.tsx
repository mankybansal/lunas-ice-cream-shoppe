import styled from "@emotion/styled";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import * as AppConfig from "~/App/config";

import { CategoryBreakDown } from "./CategoryBreakdown";

import { useActionButtons } from "~/App/components/ActionBar/actionBarState.atom";
import Animations from "~/App/animations";
import { Check } from "~/App/components/icons/Check";
import { PlusCircle } from "~/App/components/icons/PlusCircle";
import { ShoppingCart } from "~/App/components/icons/ShoppingCart";
import { useSetHeaderPrompt } from "~/App/components/Header/headerState.atom";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import { Item, KioskFormData } from "~/App/types";
import * as Helpers from "~/App/utils/app";
import {
  Divider,
  ItemCategory,
  ItemContainer,
  ItemPrimaryInfo,
  ItemsContainer,
  ItemTitle
} from "~/App/Styled";
import { MinusCircle } from "~/App/components/icons/MinusCircle";
import { useSetAtom } from "jotai/index";
import { confirmationModalStateAtom } from "~/App/components/ConfirmationModal/confirmationModalState.atom.ts";

const strings = {
  prompt: "Review Order",
  orderTotal: "Your Order Total Is: ",
  addItem: "Add Another Item",
  checkout: "Checkout",
  remove: "Remove",
  scoops: "Scoops",
  toppings: "Toppings"
};

const PaymentBreakupContainer = styled.div`
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  width: 100%;
  padding: 42px 0;
  flex: 1;
  background: white;

  @media screen (max-width: 768px) {
    padding: 20px 0;
  }
`;

const StyledItemContainer = styled(ItemContainer)`
  width: 380px;
  height: 380px;

  :hover {
    background: initial;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  font-weight: 500;
  display: flex;
  gap: 8px;
  align-items: center;
  outline: none;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  color: #fa8758;
`;

const OrderBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: auto;
  padding: 32px;
  width: 100%;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  height: 80px;
  width: 80px;
  border-radius: 12px;
  right: 24px;
  position: absolute;
  top: 20px;
`;

const OrderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

const OrderList = () => {
  const { watch, setValue } = useFormContext<KioskFormData>();
  const order = watch("order");
  const { stepHandler } = useStepHandler();
  const setConfirmationModalState = useSetAtom(confirmationModalStateAtom);

  const handleClickRemove = (item: Item) => {
    setConfirmationModalState({
      isVisible: true,
      title: "Remove Item",
      content: `Are you sure you want to remove this ${item.serving!.name} from your order?`,
      cancelText: "Don't remove",
      confirmText: "Yes, remove",
      onCancel: () => {},
      onConfirm: () => removeItem(item)
    });
  };

  const removeItem = useCallback(
    (item: Item) => {
      const newItems = order.items.filter((i) => i.clientId !== item.clientId);
      setValue("order.items", newItems);
      if (newItems.length < 1) return stepHandler(AppConfig.Steps.Servings);
    },
    [order, stepHandler, setValue]
  );

  return (
    <ItemsContainer>
      {order.items.map((item: Item, i) => {
        const hasToppings = item.toppings.length > 0;
        const itemPrice = Helpers.calculateItemPrice(item);
        return (
          <StyledItemContainer key={i} {...Animations.AnimateInUp}>
            <ImageContainer>
              <ItemImage src={item.imageSrc} alt={"Rendered Ice Cream"} />
            </ImageContainer>

            <ItemPrimaryInfo>
              <ItemTitle>{item.serving!.name}</ItemTitle>
              <ItemCategory>{strings.scoops}</ItemCategory>
              <CategoryBreakDown items={item.flavors} />

              {hasToppings && (
                <>
                  <ItemCategory>{strings.toppings}</ItemCategory>
                  <CategoryBreakDown items={item.toppings} />
                </>
              )}
            </ItemPrimaryInfo>

            <OrderBottomContainer>
              <Divider />
              <OrderActions>
                <RemoveButton onClick={() => handleClickRemove(item)}>
                  <MinusCircle width={"24px"} height={"24px"} />
                  {strings.remove}
                </RemoveButton>
                <TotalContainer>
                  <span style={{ fontWeight: 400, color: "#aaa" }}>Total</span>
                  <span style={{ fontWeight: 600, color: "black" }}>
                    ${itemPrice.toFixed(2)}
                  </span>
                </TotalContainer>
              </OrderActions>
            </OrderBottomContainer>
          </StyledItemContainer>
        );
      })}
    </ItemsContainer>
  );
};

const ConfirmStep = () => {
  const { stepHandler, createNewItem } = useStepHandler();
  const { watch, setValue } = useFormContext<KioskFormData>();

  const order = watch("order");
  const totalPrice = Helpers.calculateOrderPrice(order);

  const handleStep = useCallback(
    (gotoStep: number) => () => {
      setValue("order", order);
      return stepHandler(gotoStep);
    },
    [order, stepHandler, setValue]
  );

  useSetHeaderPrompt(strings.prompt);

  useActionButtons(
    {
      next: {
        label: strings.checkout,
        onClick: handleStep(AppConfig.Steps.Payment),
        icon: <Check />
      },
      back: {
        label: strings.addItem,
        onClick: createNewItem,
        icon: <PlusCircle />
      },
      review: (
        <PaymentBreakupContainer>
          <ShoppingCart />
          {strings.orderTotal}
          <span style={{ fontWeight: "bold" }}>${totalPrice.toFixed(2)}</span>
        </PaymentBreakupContainer>
      )
    },
    [totalPrice]
  );

  return <OrderList />;
};

export default ConfirmStep;
