import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";

import ExerciseCard from "./ExerciseCard";
const Exercises = ({ exercises, setExercises, bodyPart }) => {
  console.log(exercises);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
  //the followinf useEffecct actually updates the search results hen we click on the categories. It does all this
  //using the bodyPart. On app load, the default value of bodyPart is 'all' in Home.js, so this hook makes API call
  //to load all exercises data and shows them in form of cards under Search results. Whenever we click on a category,
  //this useEffect's else block is run because on click we are changing the bodyPart, which is present in the
  //dependency array of this useEffect. so in the else block, this hook makes an API call to load the exercises data
  //that contains the specific keyword, i.e. bodyPart
  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercises(exercisesData);
    };
    fetchExercisesData();
  }, [bodyPart]);

  return (
    <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h5" mb="40px" sx={{ fontWeight: "bold" }}>
        Search Results
      </Typography>
      <Stack
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
