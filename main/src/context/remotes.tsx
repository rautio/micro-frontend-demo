import React, { createContext, useState, useContext, FC } from "react";

export interface Remote {
  name: string;
  url?: string;
}

export interface Remotes {
  remotes: Remote[];
  updateRemoteUrl: (name: string, newUrl: string) => void;
}

const initRemotes = [
  { name: "PRODUCTS", url: process.env.PRODUCTS_HOST || "" },
  { name: "CART", url: process.env.CART_HOST || "" },
];

const initState: Remotes = {
  remotes: initRemotes,
  updateRemoteUrl: () => {},
};

export const STORAGE_KEY = "fruit-remotes";

const storeRemotes = (remotes: Remote[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(remotes));
};

const hydrateRemotes = (): Remote[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    return [];
  } catch {
    return [];
  }
};

export const RemotesContext = createContext(initState);

export const RemotesProvider: FC<{
  children: any;
}> = ({ children }) => {
  const storedRemotes = hydrateRemotes();
  const [remotes, setRemotes] = useState<Remote[]>(
    storedRemotes.length > 0 ? storedRemotes : initRemotes
  );
  const updateRemoteUrl = (name: string, newUrl: string): void => {
    setRemotes((prevRemotes) => {
      const newRemotes = [...prevRemotes];
      const remoteIdx = newRemotes.findIndex((r) => r.name === name);
      if (remoteIdx > -1) {
        newRemotes[remoteIdx].url = newUrl;
      }
      storeRemotes(newRemotes);
      return newRemotes;
    });
  };
  // Storing remote URLs on global object so we can access them in other apps without
  // this provider being initialized.
  // @ts-ignore
  window.fsRemotes = remotes;
  const RemotesCtx: Remotes = {
    remotes,
    updateRemoteUrl,
  };
  return (
    <RemotesContext.Provider value={RemotesCtx}>
      {children}
    </RemotesContext.Provider>
  );
};
export default RemotesProvider;

export const useRemotes = (): [
  Remote[],
  (name: string, newUrl: string) => void
] => {
  const { updateRemoteUrl } = useContext(RemotesContext);
  // @ts-ignore
  return [window.fsRemotes, updateRemoteUrl];
};
