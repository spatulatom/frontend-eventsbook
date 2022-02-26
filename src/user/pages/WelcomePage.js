import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import './Auth.css';
import {Link} from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';

const Welcome = () => {
  
  

  return (
    <React.Fragment>
      
      
      <Card className="authentication">
    
        <h3>Enjoy the unlimited storage (5GB) and dump your 
            every day photos here for your family and friends to see!!</h3>
        <hr />
        
        <Link to="/auth">
          <Button type="submit">
          
          <h3>AUTHENTICATE</h3>
        
          </Button>
          </Link>
    
        
        
         
      </Card>
    </React.Fragment>
  );
};

export default Welcome;
