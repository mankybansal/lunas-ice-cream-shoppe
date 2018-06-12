import React from 'react';
import * as AppConfig from "../../AppConfig";


function ServingsList(props) {
    const listItems = props.Servings.map((Serving) =>
        <div key={Serving.id.toString()} className="servingContainer">
            <b>{Serving.name}</b>
            <br/>
            <div>
                {Serving.desc}
            </div>
        </div>
    );

    return (
        <div>{listItems}</div>
    );
}

class ServingsStep extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Servings: null
        };

        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            Servings: this.props.Servings
        });
    }

    stepHandler(gotoStep) {
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Servings) {
            return null;
        }

        return (
            <div>
                <p>What would you like? (Cone/Bowl)</p>

                <ServingsList Servings={this.state.Servings}/>

                <button onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>Next: Choose Flavors</button>

                <br/>
                <br/>
                <br/>


                <button onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>

            </div>
        );
    }
}

export default ServingsStep;