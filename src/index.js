import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { mindMapApp } from './reducer/reducer';
import { Provider } from 'react-redux'
import { startLoadMaps } from "./action/app";
import thunkMiddleware from "redux-thunk";

let store = createStore(mindMapApp, applyMiddleware(thunkMiddleware));

const curState = store.getState();
console.log(curState);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();

document.addEventListener( 'deviceready',
    function( e )
    {
        console.log( e.type );
        if (global.device.platform === "browser")
        {
            if (!window.isFilePluginReadyRaised)
            {
                window.addEventListener( "filePluginIsReady", (e)=>{
                    store.dispatch(startLoadMaps());
            } );
            }
            else
            {
                store.dispatch(startLoadMaps());
            }
        }
        else
        {
            store.dispatch(startLoadMaps());
        }
    }
);