import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Comments from './Comments';
import Likes from '../../shared/components/UIElements/Likes';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './EventItem.css';

const PlaceItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [image, setFullImage] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

 
  // The code aims to format a post description by identifying if it contains a 
  // URL and transforming it into an active link. Here's how it works:

  // 1. Declare variables: description, url, and link.
  // 2 .Check if the props.description includes the url string and there are no 
  //  spaces in the description. If true, assign the JSX element
  //  <a href={props.description}>click here</a> to the description variable.
  // 3. If the previous condition is false, check if props.description includes
  //  the url string and there are spaces in the description. If true, split 
  //  the props.description string into an array of words using spaces as separators.
  // 4. Map over each word in the array and check if the word includes the url 
  //   string.
  //   If the word includes the url string, modify the word to be an active 
  //   link wrapped in an <a> tag.
  //   Assign the modified word to the link variable.
  //   If the word does not include the url string, explicitly return the word 
  //   as it is.
  //   Finally, return null for the case where the word includes the URL.
  // 5. Filter out the null values from the array of words.
  // 6. Join the modified words back into a string using spaces and assign it 
  // to the description variable.
  // 7. If both previous conditions are false, use the original props.description 
  //   value for the description variable.
  // 8. The rest of the code follows after this logic to render the component.

  // By applying this logic, the code attempts to format the description to 
  // include active links when a URL is detected.


  let description;
  let url = 'https:';
  let link;
  
  // Check if the description includes the URL and there are no spaces
  if (props.description.includes(url) && props.description.indexOf(' ') <= 0) {
    description = <a href={props.description}>click here</a>;
  } else if (
    props.description.includes(url) &&
    props.description.indexOf(' ') >= 0
  ) {
    // Split the description into an array of words
    description = props.description
      .split(' ')
      .map((word) => {
        // Check if the word includes the URL
        if (word.includes(url)) {
          word = (
            <a href={word} target="_blank" rel="noopener noreferrer">
              see the site
            </a>
          );
          link = word; // Assign the modified word to the link variable
          return null
        } else {
          return word; // Explicitly return the word if it doesn't include the URL
        }
        // return null; // Return null for the case where the word includes the URL (or return it 
        // in the first if check. if you dont return it Preetier will be complaining)
      })
      .filter((word) => word !== null) // Filter out null values from the array
      .join(' '); // Join the modified words back into a string
  } else {
    description = props.description; // Use the original description if it doesn't include the URL
  }
  // end of the check for active link section.


  // Click on Image to make it take the whole screeen 
  const imageZoom = (event) => {
    console.log('Click!!', event.target);
    setFullImage((prev) => !prev);
  };


  let displayContent;
  // if !props.image we are dealing with new post:
  if (!props.image) {
    displayContent = (
      <div className="event-item__info event-item__info--post">
        <p className="event-item__description event-item__description--post">
          {description} {link}
        </p>
        <div className="event-item__info">
          <Link to="/users">
            <span className="event-item__avatar">
              <img src={props.creatorImage} alt="profile" />
            </span>
          </Link>
          <span className="event-item__name">{props.name}</span>
          <span className="event-item__date">{props.date}</span>
        </div>
      </div>
    );
  } else {
    // here we have props.image we are dealing with new photo:
    displayContent = (
      <div>
        <div
          className={
            image ? 'event-item__image--background' : 'event-item__image'
          }
        >
       
          <img
            className={image ? 'event-item__full-image' : ''}
            src={props.image}
            alt={props.title}
            onClick={imageZoom}
          />
              </div>
       
        <div className="event-item__info">
          <Link to="/users">
            <span className="event-item__avatar">
              <img src={props.creatorImage} alt="profile" />
            </span>
          </Link>
          <span className="event-item__name">{props.name}</span>
          <span className="event-item__description"> {props.description}</span>
          <span className="event-item__date">{props.date}</span>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        className="event-item__modal"
        contentClass="event-item__modal-content"
        footerClass="event-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure you want to continiue?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>

            <Button inverse onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>This action can not be reverted.</p>
      </Modal>
      <li className="event-item">
        <Card className="event-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          {displayContent}
          <Likes placeId={props.id} likes={props.likes} />
          <div className="event-item__actions">
            <Button inverse onClick={openMapHandler}>
              WHERE
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/events/${props.id}`}>UPDATE</Button>
            )}

            {auth.userId === props.creatorId && (
              <Button onClick={showDeleteWarningHandler}>DELETE</Button>
            )}
          </div>
          <Comments id={props.id} comments={props.comments} />
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
