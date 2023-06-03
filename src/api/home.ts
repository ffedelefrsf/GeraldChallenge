import { AxiosResponse } from 'axios';

import { HomeDTO } from 'model/home.dto';
import { instance } from './instance';

const homeEndpoints = {
  getSections: () => {
    return instance.get('/public/testme') as Promise<
      AxiosResponse<HomeDTO, any>
    >;
  },
};

export default homeEndpoints;
