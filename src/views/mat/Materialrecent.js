import React from 'react';
import DashboardCard from '../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';

const MaterialRecent = () => {
  return (
    <DashboardCard title="Recent Added Materials">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: '-40px',
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef',
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {/* 20 TimelineItems with varying dates and materials */}
          {/* ... (previous TimelineItems already included) */}
          <TimelineItem>
            <TimelineOppositeContent>5 months ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>New safety equipment delivered</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>6 months ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>HVAC system maintenance completed</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>7 months ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>New plumbing fixtures installed</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>8 months ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Electrical wiring upgraded</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>9 months ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Roof repairs completed</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>10 months ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Windows and doors replaced</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>11 months ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Building exterior repainted</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>12 months ago</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>New landscaping installed</TimelineContent>
          </TimelineItem>
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default MaterialRecent;

