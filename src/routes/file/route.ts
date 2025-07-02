// Libraries
import { Router } from 'express';

// Services
import { FileService } from '../../services/FileService';

const fileRouter = Router();

fileRouter.post('/upload', async (req, res) => {
  try {
    const payload = req.body;
    const result = await FileService.getUploadUrl(payload);
    res.status(200).send(result);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

fileRouter.get('/download', async (req, res) => {
  try {
    const url = await FileService.getDownloadUrl(req.query.key as string);
    res.status(200).send({ url });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error',
    });
  }
});

export { fileRouter };
