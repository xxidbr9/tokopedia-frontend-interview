import createSagaMiddleware from 'redux-saga';
// import rdxUserSaga from './features/user-store/user.saga';

export const sagaMiddleware = createSagaMiddleware();

const runSagas = () => {
  // sagaMiddleware.run(rdxUserSaga);
};

export default runSagas;
