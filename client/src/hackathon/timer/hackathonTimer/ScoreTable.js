import React, { useState } from "react";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableCaption,
  TableContainer,
  Button,
  Stack,
  Input,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

const ScoreTable = ({ scores }) => {
  const [sortConfig, setSortConfig] = useState({ key: "rank", direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredAndSortedScores = React.useMemo(() => {
    let sortableItems = [...scores];

    if (searchTerm) {
      sortableItems = sortableItems.filter((score) =>
        score.userid.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [scores, sortConfig, searchTerm]);

  const paginatedScores = filteredAndSortedScores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <TableContainer style={{ outerHeight: "500px" }}>
      <Input
        placeholder="Search by User ID"
        value={searchTerm}
        onChange={handleSearch}
        mb={4}
      />
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Game Scores</TableCaption>
        <Thead>
          <Tr>
            <Th onClick={() => requestSort("rank")}>
              Rank {sortConfig.key === "rank" ? (sortConfig.direction === "ascending" ? <TriangleUpIcon /> : <TriangleDownIcon />) : null}
            </Th>
            <Th onClick={() => requestSort("userid")}>
              User ID {sortConfig.key === "userid" ? (sortConfig.direction === "ascending" ? <TriangleUpIcon /> : <TriangleDownIcon />) : null}
            </Th>
            <Th onClick={() => requestSort("score")}>
              Score {sortConfig.key === "score" ? (sortConfig.direction === "ascending" ? <TriangleUpIcon /> : <TriangleDownIcon />) : null}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedScores.map((score) => (
            <Tr key={score?.userid}>
              <Td>{score?.rank}</Td>
              <Td>{score?.userid}</Td>
              <Td>{score?.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Stack direction="row" spacing={4} justifyContent="center" mt={4}>
        {Array.from({ length: Math.ceil(filteredAndSortedScores.length / itemsPerPage) }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            colorScheme={currentPage === i + 1 ? "teal" : "gray"}
          >
            {i + 1}
          </Button>
        ))}
      </Stack>
    </TableContainer>
  );
};

export default ScoreTable;
