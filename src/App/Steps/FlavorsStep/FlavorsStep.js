import React from 'react';
import * as AppConfig from "../../AppConfig";


class FlavorsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            CurrentOrder: null,
        };

        this.boundItemClick = this.onItemClick.bind(this);
    }

    componentWillMount(){
        this.setState({
            CurrentOrder: this.props.currentOrder
        });
    }

    onItemClick(item) {
        console.log(item);

        let CurrentOrder = this.state.CurrentOrder;

        // check what kind of serving it is

        if(CurrentOrder.Flavors.includes(item)){
            CurrentOrder.Flavors.splice(CurrentOrder.Flavors.indexOf(item),1);
        }else {
            CurrentOrder.Flavors.push(item);
        }

        this.setState({
            CurrentOrder: CurrentOrder
        });
    }

    render() {
        const listItems = this.props.Flavors.map((Flavor) => {

                let defaultClass = "flavorContainer";
                if (this.state.CurrentOrder.Flavors.length > 0 && this.state.CurrentOrder.Flavors.includes(Flavor)) {
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
            CurrentOrder: null
        };

        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            CurrentOrder: this.props.currentOrder,
            Flavors: this.props.Flavors
        });
    }

    stepHandler(gotoStep) {
        this.props.orderHandler(this.state.CurrentOrder);
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Flavors) {
            return null;
        }

        return (
            <div>
                <p>Select [number] Flavors</p>

                <FlavorsList Flavors={this.state.Flavors} currentOrder={this.props.currentOrder}/>

                <button onClick={() => this.stepHandler(AppConfig.steps.Servings)}>Back: Select Serving</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Toppings)}>Next: Choose Toppings</button>

                <br/>
                <br/>
                <br/>


                <button onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>
            </div>
        );
    }
}

export default FlavorsStep;