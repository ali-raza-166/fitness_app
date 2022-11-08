import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import BodyPart from "./BodyPart";
import LeftArrowIcon from "../assets/icons/left-arrow.png";
import RightArrowIcon from "../assets/icons/right-arrow.png";
import ExerciseCard from "./ExerciseCard";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"; //these will be imported from the package installed at the beginning i.e react-horizontal-scrolling-menu and will be used to display all the card in a horintal alignment
/* The following leftArrow and right Arrow are just copy pasted. they are there to move the scroll bar using buttons 
These arrows are just images of arrows inserted inside a Typography component of Material UI*/
const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart, isBodyParts }) => {
  //this data is passed from the SearchExercises.js and grabbed in data variable here so it can be populated to the UI now

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <Box
          key={item.id || item}
          itemId={item.id || item}
          title={item.id || item}
          m="0 40px"
        >
          {isBodyParts ? (
            <BodyPart
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          ) : (
            <ExerciseCard exercise={item} />
          )}
          {/*here we are are passing each item from .map method to the BodyPart component so it can render in the HorizontalScrollbar */}
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default HorizontalScrollbar;
