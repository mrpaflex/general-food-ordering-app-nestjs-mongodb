import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type UserDocument = HydratedDocument<User>

@Schema()
export class User{
    @Prop()
    userName: string;
    @Prop()
    password: string;
    @Prop()
    fullName: string;
    @Prop()
    phoneNumber: string
    @Prop({type: Boolean, default: false})
    suspended: boolean;
    @Prop({type: Boolean, default: false})
    deleted: boolean
    @Prop({type: Date, default: Date.now})
    date: Date
}

export const UserSchema = SchemaFactory.createForClass(User)