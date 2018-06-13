import React from 'react';
import * as AppConfig from "../../AppConfig";

class ToppingsList extends React.Component {

    constructor(props) {
        super(props);
        this.selectTopping = this.selectTopping.bind(this);
    }

    selectTopping(item) {
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
                    defaultClass += " selected";

                return (
                    <div key={Topping.id.toString()} className={defaultClass} onClick={() => this.selectTopping(Topping)}>
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
                <div className="prompt">Select {(this.props.Order.CurrentItem.Serving) ? this.props.Order.CurrentItem.Serving.toppings : 0} Topping(s)</div>

                <ToppingsList Toppings={this.props.Toppings} orderHandler={this.props.orderHandler}
                              Order={this.props.Order}/>
                <button className="buttonPrev" onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>
                    <div className="buttonLabel">Back</div>
                    <hr/>
                    Select Toppings
                </button>
                <button className="buttonNext" onClick={() => this.stepHandler(AppConfig.steps.Confirm)}>
                    <div className="buttonLabel">Next</div>
                    <hr/>
                    Review Order
                </button>

                <br/>
                <br/>
                <br/>
                <button className="buttonCancel" onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }

}

export default ToppingsStep;