import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MButton, { BUTTON_HOME, BUTTON_ACTION, BUTTON_CAMERA} from '../component/MButton';
import '../css/addBtn.css';
import '../css/cameraBtn.css';
import '../css/homeBtn.css';
import MindNode, { TYPE_PARENT, TYPE_CURRENT } from '../component/MindNode';

class EditPage extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            dragID:-1
        };
        console.log( props );
        this.openCamera = this.openCamera.bind(this);
        this.saveAndGoHome = this.saveAndGoHome.bind(this);
        this.onDragStartHandler = this.onDragStartHandler.bind(this);
        this.onDragEndHandler = this.onDragEndHandler.bind(this);
        this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
        this.isInDropableRange = this.isInDropableRange.bind(this);
        this.onTouchMoveHandler = this.onTouchMoveHandler.bind(this);
    }

    saveAndGoHome()
    {
        this.props.saveMap( this.props.mindMap );
        this.props.goHome(this.props.editMap, this.props.mindMap);
    }

    openCamera()
    {
        console.log( "Clicked camera button" );
    }

    onDragStartHandler(id)
    {
        this.setState({
            dragID:id,
            x:-1,
            y:-1,
            dropable:false
        });
    }

    onDragEndHandler(e)
    {
        console.log( "EditPage ------------- onDragEndHandler" );
        if (this.state.dropable === true)
        {
            this.props.removeNode(this.state.dragID);
        }
        this.setState({
            dragID:-1
        });
    }

    onMouseMoveHandler(e)
    {
        if ( this.state.dragID >= 0 )
        {
            this.setState({
                dragID:this.state.dragID,
                x:e.clientX,
                y:e.clientY,
                dropable:this.isInDropableRange(e.clientX, e.clientY)
            });
        }
    }

    onTouchMoveHandler(e)
    {
        if ( this.state.dragID >= 0 )
        {
            let cx = e.touches[0].pageX;
            let cy = e.touches[0].pageY;
            this.setState({
                dragID:this.state.dragID,
                x:cx,
                y:cy,
                dropable:this.isInDropableRange(cx, cy)
            });
        }
    }

    isInDropableRange( x, y)
    {
        let hw = document.body.clientWidth * 0.5;
        let dis = Math.sqrt(Math.pow(hw*2-24-x, 2) + Math.pow(y-60, 2))

        console.log( "Distance -----------" + dis );
        return dis < 16;
    }

    render()
    {
        let hw = document.body.clientWidth * 0.5;
        let hh = document.body.clientHeight * 0.5;
        let dragFlag = this.state.dragID >=0 && this.state.x >= 0;
        let touchable = global.device && global.device.platform !== "browser";
        return (
            <div>
                <svg width={hw * 2} height={hh * 2} onTouchMove={touchable ? this.onTouchMoveHandler : null} onMouseMove={touchable ? null : this.onMouseMoveHandler}>
                    {
                        this.props.parentNode != null && <line y2={hh} x2={hw} y1="0" x1="16" stroke="#000000" />
                    }
                    
                    <circle cy={hh} cx={hw} fillOpacity="0" opacity={0.5} stroke="#000000" r={100}></circle>
                    <circle cy={60} cx={hw*2-24} fill="#000000" stroke="#000000" r={16}></circle>
                    {
                        this.props.parentNode != null && <MindNode x="0" y="0" id={this.props.parentNode.id} text={this.props.parentNode.content} type={TYPE_PARENT} moveFocus={this.props.moveFocus}/>
                    }
                    
                    <MindNode y={hh} x={hw} text={this.props.currentNode.content} type={TYPE_CURRENT} editNode={this.props.editNode} id={this.props.currentNode.id}/>
                    {
                        this.props.children.map( nodeInfo=>(
                            <MindNode y={nodeInfo.id === this.state.dragID && dragFlag ? this.state.y : hh+nodeInfo.y} dragging={nodeInfo.id === this.state.dragID}
                                x={nodeInfo.id === this.state.dragID && dragFlag ? this.state.x : hw + nodeInfo.x} text={nodeInfo.content} type={nodeInfo.type} id={nodeInfo.id}
                                nextId={this.props.nextId} parent={this.props.currentNode.id}
                                onDragStart={this.onDragStartHandler} onDragEnd={this.onDragEndHandler}
                                editNode={this.props.editNode} moveFocus={this.props.moveFocus} addNode={this.props.addNode}/>)
                        )
                    }
                </svg>
                {
                    this.props.parentNode == null && <MButton id="homeBtn" clickHandler={this.saveAndGoHome} btnType={BUTTON_HOME}/>
                }
                <MButton id="cameraBtn" clickHandler={this.openCamera} btnType={BUTTON_CAMERA}/>
                <MButton id="addBtn" clickHandler={this.props.exportHandler} btnType={BUTTON_ACTION}/>
            </div>);
    }
}

EditPage.propTypes = {
    parentNode:PropTypes.object,
    currentNode:PropTypes.object.isRequired,
    children:PropTypes.array,
    editMap:PropTypes.number.isRequired,
    mindMap:PropTypes.array.isRequired,
    nextId:PropTypes.number.isRequired,
    goHome:PropTypes.func.isRequired,
    editNode:PropTypes.func.isRequired,
    exportHandler:PropTypes.func.isRequired,
    moveFocus:PropTypes.func.isRequired,
    addNode:PropTypes.func.isRequired,
    removeNode:PropTypes.func.isRequired,
    saveMap:PropTypes.func.isRequired
};

export default EditPage;