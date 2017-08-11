import {HOME_PAGE, EDIT_PAGE, EXPORT_PAGE, EDIT_NODE_PAGE} from '../action/page';
import { ADD_MINDMAP_ITEM, OPEN_MAP, DEVICE_READY, ALL_MAP_LOADED } from '../action/app';
import { MOVE_FOCUS, UPDATE_NODE, EDIT_NODE, ADD_NODE, REMOVE_NODE } from '../action/edit';
import { combineReducers } from 'redux';

function currentPage( state = HOME_PAGE, action)
{
    switch ( action.type )
    {
        case ADD_NODE:
        case EDIT_NODE:
        {
            return EDIT_NODE_PAGE;
        }
        case UPDATE_NODE:
        case OPEN_MAP:
        {
            return EDIT_PAGE;
        }
        case HOME_PAGE:
        case EXPORT_PAGE:
        case EDIT_PAGE:
        {
            return action.type;
        }
        default:
        {
            return state;
        }
    }
}

function mindMap( state = [], action)
{
    switch (action.type)
    {
        case UPDATE_NODE:
        {
            return state.map(
                (node)=>
                {
                    return Object.assign( {}, node, {
                        content:node.id === action.id?action.content:node.content,
                    });
                }
            );
        }
        case REMOVE_NODE:
        {
            return state.map(
                (node)=>
                {
                    return Object.assign( {}, node, {
                        children:node.children.filter(id=>id !== action.id),
                    });
                }
            );
        }
        case ADD_NODE:
        {
            state = state.map( node=>{
                return Object.assign( {}, node, {
                    children:node.id === action.parent ? [...node.children,action.id] : node.children
                });
            });
            return state.concat( {
                    id:action.id,
                    content:"新节点",
                    children:[],
                    parent:action.parent
                });
        }
        case OPEN_MAP:
        {
            console.log( "mindMap::" + action );
            return action.data;
        }
        default:
        {
            return state;
        }
    }
}

function allMap( state=[], action )
{
    switch (action.type)
    {
        case ALL_MAP_LOADED:
        {
            return action.allMaps;
        }
        case HOME_PAGE:
        {
            return state.map( mData=>{
               return Object.assign( {}, mData, {
                   mapData:mData.id === action.id ? action.data : mData.mapData
               });
            });
        }
        case ADD_MINDMAP_ITEM:
        {
            //TODO deep clone
            return [
                ...state,
                {
                    id:state.length,
                    mapData:[{id:0, content:"主题", children:[], parent:-1, uid:new Date().getTime()}]
                }
            ];
        }
        default:
        {
            return state;
        }
    }
}

function focusNode( state=0, action)
{
    switch ( action.type )
    {
        case MOVE_FOCUS:
        {
            console.log(action);
            return action.id;
        }
        case OPEN_MAP:
        {
            return 0;
        }
        default:
        {
            return state;
        }
    }
}

function editMap(state=0, action)
{
    switch (action.type)
    {
        case OPEN_MAP:
        {
            return action.id;
        }
        default:
        {
            return state;
        }
    }
}

function editNode( state=0, action)
{
    switch (action.type)
    {
        case ADD_NODE:
        case EDIT_NODE:
        {
            return action.id;
        }
        default:
        {
            return state;
        }
    }
}

function deviceReady(state=false, action)
{
    switch (action.type)
    {
        case DEVICE_READY:
        {
            return true;
        }
        default:
        {
            return state;
        }
    }
}

export const mindMapApp = combineReducers({
    currentPage,
    allMap,
    mindMap,
    focusNode,
    editNode,
    editMap,
    deviceReady
});