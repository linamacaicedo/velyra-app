import supabase from "../config/supabase.js";

export const registerHost = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required"
      });
    }

    const { data: existingHost, error: existingError } = await supabase
      .from("hosts")
      .select("*")
      .eq("email", email)
      .single();

    if (existingHost) {
      return res.status(400).json({
        error: "Host already exists"
      });
    }

    const { data, error } = await supabase
      .from("hosts")
      .insert([
        {
          name,
          email,
          password
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    res.status(201).json({
      message: "Host registered successfully",
      host: data[0]
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export const loginHost = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    const { data, error } = await supabase
      .from("hosts")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    res.status(200).json({
      message: "Login successful",
      host: data
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};