import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import App from "./App";
import "./index.css";

createRoot
	(document.getElementById("root") as HTMLElement).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
