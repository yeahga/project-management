import { Request, Response } from 'express';

import { Developer } from './model';

export const getAllDevelopers = async (req: Request, res: Response) => {
  const developers = await Developer.find({});

  res.json({ data: { developers } });
};

export const createDeveloper = async (req: Request, res: Response) => {
  const type = 'developer';

  Developer.create({ ...req.body, type }, (error, data) => {
    if (error) return res.json({ error });
    const { _id } = data;
    res.json({ success: true, data: { ...req.body, _id, type } });
  });
};

export const getDeveloperById = async (req: Request, res: Response) => {
  const { developerId } = req.params;
  Developer.findById(developerId, (err: any, developer: any) => {
    if (err || !developer) {
      return void res.status(400).json({ error: 'Developer not found' });
    }
    res.json({ data: { developer } });
  });
};

export const updateDeveloper = async (req: Request, res: Response) => {
  const { developerId: _id } = req.params;
  const { name, email, phone, position, projectId } = req.body;
  const type = 'developer';
  const data = {
    name,
    email,
    phone,
    position,
    projectId,
    type,
  };

  Developer.updateOne({ _id }, { $set: data }, {}, (error) => {
    if (error) res.json({ error });
    else res.json({ success: true, data: { ...data, _id } });
  });
};
