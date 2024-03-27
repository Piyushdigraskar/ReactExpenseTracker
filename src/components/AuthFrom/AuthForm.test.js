import { render , screen} from "@testing-library/react";
import AuthForm from "./AuthForm";
import '@testing-library/jest-dom'; // Importing directly


test('renders "SignUp please" text in the component', () =>{
    
    render(<AuthForm />);
    
    const testElement = screen.getByText('SignUp please');
    expect(testElement).toBeInTheDocument();

    
    
})

