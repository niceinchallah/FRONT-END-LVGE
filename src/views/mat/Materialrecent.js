import React, { useState, useEffect } from 'react';
import DashboardCard from '../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import { Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { formatDistanceToNowStrict, format } from 'date-fns';
const MaterialRecent = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/materials');
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, []);

 

  const formatDateAgo = (date) => {
    // Vérifier si la valeur de la date est définie
    if (!date) {
      return "Date is undefined";
    }
  
    // Vérifier si la valeur reçue est une chaîne de caractères
    if (typeof date === 'string') {
      // Vérifier si la chaîne correspond au format "yyyy-MM-dd"
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (datePattern.test(date)) {
        // Convertir la chaîne en objet Date
        date = new Date(date);
      } else {
        // La chaîne ne correspond pas au format attendu, retourner une erreur
        return "Invalid date format";
      }
    }
  
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    
    // Calculer la différence de temps
    const millisecondsDiff = Date.now() - date.getTime();
    const daysDiff = Math.floor(millisecondsDiff / (1000 * 60 * 60 * 24));
    
    // Retourner le nombre de jours écoulés
    return `${daysDiff} days ago`;
  };
  
  

  return (
    <DashboardCard title="Recent Added Materials">
      <Timeline>
        {materials.map((material, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>{formatDateAgo(material.date)}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={index % 2 === 0 ? 'primary' : 'secondary'} variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>{material.name}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

export default MaterialRecent;





