import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { axiosMainServerInstance } from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("/subscribe visited")
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
    const query = req.query;
    console.log("query",query);
    const { currentUser } = await serverAuth(req, res);
    const {id:plan} = req.body;
    if(!currentUser.email || !plan)return res.status(401).end();
    const { data } = await axiosMainServerInstance.post('/subscribe?plan=' + plan,{email:currentUser?.email});
    
    return res.status(200).json(data);
  } catch (error) {
    console.log("error in /subscribe");
    return res.status(500).end();
  }
}
