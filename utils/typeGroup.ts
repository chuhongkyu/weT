import { ObjectId } from "mongodb";

export interface IData{
    _id : ObjectId,
    title: string,
    content: string,
    category: string,
    time : string,
}

export interface IDetail extends IData{
    _id : ObjectId,
    title: string,
    content: string,
    category: string,
    time : string,
    email: string,
}

export interface IComment {
    _id : string,
    comment: string;
    email: string,
    time : string,
    parent : string;
}

export interface IParams {
    params : ParamsTyps
}

type ParamsTyps = { idx: string }


interface User {
    email: string;
    name: string;
}
export interface ISession {
    expires: string;
    user: User;
}
