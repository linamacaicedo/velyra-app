import { Request, Response } from "express";

import supabase from "../config/supabase";

export const createVote = async (req: Request, res: Response) => {
  try {
    const { sessionId, optionId, voterName } = req.body;

    if (!sessionId || !optionId || !voterName) {
      return res.status(400).json({
        error: "sessionId, optionId and voterName are required",
      });
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
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(201).json({
      message: "Vote submitted successfully",
      vote: data,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
