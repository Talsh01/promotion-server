import { DbService } from './db.service';
import Promotion, { IPromotion, PromotionTypes } from '../models/promotion.model';
import config from 'config';
import randomstring from 'randomstring';

export class PromotionService {

    dbService: DbService;

    constructor() {
        this.dbService = new DbService();
    }

    public async get() {
        return await Promotion.find({});
    }

    public async update(body: any) {

        const conditions = { _id: body['_id'] },
        update = { $set: { Name: body['Name'],
                            Type: body['Type'],
                            StartDate: body['StartDate'],
                            EndDate: body['EndDate'],
                            UserGroupName: body['UserGroupName']}};
        
        return await Promotion.updateOne(conditions, update);
    }

    public async delete(_ids: string) {
        const conditions = { _id: { $in: _ids } };
        return await Promotion.deleteMany(conditions);
    }

    public async duplicate(_id: string) {
        const rowToDuplicate = await Promotion.findById(_id);
        const newPromotion = new Promotion({
            Name: rowToDuplicate?.Name,
            Type: rowToDuplicate?.Type,
            StartDate: rowToDuplicate?.StartDate,
            EndDate: rowToDuplicate?.EndDate,
            UserGroupName: rowToDuplicate?.UserGroupName,
        });

        return await newPromotion.save();
    }

    public async create() {

        await Promotion.deleteMany({});

        let promises: Array<Promise<any>> = [];
        const size: number = config.get('promotionContentSize');
        const bulk: number = config.get('mongoBulkSize');

        for (let i=0; i < (size / bulk); i++) {

            let promotionsArray: Array<IPromotion> = [];

            for (let j=0; j < bulk; j++) {
                let type = PromotionTypes[Math.floor(Math.random() * 3)];
                promotionsArray.push(new Promotion({
                    Name: randomstring.generate(10),
                    Type: type,
                    StartDate: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toLocaleDateString('he-IL'),
                    EndDate: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)).toLocaleDateString('he-IL'),
                    UserGroupName: randomstring.generate(5)
                }));
            }

            promises.push(Promotion.create(promotionsArray));
        }

        await Promise.all(promises);
        return {};
    }
}
