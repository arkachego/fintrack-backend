// Libraries
import { Router } from 'express';

// Services
import { TeamService } from '../../services/TeamService';

const teamRouter = Router();

// complete
teamRouter.get('/list', async (req, res) => {
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

// complete
teamRouter.get('/:id/users', async (req, res) => {
  try {
    const teams = await TeamService.fetchTeamUsers(req.params.id);
    res.status(200).send(teams[0] || null);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

export { teamRouter };
