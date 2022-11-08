import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
// Exercise options are the parameters and headers which will be passed to the fetch API while fetching
// the data from rapidAPI. FetchData is the fucntion which will actually call the fetch API that resides
//fetchData.js
import HorizontalScrollbar from "./HorizontalScrollbar";
const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState(""); //the string entered by a user in the search bar while searching for Exercises
  const [bodyParts, setBodyParts] = useState([]);

  /* For the following useEffect hook, bodyParts are actually the categories present on the API and
   we need to populate all the categories on page load, before someone searches using the search bar, 
   because caegories need to be there all the time from page load. So useEffect hooks will be called 
   once the page loads, and the following async function will get the bodyPrts which later will be 
   used to populate the UI */
  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      console.log(bodyPartsData);
      setBodyParts(["all", ...bodyPartsData]); //now the bodyParts contain the actual data of all categories fetched using the API
    };
    fetchExercisesData(); //call the bodyPartsData method immediately the app load, so it can fetch and we populate the UI to show a use categories
  }, []);

  const handlSearch = async () => {
    if (search) {
      const exerciseData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );
      console.log(exerciseData);
      //filter method's return section returns either true or flse based on the conditional expression
      const searchedExercises = exerciseData.filter((exercise) => {
        return (
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
        );
      });
      setSearch("");
      setExercises(searchedExercises);
    }
  };
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
      >
        Awesome Exercises You
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
      >
        Should Know
      </Typography>
      <Box position="relative">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          placeholder="Search Exercises"
          type="text"
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        ></TextField>
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2526",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handlSearch}
        >
          Search
        </Button>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          p: "20px",
        }}
      >
        <HorizontalScrollbar
          data={bodyParts} //body parts are the categories going to be displayed in the HorizontalScrollBar, so passing this data as a prop
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
