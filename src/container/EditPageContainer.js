import EditPage from '../page/EditPage';
import { connect } from 'react-redux';
import { gotoHomePage, gotoExportPage } from '../action/page';
import { saveCurrentMapAction } from "../action/app";
import { editNodeAction, moveFocusAction, addNodeAction, removeNodeAction } from '../action/edit';
import { TYPE_CHILD, TYPE_PLUS} from '../component/MindNode';

function genChildren( allNodes, childrenIDs )
{
    if (childrenIDs.length === 0)
    {
        let step = Math.PI * 0.5;
        return [0, 1, 2, 3].map( i=>{
            return genOneNode( TYPE_PLUS, step, i, 0, "+");
        });
    }
    else
    {
        let step = Math.PI / childrenIDs.length;
        let arr = [];
        for (let i=0; i<childrenIDs.length; i++ )
        {
            arr.push(genOneNode(TYPE_CHILD, step, i*2, childrenIDs[i], allNodes[childrenIDs[i]].content));
            arr.push(genOneNode(TYPE_PLUS, step, i*2+1, 0, "+"));
        }            
        return arr;
    }
}

function genOneNode( type, angle, i, id, content )
{
    return {
        type,
        id,
        x:Math.sin(i * angle) * 100,
        y:Math.cos(i * angle) * 100,
        content
    };
}

const mapStateToProps = (state) =>
{
    let curNode = state.mindMap[state.focusNode];
    return {
        parentNode : curNode.parent >= 0 ? state.mindMap[curNode.parent] : null,
        currentNode: curNode,
        children:genChildren(state.mindMap, curNode.children),
        mindMap:state.mindMap,
        editMap:state.editMap,
        nextId:state.mindMap.length
    };
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        saveMap:(mapData)=>{
            dispatch(saveCurrentMapAction(mapData));
        },
        goHome:(id, data)=>
        {
            dispatch(gotoHomePage(id, data));
        },
        exportHandler:()=>
        {
            dispatch(gotoExportPage());
        },
        editNode:(id)=>
        {
            dispatch(editNodeAction(id));
        },
        moveFocus:id=>{
            dispatch(moveFocusAction(id));
        },
        addNode:(id, parent)=>
        {
            dispatch(addNodeAction(id, parent));
        },
        removeNode:id=>{
            dispatch(removeNodeAction(id));
        }
    };
}

const EditPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPage);

export default EditPageContainer;