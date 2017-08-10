export const HOME_PAGE = "home_page";
export const EDIT_PAGE = "edit_page";
export const EXPORT_PAGE = "export_page";
export const EDIT_NODE_PAGE = "edit_node_page";

export function gotoHomePage(id, data)
{
    return { type:HOME_PAGE, id, data };
}

export function gotoEditPage()
{
    return { type:EDIT_PAGE };
}

export function gotoExportPage()
{
    return { type:EXPORT_PAGE };
}

export function gotoEditNodePage()
{
    return { type:EDIT_NODE_PAGE };
}