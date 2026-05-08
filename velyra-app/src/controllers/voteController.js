import supabase from "../config/supabase.js";

export const createVote = async (req, res) => {
  try {
    const { sessionId, optionId, voterName } = req.body;

    if (!sessionId || !optionId || !voterName) {
      return res.status(400).json({
        error: "sessionId, optionId and voterName are required"
      });
    }

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", sessionId)
      .eq("is_active", true)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({
        error: "Active session not found"
      });
    }

    const { data: option, error: optionError } = await supabase
      .from("options")
      .select("*")
      .eq("id", optionId)
      .eq("session_id", sessionId)
      .single();

    if (optionError || !option) {
      return res.status(404).json({
        error: "Option not found for this session"
      });
    }

    const { data: existingVote } = await supabase
      .from("votes")
      .select("*")
      .eq("session_id", sessionId)
      .eq("voter_name", voterName)
      .single();

    if (existingVote) {
      return res.status(400).json({
        error: "This voter already voted in this session"
      });
    }

    const { data, error } = await supabase
      .from("votes")
      .insert([
        {
          session_id: sessionId,
          option_id: optionId,
          voter_name: voterName
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    res.status(201).json({
      message: "Vote registered successfully",
      vote: data[0]
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export const getVotesBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const { data, error } = await supabase
      .from("votes")
      .select("*")
      .eq("session_id", sessionId);

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};