import type { ErrorHandler } from 'polka';
import sentry from '../utils/sentry';
import logtail from '../utils/logtail';

/**
 * Default error handler
 */
export const errorHandler: ErrorHandler = (err, req, res) => {
  /* eslint-disable-next-line */
  process.env.NODE_ENV !== 'production' && console.log(err);
  sentry.captureException(err, (scope) => {
    scope.setContext('request_header', {
      'Content-Type': req.headers['content-type'],
      Origin: req.headers['origin'],
      Accept: req.headers['accept'],
      'User-Agent': req.headers['user-agent'],
    });
    scope.setContext('request_body', { body: req.body });
    return scope;
  });

  res
    .writeHead(500, { 'Content-Type': 'application/json' })
    .end(JSON.stringify({ msg: 'Something went wrong on our side.' }));

  logtail.error('Error was thrown', {
    error: err.toString(),
    headers: {
      'Content-Type': req.headers['content-type'] || '',
      Origin: req.headers['origin'] || '',
      Accept: req.headers['accept'] || '',
      'User-Agent': req.headers['user-agent'] || '',
    },
    body: req.body,
  });
};
