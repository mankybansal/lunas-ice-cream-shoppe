import React from 'react';
import * as AppConfig from "../../AppConfig";


class FlavorsList extends React.Component {

    constructor(props) {
        super(props);
        this.selectFlavor = this.selectFlavor.bind(this);
    }

    selectFlavor(item) {
        let Order = this.props.Order;

        if (Order.CurrentItem.Flavors.includes(item))
            Order.CurrentItem.Flavors.splice(Order.CurrentItem.Flavors.indexOf(item), 1);
        else {
            if (Order.CurrentItem.Flavors.length < Order.CurrentItem.Serving.scoops)
                Order.CurrentItem.Flavors.push(item);
        }

        this.props.orderHandler(Order);
    }

    render() {
        const listItems = this.props.Flavors.map((Flavor) => {

                let defaultClass = "flavorContainer";
                if (this.props.Order.CurrentItem.Flavors.length > 0 && this.props.Order.CurrentItem.Flavors.includes(Flavor))
                    defaultClass += " selected"


                return (
                    <div key={Flavor.id.toString()} className={defaultClass} onClick={() => this.selectFlavor(Flavor)}>
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
        this.stepHandler = this.stepHandler.bind(this);
    }

    stepHandler(gotoStep) {
        if (gotoStep < this.props.currentStep)
            this.props.stepHandler(gotoStep);
        else {
            if (this.props.Order.CurrentItem.Flavors.length > 0) {
                this.props.orderHandler(this.props.Order);
                this.props.stepHandler(gotoStep);
            } else
                alert("Select at least one scoop");
        }
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Flavors)
            return null;

        return (
            <div>
                <div className="prompt">Select Upto {(this.props.Order.CurrentItem.Serving) ? this.props.Order.CurrentItem.Serving.scoops : 0} Flavors</div>

                <FlavorsList Flavors={this.props.Flavors} orderHandler={this.props.orderHandler} Order={this.props.Order}/>

                <div className="buttonPrev" onClick={() => this.stepHandler(AppConfig.steps.Servings)}>
                    <div className="buttonLabel">Back</div>
                    <hr/>
                    Select Serving
                </div>

                <button className="buttonNext" onClick={() => this.stepHandler(AppConfig.steps.Toppings)}>
                    <div className="buttonLabel">Next</div>
                    <hr/>
                    Select Toppings
                </button>

                <br/>
                <br/>
                <br/>
                <button className="buttonCancel" onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }
}

export default FlavorsStep;