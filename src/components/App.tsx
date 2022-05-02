import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from 'components/article/List';
import ArticleDetails from 'components/article/Details';

// #region styled
const Wrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding-bottom: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  padding-top: 0.5em;
  width: 100%;
  text-align: center;
  border-radius: 4px;
  background-color: var(--hackernews);
  color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--text);
`;
// #endregion

function App() {
  return (
    <Wrapper>
      <Heading>Hackernews Articles</Heading>
      <Router>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
        </Routes>
      </Router>
    </Wrapper>
  );
}

export default App;

