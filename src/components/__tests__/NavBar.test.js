import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar'
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

afterEach(() => {
    cleanup();
})

test('should render Navbar component', () =>{
    render(<BrowserRouter><Navbar/></BrowserRouter>);
    const navBarElement = screen.getByTestId('navbar-1');
    expect(navBarElement).toBeInTheDocument();
    expect(navBarElement).toHaveTextContent('Patient Registration App');
})

test('matches snapshot', ()=> {
    const tree = renderer.create(<BrowserRouter><Navbar/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})