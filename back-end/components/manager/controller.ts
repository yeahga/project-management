import { Request, Response } from 'express';

import { Developer } from '../developer/model';
import { Manager } from './model';
import { Project } from '../project/model';

export const getAllManagers = async (req: Request, res: Response) => {
  Manager.aggregate([
    {
      $lookup: {
        from: Project.collection.name,
        localField: '_id',
        foreignField: 'managerId',
        as: 'projects',
      },
    },
    {
      $unwind: {
        path: '$projects',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Developer.collection.name,
        localField: 'projects._id',
        foreignField: 'projectId',
        as: 'projects.developers',
      },
    },
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        type: { $first: '$type' },
        projects: { $push: '$projects' },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 1,
        name: 1,
        type: 1,
        projects: {
          $filter: {
            input: '$projects',
            as: 'a',
            cond: { $ifNull: ['$$a._id', false] },
          },
        },
      },
    },
  ]).exec((error: any, managers: any) => {
    if (error) return res.json({ error });

    res.json({ data: { managers } });
  });
};

export const createManager = async (req: Request, res: Response) => {
  const type = 'manager';
  Manager.create({ ...req.body, projects: [], type }, (error, { _id }) => {
    if (error) return void res.json({ error });
    res.json({ success: true, data: { ...req.body, _id, type } });
  });
};

export const getManagerById = async (req: Request, res: Response) => {
  const { managerId } = req.params;
  Manager.findById(managerId, (err: any, manager: any) => {
    if (err || !manager) {
      return void res.status(400).json({ error: 'Manager not found' });
    }
    res.json({ data: manager });
  });
};

export const updateManager = async (req: Request, res: Response) => {
  const { managerId: _id } = req.params;
  const { name } = req.body;

  Manager.updateOne(
    { _id },
    {
      $set: {
        name,
      },
    },
    {},
    (error) => {
      if (error) res.json({ error });
      else res.json({ success: true, data: { name, _id } });
    }
  );
};
