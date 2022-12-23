import { Request, Response } from "express";
import { Todo } from "../models/todo";

export const ping = (req:Request, res:Response) => {
    res.json({pong: true})
}

export const all = async ( req:Request, res:Response ) => {
    const list = await Todo.findAll();
    res.json({list});
}

export const add = async (req:Request, res:Response) => {
    if (req.body.title) {
        let title = req.body.title
        let newTodo = await Todo.create({
            title: title,
            done: req.body.done ? 1 : 0
        })

        res.status(201).json({ item: newTodo })
    }else{
        res.json({error:'Dados não enviados.'})
    }
}

export const update = async ( req:Request, res:Response ) => {
    const id: string = req.params.id;

    let todo = await Todo.findByPk(id)
    if (todo) {
        if (req.body.title) {
            todo.title = req.body.title
        } if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    todo.done = 1;
                    break;
                case 'false':
                case '0':
                    todo.done = 0
                    break;
            }
        }
        todo.save()

        res.json({ item: todo })
    }else{
        res.json({error:'Item não encontrado'})
    }
}

export const remove = async ( req:Request, res:Response ) => {
    const id: string = req.params.id;

    let todo = await Todo.findByPk(id)
    if(todo){
        todo.destroy();
    }

    res.json({})
}