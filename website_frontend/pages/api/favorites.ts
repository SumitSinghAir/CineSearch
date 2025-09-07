import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import { axiosMainServerInstance } from "@/libs/axiosInstance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const profileId= req.query.profileId as string;
    if (req.method !== 'GET' || !req.query.profileId) {
      return res.status(405).end();
    }
    const { currentUser } = await serverAuth(req, res);
    const favoritedMovies = await axiosMainServerInstance.post('/favourites/next',{email:currentUser.email,profileId:profileId})
    console.log("favoritedMovies  found",favoritedMovies .data);

    return res.status(200).json(favoritedMovies.data);
  } catch (error) {
    // console.log(error);
    return res.status(500).end();
  }
}
