import { Request, Response } from "express";
import Boom from "@hapi/boom";
import supabase from "../config/supabase";

export const registerHost = async (req: Request, res: Response) => {
  try {
    const name = req.body.name?.trim();

    const email = req.body.email?.trim().toLowerCase();

    const password = req.body.password?.trim();

    if (!name || !email || !password) {
      throw Boom.badRequest("Name, email and password are required");
    }

    const { data: existingHost } = await supabase
      .from("hosts")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existingHost) {
      throw Boom.conflict("Host already exists");
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
      throw Boom.badImplementation(error.message);
    }

    return res.status(201).json({
      message: "Host registered successfully",
      host: data,
    });
  } catch (error) {
    throw error;
  }
};

export const loginHost = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw Boom.badRequest("Email and password are required");
    }

    const { data, error } = await supabase
      .from("hosts")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error || !data) {
      throw Boom.unauthorized("Invalid email or password");
    }

    if (data.password !== password) {
      throw Boom.unauthorized("Invalid email or password");
    }

    return res.status(200).json({
      message: "Login successful",
      host: data,
    });
  } catch (error) {
    throw error;
  }
};
