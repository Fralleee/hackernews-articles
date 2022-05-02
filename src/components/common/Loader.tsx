import styled from 'styled-components';

// #region styled
const Container = styled.div`
  h1 {
    font-weight: bold;
  }
`;
// #endregion

function Loader() {
  return (
    <Container>
      <h1>Loading ...</h1>
    </Container>
  );
}

export default Loader;
