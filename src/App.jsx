import { Box } from "./components/box";
import { Nav } from "./components/nav";
import { Text } from "./components/text";

const App = () => {
  return (
    <>
      <div className="grid  ">
        <Nav />
        <Text className="sm:mb-40 " />
        <Box />
      </div>
    </>
  );
};

export default App;
