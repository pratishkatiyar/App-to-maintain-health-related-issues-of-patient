import { render, screen, cleanup } from '@testing-library/react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Login'
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

afterEach(() => {
    cleanup();
})

test('should render Login component', () =>{
    render(<BrowserRouter><Login/></BrowserRouter>);
    const loginElement = screen.getByTestId('login-1');
    expect(loginElement).toBeInTheDocument();
    expect(loginElement).toHaveTextContent('Physician ID:');
})

// test('renders login button correctly', () => {
//     const {getByTestId} = render(<BrowserRouter><Login/></BrowserRouter>)
//     expect(getByTestId('loginButton')).toHaveTextContent('Login')
// })

test('matches snapshot', ()=> {
    const tree = renderer.create(<BrowserRouter><Login/></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot();
})