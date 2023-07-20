import AppContainer from "./pages/AppContainer";
import DashContext from "./context/useDashboardContext";

function App() {
  return (
    <DashContext>
      <AppContainer />
    </DashContext>
  );
}

export default App;
