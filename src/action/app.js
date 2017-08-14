export const ADD_MINDMAP_ITEM = "add_mindmap_item";
export const OPEN_MAP = "open_map";
export const DEVICE_READY = "device_ready";
export const ALL_MAP_LOADED = "all_map_loaded";
export const MAP_SAVED = "map_saved";

export function addMindmapAction()
{
    return { type:ADD_MINDMAP_ITEM };
}

export function openMap(id, data)
{
    return {type:OPEN_MAP, id, data};
}

export function deviceReadyAction()
{
    return {type:DEVICE_READY};
}

export function allMapLoadedAction( allMaps )
{
    return {type:ALL_MAP_LOADED, allMaps };
}

export function startLoadMaps()
{
    return dispatch=>{
        console.log("deviceReady------------------------------");
        dispatch(deviceReadyAction());

        if (global.device.platform === "Android" )
        {
            window.resolveLocalFileSystemURL( global.cordova.file.externalDataDirectory, dirEntry=>{
                readFiles(dirEntry, dispatch);
            });
        }
        else
        {
            window.requestFileSystem( global.LocalFileSystem.PERSISTENT, 0, (fs)=>{
                readFiles(fs.root, dispatch);
            });
        }
        
    };
}

function readFiles(dirEntry, dispatch)
{
    let dirReader = dirEntry.createReader();
    dirReader.readEntries(entries=>{
        let maps = [];
        let readers = entries.map((entry, i)=>{
            return readFile( maps, entry, i );
        });
        Promise.all(readers).then(function(value){
            dispatch(allMapLoadedAction(maps));
        });
    });
}

export function saveCurrentMapAction( mapData )
{
    if (global.device.platform === "Android" )
    {
        window.resolveLocalFileSystemURL( global.cordova.file.externalDataDirectory, dirEntry=>{
            writeFileToDirEntry(dirEntry, mapData);
        });
    }
    else
    {
        window.requestFileSystem( global.LocalFileSystem.PERSISTENT, 0, (fs)=>{
            writeFileToDirEntry(fs.root, mapData);
        });
    }

    return { type:MAP_SAVED };
}

function writeFileToDirEntry( dirEntry, mapData )
{
    dirEntry.getFile( mapData[0].uid+".km", {create:true, exclusive:false}, fileEntry=>{
        writeFile( fileEntry, mapData);
    });
}

function writeFile( fileEntry, mapData )
{
    fileEntry.createWriter(fileWriter=>{
        fileWriter.onwriteend = ()=>{
            alert( "File saved" );
        };
        fileWriter.onerror = (error)=>{
            alert("Write file error");
        };
        let str = JSON.stringify(convertToKM(mapData));
        let dataObj = new Blob([str], {type:"text/plain"});
        fileWriter.write(dataObj);
    });
}

function readFile(maps, fileEntry, i)
{
    return new Promise(function(resolve){
        fileEntry.file(file=>{
        let reader = new FileReader();

        reader.onloadend = ()=>{
            let oriData = JSON.parse(reader.result);

            maps[i] = {id:i, mapData:oriData instanceof Array ? oriData : convertFromKM(oriData)};
            resolve(true);
        };

        reader.readAsText(file);
    });
    });
}

function convertToKM( mapData )
{
    let kmData = { root:convertToKMNode(mapData, 0) };
    kmData.root.data.id = mapData[0].uid;

    console.log( "convertToKM ------" );
    console.log( kmData );
    return kmData;
}

function convertToKMNode( mapData, i )
{
    return {
        data:{
            text:mapData[i].content
        },
        children:mapData[i].children.map(j=>{
            return convertToKMNode(mapData, j);
        })
    };
}

function convertFromKM( kmData )
{
    let mapData = [];
    kmData.root.parent = -1;
    convertFromKMNode( mapData, [kmData.root] );
    if (kmData.root.data.id)
    {
        mapData[0].uid = kmData.root.data.id;
    }
    else
    {
        mapData[0].uid = new Date().getTime();
    }

    console.log( "convertFromKM ------" );
    console.log( mapData );

    return mapData;
}

function convertFromKMNode( mapData, kmNodes )
{
    // mapData.push( {id:mapData.length, content:kmNode.data.text, children:genChildren(mapData.length, kmNode.children.length)} );
    let subNodes = [];
    kmNodes.forEach( (kmNode, i)=>{
        mapData.push({
            id:mapData.length,
            content:kmNode.data.text,
            parent:kmNode.parent,
            children:kmNode.children.map((subNode, j)=>{
                subNodes.push(subNode);
                subNode.parent = mapData.length;
                return mapData.length + kmNodes.length - i + subNodes.length - 1;
            })
        });
    });
    
    if (subNodes.length > 0 )
    {
        convertFromKMNode( mapData, subNodes );
    }
}

function genChildren( pre, len )
{
    let arr = [];
    for (let i=0; i<len; i++ )
    {
        arr.push(pre + i + 1);
    }

    return arr;
}