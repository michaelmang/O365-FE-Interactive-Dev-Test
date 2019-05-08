import renderer from 'react-test-renderer';

export default elem => renderer.create(elem.getElement()).toJSON();
