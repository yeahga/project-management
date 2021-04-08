import { Request, Response } from 'express';

import { Developer } from '../developer/model';
import { Project } from './model';

export const getAllProjects = async (req: Request, res: Response) => {
  const projects = await Project.aggregate([
    {
      $lookup: {
        from: Developer.collection.name,
        localField: '_id',
        foreignField: 'projectId',
        as: 'developers',
      },
    },
  ]);

  res.json({ data: { projects } });
};

export const createProject = async (req: Request, res: Response) => {
  const type = 'project';
  Project.create({ ...req.body, type }, (error, { _id }) => {
    if (error) return res.json({ error });
    res.json({
      success: true,
      data: { ...req.body, _id, developers: [], type },
    });
  });
};

export const getProjectById = async (req: Request, res: Response) => {
  res.json({ success: true });
};

export const updateProject = async (req: Request, res: Response) => {
  const { projectId: _id } = req.params;
  const type = 'project';

  const data = { ...req.body, type, _id };

  Project.updateOne(
    { _id },
    {
      $set: data,
    },
    {},
    (error) => {
      if (error) res.json({ error });
      else res.json({ success: true, data });
    }
  );
};
