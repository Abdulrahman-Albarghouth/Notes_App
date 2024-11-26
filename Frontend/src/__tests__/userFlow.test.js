import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

describe('Full user workflow', () => {
  it('should complete the user flow from signup to note deletion', async () => {

    axios.post.mockResolvedValueOnce({ data: { access: 'fake-jwt-token' } });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(2));

    fireEvent.change(screen.getByLabelText(/New Username/i), { target: { value: 'newusername' } });
    fireEvent.change(screen.getByLabelText(/New Email/i), { target: { value: 'newemail@example.com' } });
    fireEvent.click(screen.getByText(/Update Profile/i));

    await waitFor(() => expect(screen.getByText(/Profile Updated/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Old Password/i), { target: { value: 'testpassword' } });
    fireEvent.change(screen.getByLabelText(/New Password/i), { target: { value: 'newpassword' } });
    fireEvent.click(screen.getByText(/Change Password/i));

    await waitFor(() => expect(screen.getByText(/Password Changed/i)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/Note Title/i), { target: { value: 'Test Note' } });
    fireEvent.change(screen.getByLabelText(/Note Description/i), { target: { value: 'Test description' } });
    fireEvent.click(screen.getByText(/Create Note/i));

    await waitFor(() => expect(screen.getByText(/Test Note/i)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/Edit Note/i));
    fireEvent.change(screen.getByLabelText(/Note Title/i), { target: { value: 'Updated Test Note' } });
    fireEvent.click(screen.getByText(/Update Note/i));

    await waitFor(() => expect(screen.getByText(/Updated Test Note/i)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/Delete Note/i));

    await waitFor(() => expect(screen.queryByText(/Updated Test Note/i)).not.toBeInTheDocument());
  });
});
