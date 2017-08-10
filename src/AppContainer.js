import App from './App';
import { connect } from 'react-redux'

const mapStateToProps = (state) =>
{
    return {
        page:state.currentPage,
    };
}



const AppContainer = connect(
    mapStateToProps
)(App);

export default AppContainer;