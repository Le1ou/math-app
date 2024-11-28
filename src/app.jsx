import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
    const [hand, setHand] = useState('');
    const [communityCards, setCommunityCards] = useState('');
    const [probability, setProbability] = useState(null);

    const handleSubmit = async () => {
        const response = await axios.get('http://localhost:5000/api/probability', {
            params: { hand, communityCards }
        });
        setProbability(response.data.probability);
    };

    return (
        <div>
            <h1>Poker Probability Calculator</h1>
            <input 
                type="text" 
                placeholder="Enter your hand (e.g., AsKs)" 
                value={hand} 
                onChange={(e) => setHand(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Enter community cards (e.g., 2h3h4h)" 
                value={communityCards} 
                onChange={(e) => setCommunityCards(e.target.value)} 
            />
            <button onClick={handleSubmit}>Calculate Probability</button>
            {probability !== null && (
                <div>
                    <h2>Win Probability: {probability}%</h2>
                    <Line 
                        data={{
                            labels: ['Probability'],
                            datasets: [{
                                label: 'Win Probability',
                                data: [probability],
                                borderColor: 'rgba(75,192,192,1)',
                                fill: false,
                            }]
                        }}
                        options={{
                            scales: {
                                x: {
                                    type: 'category',
                                    position: 'bottom',
                                },
                                y: {
                                    type: 'linear',
                                    position: 'left',
                                },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default App;