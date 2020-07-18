import { Request, Response, NextFunction } from 'express';
import { PromotionService } from '../../services/promotion.service';
import { validationResult } from 'express-validator';

export class PromotionController {

    public promotionService: PromotionService;

    constructor() {
        this.promotionService = new PromotionService();
    }
    
    public async create(req: Request, res: Response, next: NextFunction) {
        this.validate(req, res, next);

        try {
            res.status(200).json(await this.promotionService.create());
        } catch (e) {
            console.log(`Error: ${e}`);
            res.status(400).json({ errors: [e] });
        }
    }

    public async get(req: Request, res: Response, next: NextFunction) {
        this.validate(req, res, next);

        try {
            res.status(200).json(await this.promotionService.get());
        } catch (e) {
            console.log(`Error: ${e}`);
            res.status(400).json({ errors: [e] });
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        this.validate(req, res, next);

        try {
            res.status(200).json(this.promotionService.update(req.body));
        } catch (e) {
            console.log(`Error: ${e}`);
            res.status(400).json({ errors: [e] });
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        this.validate(req, res, next);

        try {
            res.status(200).json(await this.promotionService.delete(req.body['_ids']));
        } catch (e) {
            console.log(`Error: ${e}`);
            res.status(400).json({ errors: [e] });
        }
    }

    public async duplicate(req: Request, res: Response, next: NextFunction) {
        this.validate(req, res, next);

        try {
            res.status(200).json(await this.promotionService.duplicate(req.body['_id']));
        } catch (e) {
            console.log(`Error: ${e}`);
            res.status(400).json({ errors: [e] });
        }
    }

    private validate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ 'errors': errors });
            next();
        }

        return;
    }
}