import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useSession() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Set up timer for automatic logout after 1 minute
    const logoutTimer = setTimeout(() => {
      // Clear the token cookie by setting it to expire immediately
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      
      // Redirect to login page
      router.push('/auth/login');
    }, 60 * 1000); // 60 seconds = 1 minute

    // Cleanup timer on component unmount
    return () => clearTimeout(logoutTimer);
  }, [router]);
}