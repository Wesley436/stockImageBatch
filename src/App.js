import StockImageBatchContextProvider from "./context/StockImageBatchContextProvider";
import StockImageBatch from "./components/StockImageBatch";

function App() {
  return (
    <div>
      <StockImageBatchContextProvider>
        <StockImageBatch/>
      </StockImageBatchContextProvider>
    </div>
  );
}

export default App;
