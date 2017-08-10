import EditNodePage from '../page/EditNodePage';
import { connect } from 'react-redux';
import { updateNodeAction } from '../action/edit';
import { gotoEditPage } from '../action/page';


const mapStateToProps = (state) =>
{
    return {
        id : state.editNode,
        content:state.mindMap[state.editNode].content
    };
}

const mapDispatchToProps = (dispatch)=>
{
    return {
        updateNode:(id, content)=>
        {
            dispatch(updateNodeAction(id, content));
        },
        goEditPage:()=>
        {
            dispatch(gotoEditPage());
        }
    };
}

const EditNodePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditNodePage);

export default EditNodePageContainer;