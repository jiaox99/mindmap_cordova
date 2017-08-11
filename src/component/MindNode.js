import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const TYPE_PARENT = 125;
export const TYPE_CURRENT = 100;
export const TYPE_CHILD = 75;
export const TYPE_PLUS = 25;

class MindNode extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            timerID:0
        };

        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
        this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
        this.startDrag = this.startDrag.bind(this);
    }

    onMouseUpHandler(e)
    {
        console.log("MindNode ------- onMouseUpHandler");
        clearTimeout(this.state.timerID);
        this.setState({
            timerID:0
        });
        
        switch (this.props.type)
        {
            case TYPE_CHILD:
            {
                this.props.onDragEnd(this.props.id);
                if (this.props.dragging === true)
                {
                    break;
                }
            }
            case TYPE_PARENT:
            {
                this.props.moveFocus(this.props.id);
                break;
            }
            case TYPE_PLUS:
            {
                this.props.addNode(this.props.nextId, this.props.parent);
                break;
            }
            default:
            {
                this.props.editNode(this.props.id, this.props.parent);
                break;
            }
        }
    }

    onMouseDownHandler(e)
    {
        e.preventDefault();
        if (this.props.onDragStart != null)
        {
            let id = setTimeout(this.startDrag, 100);
            this.setState({
                timerID:id
            });
        }
        
    }

    startDrag(e)
    {
        this.props.onDragStart(this.props.id);
    }

    render()
    {
        let textStyle = {
            "dominant-baseline":"central",
            "text-anchor":"middle",
            "-webkit-user-select": "none",
            "-moz-user-select": "none"
        };

        let t = "translate(@x, @y)"
            .replace('@x', this.props.x)
            .replace('@y', this.props.y);
        var textNode = <text style={textStyle} pointerEvents="none" x="0" y="0">{this.props.text}</text>;
        let touchable = global.device && global.device.platform !== "browser";
        return (
        <g transform={t} onTouchEnd={touchable ? this.onMouseUpHandler : null} onMouseUp={touchable ? null : this.onMouseUpHandler}
            cursor="pointer" onMouseDown={touchable ? null : this.onMouseDownHandler} onTouchStart={touchable ? this.onMouseDownHandler : null}>
            {
                this.props.type === TYPE_PLUS ? <circle fill="#FFFFFF" stroke="#000000" r={48 * this.props.type * 0.01}></circle> : <circle fill="#00ff00" stroke="#000000" r={48 * this.props.type * 0.01}></circle>
            }
            {textNode}
        </g>);
    }
}

MindNode.propTypes = {
    id:PropTypes.number.isRequired,
    dragging:PropTypes.bool.isRequired,
    parent:PropTypes.number.isRequired,
    nextId:PropTypes.number.isRequired,
    text:PropTypes.string.isRequired,
    x:PropTypes.number.isRequired,
    y:PropTypes.number.isRequired,
    type:PropTypes.number.isRequired,
    editNode:PropTypes.func.isRequired,
    moveFocus:PropTypes.func.isRequired,
    addNode:PropTypes.func.isRequired,
    onDragStart:PropTypes.func.isRequired,
    onDragEnd:PropTypes.func.isRequired
};

export default MindNode;