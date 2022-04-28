import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logout from '../Logout'
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

afterEach(() => {
    cleanup();
})

test('should render Logout component', () =>{
    render(<BrowserRouter><Logout/></BrowserRouter>);
    const logoutElement = screen.getByTestId('logout-1');
    expect(logoutElement).toBeInTheDocument();
    expect(logoutElement).toHaveTextContent('You have been logged out');
})

test('matches snapshot', ()=> {
    const tree = renderer.create(<BrowserRouter><Logout/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})