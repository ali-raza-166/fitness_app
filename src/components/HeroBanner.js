import { Typography } from '@mui/material'
import React from 'react';
import {Box, Button} from '@mui/material';
import HeroBannerImage from '../assets/images/banner.png';
const HeroBanner = () => {
  return (
    <Box sx={{ mt: {lg : '212px', xs: '70px'}, ml: {sm:'50px'}, position: 'relative', p:'20px'}}>
        <Typography fontWeight='600' fontSize='26px' color='red'>
            Fitness Club
        </Typography>
        <Typography fontWeight='700' sx={{fontSize: {lg: '44px', xs:'40px'}}}>
            Sweat, Smile <br /> and Repeat
        </Typography>
        <Typography mb={3} >
            Check out the most effective exercises
        </Typography>
        <Button variant='contained' color='error' >Explore Exercise</Button>
        <img src={HeroBannerImage} alt="Banner Image" className='hero-banner-img'/>
    </Box>
  )
}

export default HeroBanner