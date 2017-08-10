import ExportPage from '../page/ExportPage';
import { connect } from 'react-redux';
import { gotoEditPage } from '../action/page';


const mapStateToProps = (state) =>
{
    return {
        data : state.mindMap
    };
}

const mapDispatchToProps = (dispatch)=>
{
    return {
        goEditPage:()=>
        {
            dispatch(gotoEditPage());
        }
    };
}


const ExportPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExportPage);

export default ExportPageContainer;