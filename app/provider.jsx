"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserDetailContext } from "../context/UserDetailContext";

export default function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const createNewUser = async () => {
      try {
        const result = await axios.post("/api/user", {
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        });
        console.log("User created:", result.data);
        setUserDetail(result.data);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };

    if (user) {
      createNewUser();
    }
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}
