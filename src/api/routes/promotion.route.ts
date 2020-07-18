import { Router } from 'express';
import { check } from 'express-validator';
import { PromotionController } from '../controllers/promotion.controller';

export class PromotionRouter {
    public router: Router;
    public promotionController: PromotionController;

    constructor() {
        this.promotionController = new PromotionController();
        this.router = Router();
        this.router.get('/get', this.promotionController.get.bind(this.promotionController));
        this.router.get('/create', this.promotionController.create.bind(this.promotionController));
        this.router.post('/delete', 
                        [check('_ids', 'No ids were provided').exists()],
                        this.promotionController.delete.bind(this.promotionController));
        this.router.post('/duplicate', 
                        [check('_id', 'No id was provided').exists()],
                        this.promotionController.duplicate.bind(this.promotionController));
        this.router.post('/update', 
                        [check('_id', 'No id was provided').exists(),
                        check('Name', 'No name was provided').exists(),
                        check('Type', 'No type was provided').exists(),
                        check('StartDate', 'No start date was provided').exists(),
                        check('EndDate', 'No end date was provided').exists(),
                        check('UserGroupName', 'No user group name was provided').exists()],
                        this.promotionController.update.bind(this.promotionController));
    }
}