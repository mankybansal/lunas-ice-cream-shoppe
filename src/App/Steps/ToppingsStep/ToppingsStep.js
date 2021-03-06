import React from "react";
import * as AppConfig from "../../AppConfig";
import Header from "../../Header";

class ToppingsList extends React.Component {
  constructor(props) {
    super(props);
    this.selectTopping = this.selectTopping.bind(this);
  }

  selectTopping(item) {
    let Order = this.props.Order;

    if (Order.CurrentItem.Toppings.includes(item))
      Order.CurrentItem.Toppings.splice(
        Order.CurrentItem.Toppings.indexOf(item),
        1
      );
    else {
      if (
        Order.CurrentItem.Toppings.length < Order.CurrentItem.Serving.toppings
      )
        Order.CurrentItem.Toppings.push(item);
    }

    this.props.orderHandler(Order);
  }

  render() {
    const listItems = this.props.Toppings.map((Topping) => {
      let defaultClass = "Topping-Item";
      if (
        this.props.Order.CurrentItem.Toppings.length > 0 &&
        this.props.Order.CurrentItem.Toppings.includes(Topping)
      )
        defaultClass += " Item-selected";

      return (
        <div
          key={Topping.id.toString()}
          className={defaultClass}
          onClick={() => this.selectTopping(Topping)}
        >
          <div className="Item-title">{Topping.name}</div>
          <div className="Item-desc">{Topping.desc}</div>
          <div className="Item-info">
            <div className="Item-calories">{Topping.calories} Calories</div>
            <div className="Item-price">${Topping.price.toFixed(2)}</div>
          </div>
        </div>
      );
    });

    return <div className="Topping-container">{listItems}</div>;
  }
}

class ToppingsStep extends React.Component {
  constructor(props) {
    super(props);
    this.stepHandler = this.stepHandler.bind(this);
  }

  stepHandler(gotoStep) {
    if (gotoStep < this.props.currentStep) this.props.stepHandler(gotoStep);
    else {
      let Order = this.props.Order;
      if (Order.CurrentItem.Serving !== null) {
        Order.Items.push(Order.CurrentItem);
        Order.CurrentItem = AppConfig.defaultCurrentItem();
      }

      this.props.priceHandler();
      this.props.orderHandler(Order);
      this.props.stepHandler(gotoStep);
    }
  }

  render() {
    if (this.props.currentStep !== AppConfig.steps.Toppings) return null;

    let prompt =
      "Select " +
      (this.props.Order.CurrentItem.Serving
        ? this.props.Order.CurrentItem.Serving.toppings
        : 0) +
      " Topping" +
      (this.props.Order.CurrentItem.Serving &&
      this.props.Order.CurrentItem.Serving.toppings <= 1
        ? ""
        : "s");

    return (
      <div className="App-header-padding">
        <Header prompt={prompt} stepHandler={this.stepHandler} />

        <ToppingsList
          Toppings={this.props.Toppings}
          orderHandler={this.props.orderHandler}
          Order={this.props.Order}
        />

        <div
          className="Button-step Button-prev"
          onClick={() => this.stepHandler(AppConfig.steps.Flavors)}
        >
          <i className="fa fa-chevron-left Icon-step" /> Back
        </div>

        <div
          className="Button-step Button-next"
          onClick={() => this.stepHandler(AppConfig.steps.Confirm)}
        >
          Review Order <i className="fa fa-shopping-cart Icon-step" />
        </div>
      </div>
    );
  }
}

export default ToppingsStep;
