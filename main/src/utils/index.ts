// @ts-nocheck
export const fetchRemote = (url, remoteName) =>
  new Promise((resolve, reject) => {
    // We define a script tag to use the browser for fetching the remoteEntry.js file
    const script = document.createElement("script");
    script.src = url;
    script.onerror = (err) => {
      console.error(err);
      reject(new Error(`Failed to fetch remote: ${remoteName}`));
    };
    // When the script is loaded we need to resolve the promise back to Module Federation
    script.onload = () => {
      // The script is now loaded on window using the name defined within the remote
      const proxy = {
        get: (request) => window[remoteName].get(request),
        init: (arg) => {
          try {
            return window[remoteName].init(arg);
          } catch (e) {
            console.error(e);
            console.error(`Failed to initialize remote: ${remoteName}`);
            reject(e);
          }
        },
      };
      resolve(proxy);
    };
    // Lastly we inject the script tag into the document's head to trigger the script load
    document.head.appendChild(script);
  });

export const loadComponent =
  (remoteName, remoteUrl, moduleName, scope = "default") =>
  async () => {
    if (!(remoteName in window)) {
      // Need to load the remote first
      // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
      // eslint-disable-next-line no-undef
      await __webpack_init_sharing__(scope); // TODO when would you use a different scope?
      const fetchedContainer = await fetchRemote(
        `${remoteUrl.replace(/\/$/, "")}/remoteEntry.js`,
        remoteName
      );
      // eslint-disable-next-line no-undef
      await fetchedContainer.init(__webpack_share_scopes__[scope]);
    }
    const container = window[remoteName]; // Assuming the remote has been loaded using the above function
    const factory = await container.get(moduleName);
    const Module = factory();
    return Module;
  };
