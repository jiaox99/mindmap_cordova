import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MButton, { BUTTON_BACK } from '../component/MButton';

class ExportPage extends Component
{
    render()
    {
        return <div>
            <h1>ExportPage</h1>
            <MButton id="homeBtn" clickHandler={this.props.goEditPage} btnType={BUTTON_BACK}/>
        </div>;
    }
}

ExportPage.propTypes = {
    data:PropTypes.object.isRequired,
    goEditPage:PropTypes.func.isRequired
};

export default ExportPage;