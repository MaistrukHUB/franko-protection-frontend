import { destroyCookie, parseCookies } from "nookies";
import axios, { instance } from "../utils/axios";
import { LoginFormDTO, LoginResponseDTO } from "./dto/auth.dto";

export const login = async (
  values: LoginFormDTO
): Promise<LoginResponseDTO> => {
  const { data } = await instance.post(`/auth/login`, values);
  return data;
};

export const checkRole = async (token: string): Promise<any> => {
  console.log("checkRole", token);

  try {
    const response = await fetch("http://localhost:6969/user/check", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error while checking role:", error);
    return false;
  }
};

export const logout = async () => {
  destroyCookie(null, "_token", { path: "/" });
};
