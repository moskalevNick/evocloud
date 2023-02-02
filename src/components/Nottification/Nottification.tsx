import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NottificationMarkup, nottificationType } from './NottificationMarkup';

export const Nottification = ({ name, text }: nottificationType) => {
  toast(<NottificationMarkup name={name} text={text} />);
};
