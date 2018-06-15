import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MButton, { BUTTON_ADD } from '../component/MButton';
import MindmapItem from '../component/MindmapItem';
import '../css/addBtn.css';

class HomePage extends Component
{
    constructor(props)
    {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(e)
    {
        if (this.props.deviceReady)
        {
            this.props.addMindmap();
        }
    }

    render()
    {
        console.log( this.props.data );
        return(
            <div>
                <div>
                    <ul className="ui-listview" data-role="listview" data-inset="true" style={{height:"100%", "list-style-type":"none"}}>
                        {
                            this.props.data.map( (mapItem) =>
                                <MindmapItem data={mapItem} openMap={this.props.openMap}/>
                            )
                        }
                    </ul>
                </div>
                <MButton id='addBtn' clickHandler={this.onClickHandler} btnType={BUTTON_ADD} label=""/>
            </div>
        );
    }
}

HomePage.propTypes = {
    data:PropTypes.array.isRequired,
    deviceReady:PropTypes.bool.isRequired,
    openMap:PropTypes.func.isRequired,
    addMindmap:PropTypes.func.isRequired
}

export default HomePage;