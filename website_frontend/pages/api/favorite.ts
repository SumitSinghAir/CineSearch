import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import serverAuth from "@/libs/serverAuth";
import { axiosMainServerInstance } from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.body.delete) {
      const { currentUser } = await serverAuth(req, res);
      // const email=currentUser?.email
      const { movieId,profileId } = req.body;
      console.log("POSTING FAV",req.body);
      if(!movieId || !profileId){
        return res.status(400).end();
      }
      const d=axiosMainServerInstance.post("/addwatchlist",{profileId,movieId})
      return res.status(200).json("done");
    }
    if (req.body.delete) {
      const { currentUser } = await serverAuth(req, res);
      const { movieId,profileId } = req.body;
      console.log("DELETING FAV",req.body);
      if(!movieId || !profileId){
        return res.status(400).end();
      }
      const d=axiosMainServerInstance.post("/delwatchlist",{profileId,movieId})
      return res.status(200).json("done");
    }
    
    return res.status(405).end();
  } catch (error) {
    console.log("error in /favorite");

    return res.status(500).end();
  }
}
