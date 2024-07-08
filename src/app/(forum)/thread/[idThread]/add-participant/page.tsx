import { Metadata } from "next";
import { auth } from "../../../../../../auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Participant",
  description: "Add Participant to Thread",
};

export default function AddThreadParticipantPage() {
  const session = auth();

  if (!session) {
    redirect("/login");
  }
}
