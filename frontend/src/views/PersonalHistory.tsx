import React from 'react';
import { useQuery } from 'react-query';
import { fetchGetTrendsHistory } from '@/api/trends.api';


const PersonalHistory: React.FC = () => {
  const { data } = useQuery('personal-history', fetchGetTrendsHistory);

  return (
    <div>{
      data?.data.map(trend =>
        (<div key={trend._id}>{trend}</div>),
      )
    }
    </div>
  );
};

export default PersonalHistory;