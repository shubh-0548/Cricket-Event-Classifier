import React from 'react';
import MatchCard from './MatchCard';
import Navbar from './Navbar';

const Match = () => {
  return (
    <div>
      <Navbar />
      {/* Rendering multiple MatchCard components with different flags and descriptions */}
      <MatchCard
        vd1="AUvsIN"      
        key="match1"
        team1="IND"
        team2="AUS"
        team1Flag="india"
        team2Flag="AU"
        description="Description for AU vs IN match"
      />
      <MatchCard
        vd1="AUvsPK"
        key="match2"
        team1="PAK"
        team2="AUS"
        team1Flag="PK"
        team2Flag="AU"
        description="Description for AU vs PK match"
      />
      <MatchCard
        vd1="AUvsWI"
        key="match3"
        team1="WI"
        team2="AUS"
        team1Flag="WI"
        team2Flag="AU"
        description="Description for AU vs WI match"
      />
      <MatchCard
        vd1="INvsPK"
        key="match4"
        team1="IND"
        team2="PAK"
        team1Flag="india"
        team2Flag="PK"
        description="Description for IN vs PK match"
      />
      <MatchCard
        vd1="INvsSA"
        key="match5"
        team1="IND"
        team2="SA"
        team1Flag="india"
        team2Flag="SA"
        description="Description for IN vs SA match"
      />
    </div>
  );
};

export default Match;
