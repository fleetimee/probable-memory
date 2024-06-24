import { useSession } from "next-auth/react";

const useInitials = () => {
  const { data: session } = useSession();
  if (!session) return null;

  const splitName = session.user.name!.split(" ");
  let initials = "";

  if (splitName.length === 1) {
    initials = splitName[0].charAt(0);
  } else {
    initials =
      splitName[0].charAt(0) + splitName[splitName.length - 1].charAt(0);
  }

  return initials;
};

export default useInitials;
