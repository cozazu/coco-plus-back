import axios from "axios";

import ILoginForm from "../types/loginFormInterface";
const urlBase = process.env.NEXT_PUBLIC_API_URL;

const PostLogin = async (data: ILoginForm) => {
  const url = `${urlBase}/auth/signin`;

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("hay un error", error);
  }
};

export default PostLogin;