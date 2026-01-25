import { whopClient } from '@/lib/whop';
import { getCurrentUser, isStoreOwner } from '@/lib/auth';
import { headers } from "next/headers";
import { whopsdk } from "@/lib/whop-sdk";
import Sidebar from '../../../components/layout/sidebar';
import { redirect } from 'next/navigation';
import SettingsContent from '../../../components/layout/SettingsContent';

export default async function SettingsPage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
		const { experienceId } = await params;
  const { userId } = await whopsdk.verifyUserToken(await headers());


  const access = await whopsdk.users.checkAccess(experienceId, { id: userId });


  const isAdmin = access.access_level === "admin";


	const store = await whopClient.getStore();


	  const user = await whopsdk.users.retrieve(userId);
	
	  const displayName = user.name || `@${user.username}`;
	  const avatarUrl = user.profile_picture?.url ?? null;
	

	const categories = await whopClient.getCategories();
	const products = await whopClient.getProducts();

	return (
		<div className="flex min-h-screen bg-[#0a0a0a]">
			 {isAdmin && (
					  <Sidebar
						 user={{
							name: displayName,
							username: user.username,
							avatarUrl,
						 }}
					  />
					)}

			<main className="flex-1 ml-64 p-8">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
						<p className="text-gray-400">Customize your store and manage products</p>
					</div>

					<SettingsContent
						store={store}
						categories={categories}
						products={products}
					/>
				</div>
			</main>
		</div>
	);
}
