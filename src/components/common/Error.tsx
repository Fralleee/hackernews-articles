import styled from 'styled-components';

// #region styled
const Container = styled.div`
  h1 {
    color: firebrick;
    font-weight: bold;
  }
`;
// #endregion

function Error({ error }: { error: any }) {
  return (
    <Container>
      <h1>Error</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Container>
  );
}

export default Error;
