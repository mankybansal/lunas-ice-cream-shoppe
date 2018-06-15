import React from 'react';
import * as AppConfig from "../../AppConfig";
import Header from "../../Header";

class ServingsList extends React.Component {

    constructor(props) {
        super(props);
        this.selectServing = this.selectServing.bind(this);
    }

    selectServing(item) {
        let Order = this.props.Order;

        Order.CurrentItem.Serving = item;
        Order.CurrentItem.Flavors = Order.CurrentItem.Flavors.slice(0, Order.CurrentItem.Serving.scoops);
        Order.CurrentItem.Toppings = Order.CurrentItem.Toppings.slice(0, Order.CurrentItem.Serving.toppings);

        this.props.orderHandler(Order);
    }

    render() {
        const listItems = this.props.Servings.map((Serving) => {

                let defaultClass = "Serving-Item";
                if (this.props.Order.CurrentItem.Serving && this.props.Order.CurrentItem.Serving.id === Serving.id)
                    defaultClass += " Item-selected";

                return (
                    <div key={Serving.id.toString()} className={defaultClass} onClick={() => this.selectServing(Serving)}>
                        <img className="Item-image" src={Serving.image}/>
                        <div className="Item-title">{Serving.name}</div>
                        <div>{Serving.desc}</div>
                    </div>
                )
            }
        );

        return (<div>{listItems}</div>);
    }
}

class ServingsStep extends React.Component {

    constructor(props) {
        super(props);
        this.stepHandler = this.stepHandler.bind(this);
    }

    stepHandler(gotoStep) {
        if (gotoStep === AppConfig.steps.Start) {
            this.props.stepHandler(gotoStep);
            return;
        }

        if (this.props.Order.CurrentItem.Serving) {
            this.props.orderHandler(this.props.Order);
            this.props.stepHandler(gotoStep);
        } else
            alert("Please select a serving size");
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Servings)
            return null;

        let prompt = "What Serving Would You Like?";

        return (
            <div className="App-header-padder">
                <Header prompt={prompt} stepHandler={this.stepHandler}/>

                <div className="Serving-container">
                    <ServingsList
                        Servings={this.props.Servings}
                        orderHandler={this.props.orderHandler}
                        Order={this.props.Order}/>
                </div>

                <div className="Button-step Button-next Button-step-full"
                     onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>
                    Select Flavors <i className="fa fa-chevron-right Icon-step"/>
                </div>
            </div>
        );
    }
}

export default ServingsStep;