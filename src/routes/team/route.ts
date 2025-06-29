// Libraries
import { Router } from 'express';

// Services
import { TeamService } from '../../services/TeamService';

const teamRouter = Router();

teamRouter.get('/options', async (req, res) => {
  try {
    const teams = await TeamService.fetchTeams();
    res.status(200).send(teams);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

export { teamRouter };
