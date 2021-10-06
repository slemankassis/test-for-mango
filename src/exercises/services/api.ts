import Axios, { AxiosInstance } from 'axios';
import { MinAndMax } from '../../misc/models/MinAndMax';
import { Exercise2Values } from '../models/Exercise2Response';

class MockableService {
  api: AxiosInstance;

  constructor() {
    this.api = Axios.create({
      baseURL: 'http://demo8192803.mockable.io/',
    });
  }

  getExercise1Options() {
    return this.api.get<MinAndMax>('/exercise1');
  }

  getExercise2Options() {
    return this.api.get<Exercise2Values>('/exercise2');
  }
}

const MockableApi = () => {
  return new MockableService();
};

export default MockableApi();
