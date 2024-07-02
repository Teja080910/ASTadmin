import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FaCrown } from "react-icons/fa";
import "./countdown/Scorer.css"; // Make sure to create a CSS file for animations

const Scorer = ({ socket }) => {
  const [topScores, setTopScores] = useState([]);
  const [previousScores, setPreviousScores] = useState([]);

  useEffect(() => {
    socket.on("allScores", (data) => {
      // Sort scores in descending order and take top 5
      const sortedScores = data
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((score, index) => ({ ...score, rank: index + 1 }));

      setPreviousScores(topScores);
      setTopScores(sortedScores);
    });

    // Emit getAllScores to fetch initial scores
    socket.emit("getAllScores");

    return () => {
      socket.off("allScores");
    };
  }, [socket, topScores]);

  const getRankChange = (userid) => {
    const prevRank = previousScores.find(score => score.userid === userid)?.rank;
    const currentRank = topScores.find(score => score.userid === userid)?.rank;

    if (prevRank && currentRank) {
      if (prevRank > currentRank) {
        return 'up';
      } else if (prevRank < currentRank) {
        return 'down';
      }
    }
    return 'same';
  };

  return (
    <div className="scorer">
      <div className="score-head">
        <p>Top Scores</p>
        <div className="score-item-titles">
          <span className="rank">Rank</span>
          <span className="userid">User Name</span>
          <span className="score">Score</span>
        </div>
      </div>

      <div className="score-list">
        <TransitionGroup component={null}>
          {topScores.map((score) => (
            <CSSTransition key={score.userid} timeout={500} classNames="score">
              <div className={`score-item ${getRankChange(score.userid)}`}>
                <span className="rank">
                  {score.rank}.
                  {score.rank <= 3 && <FaCrown className={`crown rank-${score.rank}`} />}
                </span>
                <span className="userid">{score.userid}</span>
                <span className="score">{score.score}</span>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Scorer;
