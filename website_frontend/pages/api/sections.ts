import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { axiosMainServerInstance } from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }
    await serverAuth(req, res);
    const profileId= req.query.profileId as string;
    console.log("profileId",profileId);
    if(!profileId){
      return res.status(400).end();
    }
    const result=await axiosMainServerInstance.get('/home?profileId='+profileId);
    console.log("section found with",profileId,":",result.data);
    return res.status(200).json(result.data);
  } catch (error) {
    console.log("error in /sections",req.query);
    return res.status(500).end();
  }
}
