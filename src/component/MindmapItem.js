import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MindmapItem extends Component
{
    constructor(props)
    {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler()
    {
        this.props.openMap( this.props.data.id, this.props.data.mapData );
    }

    render()
    {
        let touchable = global.device && global.device.platform !== "browser";
        return (
        <li>
            <a className="ui-btn" onTouchEnd={touchable ? this.clickHandler : null} onClick={touchable ? null : this.clickHandler}>{this.props.data.mapData[0].content}</a>
        </li>);
    }
}

MindmapItem.propTypes = {
    data:PropTypes.object.isRequired,
    openMap:PropTypes.func.isRequired
};

export default MindmapItem;