import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import {axiosMainServerInstance} from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { query } = req.query;

    if (typeof query !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!query) {
      throw new Error('Missing Id');
    }
    const movie=await axiosMainServerInstance.get(`/search?autocomplete=true&movie=${query}`);
    return res.status(200).json(movie.data.data);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
