import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import { Actions } from "../../actions/actions";

const FeedbackDisplay = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/feedbacks/unique-dates"
        );
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

  const renderFeedbackTable = (feedbacks) => {
    if (feedbacks.length === 0) {
      return (
        <Box justifyContent="center" alignContent="center" display="flex" width="100%">
          <Spinner size="sm" mr={2} />
          Fetching feedbacks...
        </Box>
      );
    }

    return (
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
          {feedbacks?.map((feedback, index) => (
            <Tr key={index}>
              <Td>{feedback.user}</Td>
              <Td>{feedback.rating}</Td>
              <Td>{feedback.isInteractive}</Td>
              <Td>{feedback.feedbackmessage}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
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
              <TabPanel key={index}>
                {renderFeedbackTable(
                  feedbacksForLatestDate.tech[date] || [],
                  loading
                )}
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
              <TabPanel key={index}>
                {renderFeedbackTable(
                  feedbacksForLatestDate.site[date] || [],
                  loading
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Grid>
  );
};

export default FeedbackDisplay;
