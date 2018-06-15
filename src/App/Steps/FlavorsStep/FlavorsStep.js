import React from 'react';
import * as AppConfig from "../../AppConfig";
import Header from "../../Header";

class FlavorsList extends React.Component {

    constructor(props) {
        super(props);
        this.selectFlavor = this.selectFlavor.bind(this);
        this.removeFlavor = this.removeFlavor.bind(this);
    }

    selectFlavor(item) {
        let Order = this.props.Order;

        if (Order.CurrentItem.Flavors.length < Order.CurrentItem.Serving.scoops)
            Order.CurrentItem.Flavors.push(item);

        this.props.orderHandler(Order);
    }

    removeFlavor(item, e) {
        e.stopPropagation();

        let Order = this.props.Order;

        if (Order.CurrentItem.Flavors.includes(item))
            Order.CurrentItem.Flavors.splice(Order.CurrentItem.Flavors.indexOf(item), 1);

        this.props.orderHandler(Order);
    }

    render() {
        const listItems = this.props.Flavors.map((Flavor) => {

                let flavorCount = 0;
                let defaultClass = "Flavor-Item";
                let flavorCountMax = this.props.Order.CurrentItem.Serving.scoops;

                if (this.props.Order.CurrentItem.Flavors.length > 0 && this.props.Order.CurrentItem.Flavors.includes(Flavor)) {
                    defaultClass += " Item-selected";
                    this.props.Order.CurrentItem.Flavors.map((testFlavor) => {
                        if (testFlavor === Flavor) flavorCount++;
                        return 0;
                    });
                }

                return (
                    <div key={Flavor.id.toString()} className={defaultClass} onClick={() => this.selectFlavor(Flavor)}>
                        <div className="Item-title">{Flavor.name}</div>
                        <div className="Item-desc">{Flavor.desc}</div>

                        <div className="Item-info">
                            <div className="Item-calories">{Flavor.calories} Calories</div>
                            <div className="Item-price">${Flavor.price.toFixed(2)}</div>
                        </div>

                        {(flavorCount > 0) ?
                            <div className="MultiScoop-container">
                                <div className="MultiScoop-selected"> {flavorCount} Scoop(s)</div>
                                <div className={(flavorCount < flavorCountMax && this.props.Order.CurrentItem.Flavors.length < flavorCountMax) ? "MultiScoop-selected MultiScoop-action" : "MultiScoop-selected MultiScoop-action-disabled"}>Add</div>
                                <div className="MultiScoop-selected MultiScoop-action" onClick={(e) => this.removeFlavor(Flavor, e)}>Remove</div>
                            </div>
                            : null}
                    </div>
                );
            }
        );

        return (<div>{listItems}</div>);
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

        let prompt = "Select Up To " + ((this.props.Order.CurrentItem.Serving) ? this.props.Order.CurrentItem.Serving.scoops : 0) + " Flavors";

        return (
            <div className="App-header-padder">
                <Header prompt={prompt} stepHandler={this.stepHandler}/>

                <div className="Flavor-container">
                    <FlavorsList
                        Flavors={this.props.Flavors}
                        orderHandler={this.props.orderHandler}
                        Order={this.props.Order}
                    />
                </div>

                <div className="Button-step Button-prev" onClick={() => this.stepHandler(AppConfig.steps.Servings)}>
                    <i className="fa fa-chevron-left Icon-step"/> Back
                </div>
                <div className="Button-step Button-next" onClick={() => this.stepHandler(AppConfig.steps.Toppings)}>
                    Select Toppings <i className="fa fa-chevron-right Icon-step"/>
                </div>
            </div>
        );
    }
}

export default FlavorsStep;