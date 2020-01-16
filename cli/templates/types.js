const typesTemplate = (name, pathParams = {}) => {
  const getPathParams = () =>
    pathParams
        .map((param) => param.name)
        .map((name, i) => {
          let str = `${name}: 'string';`;
          if (i !== pathParams.length - 1) {
            str += ('\n' + '  ');
          }
          return str;
        }).join('');

  const paramsTypeStr = Object.keys(pathParams).length 
    ? `<${name.pascal}Params>` 
    : '';

  let str = `import {State} from 'stores/base';
import {RouteComponentProps} from 'react-router-dom';

export type ${name.pascal}Props = RouteComponentProps${paramsTypeStr};
export type ${name.pascal}State = State<${name.pascal}ApiResponse>;
`;
  if (pathParams.length > 0) {
    str += `export interface ${name.pascal}Params {
  ${getPathParams()}
}
`;
  }

  return str;
};

module.exports = typesTemplate;
