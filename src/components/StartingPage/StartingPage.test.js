import { render , screen} from "@testing-library/react";
import StartingPage from "./StartingPage";
import '@testing-library/jest-dom'; // Importing directly


test('Home page Text', () =>{
    render(<StartingPage />);
    const testElement = screen.getByText('Welcome to Home Page');
    expect(testElement).toBeInTheDocument();
})

