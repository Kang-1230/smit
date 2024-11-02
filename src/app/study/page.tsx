//ssr, 컴포넌트 분리해서 csr로

import { getUser } from "@/utils/supabase/supabase-server";
import MyStudyList from "./components/MyStudyList";

const page = async () => {
  const user = await getUser();

  return (
    <div>
      <MyStudyList user={user} />
    </div>
  );
};

export default page;
