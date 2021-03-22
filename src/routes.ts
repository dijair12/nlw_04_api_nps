import { Router } from 'express';
import { AnswerController } from './controllers/AnswersController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveyController';
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

const sendMailController = new SendMailController();

const answersController = new AnswerController();

const npsController = new NpsController();

router.post("/users", userController.create);
router.get("/users", userController.show);
router.get("/user/:name", userController.execute);

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);
router.get("/survey/:survey_id", surveysController.execute);

router.post("/sendMail", sendMailController.execute);

router.get("/answers/:value", answersController.execute);

router.get("/nps/:survey_id", npsController.execute);

export { router };