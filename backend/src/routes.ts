import {Router} from 'express';
import 'express-async-errors';
import AllPointsController from './controllers/AllPointsController';
import CodUserController from './controllers/CodUserController';
import ConsultUserController from './controllers/ConsultUserController';
import RegisterEntriesController from './controllers/RegisterEntriesController';
import RegisterExitController from './controllers/RegisterExitController';
import RegisterUserController from './controllers/RegisterUserController';
import VerifiUserHourController from './controllers/VerifyUserHourController';
import VerifyPointController from './controllers/VerifyPointController';

const router = Router();

// -- USER

router.post('/user/register', (req, res) =>{
    const registerUserController = new RegisterUserController();
    registerUserController.handle(req, res);
});
router.post('/user/all-points', (req, res) =>{
   const allRegisterUser =  new AllPointsController();
   allRegisterUser.handle(req, res);
});

router.post('/user/cod', (req, res) =>{
    const codUserController = new CodUserController();
    codUserController.handle(req, res);
})

router.post('/user/consult', (req, res) =>{
    const consultUserController = new ConsultUserController();
    consultUserController.handle(req, res);
})

// -- ENTRADAS

router.post('/entry/register', (req, res) =>{
    const registerEntriesController = new RegisterEntriesController();
    registerEntriesController.handle(req, res);
})

// -- SAIDAS

router.post('/exit/register', (req, res) =>{
    const registerExitController = new RegisterExitController();
    registerExitController.handle(req, res);
})


// -- VERIFICAÇÃO DE PONTO

router.post('/verify/point', async (req, res) => {
    const verifyPoint = new VerifyPointController;
    verifyPoint.handle(req, res);
});


// -- VERIFICAÇÃO DE HORA

router.post('/verify/hour', async (req, res) => {
    const verifyUserHour = new VerifiUserHourController;
    verifyUserHour.handle(req, res);
});

export default router;