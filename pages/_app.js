import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/Reset.css';
import '../styles/Animate.css';
import '../styles/Basic.css';
import '../styles/Button.css';
import '../styles/Font.css';
import '../styles/slick.css';
import '../styles/Grid.css';
import '../styles/Custom.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp
