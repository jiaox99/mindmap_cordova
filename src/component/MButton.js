import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const BUTTON_ACTION = "ui-icon-action";
export const BUTTON_ADD = "ui-icon-plus";
export const BUTTON_BACK = "ui-icon-back";
export const BUTTON_CAMERA = "ui-icon-camera";
export const BUTTON_HOME = "ui-icon-home";


class MButton extends Component
{
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e)
    {
        e.stopPropagation();
        console.log( "MButton clicked------------" );
        this.props.clickHandler();
    }

    render()
    {
        let classStr = "ui-btn ui-corner-all ui-btn-icon-notext " + this.props.btnType;
        return (
            <a id={this.props.id} onClick={this.handleClick} className={classStr}>{this.props.label}</a>
        );
    }
}

MButton.propTypes = {
    btnType:PropTypes.string.isRequired,
    label:PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    clickHandler:PropTypes.func.isRequired
};

export default MButton;