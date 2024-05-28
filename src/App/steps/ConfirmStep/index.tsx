import { useCallback } from "react";
import * as AppConfig from "../../config";
import { Flavor, Item, KioskFormData, Topping } from "~/App/types";
import * as Helpers from "~/App/utils/app.ts";
import { useFormContext } from "react-hook-form";
import { useStepHandler } from "~/App/hooks/useStepHandler";
import {
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

const strings = {
  prompt: "Review Order",
  orderTotal: "Your Order Total Is: ",
  addItem: "Add Another Item",
  checkout: "Checkout",
  remove: "Remove",
  scoops: "Scoops",
  toppings: "Toppings"
};

const StyledItemContainer = styled(ItemContainer)`
  width: 380px;
  height: 380px;
`;

const ItemImage = styled.img`
  position: absolute;
  right: 20px;
  width: 70px;
  top: 20px;
`;

interface FlavorProps {
  flavors: Flavor[];
}

const Flavors = ({ flavors }: FlavorProps) => (
  <>
    {flavors.map((flavor, i) => (
      <div key={i} className="Order-Item-container">
        <div className="Order-Item-title-container">{flavor.name}</div>
        <div className="Order-Item-price-container">
          ${flavor.price.toFixed(2)}
        </div>
      </div>
    ))}
  </>
);

interface ToppingProps {
  toppings: Topping[];
}

const Toppings = ({ toppings }: ToppingProps) => (
  <>
    {toppings.map((topping, i) => (
      <div key={i} className="Order-Item-container">
        <div className="Order-Item-title-container">{topping.name}</div>
        <div className="Order-Item-price-container">
          ${topping.price.toFixed(2)}
        </div>
      </div>
    ))}
  </>
);

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
        return (
          <StyledItemContainer key={i} {...Animations.AnimateInUp}>
            <ItemImage src={item.serving!.image} alt={"serving-image"} />
            <ItemPrimaryInfo>
              <ItemTitle>{item.serving!.name}</ItemTitle>

              <ItemCategory>{strings.scoops}</ItemCategory>
              <Flavors flavors={item.flavors} />

              {hasToppings && (
                <>
                  <ItemCategory>{strings.toppings}</ItemCategory>
                  <Toppings toppings={item.toppings} />
                </>
              )}
            </ItemPrimaryInfo>
            <div
              className="Order-action-remove"
              onClick={() => removeItem(item)}
            >
              {strings.remove}
            </div>
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
  const totalPrice = Helpers.calculatePrice(order);

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
        <div className="Payment-breakup-container">
          <ShoppingCart />
          {strings.orderTotal}
          <span style={{ fontWeight: "bold" }}>${totalPrice.toFixed(2)}</span>
        </div>
      )
    },
    [totalPrice]
  );

  return <OrderList />;
};

export default ConfirmStep;
