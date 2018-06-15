import React from 'react';
import * as AppConfig from "../../AppConfig";

class StartStep extends React.Component {

    constructor(props) {
        super(props);
        this.stepHandler = this.stepHandler.bind(this);
    }

    stepHandler(gotoStep) {
        this.props.stepHandler(gotoStep);
    }

    render() {
        if (this.props.currentStep !== AppConfig.steps.Start)
            return null;

        return (
            <div>

                <div className="App-title">Welcome to Luna's Ice Cream Shoppe</div>
                <div className="App-subtitle">We have been crafting the most hip, award winning, delicious ice cream the
                    world has ever seen for over 30 years.
                </div>

                <div onClick={() => this.stepHandler(AppConfig.steps.Servings)} className="circleClickerContainer">
                    <div className="circleClicker">
                        <div className="circleClickerPersistent">
                            <div className="circleClickerPersistent2"/>
                        </div>
                    </div>
                    <div className="circleClickerPrompt">Touch To Begin</div>
                </div>
            </div>
        );
    }
}

export default StartStep;