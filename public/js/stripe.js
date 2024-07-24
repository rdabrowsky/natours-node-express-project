// disable-eslint
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51PffmYKhstXOJz6hN9LcH45r1fAaHa9Ax9PHZ8ltDWFYzqDXY0DI8LXeBV15DLo9NHHF5pK7ppAs3H0wErdaDNKu008bhqFPmh',
);

export const bookTour = async (tourId) => {
  // 1) Get session from server
  try {
    const session = await axios({
      method: 'get',
      url: `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`,
    });
    // 2) Create checkout form  + charge credit card
    if (!session) {
      return showAlert('error', 'Something went wrong, please try again later');
    }

    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
  }
};
