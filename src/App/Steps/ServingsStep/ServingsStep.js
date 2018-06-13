import React from 'react';
import * as AppConfig from "../../AppConfig";


class ServingsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Order: null,
        };

        this.boundItemClick = this.onItemClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            Order: this.props.Order,
        });
    }

    onItemClick(item) {
        let Order = this.state.Order;
        Order.CurrentItem.Serving = item;

        Order.CurrentItem.Flavors = Order.CurrentItem.Flavors.slice(0, Order.CurrentItem.Serving.scoops);
        Order.CurrentItem.Toppings = Order.CurrentItem.Toppings.slice(0, Order.CurrentItem.Serving.toppings);

        this.setState({
            Order: Order
        });
    }

    render() {
        const listItems = this.props.Servings.map((Serving) => {

                let defaultClass = "servingContainer";
                if (this.state.Order.CurrentItem.Serving && this.state.Order.CurrentItem.Serving.id === Serving.id) {
                    defaultClass += " selected"
                }

                return (
                    <div key={Serving.id.toString()} className={defaultClass} onClick={() => this.boundItemClick(Serving)}>
                        <b>{Serving.name}</b>
                        <br/>
                        <br/>
                        <div>{Serving.desc}</div>
                    </div>
                )
            }
        );

        return (
            <div>{listItems}</div>
        );
    }
}

class ServingsStep extends React.Component {

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
            Servings: this.props.Servings
        });
    }

    stepHandler(gotoStep) {
        if(this.state.Order.CurrentItem.Serving) {
            this.props.orderHandler(this.state.Order);
            this.props.stepHandler(gotoStep);
        }else{
            alert("Please select a serving size");
        }
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Servings) {
            return null;
        }

        return (
            <div>
                <p>What would you like? (Cone/Bowl)</p>
                <ServingsList Servings={this.state.Servings} orderHandler={this.orderHandler} Order={this.state.Order}/>
                <button onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>Next: Choose Flavors</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }
}

export default ServingsStep;