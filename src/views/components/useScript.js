export default function (src) {
  return new Promise((resolve, reject) => {
    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.head.append(script);
    }

    if (script.getAttribute("data-status") === "loaded") {
      resolve();
    }

    const onScriptLoad = () => {
      resolve();
      script.setAttribute("data-status", "loaded");
    }

    const onScriptError = () => {
      reject();
      script.setAttribute("data-status", "error");
    }

    script.addEventListener("load", onScriptLoad);
    script.addEventListener("error", onScriptError);

    const cleanup = () => {
      if (document.head.contains(script)) {
        script.removeEventListener("load", onScriptLoad);
        script.removeEventListener("error", onScriptError);
        document.head.removeChild(script);
      }
    };

    return cleanup;
  });
}