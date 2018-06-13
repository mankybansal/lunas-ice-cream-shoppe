import React from 'react';
import * as AppConfig from "../../AppConfig";


class ToppingsList extends React.Component {

    constructor(props) {
        super(props);
        this.boundItemClick = this.onItemClick.bind(this);
    }

    onItemClick(item) {
        let Order = this.props.Order;

        if (Order.CurrentItem.Toppings.includes(item))
            Order.CurrentItem.Toppings.splice(Order.CurrentItem.Toppings.indexOf(item), 1);
        else {
            if (Order.CurrentItem.Toppings.length < Order.CurrentItem.Serving.toppings)
                Order.CurrentItem.Toppings.push(item);
        }

        this.props.orderHandler(Order);
    }

    render() {
        const listItems = this.props.Toppings.map((Topping) => {
                let defaultClass = "toppingContainer";
                if (this.props.Order.CurrentItem.Toppings.length > 0 && this.props.Order.CurrentItem.Toppings.includes(Topping))
                    defaultClass += " selected"

                return (
                    <div key={Topping.id.toString()} className={defaultClass} onClick={() => this.boundItemClick(Topping)}>
                        <b>{Topping.name}</b>
                        <br/><br/>
                        <div>{Topping.desc}</div>
                        <br/>
                        <div>{Topping.calories} Cal &nbsp;&nbsp;&nbsp;  ${Topping.price}</div>
                    </div>
                );
            }
        );

        return (<div>{listItems}</div>);
    }
}

class ToppingsStep extends React.Component {

    constructor(props) {
        super(props);
        this.stepHandler = this.stepHandler.bind(this);
    }

    stepHandler(gotoStep) {
        if (gotoStep < this.props.currentStep)
            this.props.stepHandler(gotoStep);
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
        if (this.props.currentStep !== AppConfig.steps.Toppings)
            return null;

        return (
            <div>
                <p>Select {(this.props.Order.CurrentItem.Serving) ? this.props.Order.CurrentItem.Serving.toppings : 0} Flavors</p>

                <ToppingsList Toppings={this.props.Toppings} orderHandler={this.props.orderHandler}
                              Order={this.props.Order}/>
                <button onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>Back: Select Flavors</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Confirm)}>Next: Review Order</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }

}

export default ToppingsStep;