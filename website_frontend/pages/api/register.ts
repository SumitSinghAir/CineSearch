import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/libs/prismadb";
import { axiosMainServerInstance } from "@/libs/axiosInstance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const { email, name, password } = req.body;

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    const inMainServer=await axiosMainServerInstance.post('/register/nextjs',{email,name,password});
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}
