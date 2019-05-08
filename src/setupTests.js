import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme'; // imported for side-effects

configure({ adapter: new Adapter() });
