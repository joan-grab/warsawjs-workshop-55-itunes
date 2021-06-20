import "./App.css";
import {
  Stack,
  Button,
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

function Results(props) {

  const sortByPrice = (resultsToSort = props.results) => {
    const sortedResults = resultsToSort.sort(function (a, b) {
      return a.collectionPrice - b.collectionPrice;
    });
    props.setResults(sortedResults.slice());
  };

  return (
    <Stack direction="column">
      <Table variant="striped" colorScheme="black">
        <Thead>
          <Tr>
            <Th>Thumbnail</Th>
            <Th>Artist</Th>
            <Th>Collection name</Th>
            <Th>Title</Th>
            <Th style={{ cursor: "pointer" }} onClick={() => sortByPrice()}>
              Price
            </Th>
            <Th>Preview</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.results.map((result) => (
            <Tr key={result.trackId}>
              <Td>
                <img src={result.artworkUrl100} alt=""></img>
              </Td>
              <Td>{result.artistName}</Td>
              <Td>{result.collectionName}</Td>
              <Td>{result.trackName}</Td>
              <Td>{result.collectionPrice}</Td>
              <Td>
                <Button colorScheme="blue">
                  <a href={result.previewUrl}>Preview</a>
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Thumbnail</Th>
            <Th>Artist</Th>
            <Th>Collection name</Th>
            <Th>Title</Th>
            <Th>Price</Th>
            <Th>Preview</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Stack>
  );
}

function Itunes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);
  return (
    <Stack direction="column">
      <Heading>Find your favourite music video</Heading>
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
            setResults(data.results);
            setDisplayResults(true);
          }}
        >
          Search
        </Button>
      </Stack>
      {displayResults && (
        <Results results={results} setResults={setResults} />
      )}
    </Stack>
  );
}

function App(props) {
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
