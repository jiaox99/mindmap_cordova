class MindmapItemVO
{
    constructor( file, data=null )
    {
        this.file = file;
        this.data = data;
    }

    clone()
    {
        let vo = new MindmapItemVO(this.file);
        if (this.data !== null)
        {
            vo.data = this.data.map(
                (node)=>
                {
                    return node.clone();
                }
            );
        }
        return vo;
    }
}

class MindNodeVO
{
    constructor( id, content, children, parent=-1 )
    {
        this.id = id;
        this.content = content;
        this.children = children;
        this.parent = parent;
    }

    clone()
    {
        let vo = new MindNodeVO(this.id, this.content, this.children, this.parent);
        return vo;
    }
}