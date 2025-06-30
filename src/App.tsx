import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import "./index.css";

function App() {
  const [repoName, setRepoName] = useState("");
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);
  const [feedback, setFeedback] = useState("Type something!");

  const debouncedSetFeedback = useMemo(
    () =>
      debounce(async (username: string, repoName: string) => {
        repoName = repoName.trim();
        repoName = repoName.replaceAll(" ", "-");
        try {
          const res = await fetch(
            `https://api.github.com/repos/${username}/${repoName}`
          );
          if (res.status === 404) setFeedback("Repository available!");
          else if (res.status === 200) setFeedback("Repository already exists");
        } catch {
          setFeedback("Failed to fetch");
        }
      }, 500),
    []
  );

  const type =
    touched && feedback === "Repository available!"
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
      setFeedback("⚠ Name cannot be blank");
      return;
    }

    setFeedback("Checking availability...");
    debouncedSetFeedback(username, repoName);

    return () => debouncedSetFeedback.cancel();
  }, [repoName, username, touched, debouncedSetFeedback]);

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
            <span className={type}>{feedback}</span>
          </label>
        )}
      </form>
    </div>
  );
}

export default App;
