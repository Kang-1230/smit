import { StudyApplyList } from "@/service/posts";
import browserClient from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { Tables } from "../../../database.types";

const countApprovedApplicants = (applications: StudyApplyList[] | null) => {
  return (
    applications?.reduce(
      (count, application) => (application.is_approved ? count + 1 : count),
      0,
    ) ?? 0
  );
};

type Props = {
  studyId: string;
  maxParticipants: number;
};

export default function OccupancyCounter({ studyId, maxParticipants }: Props) {
  const [applications, setApplications] = useState<Tables<"study_applylist">[]>(
    [],
  );

  const fetchApplications = useCallback(async () => {
    const { data, error } = await browserClient
      .from("study_applylist")
      .select(`*`)
      .eq("study_id", studyId);

    if (error) {
      console.error("Error fetching applications:", error);
      return;
    }

    setApplications(data);
  }, [studyId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const approvedCount = countApprovedApplicants(applications);

  return (
    <span>
      모집 {approvedCount + 1}/{maxParticipants}
    </span>
  );
}
