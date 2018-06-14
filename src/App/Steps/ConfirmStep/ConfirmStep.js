import React from 'react';
import * as AppConfig from "../../AppConfig";
import Header from "../../Header";

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
                    <h2>{Item.Serving.name}</h2>
                    <b>Scoops</b>
                    <Flavors Flavors={Item.Flavors}/>
                    <br/>
                    {(Item.Toppings.length > 0) ? <b>Toppings</b> : null}
                    <Toppings Toppings={Item.Toppings}/>
                </div>
            );
        });

        return (<div>{listItems}</div>);
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

        let prompt = "Review Order";

        return (
            <div className="header-padder">
                <Header prompt={prompt} stepHandler={this.stepHandler}/>

                <div className="ordersContainer">
                    <OrderList Order={this.props.Order} orderHandler={this.props.orderHandler}/>
                </div>

                <div className="paymentBreakup">Order Total: &nbsp;&nbsp;${this.props.TotalPrice.toFixed(2)}</div>

                <div className="stepButton prevButton" onClick={() => this.stepHandler(AppConfig.steps.Servings)}>Add Another Order</div>
                <div className="stepButton nextButton" onClick={() => this.stepHandler(AppConfig.steps.Payment)}>I'm Ready to Pay</div>
            </div>
        );
    }
}

export default ConfirmStep;