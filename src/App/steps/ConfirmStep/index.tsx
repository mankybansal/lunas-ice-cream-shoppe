import { useCallback } from "react";
import * as AppConfig from "../../config";
import Header from "../../Header";
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

const strings = {
  reviewOrder: "Review Order",
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
          <StyledItemContainer key={i}>
            <img className="Item-image" src={item.serving!.image} />
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

  const prompt = strings.reviewOrder;

  return (
    <div className="App-header-padding">
      <Header prompt={prompt} />

      <OrderList />

      <div className={"Action-Container"}>
        <div className="Payment-breakup-container">
          <i className="fa fa-shopping-cart Icon-step Icon-step-right" />
          {strings.orderTotal} &nbsp;&nbsp;
          <span style={{ color: "black" }}>${totalPrice.toFixed(2)}</span>
        </div>

        <div className={"Step-Control"}>
          <div
            className="Button-step Button-prev"
            onClick={handleStep(AppConfig.Steps.Servings)}
          >
            <i className="fa fa-plus Icon-step" /> {strings.addItem}
          </div>

          <div
            className="Button-step Button-next"
            onClick={handleStep(AppConfig.Steps.Payment)}
          >
            {strings.checkout} <i className="fa fa-check Icon-step" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStep;
