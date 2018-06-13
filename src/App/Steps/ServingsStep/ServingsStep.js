import React from 'react';
import * as AppConfig from "../../AppConfig";


class ServingsList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            CurrentOrder: null,
        };

        this.boundItemClick = this.onItemClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            CurrentOrder: this.props.currentOrder,
        });
    }

    onItemClick(item) {
        console.log(item);

        let CurrentOrder = this.state.CurrentOrder;
        CurrentOrder.Serving = item;

        this.setState({
           CurrentOrder: CurrentOrder
        });
    }

    render(){
        const listItems = this.props.Servings.map((Serving) => {

                let defaultClass = "servingContainer";
                if(this.state.CurrentOrder.Serving && this.state.CurrentOrder.Serving.id === Serving.id){
                    defaultClass += " selected"
                }

                return (
                    <div key={Serving.id.toString()} className={defaultClass} onClick={()=>this.boundItemClick(Serving)}>
                        <b>{Serving.name}</b>
                        <br/>
                        <br/>
                        <div>{Serving.desc}</div>
                    </div>
                )
            }
        );

        return (
            <div>{listItems}</div>
        );
    }
}

class ServingsStep extends React.Component {

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
            Servings: this.props.Servings
        });
    }

    stepHandler(gotoStep) {
        this.props.orderHandler(this.state.CurrentOrder);
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Servings) {
            return null;
        }

        return (
            <div>
                <p>What would you like? (Cone/Bowl)</p>
                <ServingsList Servings={this.state.Servings} orderHandler={this.orderHandler} currentOrder={this.state.CurrentOrder}/>
                <button onClick={() => this.stepHandler(AppConfig.steps.Flavors)}>Next: Choose Flavors</button>
                <button onClick={() => this.stepHandler(AppConfig.steps.Start)}>Cancel Order</button>

            </div>
        );
    }
}

export default ServingsStep;