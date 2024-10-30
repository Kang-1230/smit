//ssr, 컴포넌트 분리해서 csr로

import { getUser } from "@/utils/supabase/supabase-server";
import ApplyStudyList from "./components/ApplyStudyList";

const page = async () => {
  const user = await getUser();

  return (
    <div>
      <ApplyStudyList user={user} />
    </div>
  );
};

export default page;
