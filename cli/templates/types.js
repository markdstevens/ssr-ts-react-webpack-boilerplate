const typesTemplate = (name, pathParams = {}) => {
  const getPathParams = () =>
    pathParams
        .map((param) => param.name)
        .map((name, i) => {
          let str = `${name}: string;`;
          if (i !== pathParams.length - 1) {
            str += ('\n' + '  ');
          }
          return str;
        }).join('');

  const propType = Object.keys(pathParams).length 
    ? `RouteComponentProps<${name.pascal}Params> & DataFetchingProps<${name.pascal}State>` 
    : `DataFetchingProps<${name.pascal}State>`;

  let str = `import { State } from 'stores/base';
import { DataFetchingProps } from 'hooks/use-data-fetching';
`;

  if (pathParams.length) {
    str += "import { RouteComponentProps } from 'react-router-dom';\n";
  }

  str += `
export type ${name.pascal}Props = ${propType};
export type ${name.pascal}State = State<${name.pascal}ApiResponse>;
`;
  if (pathParams.length > 0) {
    str += `export interface ${name.pascal}Params {
  [key: string]: string;
  ${getPathParams()}
}
`;
  }

  return str;
};

module.exports = typesTemplate;
