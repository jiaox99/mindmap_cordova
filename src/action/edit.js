export const MOVE_FOCUS = "move_focus";
export const UPDATE_NODE = "update_node";
export const EDIT_NODE = "edit_node";
export const ADD_NODE = "add_node";
export const REMOVE_NODE = "remove_node";

export function moveFocusAction( id )
{
    return { type:MOVE_FOCUS, id };
}

export function updateNodeAction( id, content )
{
    return { type:UPDATE_NODE, id, content };
}

export function editNodeAction( id )
{
    return { type:EDIT_NODE, id };
}

export function addNodeAction( id, parent )
{
    return { type:ADD_NODE, id, parent };
}

export function removeNodeAction( id )
{
    return {type:REMOVE_NODE, id}
}