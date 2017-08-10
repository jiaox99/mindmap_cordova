import HomePage from '../page/HomePage';
import { connect } from 'react-redux';
import { openMap, addMindmapAction } from '../action/app';

const mapStateToProps = (state) =>
{
    return {
        data : state.allMap,
        deviceReady:state.deviceReady
    };
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        openMap:(id, data) =>
        {
            dispatch(openMap(id, data));
        },
        addMindmap:()=>
        {
            dispatch(addMindmapAction());
        }
    };
}

const HomePageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);

export default HomePageContainer;