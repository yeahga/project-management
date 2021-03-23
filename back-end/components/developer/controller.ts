import { Request, Response } from 'express';

import { Developer } from './model';
import validate from './validate';

export const getAllDevelopers = async (req: Request, res: Response) => {
  const developers = await Developer.find({});

  res.json({ data: { developers } });
};

export const createDeveloper = async (req: Request, res: Response) => {
  const { data, error } = validate(req.body);
  if (error) return res.json({ error });

  Developer.create({ ...data }, (error, dev) => {
    if (error) return res.json({ error });
    const { _id } = dev;
    res.json({ success: true, data: { ...data, _id } });
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

  try {
    const { data, error } = validate(req.body);
    if (error) throw error;

    await Developer.updateOne({ _id }, { $set: data }, {});

    res.json({ success: true, data: { ...data, _id } });
  } catch (error) {
    res.json({ error });
  }
};
