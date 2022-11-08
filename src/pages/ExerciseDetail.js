import { Box } from "@mui/system";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState({});
  const [targetMuscleExercises, setTargetMuscleExercises] = useState({});
  const [equipmentExercises, setEquipmentExercises] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = "https://exercisedb.p.rapidapi.com"; //setting url variable for exercise api
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com"; //setting url variable for youtube api

      const exerciseDetailData = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`, //getting exercise Details data from exercisedb api
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData); //setting exercise details data to the state
      const exerciseVideoslData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, //getting exercise Videos data from api
        youtubeOptions
      );
      setExerciseVideos(exerciseVideoslData.contents); //getting exercise Videos data to the state

      const targetMuscleExerciseData = await fetchData(
        `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, //getting exercise Details data from api
        exerciseOptions
      );
      setTargetMuscleExercises(targetMuscleExerciseData);

      const equipmentExerciseData = await fetchData(
        `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, //getting exercise Details data from api
        exerciseOptions
      );
      setEquipmentExercises(equipmentExerciseData);
    };
    fetchExercisesData();
  }, [id]);
  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimilarExercises
        targetMuscleExercises={targetMuscleExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};
export default ExerciseDetail;
