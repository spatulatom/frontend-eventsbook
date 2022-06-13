import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import EventItem from './EventItem';
import Button from '../../shared/components/FormElements/Button';
import './EventList.css';

const EventList = props => {
  if (props.items.length === 0) {
    return (
      <div className="event-list center">
        <Card>
          <h2>You do not have any events yet. You wan t to create one?</h2>
          <Button to="/events/new">Create</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="event-list">
      {props.items.map(event => (
        <EventItem
          key={event.id}
          id={event.id}
          image={event.image}
          title={event.title}
          description={event.description}
          address={event.address}
          creatorId={event.creator}
          coordinates={event.location}
          onDelete={props.onDeleteEvent}
          date={event.date}
          creator={event.creator}
          name={event.creatorName}
          comments={event.comments}
          creatorImage={event.creatorImage}
          likes={event.likes}
        />
      ))}
    </ul>
  );
};

export default EventList;
