import React from 'react';
import { TrendResponseDto } from '@/Api';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
margin:8px;
`;

interface Props {
  trend: TrendResponseDto
}

const Trend: React.FC<Props> = ({ trend: { name, url } }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="h2">
          <a href={url}>{name}</a>
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Trend;