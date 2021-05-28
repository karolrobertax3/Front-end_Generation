import { Tema } from "./Tema"
import { User } from "./User"

export class Postagens{
    public id: number
    public titulo: string
    public texto: string
    public date: Date
    public usuarios: User
    public tema: Tema
}