import { Request, Response } from "express";
import supabase from "../config/supabase";

const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const { hostId, title, question, options } = req.body;

    if (!hostId || !title || !question || !options || options.length < 2) {
      return res.status(400).json({
        error: "hostId, title, question and at least two options are required"
      });
    }

    const code = generateCode();

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .insert([
        {
          host_id: hostId,
          title,
          question,
          code,
          is_active: true
        }
      ])
      .select()
      .single();

    if (sessionError) {
      return res.status(500).json({
        error: sessionError.message
      });
    }

    const formattedOptions = options.map((option: string) => ({
      session_id: session.id,
      text: option
    }));

    const { data: createdOptions, error: optionsError } = await supabase
      .from("options")
      .insert(formattedOptions)
      .select();

    if (optionsError) {
      return res.status(500).json({
        error: optionsError.message
      });
    }

    return res.status(201).json({
      message: "Session created successfully",
      session,
      options: createdOptions
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
};

export const getSessionsByHost = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("host_id", hostId)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
};

export const getSessionByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("code", String(code).toUpperCase())
      .eq("is_active", true)
      .maybeSingle();

    if (sessionError || !session) {
      return res.status(404).json({
        error: "Active session not found"
      });
    }

    const { data: options, error: optionsError } = await supabase
      .from("options")
      .select("*")
      .eq("session_id", session.id);

    if (optionsError) {
      return res.status(500).json({
        error: optionsError.message
      });
    }

    return res.status(200).json({
      session,
      options
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
};

export const getSessionResults = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const { data: options, error: optionsError } = await supabase
      .from("options")
      .select("*")
      .eq("session_id", sessionId);

    if (optionsError) {
      return res.status(500).json({
        error: optionsError.message
      });
    }

    const { data: votes, error: votesError } = await supabase
      .from("votes")
      .select("*")
      .eq("session_id", sessionId);

    if (votesError) {
      return res.status(500).json({
        error: votesError.message
      });
    }

    const results = options.map((option: any) => {
      const count = votes.filter((vote: any) => vote.option_id === option.id).length;

      return {
        optionId: option.id,
        optionText: option.text,
        votes: count
      };
    });

    return res.status(200).json({
      sessionId,
      totalVotes: votes.length,
      results
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
};

export const closeSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const { data, error } = await supabase
      .from("sessions")
      .update({
        is_active: false
      })
      .eq("id", sessionId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(200).json({
      message: "Session closed successfully",
      session: data
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message
    });
  }
};