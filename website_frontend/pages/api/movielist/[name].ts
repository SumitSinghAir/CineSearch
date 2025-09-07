import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import {axiosMainServerInstance} from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { name } = req.query;

    if (typeof name !== 'string') {
      throw new Error('Invalid name');
    }

    if (!name) {
      throw new Error('Missing name');
    }
    const movie=await axiosMainServerInstance.get(`/section/${name}`);
    return res.status(200).json(movie.data);
  } catch (error) {
    console.log(" error in /movielist/[name]",req.query);
    return res.status(500).end();
  }
}
