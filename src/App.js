import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { HOME_PAGE, EDIT_PAGE, EXPORT_PAGE, EDIT_NODE_PAGE } from './action/page';
import HomePageContainer from './container/HomePageContainer';
import EditPageContainer from './container/EditPageContainer';
import ExportPageContainer from './container/ExportPageContainer';
import EditNodePageContainer from './container/EditNodePageContainer';

class App extends Component {
  render() {
      let pageNode;
      switch ( this.props.page )
      {
          case EDIT_NODE_PAGE:
          {
            pageNode = <EditNodePageContainer />;
            break;
          }
          case EXPORT_PAGE:
          {
            pageNode = <ExportPageContainer />;
            break;
          }
          case EDIT_PAGE:
          {
            pageNode = <EditPageContainer />;
            break;
          }
          case HOME_PAGE:
          default:
          {
            pageNode = <HomePageContainer />;
          }
      }
      return (
      <div className="App">
          {pageNode}
      </div>);
  }
}

App.propTypes = {
  page:PropTypes.string.isRequired
}

export default App;
