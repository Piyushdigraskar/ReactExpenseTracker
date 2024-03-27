//import userEvent from "@testing-library/user-event";
 
import { render , screen} from "@testing-library/react";
import Profile from "./Profile";
import '@testing-library/jest-dom'; // Importing directly
import Store from "../../Store/Index";
import { Provider } from "react-redux";

test('renders "Welcome To Expense Tracker" text in the component', () =>{
    
    render(<Provider store={Store}>
        <Profile />
    </Provider>);
    
    const WelcomeElement = screen.getByText('Welcome To Expense Tracker');
    expect(WelcomeElement).toBeInTheDocument();

    
    
})