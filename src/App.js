import "./App.css";
import {
  Stack,
  Button,
  Badge,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";

function Itunes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  return (
    <Stack direction="column">
      <Stack direction="row">
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button
          colorScheme="blue"
          onClick={async () => {
            const result = await fetch(
              `https://itunes.apple.com/search?term=${encodeURIComponent(
                searchTerm
              )}&entity=musicVideo`
            );
            const data = await result.json();
            console.log(typeof data);
            console.log(data);
            setResults(data.results);
          }}
        >
          Search
        </Button>
      </Stack>
      <Heading>Results:</Heading>

      <Table variant="striped" colorScheme="black">
        <Thead>
          <Tr>
            <Th>Thumbnail</Th>
            <Th>Artist</Th>
            <Th>Colection name</Th>
            <Th>Title</Th>
            <Th>Preview</Th>
          </Tr>
        </Thead>
        <Tbody>
          {results.map((result) => (
            <Tr>
              <Td>
                <img src={result.artworkUrl100} alt=""></img>{" "}
              </Td>
              <Td>{result.artistName}</Td>
              <Td>{result.collectionName}</Td>
              <Td>{result.trackName}</Td>
              <Td>
                <Button colorScheme="blue">
                  <a href={result.previewUrl}>Preview</a>{" "}
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Thumbnail</Th>
            <Th>Artist</Th>
            <Th>Colection name</Th>
            <Th>Title</Th>
            <Th>Preview</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Stack>
  );
}

function App(props) {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Stack direction="column">
          <Itunes />
        </Stack>
      </header>
    </div>
  );
}
export default App;
