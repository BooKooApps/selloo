import { headers } from "next/headers";
import { whopsdk } from "@/lib/whop-sdk";
import ExperienceClient from "@/app/components/layout/experience-client";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ experienceId: string }>; // same as your SettingsPage
}) {
  const { experienceId } = await params;

  const { userId } = await whopsdk.verifyUserToken(await headers());
  const access = await whopsdk.users.checkAccess(experienceId, { id: userId });

  if (!access.has_access) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-500 font-semibold">
        Access denied — you must be a member of this whop.
      </div>
    );
  }

  const user = await whopsdk.users.retrieve(userId);

  const displayName = user.name || `@${user.username}`;
  const avatarUrl = user.profile_picture?.url ?? null;

  // Pass server data to client component
  return (
    <ExperienceClient
      isAdmin={access.access_level === "admin"}
      user={{
        name: displayName,
        username: user.username,
        avatarUrl,
      }}
    />
  );
}
