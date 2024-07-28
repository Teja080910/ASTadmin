import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Actions } from "../../actions/actions";

import BarChartIcon from '@mui/icons-material/BarChart';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeedbackDisplay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackData, setFeedbackData] = useState({
    uniqueDatesWithLatestFeedbacks: {
      tech: [],
      site: [],
    },
    feedbacksForLatestDate: {
      tech: {},
      site: {},
    },
  });
  const [selectedTechDate, setSelectedTechDate] = useState("");
  const [selectedSiteDate, setSelectedSiteDate] = useState("");
  const [siteDatesMenuOpen, setSiteDatesMenuOpen] = useState(false); // State to manage dropdown visibility
  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);
  const [ feedbackModalName, setFeedbackModalName] = useState("Tech Stack")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Actions.FeedbackInitial();
        const uniqueDatesWithLatestFeedbacks =
          response.data.uniqueDatesWithLatestFeedbacks;
        const latestTechDate = uniqueDatesWithLatestFeedbacks.tech[0]?.date;
        const latestSiteDate = uniqueDatesWithLatestFeedbacks.site[0]?.date;

        setSelectedTechDate(latestTechDate || "");
        setSelectedSiteDate(latestSiteDate || "");
        setFeedbackData({
          uniqueDatesWithLatestFeedbacks,
          feedbacksForLatestDate: {
            tech: {
              [latestTechDate]: response.data.feedbacksForLatestDate.tech,
            },
            site: {
              [latestSiteDate]: response.data.feedbacksForLatestDate.site,
            },
          },
        });
        setLoading(false);
      } catch (error) {
        setError("Failed to load feedbacks.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateTabClick = async (date, type, isSelect) => {
    if (type === "tech") {
      if (isSelect) {
        setSelectedTechDate(date);
      } else {
        setSelectedTechDate(date);
        if (!feedbackData.feedbacksForLatestDate[type][date]) {
          try {
            const response = await Actions.FeedbackOnDateByType(date, type);
            setFeedbackData((prevData) => ({
              ...prevData,
              feedbacksForLatestDate: {
                ...prevData.feedbacksForLatestDate,
                [type]: {
                  ...prevData.feedbacksForLatestDate[type],
                  [date]: response.data.feedbacks,
                },
              },
            }));
          } catch (error) {
            setError("Failed to load feedbacks for the selected date.");
          }
        }
      }
    } else {
      if (isSelect) {
        setSelectedSiteDate(date);
      } else {
        setSelectedSiteDate(date);
        if (!feedbackData.feedbacksForLatestDate[type][date]) {
          try {
            const response = await Actions.FeedbackOnDateByType(date, type);
            setFeedbackData((prevData) => ({
              ...prevData,
              feedbacksForLatestDate: {
                ...prevData.feedbacksForLatestDate,
                [type]: {
                  ...prevData.feedbacksForLatestDate[type],
                  [date]: response.data.feedbacks,
                },
              },
            }));
          } catch (error) {
            setError("Failed to load feedbacks for the selected date.");
          }
        }
      }
    }
  };

  const calculateStatistics = (feedbacks) => {
    if (feedbacks.length === 0) {
      return {
        averageRating: 0,
        totalFeedbackCount: 0,
        interactivePercentage: 0,
      };
    }

    const totalFeedbackCount = feedbacks.length;
    const totalRating = feedbacks.reduce(
      (sum, feedback) => sum + feedback.rating,
      0
    );
    const interactiveCount = feedbacks.filter(
      (feedback) => feedback.isInteractive
    ).length;

    return {
      averageRating: (totalRating / totalFeedbackCount).toFixed(2),
      totalFeedbackCount,
      interactivePercentage: (
        (interactiveCount / totalFeedbackCount) *
        100
      ).toFixed(2),
    };
  };

  const renderFeedbackTable = (feedbacks,type) => {
    const { averageRating, totalFeedbackCount, interactivePercentage } =
      calculateStatistics(feedbacks);

    if (feedbacks.length === 0) {
      return (
        <Box
          justifyContent="center"
          alignContent="center"
          display="flex"
          width="100%"
        >
          <Spinner size="sm" mr={2} />
          Fetching feedbacks...
        </Box>
      );
    }

    return (
      <Box>
    <Box boxShadow="base" m={2}>
        <Table colorScheme="purple" >
          <Thead>
            <Tr>
              <Td>Total Feedbacks   <Button m={1} p={0} colorScheme="teal" onClick={() => handleAnalyticsClick(feedbacks,type)}>
          <BarChartIcon/>
        </Button></Td>
              <Td>Average Rating</Td>
              <Td>Interactive Feedbacks</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr color="purple">
              <Td>{totalFeedbackCount}</Td>
              <Td>{averageRating}</Td>
              <Td>{interactivePercentage}%</Td>
            </Tr>
          </Tbody>
        </Table>
        </Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>By</Th>
              <Th>Rating</Th>
              <Th>Interactive</Th>
              <Th>Feedback</Th>
            </Tr>
          </Thead>
          <Tbody>
            {feedbacks.map((feedback, index) => (
              <Tr key={index}>
                <Td>{feedback.user}</Td>
                <Td>{feedback.rating}</Td>
                <Td>{feedback.isInteractive ? "Yes" : "No"}</Td>
                <Td>{feedback.feedbackmessage}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      
      </Box>
    );
  };

  const handleAnalyticsClick = (feedbacks,type) => {
    setSelectedFeedbacks(feedbacks);
    setFeedbackModalName(type)
    onOpen();
  };

  const renderBarChart = (feedbacks) => {
    const data = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: feedbacks.filter(feedback => feedback.rating === rating).length,
    }));

    const chartData = {
      labels: data.map(d => `Rating ${d.rating}`),
      datasets: [
        {
          label: 'Count',
          data: data.map(d => d.count),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const { label, raw } = context;
              return `${label}: ${raw}`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    return (
      <Bar data={chartData} options={options} />
    );
  };

  if (loading) {
    return <Spinner size="xl" position="absolute" top="50%" left="50%" />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  const { uniqueDatesWithLatestFeedbacks, feedbacksForLatestDate } =
    feedbackData;

  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)", lg:"repeat(2, 1fr)" }} gap={4}>
      <Box p={5} shadow="md" borderWidth="1px">
        <Text fontWeight="bold">Tech Feedback</Text>
        <Tabs variant="enclosed" defaultIndex={0}>
          <TabList mb="1em">
            {uniqueDatesWithLatestFeedbacks.tech
              ?.slice(0, 4)
              .map(({ date }, index) => (
                <Tab
                  key={index}
                  onClick={() => handleDateTabClick(date, "tech", false)}
                >
                  {date}
                </Tab>
              ))}
            {uniqueDatesWithLatestFeedbacks.tech?.length > 3 && (
              <Tab>
                <Select
                  value={selectedTechDate}
                  onChange={(e) =>
                    handleDateTabClick(e.target.value, "tech", true)
                  }
                >
                  {uniqueDatesWithLatestFeedbacks.tech
                    ?.slice(3)
                    .map(({ date }, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))}
                </Select>
              </Tab>
            )}
          </TabList>
          <TabPanels>
            {uniqueDatesWithLatestFeedbacks.tech?.map(({ date }, index) => (
              <TabPanel key={index} p={0} m={0}>
                {renderFeedbackTable(feedbacksForLatestDate.tech[date] || [],"Tech Feedback")}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Text fontWeight="bold">Site Feedback</Text>
        <Tabs variant="enclosed" defaultIndex={0}>
          <TabList mb="1em">
            {uniqueDatesWithLatestFeedbacks.site
              ?.slice(0, 4)
              .map(({ date }, index) => (
                <Tab
                  key={index}
                  onClick={() => handleDateTabClick(date, "site", false)}
                >
                  {date}
                </Tab>
              ))}
            {uniqueDatesWithLatestFeedbacks.site?.length > 3 && (
              <Tab>
                <Select
                  value={selectedSiteDate}
                  onChange={(e) =>
                    handleDateTabClick(e.target.value, "site", true)
                  }
                >
                  {uniqueDatesWithLatestFeedbacks.site
                    ?.slice(3)
                    .map(({ date }, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))}
                </Select>
              </Tab>
            )}
          </TabList>
          <TabPanels>
            {uniqueDatesWithLatestFeedbacks.site?.map(({ date }, index) => (
              <TabPanel key={index} p={0} m={0}>
                {renderFeedbackTable(feedbacksForLatestDate.site[date] || [],"Site Feedback")}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detailed Analytics of {feedbackModalName ||""}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedFeedbacks.length > 0 ? renderBarChart(selectedFeedbacks) : <Text>No data available.</Text>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default FeedbackDisplay;
