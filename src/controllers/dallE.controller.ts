import { Request, Response } from 'express';
import dallEService from '../services/dallE.service';

const generateDallEImage = async (req: Request, res: Response) => {
    try {
        const { dreamDescription } = req.body;
        const image = await dallEService.generateDallEImage(dreamDescription);
        if (image) {
            res.send(image);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(
            'An error occurred while processing your request.',
        );
    }
};

export default {
    generateDallEImage,
};
