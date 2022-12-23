import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface TodoInstance extends Model {
    id: number;
    title: string;
    done: number;
}

export const Todo = sequelize.define<TodoInstance>('Todo', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title:{
        type: DataTypes.STRING
    },
    done:{
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
}, {
    tableName: 'todo',
    timestamps:false
});