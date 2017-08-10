import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MButton, { BUTTON_BACK } from '../component/MButton';

class EditNodePage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            textValue:this.props.content
        };

        this.updateHandler = this.updateHandler.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e)
    {
        this.setState( {
            textValue:e.target.value
        });
    }

    handleSubmit(e)
    {
        e.preventDefault();
    }

    updateHandler()
    {
        if (this.state.textValue)
        {
            this.props.updateNode( this.props.id, this.state.textValue);
        }
        else
        {
            this.props.goEditPage();
        }
    }

    render()
    {
        return <div>
            <h1>EditNodePage</h1>
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.textValue} onChange={this.handleInput} />
            </form>
            <MButton id="homeBtn" clickHandler={this.updateHandler} btnType={BUTTON_BACK}/>
        </div>;
    }
}

EditNodePage.propTypes = {
    id:PropTypes.string.isRequired,
    content:PropTypes.string.isRequired,
    updateNode:PropTypes.func.isRequired,
    goEditPage:PropTypes.func.isRequired
};

export default EditNodePage;