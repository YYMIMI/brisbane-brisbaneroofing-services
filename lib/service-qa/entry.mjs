import corpus from './corpus.mjs';
import {createServiceQaWebHandler} from './service-qa-server.mjs';
export const serviceQa = createServiceQaWebHandler(corpus);
