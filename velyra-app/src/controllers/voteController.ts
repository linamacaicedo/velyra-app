import { Request, Response } from "express";
import Boom from "@hapi/boom";

import supabase from "../config/supabase";

export const createVote = async (req: Request, res: Response) => {
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
      throw Boom.internal(error.message);
    }

    return res.status(201).json({
      message: "Vote submitted successfully",
      vote: data,
    });
  } catch (error: any) {
    if (Boom.isBoom(error)) {
      return res.status(error.output.statusCode).json({
        error: error.message,
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
