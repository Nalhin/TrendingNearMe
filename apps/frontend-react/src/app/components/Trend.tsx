import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

import { TrendResponseDto } from '@trends/data';

const StyledCard = styled(Card)`
  margin: 8px;
`;

interface Props {
  trend: TrendResponseDto;
}

const Trend: React.FC<Props> = ({ trend: { name, url } }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" component="h2">
          <a href={url} rel="noreferrer noopener">
            {name}
          </a>
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default Trend;
