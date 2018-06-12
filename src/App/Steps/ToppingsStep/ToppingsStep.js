import React from 'react';
import * as AppConfig from "../../AppConfig";


class ToppingsList extends React.Component {

    constructor(props) {
        super(props);

        this.boundItemClick = this.onItemClick.bind(this);
    }

    onItemClick(item) {
        console.log(item);
    }

    render() {
        const listItems = this.props.Toppings.map((Topping) => {
                return (
                    <div key={Topping.id.toString()} className="flavorContainer" onClick={()=>this.boundItemClick(Topping)}>
                        <b>{Topping.name}</b>
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
            Toppings: null
        };

        this.stepHandler = this.stepHandler.bind(this);
    }

    componentWillMount() {
        this.setState({
            Toppings: this.props.Toppings
        });
    }

    stepHandler(gotoStep) {
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Toppings) {
            return null;
        }

        return (
            <div>
                <p>Select [number] Flavors</p>

                <ToppingsList Toppings={this.state.Toppings}/>

                <button onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>Back: Select  Flavors</button>
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