import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './EventItem';
import Button from '../../shared/components/FormElements/Button';
import './EventList.css';

const PlaceList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>You do not have any events yet. You wan t to create one?</h2>
          <Button to="/places/new">Create</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
          date={place.date}
          creator={place.creator}
          name={place.creatorName}
          comments={place.comments}
          creatorImage={place.creatorImage}
          likes={place.likes}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
