import React, {PropTypes} from 'react';
import Action from 'universal/components/Action/Action';

const ActionContainer = props => {
  return <Action {...props} />;
}

ActionContainer.propTypes = {
  children: PropTypes.element.isRequired
};

export default ActionContainer;
