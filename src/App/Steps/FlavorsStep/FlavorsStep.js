import React from 'react';
import * as AppConfig from "../../AppConfig";


class FlavorsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {Order: null,};

        this.boundItemClick = this.onItemClick.bind(this);
    }

    componentWillMount() {
        this.setState({Order: this.props.Order});
    }

    onItemClick(item) {
        let Order = this.state.Order;

        if (Order.CurrentItem.Flavors.includes(item))
            Order.CurrentItem.Flavors.splice(Order.CurrentItem.Flavors.indexOf(item), 1);
        else {
            if (Order.CurrentItem.Flavors.length < Order.CurrentItem.Serving.scoops)
                Order.CurrentItem.Flavors.push(item);
        }

        this.setState({Order: Order});
    }

    render() {
        const listItems = this.props.Flavors.map((Flavor) => {

                let defaultClass = "flavorContainer";
                if (this.state.Order.CurrentItem.Flavors.length > 0 && this.state.Order.CurrentItem.Flavors.includes(Flavor)) {
                    defaultClass += " selected"
                }

                return (
                    <div key={Flavor.id.toString()} className={defaultClass} onClick={() => this.boundItemClick(Flavor)}>
                        <b>{Flavor.name}</b>
                        <br/>
                        <br/>
                        <div>
                            {Flavor.desc}
                        </div>
                        <br/>
                        <div>
                            {Flavor.calories} Cal &nbsp;&nbsp;&nbsp;  ${Flavor.price}
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

class FlavorsStep extends React.Component {

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
            Flavors: this.props.Flavors
        });
    }

    stepHandler(gotoStep) {
        if (gotoStep < this.props.currentStep)
            this.props.stepHandler(gotoStep);
        else {
            if (this.state.Order.CurrentItem.Flavors.length > 0) {
                this.props.orderHandler(this.state.Order);
                this.props.stepHandler(gotoStep);
            } else
                alert("Select at least one scoop");
        }
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Flavors) {
            return null;
        }

        return (
            <div>
                <p>Select {this.state.Order.CurrentItem.Serving.scoops} Flavors</p>

                <FlavorsList Flavors={this.state.Flavors} Order={this.props.Order}/>

                <button onClick={() => this.stepHandler(AppConfig.steps.Servings)}>Back: Select Serving</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Toppings)}>Next: Choose Toppings</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }
}

export default FlavorsStep;