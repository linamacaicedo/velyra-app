import { Request, Response, NextFunction } from "express";
import Boom from "@hapi/boom";
import supabase from "../config/supabase";
import { getSocket } from "../socket";

export const createVote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sessionId, optionId, voterName } = req.body;

    if (!sessionId || !optionId || !voterName) {
      throw Boom.badRequest("sessionId, optionId and voterName are required");
    }

    const { data, error } = await supabase
      .from("votes")
      .insert([
        {
          session_id: sessionId,
          option_id: optionId,
          voter_name: voterName,
        },
      ])
      .select()
      .single();

    if (error) {
      throw Boom.badImplementation(error.message);
    }

    const io = getSocket();

    io.to(sessionId).emit("vote-created", {
      sessionId,
      vote: data,
    });

    return res.status(201).json({
      message: "Vote submitted successfully",
      vote: data,
    });
  } catch (error) {
    next(error);
  }
};
