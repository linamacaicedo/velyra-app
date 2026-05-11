import { Request, Response } from "express";
import supabase from "../config/supabase";

export const registerHost = async (req: Request, res: Response) => {
  try {
    const name = req.body.name.trim();

    const email = req.body.email.trim().toLowerCase();

    const password = req.body.password.trim();

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const { data: existingHost } = await supabase
      .from("hosts")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existingHost) {
      return res.status(400).json({
        error: "Host already exists",
      });
    }

    const { data, error } = await supabase
      .from("hosts")
      .insert([
        {
          name,
          email,
          password,
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
      message: "Host registered successfully",
      host: data,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const loginHost = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN DATA:", email, password);

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const { data, error } = await supabase
      .from("hosts")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    console.log("HOST FOUND:", data);

    if (error || !data) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    if (data.password !== password) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      host: data,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
