import { useState } from "react";
import { Tables } from "../../database.types";
import browserClient from "@/utils/supabase/client";

const useValidateNickname = (user: Tables<"user">) => {
  const [userName, setUserName] = useState(user.name);
  const [nicknameStatus, setNicknameStatus] = useState<
    "available" | "duplicate" | "invalid" | "initial" | "needsValidation"
  >("initial");

  const validateNickname = async () => {
    if (!/^[가-힣a-zA-Z0-9]+$/.test(userName)) {
      setNicknameStatus("invalid");
      return;
    }
    const { data }: { data: Pick<Tables<"user">, "name">[] | null } =
      await browserClient
        .from("user")
        .select("name")
        .eq("name", userName)
        .neq("id", user.id);

    if (data?.length === 0) {
      setNicknameStatus("available");
    } else {
      setNicknameStatus("duplicate");
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setNicknameStatus("needsValidation");
  };
  return { userName, validateNickname, inputChangeHandler, nicknameStatus };
};

export default useValidateNickname;
