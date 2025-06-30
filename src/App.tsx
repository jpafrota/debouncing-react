import { useEffect, useMemo, useState } from "react";
import "./index.css";
import { debounce } from "lodash";

function App() {
  const [text, setText] = useState("");
  const [touched, setTouched] = useState(false);
  const [message, setMessage] = useState("Type something!");

  const debouncedSetMessage = useMemo(
    () =>
      debounce(() => {
        setMessage("Search completed!");
      }, 500),
    []
  );

  const type =
    touched && message === "Search completed!"
      ? "success"
      : touched && !text
      ? "error"
      : "";

  useEffect(() => {
    if (!touched) return;

    if (touched && !text) {
      setMessage("⚠ Name cannot be blank");
      return;
    }

    setMessage("Checking availability...");
    debouncedSetMessage();

    return () => debouncedSetMessage.cancel();
  }, [text, touched, debouncedSetMessage]);

  return (
    <div>
      <form>
        <h1>Debouncing Example</h1>
        <label>
          <input
            value={text}
            onChange={(e) => {
              setTouched(true);
              setText(e.target.value);
            }}
          />
          <span className={type}>{message}</span>
        </label>
      </form>
    </div>
  );
}

export default App;
