// @ts-ignore

export const fetchRemote = (url, remoteName) =>
  new Promise((resolve) => {
    console.log("loading! ", url, remoteName);
    console.log("exists? ", window[remoteName]);
    // We define a script tag to use the browser for fetching the remoteEntry.js file
    const script = document.createElement("script");
    script.src = url;
    // When the script is loaded we need to resolve the promise back to Module Federation
    script.onload = () => {
      console.log("loaded!");
      // The script is now loaded on window using the name defined within the remote
      const proxy = {
        get: (request) => window[remoteName].get(request),
        init: (arg) => {
          try {
            console.log("remote: ", window[remoteName]);
            console.log("initialized!");
            return window[remoteName].init(arg);
          } catch (e) {
            console.log(`remote ${remoteName} already initialized`);
          }
        },
      };
      resolve(proxy);
    };
    // Lastly we inject the script tag into the document's head to trigger the script load
    document.head.appendChild(script);
  });

// const loaded = {};

export const loadComponent =
  (remoteName, remoteUrl, moduleName, scope = "default") =>
  async () => {
    console.log("loading component: ", remoteName, remoteUrl, moduleName);
    console.log("exists? ", remoteName in window);
    if (!(remoteName in window)) {
      console.log("need to fetch!");
      // Need to load the remote first
      // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
      // eslint-disable-next-line no-undef
      await __webpack_init_sharing__(scope); // TODO when would you use a different scope?
      const fetchedContainer = await fetchRemote(remoteUrl, remoteName);
      // eslint-disable-next-line no-undef
      await fetchedContainer.init(__webpack_share_scopes__[scope]);
      // window[remoteName] = container;
      console.log("fetched!");
    }
    const container = window[remoteName]; // Assuming the remote has been loaded using the above function
    console.log({ container, moduleName });
    const factory = await container.get(moduleName);
    console.log({ factory });
    const Module = factory();
    console.log({ Module });
    return Module;
  };
