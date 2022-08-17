/** @jsxImportSource theme-ui */
import React from 'react';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.min.css';
//import './codemirror.css'; // or add theme from https://codemirror.net/5/theme/ to public/index.html <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.23.0/theme/${theme}.css" />

const defaultQuery = `query {
  
}`;

const fetcher = async (graphQLParams) => {
  const data = await fetch(`${process.env.REACT_APP_GRAPHQL_ENDPOINT}/playground`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(graphQLParams),
    credentials: 'same-origin',
  });
  return data.json().catch(() => data.text());
};

const Playground = () => {
  return (
    <div className="playground">
      <GraphiQL defaultQuery={defaultQuery} fetcher={fetcher} headerEditorEnabled={false}>
        <GraphiQL.Logo> </GraphiQL.Logo> {/* For empty logo */}
        <GraphiQL.Toolbar /> {/* For empty toolbar */}
      </GraphiQL>
    </div>
  );
};

export default Playground;
