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

        window.requestFileSystem( global.LocalFileSystem.PERSISTENT, 0, (fs)=>{
            let dirReader = fs.root.createReader();
            dirReader.readEntries(entries=>{
                // let maps = entries.map((entry, i)=>{
                //     if (entry.isFile)
                //     {
                //         return {id:i, mapData:readyFile(entry)};
                //     }
                // });
                // dispatch(allMapLoadedAction(maps));
                let maps = [];
                let readers = entries.map((entry, i)=>{
                    return readFile( maps, entry, i );
                });
                Promise.all(readers).then(function(value){
                    dispatch(allMapLoadedAction(maps));
                });
            });
        });
    };
}

export function saveCurrentMapAction( mapData )
{
    window.requestFileSystem( global.LocalFileSystem.PERSISTENT, 0, (fs)=>{
        fs.root.getFile( mapData[0].content+".km", {create:true, exclusive:false}, fileEntry=>{
            writeFile( fileEntry, mapData);
        });
    });

    return { type:MAP_SAVED };
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
        let str = JSON.stringify(mapData);
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
            maps[i] = {id:i, mapData:JSON.parse(reader.result)};
            resolve(true);
        };

        reader.readAsText(file);
    });
    });
}