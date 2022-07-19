export enum QUERY_TYPE {
    GET = "get"
}

export class QueryBuilder {
    protected wheres:any = [];
    protected queryType:any = '';
    // protected db = null;
    public query(){
        return this;
    }

    public where(column:string,where:any){
        const whereSet:any = {
            column : column,
            where : where
        }
        this.wheres.push(whereSet);
        return this;
    }

    public get(){
        this.queryType = QUERY_TYPE.GET;
        this.querySetting();
    }

    private querySetting(){
        const wheres = this.wheres;
        if(this.queryType == QUERY_TYPE.GET){
            wheres.forEach((value:any,index:any) => {
                console.log(value);
                console.log(index);
            })
        }
    }


    public toSql(){
        console.log(this.wheres);
        console.log(this.queryType);

    }
}