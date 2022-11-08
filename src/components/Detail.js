import React from "react";
import { Typography, Stack, Button } from "@mui/material";

import BodyPartImage from "../assets/icons/body-part.png";
import TargetImage from "../assets/icons/target.png";
import EquipmentImage from "../assets/icons/equipment.png";
const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail; //de-structuring the the exerciseDetail prop

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];
  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
    >
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }}>
        <Typography variant="h3" textTransform="capitalize">
          {name}
        </Typography>
        <Typography variant="h6">
          The Exercise {` `}
          {name} {` `}is one of the most important things you can do for your{" "}
          {target} {` `} health. Being physically active can improve your brain
          health, help manage weight, reduce the risk of disease, strengthen
          bones and muscles, and improve your ability to do everyday activities.
        </Typography>

        {extraDetail.map((item) => (
          <Stack key={item.name} direction="row" alignItems="center" gap="18px">
            <Button
              sx={{
                background: "#fff2db",
                width: "80px",
                borderRadius: "50%",
                height: "80px",
              }}
            >
              <img
                src={item.icon}
                alt={bodyPart}
                style={{ width: "40px", height: "40px" }}
              />
            </Button>
            <Typography fontSize="18px" textTransform="capitalize">
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
