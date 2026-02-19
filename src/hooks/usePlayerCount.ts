import { useState, useEffect } from 'react';

const GAME_ID = '15684145480';
const GAME_STATS_URL = `http://roblox.ninioteam.dev/api/${GAME_ID}/playerInfo`;

export function useGameStats() {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    const fetchGameStats = async () => {
      try {
        const response = await fetch(GAME_STATS_URL);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setPlayerCount(data.playersOnline || 0);
          setVisits(data.totalVisits || 0);
        }
        else {
          setPlayerCount(67);
          setVisits(67);
        }
      } catch (error) {
        console.error('Failed to fetch game stats:', error);
        setPlayerCount(67);
        setVisits(67);
      }
    };
    fetchGameStats();
    const interval = setInterval(fetchGameStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return { playerCount, visits };
}
