import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { axiosMainServerInstance } from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    const { currentUser } = await serverAuth(req, res);
    const profiles= await axiosMainServerInstance.post('/getallprofile/next',{email:currentUser.email})
    console.log("profiles found",profiles.data);
    return res.status(200).json(profiles.data);
  } catch (error) {
    console.log("error in /profiles",error);
    return res.status(500).end();
  }
}
