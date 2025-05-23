"use server";
import { IUser } from "@/app/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

//login user
export const adminLogin = async ({ email, password }: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const userInfo = await res.json();
    // console.log("User info from server:", userInfo);

    return userInfo;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Network or server error" };
  }
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (token) {
    decodedData = await jwtDecode<IUser>(token);
    return decodedData;
  } else {
    return null;
  }
};

export const getToken = async () => {
  return (await cookies()).get("accessToken")?.value;
};
// log out
export const logOut = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
