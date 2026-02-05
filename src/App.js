import React from "react";

import "./App.css";

export function App() {
  return (
    <div className="App">
      <header className="AppHeader">
        <h1 className="AppTitle">Daily Check-in</h1>
        <p className="AppPrompt">How are you feeling today?</p>
      </header>

      <main className="AppMain">
        <section className="AppCard" aria-label="Check-in form">
          <p className="AppPlaceholder">
            Form goes here (next steps: mood, note, tags, submit).
          </p>
        </section>

        <section className="AppCard" aria-label="Last submitted check-in">
          <p className="AppPlaceholder">Summary goes here.</p>
        </section>
      </main>
    </div>
  );
}
