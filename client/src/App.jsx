import {
  ApolloProvider,
  ApolloClient,
  gql,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query getUs {
        getPosts {
          id
        }
      }
    `,
  })
  .then((res) => {
    console.log(res);
  });

const App = () => {
  const handleClick = (e, second) => {};
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>next line</h1>
        <form>
          <input type="text" name="abu" onChange={handleClick} />
        </form>
      </div>
    </ApolloProvider>
  );
};

export default App;
