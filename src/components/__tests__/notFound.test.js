import { render, screen, cleanup } from '@testing-library/react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound'

afterEach(() => {
    cleanup();
})

test('should render NotFound component', () =>{
    render(<BrowserRouter><NotFound/></BrowserRouter>);
    const notFoundElement = screen.getByTestId('notFound-1');
    expect(notFoundElement).toBeInTheDocument();
    expect(notFoundElement).toHaveTextContent('404 error');
    expect(notFoundElement).toHaveTextContent('Page not found.');
})

test('matches snapshot', ()=> {
    const tree = renderer.create(<BrowserRouter><NotFound/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})