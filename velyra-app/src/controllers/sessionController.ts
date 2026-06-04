import { Request, Response } from "express";
import Boom from "@hapi/boom";
import supabase from "../config/supabase";

const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const { hostId, title, question, options } = req.body;

    if (!hostId || !title || !question || !options || options.length < 2) {
      throw Boom.badRequest(
        "hostId, title, question and at least two options are required",
      );
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
          is_active: true,
        },
      ])
      .select()
      .single();

    if (sessionError) {
      throw Boom.internal(sessionError.message);
    }

    const formattedOptions = options.map((option: string) => ({
      session_id: session.id,
      text: option,
    }));

    const { data: createdOptions, error: optionsError } = await supabase
      .from("options")
      .insert(formattedOptions)
      .select();

    if (optionsError) {
      throw Boom.internal(optionsError.message);
    }

    return res.status(201).json({
      message: "Session created successfully",
      session,
      options: createdOptions,
    });
  } catch (error: any) {
    if (Boom.isBoom(error)) {
      return res.status(error.output.statusCode).json(error.output.payload);
    }

    return res.status(500).json(Boom.internal(error.message).output.payload);
  }
};

export const getSessionsByHost = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("host_id", hostId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw Boom.internal(error.message);
    }

    return res.status(200).json(data);
  } catch (error: any) {
    if (Boom.isBoom(error)) {
      return res.status(error.output.statusCode).json(error.output.payload);
    }

    return res.status(500).json(Boom.internal(error.message).output.payload);
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const { data: sessions, error: sessionsError } = await supabase
      .from("sessions")
      .select("*")
      .eq("host_id", hostId);

    if (sessionsError) {
      throw Boom.internal(sessionsError.message);
    }

    const sessionIds = sessions.map((session: any) => session.id);

    const { data: votes, error: votesError } = await supabase
      .from("votes")
      .select("*")
      .in("session_id", sessionIds);

    if (votesError) {
      throw Boom.internal(votesError.message);
    }

    const totalVotes = votes.length;

    const liveSessions = sessions.filter(
      (session: any) => session.is_active,
    ).length;

    let topSession = null;
    let maxVotes = 0;

    sessions.forEach((session: any) => {
      const sessionVotes = votes.filter(
        (vote: any) => vote.session_id === session.id,
      ).length;

      if (sessionVotes > maxVotes) {
        maxVotes = sessionVotes;
        topSession = session;
      }
    });

    return res.status(200).json({
      totalSessions: sessions.length,
      liveSessions,
      totalVotes,
      topSession,
    });
  } catch (error: any) {
    if (Boom.isBoom(error)) {
      return res.status(error.output.statusCode).json(error.output.payload);
    }

    return res.status(500).json(Boom.internal(error.message).output.payload);
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (sessionError) {
      throw Boom.notFound("Session not found");
    }

    const { data: options, error: optionsError } = await supabase
      .from("options")
      .select("*")
      .eq("session_id", sessionId);

    if (optionsError) {
      throw Boom.internal(optionsError.message);
    }

    return res.status(200).json({
      session,
      options,
    });
  } catch (error: any) {
    if (Boom.isBoom(error)) {
      return res.status(error.output.statusCode).json(error.output.payload);
    }

    return res.status(500).json(Boom.internal(error.message).output.payload);
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
      throw Boom.notFound("Active session not found");
    }

    const { data: options, error: optionsError } = await supabase
      .from("options")
      .select("*")
      .eq("session_id", session.id);

    if (optionsError) {
      throw Boom.internal(optionsError.message);
    }

    return res.status(200).json({
      session,
      options,
    });
  } catch (error: any) {
    if (Boom.isBoom(error)) {
      return res.status(error.output.statusCode).json(error.output.payload);
    }

    return res.status(500).json(Boom.internal(error.message).output.payload);
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
      throw Boom.internal(optionsError.message);
    }

    const { data: votes, error: votesError } = await supabase
      .from("votes")
      .select("*")
      .eq("session_id", sessionId);

    if (votesError) {
      throw Boom.internal(votesError.message);
    }

    const results = options.map((option: any) => {
      const count = votes.filter(
        (vote: any) => vote.option_id === option.id,
      ).length;

      return {
        optionId: option.id,
        optionText: option.text,
        votes: count,
      };
    });

    return res.status(200).json({
      sessionId,
      totalVotes: votes.length,
      results,
    });
  } catch (error: any) {
    if (Boom.isBoom(error)) {
      return res.status(error.output.statusCode).json(error.output.payload);
    }

    return res.status(500).json(Boom.internal(error.message).output.payload);
  }
};

export const closeSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const { data, error } = await supabase
      .from("sessions")
      .update({
        is_active: false,
      })
      .eq("id", sessionId)
      .select()
      .single();

    if (error) {
      throw Boom.internal(error.message);
    }

    return res.status(200).json({
      message: "Session closed successfully",
      session: data,
    });
  } catch (error: any) {
    if (Boom.isBoom(error)) {
      return res.status(error.output.statusCode).json(error.output.payload);
    }

    return res.status(500).json(Boom.internal(error.message).output.payload);
  }
};
