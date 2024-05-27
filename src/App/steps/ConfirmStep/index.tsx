import { useCallback } from "react";
import * as AppConfig from "../../config";
import { Flavor, Item, KioskFormData, Topping } from "~/App/types.ts";
import * as Helpers from "~/App/utils.ts";
import { useFormContext } from "react-hook-form";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";
import {
  ItemCategory,
  ItemContainer,
  ItemPrimaryInfo,
  ItemsContainer,
  ItemTitle
} from "~/App/Styled.ts";
import styled from "@emotion/styled";
import { useSetHeaderPrompt } from "~/App/Header/headerState.atom";
import { useActionButtons } from "~/App/ActionBar/actionBarState.atom";
import Animations from "~/App/animations.ts";
import { ShoppingCart } from "~/App/icons/ShoppingCart.tsx";
import { PlusCircle } from "~/App/icons/PlusCircle.tsx";
import { Check } from "~/App/icons/Check.tsx";

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

  > .Item-title {
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 24px;
  }

  > .Item-image {
    position: absolute;
    right: 20px;
    width: 70px;
    top: 20px;
  }
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
      let updatedOrder = { ...order };

      if (updatedOrder.items.includes(item))
        updatedOrder.items.splice(updatedOrder.items.indexOf(item), 1);

      setValue("order", updatedOrder);

      if (updatedOrder.items.length < 1)
        return stepHandler(AppConfig.Steps.Servings);
    },
    [order, stepHandler, setValue]
  );

  return (
    <ItemsContainer>
      {order.items.map((item: Item, i) => {
        const hasToppings = item.toppings.length > 0;
        return (
          <StyledItemContainer key={i} {...Animations.AnimateInUp}>
            <img
              className="Item-image"
              src={item.serving!.image}
              alt={"serving-image"}
            />
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
  const { stepHandler } = useStepHandler();
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

  useActionButtons({
    next: {
      label: strings.checkout,
      onClick: handleStep(AppConfig.Steps.Payment),
      icon: <Check />
    },
    back: {
      label: strings.addItem,
      onClick: handleStep(AppConfig.Steps.Servings),
      icon: <PlusCircle />
    },
    review: (
      <div className="Payment-breakup-container">
        <ShoppingCart />
        {strings.orderTotal}
        <span style={{ fontWeight: "bold" }}>${totalPrice.toFixed(2)}</span>
      </div>
    )
  });

  return <OrderList />;
};

export default ConfirmStep;
