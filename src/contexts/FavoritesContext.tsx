import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface FavoriteItem {
  id: string;
  name: { zh: string; en: string };
  price: number;
  image: string;
  addedAt: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: FavoriteItem }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'LOAD_FAVORITES'; payload: FavoriteItem[] };

const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
  addToFavorites: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFromFavorites: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
} | null>(null);

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const exists = state.items.some(item => item.id === action.payload.id);
      if (exists) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    
    case 'REMOVE_FAVORITE': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }
    
    case 'CLEAR_FAVORITES':
      return {
        items: []
      };
    
    case 'LOAD_FAVORITES':
      return {
        items: action.payload
      };
    
    default:
      return state;
  }
}

const initialState: FavoritesState = {
  items: []
};

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // 从 localStorage 加载收藏数据
  useEffect(() => {
    const savedFavorites = localStorage.getItem('asupet_favorites');
    if (savedFavorites) {
      try {
        const favoritesData = JSON.parse(savedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: favoritesData });
      } catch (error) {
        console.error('Failed to load favorites from localStorage:', error);
      }
    }
  }, []);

  // 保存收藏数据到 localStorage
  useEffect(() => {
    localStorage.setItem('asupet_favorites', JSON.stringify(state.items));
  }, [state.items]);

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    const favoriteItem: FavoriteItem = {
      ...item,
      addedAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_FAVORITE', payload: favoriteItem });
  };

  const removeFromFavorites = (id: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  const isFavorite = (id: string) => {
    return state.items.some(item => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{
      state,
      dispatch,
      addToFavorites,
      removeFromFavorites,
      clearFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}