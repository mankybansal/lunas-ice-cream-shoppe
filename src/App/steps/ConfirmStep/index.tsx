import { useCallback } from "react";
import * as AppConfig from "../../config";
import { Item, KioskFormData } from "~/App/types";
import * as Helpers from "~/App/utils/app.ts";
import { useFormContext } from "react-hook-form";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import {
  Divider,
  ItemCategory,
  ItemContainer,
  ItemPrimaryInfo,
  ItemsContainer,
  ItemTitle
} from "~/App/Styled";
import styled from "@emotion/styled";
import { useSetHeaderPrompt } from "~/App/Header/headerState.atom";
import { useActionButtons } from "~/App/ActionBar/actionBarState.atom";
import Animations from "~/App/animations";
import { ShoppingCart } from "~/App/icons/ShoppingCart";
import { PlusCircle } from "~/App/icons/PlusCircle";
import { Check } from "~/App/icons/Check";
import { MinusCircle } from "~/App/icons/MinusCircle";
import { CategoryBreakDown } from "./CategoryBreakdown";

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
  position: absolute;
  right: 20px;
  width: 70px;
  top: 20px;
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
            <ItemImage src={item.serving!.image} alt={"serving-image"} />
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
                <RemoveButton onClick={() => removeItem(item)}>
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
