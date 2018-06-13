import React from 'react';
import * as AppConfig from "../../AppConfig";

class Flavors extends React.Component {
    render() {
        const flavorList = this.props.Flavors.map((Flavor, FlavorIndex) => {
            return (<div key={FlavorIndex} className="orderItemContainer">
                <div className="orderItemName">{Flavor.name}</div>
                <div className="orderItemPrice">${Flavor.price}</div>
            </div>);
        });

        return (<div>{flavorList}</div>)
    }
}

class Toppings extends React.Component {
    render() {
        const toppingList = this.props.Toppings.map((Topping, ToppingIndex) => {
            return (<div key={ToppingIndex} className="orderItemContainer">
                <div className="orderItemName">{Topping.name}</div>
                <div className="orderItemPrice">${Topping.price}</div>
            </div>);
        });

        return (<div>{toppingList}</div>)
    }
}

class OrderList extends React.Component {
    render() {
        const listItems = this.props.Order.Items.map((Item, Index) => {
            return (
                <div key={Index} className="orderContainer">
                    <h3>{Item.Serving.name}</h3>
                    <b>Scoops</b>
                    <Flavors Flavors={Item.Flavors}/>
                    <br/>
                    {(Item.Toppings.length > 0) ? <b>Toppings</b> : null}
                    <Toppings Toppings={Item.Toppings}/>
                </div>
            );
        });

        return (
            <div>{listItems}</div>
        );
    }
}

class ConfirmStep extends React.Component {

    constructor(props) {
        super(props);
        this.stepHandler = this.stepHandler.bind(this);
    }

    stepHandler(gotoStep) {
        this.props.orderHandler(this.props.Order);
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Confirm)
            return null;

        return (
            <div>
                <p>Review Order</p>

                <OrderList
                    Order={this.props.Order}
                    orderHandler={this.props.orderHandler}
                />

                <br/>
                <h1>Total: ${this.props.TotalPrice.toFixed(2)}</h1>

                <button onClick={() => this.stepHandler(AppConfig.steps.Servings)}>Add Another Order</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Payment)}>Next: Payment</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }
}

export default ConfirmStep;