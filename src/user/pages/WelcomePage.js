import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import './General.css';
import {Link} from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';

const Welcome = () => {
  
  

  return (
    <React.Fragment>
      
      
      <Card className="welcome-page">
    
      <p>Connect with your friends and the world around you on <span>eventsbook</span>.</p>
        <hr />
        
        <Link to="/auth">
          <Button type="submit">
          
          Log In
        
          </Button>
          </Link>
    
        
        
         
      </Card>
    </React.Fragment>
  );
};

export default Welcome;
