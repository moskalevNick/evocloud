import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NottificationMarkup, nottificationType } from './NottificationMarkup';

export const Nottification = ({ label, text, type }: nottificationType) => {
  toast(<NottificationMarkup label={label} text={text} type={type} />, { hideProgressBar: false });
};
