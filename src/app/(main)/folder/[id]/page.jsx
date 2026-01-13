"use client";

import DrivePage from "@/app/DrivePage";
import { useParams } from "next/navigation";

export default function FolderPage() {
  const params = useParams();

  return <DrivePage folderId={params.id} />;
}
