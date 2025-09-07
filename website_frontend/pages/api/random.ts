import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { axiosMainServerInstance } from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    await serverAuth(req, res);
    const random=await axiosMainServerInstance.get('/random');
    return res.status(200).json(random.data[0]);
  } catch (error) {
    console.log("error in /random" ,req.query);
    return res.status(500).end();
  }
}
