import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom, favouritesAtom, searchHistoryAtom } from '../store';
import { getFavourites, getHistory } from '../lib/userData';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register'];

function RouteGuard(props) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    async function updateAtoms() {
      if (isAuthenticated) {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
      }
    }

    updateAtoms();
  }, [isAuthenticated, setFavouritesList, setSearchHistory]);

  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.includes(router.pathname);
    if (!isAuthenticated && !isPublicPath) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return <>{isAuthenticated && props.children}</>;
}

export default RouteGuard;
