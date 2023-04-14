import { __show } from '@configs/console.config';
import chalk from 'chalk';
import { isItServer } from './check.helper';

const Error = {
  title: chalk.bold.red,
  data: chalk.rgb(247, 173, 173),
  border: chalk.red,
};

const Log = {
  title: chalk.bold.cyan,
  data: chalk.rgb(157, 212, 255),
  border: chalk.cyan,
};

const C_Log = {
  title: chalk.bold.yellow,
  data: chalk.rgb(253, 126, 20),
  border: chalk.yellow,
};

const startLine = `===============================================================================================================================`;
const endLine = `--------------X--------------------------------X--------------------------------X--------------------------------X-------------`;

export const cLog = (dataToShow: any, component: string) => {
  let consoleMsg = dataToShow;
  const _server = isItServer();
  if (_server) {
    consoleMsg = Log.data(JSON.stringify(dataToShow, null, 3));
  }
  console.log(C_Log.border(startLine));
  console.log(C_Log.title(`Console.log:        ( ${component} )`));
  console.log(consoleMsg);
  console.log(C_Log.border(endLine));
};

export const highLightResponse = ({
  dataToShow,
  component,
}: {
  dataToShow: any;
  component: string;
}) => {
  const _server = isItServer();
  if (!_server) {
    Log.data = chalk.black;
  }

  console.log(Log.border(startLine));
  console.log(Log.title(`Console.log:        ( ${component} )`));
  console.log(Log.border(startLine));
  const consoleMsg = Log.data(JSON.stringify(dataToShow, null, 3));
  console.log(consoleMsg);
  console.log(Log.border(endLine));
};

export const highLightError = ({
  error,
  component,
}: {
  error: any;
  component: string;
}) => {
  const ErrMsg = Error.data(JSON.stringify(error, null, 3));

  const _server = isItServer();
  if (!_server) {
    Error.data = chalk.black;
  }

  console.log(Error.border(startLine));
  console.log(Error.title(`Console.log: ERROR       ( ${component} )`));
  console.log(Error.border(startLine));
  console.log(ErrMsg);
  console.log(Error.border(endLine));
};

export const conditionalLog_V2 = ({
  data,
  type,
  show,
  name,
  additionalMsg = '',
}: {
  show: boolean;
  type:
    | 'API-PAYLOAD'
    | 'API-RESPONSE'
    | 'API-ERROR'
    | 'SERVER_METHOD'
    | 'SPECIAL_FUNCTION'
    | 'CATCH'
    | 'CONTROLLER'
    | 'API';
  name: string;
  additionalMsg?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  error?: boolean;
}) => {
  if (!__show.all) return;

  if (show) {
    if (__show.services.payload && type === 'API-PAYLOAD') {
      const message = `API : ${name} - Payload ${
        additionalMsg ? `- ${additionalMsg}` : ''
      }`;
      highLightResponse({ dataToShow: data, component: message });
      return;
    }

    if (__show.services.response && type === 'API-RESPONSE') {
      let msgType = 'Response';
      let error = false;
      if (data === null) {
        msgType = 'No data found';
        error = true;
      }

      if ('length' in data) {
        if (data.length === 0) {
          msgType = 'No data found';
          error = true;
        }
      }

      const message = `API : ${name} - ${msgType} ${
        additionalMsg ? `- ${additionalMsg}` : ''
      }`;
      if (error) {
        highLightError({ error: data, component: message });
        return;
      }
      highLightResponse({ dataToShow: data, component: message });
      return;
    }

    if (__show.services.error && type === 'API-ERROR') {
      const message = `API : ${name} - Error ${
        additionalMsg ? `- ${additionalMsg}` : ''
      }`;
      highLightError({ error: data, component: message });
      return;
    }

    if (__show.serverMethods && type === 'SERVER_METHOD') {
      const message = `NEXTJS RESPONSE : ${name} ${
        additionalMsg ? `- ${additionalMsg}` : ''
      }`;
      highLightResponse({ dataToShow: data, component: message });
      return;
    }

    if (__show.functions && type === 'SPECIAL_FUNCTION') {
      const message = `FUNCTION : ${name} ${
        additionalMsg ? `- ${additionalMsg}` : ''
      }`;
      highLightResponse({ dataToShow: data, component: message });
      return;
    }

    if (__show.catch && type === 'CATCH') {
      const message = `tryCatch : ${name} ${
        additionalMsg ? `- ${additionalMsg}` : ''
      }`;
      highLightError({ error: data, component: message });
      return;
    }
  }
};
