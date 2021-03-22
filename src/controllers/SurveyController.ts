import { Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {
    async create(request: Request, response: Response) {

        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description
        });

        await surveysRepository.save(survey);

        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);

        const allListRepository = await surveysRepository.find();

        return response.json({ surveys: allListRepository });
    }

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const onlyOneSurvey = await surveysRepository.findOne({
            id: survey_id
        })

        if (!onlyOneSurvey) {
            throw new AppError("Surveys does not exist!")
        }

        return response.json({ onlyOneSurvey });
    }
}

export { SurveysController };