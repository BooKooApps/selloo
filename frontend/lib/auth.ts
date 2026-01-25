export interface User {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatarUrl?: string | null;
  isOwner?: boolean;
}

// Mock auth - in production, integrate with Whop's auth system
// The WhopAppProvider from @whop-apps/sdk provides user context
export async function getCurrentUser(): Promise<User | null> {
  // This would typically use Whop's authentication
  // For now, return mock user
  // In production, get from Whop SDK context
  return {
    id: 'user_123',
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    isOwner: true,
  };
}

export async function isStoreOwner(storeId: string, userId: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  
  // In production, check against Whop API
  // Use Whop SDK to verify company ownership
  return user.isOwner === true;
}
