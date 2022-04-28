import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SessionExpired from '../SessionExpired'
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

afterEach(() => {
    cleanup();
})

test('should render SessionExpired component', () =>{
    render(<BrowserRouter><SessionExpired/></BrowserRouter>);
    const sessionExpiredElement = screen.getByTestId('sessionExpired-1');
    expect(sessionExpiredElement).toBeInTheDocument();
    expect(sessionExpiredElement).toHaveTextContent('Session Expired.');
})

test('matches snapshot', ()=> {
    const tree = renderer.create(<BrowserRouter><SessionExpired/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})