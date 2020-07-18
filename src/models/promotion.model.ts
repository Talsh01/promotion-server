import { Document, Model, model, Schema } from 'mongoose';

export enum PromotionTypes {
    Basic,
    Epic,
    Common
}

export interface IPromotion extends Document {
    Name: string;
    Type: PromotionTypes;
    StartDate: string;
    EndDate: string;
    UserGroupName: string;
}

const promotionSchema: Schema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    StartDate: {
        type: String,
        required: true
    },
    EndDate: {
        type: String,
        required: true
    },
    UserGroupName: {
        type: String,
        required: true
    }
});

const Promotion: Model<IPromotion> = model('promotion', promotionSchema);

export default Promotion;