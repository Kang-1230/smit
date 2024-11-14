import { useState } from "react";
import { Tables } from "../../database.types";
import browserClient from "@/utils/supabase/client";

const useValidateNickname = (user?: Tables<"user">) => {
  const [userName, setUserName] = useState(user ? user.name : "");
  const [nicknameStatus, setNicknameStatus] = useState<
    "available" | "duplicate" | "invalid" | "initial" | "needsValidation"
  >("initial");

  const validateNickname = async () => {
    if (userName.length > 15) {
      setNicknameStatus("invalid");
      return;
    }

    if (!/^[가-힣a-zA-Z0-9]+$/.test(userName)) {
      setNicknameStatus("invalid");
      return;
    }
    const query = browserClient
      .from("user")
      .select("name")
      .eq("name", userName);

    const { data }: { data: Pick<Tables<"user">, "name">[] | null } =
      await (user ? query.neq("id", user.id) : query);

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

  const switchErrorMessage = () => {
    switch (nicknameStatus) {
      case "duplicate":
        return "이미 사용하고 있는 닉네임 입니다.";

      case "invalid":
        return "사용할 수 없는 닉네임 입니다.";

      default:
        return undefined;
    }
  };

  return {
    userName,
    validateNickname,
    inputChangeHandler,
    nicknameStatus,
    switchErrorMessage,
  };
};

export default useValidateNickname;
