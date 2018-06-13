import React from 'react';
import * as AppConfig from "../../AppConfig";


class ToppingsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Order: null,
        };

        this.boundItemClick = this.onItemClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            Order: this.props.Order
        });
    }

    onItemClick(item) {
        let Order = this.state.Order;

        // check what kind of serving it is
        if (Order.CurrentItem.Toppings.includes(item))
            Order.CurrentItem.Toppings.splice(Order.CurrentItem.Toppings.indexOf(item), 1);
        else {
            if (Order.CurrentItem.Toppings.length < Order.CurrentItem.Serving.toppings)
                Order.CurrentItem.Toppings.push(item);
        }

        this.setState({
            Order: Order
        });
    }

    render() {
        const listItems = this.props.Toppings.map((Topping) => {

                let defaultClass = "toppingContainer";
                if (this.state.Order.CurrentItem.Toppings.length > 0 && this.state.Order.CurrentItem.Toppings.includes(Topping)) {
                    defaultClass += " selected"
                }

                return (
                    <div key={Topping.id.toString()} className={defaultClass}
                         onClick={() => this.boundItemClick(Topping)}>
                        <b>{Topping.name}</b>
                        <br/>
                        <br/>
                        <div>
                            {Topping.desc}
                        </div>
                        <br/>
                        <div>
                            {Topping.calories} Cal &nbsp;&nbsp;&nbsp;  ${Topping.price}
                        </div>
                    </div>
                );
            }
        );


        return (
            <div>{listItems}</div>
        );
    }
}


class ToppingsStep
    extends React
        .Component {

    constructor(props) {
        super(props);

        this.state = {
            Order: null
        };

        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            Order: this.props.Order,
            Toppings: this.props.Toppings
        });
    }

    stepHandler(gotoStep) {

        if (gotoStep < this.props.currentStep)
            this.props.stepHandler(gotoStep);
        else {
            let Order = this.state.Order;
            if (Order.CurrentItem.Serving !== null) {
                Order.Items.push(Order.CurrentItem);
                Order.CurrentItem = AppConfig.resetCurrentItem();
            }

            this.setState({
                Order: Order
            }, () => {
                this.props.orderHandler(this.state.Order);
                this.props.stepHandler(gotoStep);
            });
        }
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Toppings) {
            return null;
        }

        return (
            <div>
                <p>Select {(this.state.Order.CurrentItem.Serving) ? this.state.Order.CurrentItem.Serving.toppings : 0} Flavors</p>

                <ToppingsList Toppings={this.state.Toppings} Order={this.props.Order}/>
                <button onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>Back: Select Flavors</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Confirm)}>Next: Review Order</button>
                <button onClick={() => this.stepHandler(false, true)}>Cancel Order</button>
            </div>
        );
    }

}

export default ToppingsStep;