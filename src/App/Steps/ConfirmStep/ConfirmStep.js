import React from 'react';
import * as AppConfig from "../../AppConfig";
import Header from "../../Header";

class Flavors extends React.Component {
    render() {
        const flavorList = this.props.Flavors.map((Flavor, FlavorIndex) => {
            return (<div key={FlavorIndex} className="Order-Item-container">
                <div className="Order-Item-title-container">{Flavor.name}</div>
                <div className="Order-Item-price-container">${Flavor.price.toFixed(2)}</div>
            </div>);
        });

        return (<div>{flavorList}</div>)
    }
}

class Toppings extends React.Component {
    render() {
        const toppingList = this.props.Toppings.map((Topping, ToppingIndex) => {
            return (<div key={ToppingIndex} className="Order-Item-container">
                <div className="Order-Item-title-container">{Topping.name}</div>
                <div className="Order-Item-price-container">${Topping.price.toFixed(2)}</div>
            </div>);
        });

        return (<div>{toppingList}</div>)
    }
}

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(Item) {
        let Order = this.props.Order;

        if (Order.Items.includes(Item))
            Order.Items.splice(Order.Items.indexOf(Item), 1);

        this.props.orderHandler(Order);
        this.props.priceHandler();

        if (Order.Items.length < 1) {
            this.props.stepHandler(AppConfig.steps.Servings);
        }
    }

    render() {
        const listItems = this.props.Order.Items.map((Item, Index) => {
            return (
                <div key={Index} className="Order-Item">

                    <img className="Item-image" src={Item.Serving.image}/>
                    <div className="Item-title">{Item.Serving.name}</div>

                    <div className="Item-category">Scoops</div>
                    <Flavors Flavors={Item.Flavors}/>

                    {(Item.Toppings.length > 0) ? <div className="Item-category">Toppings</div> : null}
                    <Toppings Toppings={Item.Toppings}/>

                    <div className="Order-action-remove" onClick={() => this.removeItem(Item)}>Remove</div>
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
            <div className="App-header-padding">
                <Header prompt={prompt} stepHandler={this.stepHandler}/>

                <div className="Order-container">
                    <OrderList
                        Order={this.props.Order}
                        orderHandler={this.props.orderHandler}
                        priceHandler={this.props.priceHandler}
                        stepHandler={this.props.stepHandler}
                    />
                </div>

                <div className="Payment-breakup-container">
                    <i className="fa fa-shopping-cart Icon-step Icon-step-right"/>
                    Your Order Total Is: &nbsp;&nbsp;${this.props.TotalPrice.toFixed(2)}
                </div>

                <div className="Button-step Button-prev" onClick={() => this.stepHandler(AppConfig.steps.Servings)}>
                    <i className="fa fa-plus Icon-step"/> Add Another Item
                </div>
                <div className="Button-step Button-next" onClick={() => this.stepHandler(AppConfig.steps.Payment)}>
                    Checkout <i className="fa fa-check Icon-step"/>
                </div>
            </div>
        );
    }
}

export default ConfirmStep;