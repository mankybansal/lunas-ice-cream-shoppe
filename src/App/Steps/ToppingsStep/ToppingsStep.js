import React from 'react';
import * as AppConfig from "../../AppConfig";


class ToppingsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            CurrentOrder: null,
        };

        this.boundItemClick = this.onItemClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            CurrentOrder: this.props.currentOrder
        });
    }

    onItemClick(item) {
        console.log(item);

        let CurrentOrder = this.state.CurrentOrder;

        // check what kind of serving it is

        if (CurrentOrder.Toppings.includes(item)) {
            CurrentOrder.Toppings.splice(CurrentOrder.Toppings.indexOf(item), 1);
        } else {
            CurrentOrder.Toppings.push(item);
        }

        this.setState({
            CurrentOrder: CurrentOrder
        });
    }

    render() {
        const listItems = this.props.Toppings.map((Topping) => {

                let defaultClass = "toppingContainer";
                if (this.state.CurrentOrder.Toppings.length > 0 && this.state.CurrentOrder.Toppings.includes(Topping)) {
                    defaultClass += " selected"
                }

                return (
                    <div key={Topping.id.toString()} className={defaultClass} onClick={() => this.boundItemClick(Topping)}>
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


class ToppingsStep extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            CurrentOrder: null
        };

        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            CurrentOrder: this.props.currentOrder,
            Toppings: this.props.Toppings
        });
    }

    stepHandler(gotoStep) {
        this.props.orderHandler(this.state.CurrentOrder);
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Toppings) {
            return null;
        }

        return (
            <div>
                <p>Select [number] Flavors</p>

                <ToppingsList Toppings={this.state.Toppings} currentOrder={this.props.currentOrder}/>

                <button onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>Back: Select Flavors</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Confirm)}>Next: Review Order</button>

                <br/>
                <br/>
                <br/>


                <button onClick={() => this.stepHandler(false, true)}>Cancel Order</button>
            </div>
        );
    }

}

export default ToppingsStep;