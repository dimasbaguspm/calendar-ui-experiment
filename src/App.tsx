import "./styles.css";
import "@reapit/elements/dist/index.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Calendar from "./Calendar";

export default function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Calendar />
      </DndProvider>
    </div>
  );
}
