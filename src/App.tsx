import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import "./index.css";

function App() {
  const [repoName, setRepoName] = useState("");
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);
  const [message, setMessage] = useState("Type something!");

  const debouncedSetMessage = useMemo(
    () =>
      debounce(async (username: string, repoName: string) => {
        repoName = repoName.trim();
        repoName = repoName.replaceAll(" ", "-");
        try {
          const res = await fetch(
            `https://api.github.com/repos/${username}/${repoName}`
          );
          if (res.status === 404) setMessage("Repository available!");
          else if (res.status === 200) setMessage("Repository already exists");
        } catch {
          setMessage("Failed to fetch");
        }
      }, 500),
    []
  );

  const type =
    touched && message === "Repository available!"
      ? "success"
      : touched && !repoName
      ? "error"
      : "";

  useEffect(() => {
    if (!touched) return;

    if (!username) {
      setRepoName("");
      return;
    }

    if (!repoName) {
      setMessage("⚠ Name cannot be blank");
      return;
    }

    setMessage("Checking availability...");
    debouncedSetMessage(username, repoName);

    return () => debouncedSetMessage.cancel();
  }, [repoName, username, touched, debouncedSetMessage]);

  return (
    <div>
      <form>
        <h1>Debouncing Example</h1>
        <label>
          Your GitHub username
          <input
            value={username}
            onChange={(e) => {
              setTouched(true);
              setUsername(e.target.value);
            }}
          />
        </label>
        {username && (
          <label>
            Your repository name
            <input
              value={repoName}
              onChange={(e) => {
                setTouched(true);
                setRepoName(e.target.value);
              }}
            />
            <span className={type}>{message}</span>
          </label>
        )}
      </form>
    </div>
  );
}

export default App;
