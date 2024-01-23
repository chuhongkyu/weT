export interface IData{
    _id : any,
    title: string,
    content: string,
    category: string,
    time : string,
}

export interface IDetail {
    _id : any,
    title: string,
    content: string,
    email:string,
    category: string,
    time : string,
}

export interface IComment {
    _id : string,
    comment: string;
    email:string,
    time : string,
    parent : string;
}