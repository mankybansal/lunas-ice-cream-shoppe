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
                let defaultClass = "flavorContainer";
                let flavorCountMax = this.props.Order.CurrentItem.Serving.scoops;

                if (this.props.Order.CurrentItem.Flavors.length > 0 && this.props.Order.CurrentItem.Flavors.includes(Flavor)) {
                    defaultClass += " selected";
                    this.props.Order.CurrentItem.Flavors.map((testFlavor) => {
                        if (testFlavor === Flavor) flavorCount++;
                        return 0;
                    });
                }

                return (
                    <div key={Flavor.id.toString()} className={defaultClass} onClick={() => this.selectFlavor(Flavor)}>
                        <div className="itemTitle">{Flavor.name}</div>
                        <div>{Flavor.desc}</div>
                        <br/>
                        <div>{Flavor.calories} Calories &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>${Flavor.price}</b></div>

                        {(flavorCount > 0) ?
                            <div>
                                <div className="selectedScoops"> {flavorCount} Scoop(s)</div>
                                <div className={(flavorCount < flavorCountMax && this.props.Order.CurrentItem.Flavors.length < flavorCountMax) ? "selectedScoops picker" :"selectedScoops picker2"}>Add</div>
                                <div className="selectedScoops picker" onClick={(e) => this.removeFlavor(Flavor, e)}>Remove</div>
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
            <div className="header-padder">
                <Header prompt={prompt} stepHandler={this.stepHandler}/>
                <FlavorsList Flavors={this.props.Flavors} orderHandler={this.props.orderHandler} Order={this.props.Order}/>
                <div className="stepButton prevButton" onClick={() => this.stepHandler(AppConfig.steps.Servings)}>Back</div>
                <div className="stepButton nextButton" onClick={() => this.stepHandler(AppConfig.steps.Toppings)}>Select Flavors</div>
            </div>
        );
    }
}

export default FlavorsStep;