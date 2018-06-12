import React from 'react';
import * as AppConfig from "../../AppConfig";


function FlavorsList(props) {
    const listItems = props.Flavors.map((Flavor) =>
        <div key={Flavor.id.toString()} className="flavorContainer">
            <b>{Flavor.name}</b>
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

    return (
        <div>{listItems}</div>
    );
}

class FlavorsStep extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Flavors: null
        };

        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            Flavors: this.props.Flavors
        });
    }

    stepHandler(gotoStep) {
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Flavors) {
            return null;
        }

        return (
            <div>
                <p>Select [number] Flavors</p>

                <FlavorsList Flavors={this.state.Flavors}/>

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