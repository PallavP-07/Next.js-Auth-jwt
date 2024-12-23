"use server";
import connectToDatabase from '@/database/dbConnection';
import User from '@/model/userSchema';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
export async function fetchAuthUserAction() {
    await connectToDatabase();
    try {
      const getCookies = await cookies();
      const token = getCookies.get("token")?.value || "";
      if (token === "") {
        return {
          success: false,
          message: "Token is invalid",
        };
      }
      if (!token || token.split('.').length !== 3) {
        return { success: false, message: "Invalid token format" };
      }
      const decodedToken = jwt.verify(token, "Defaut_key");
      const getUserInfo = await User.findOne({ _id: decodedToken.id });
  
      if (getUserInfo) {
        return {
          success: true,
          data: JSON.parse(JSON.stringify(getUserInfo)),
        };
      } else {
        return {
          success: false,
          message: "Some error occured ! Please try again",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Something went wrong! please try again",
      };
    }
  };


  export  const userLogout = async ()=>{
     const getCookies =  await cookies();
      getCookies.set("token", ""); // don't put any empty space between this ""
  }