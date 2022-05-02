import { hackernewsApi } from 'services/hackernews';
import styled from 'styled-components';
import ArticleListItem from 'components/article/ListItem';
import Error from 'components/common/Error';
import Loader from 'components/common/Loader';
import { useState } from 'react';
import useLoadMore from 'hooks/useLoadMore';

// #region styled
const List = styled.ul`
  width: 100%;
  overflow: hidden;

  li {
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }
  li:first-child {
    border: 1px solid var(--border);
  }
`;

const NoArticles = styled.li`
  /* min-height: 200px; */
  padding: 1em;
  background: var(--bg-light);
  text-align: center;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1em 0;

  input {
    max-width: 300px;
    flex: 1;
    border-radius: 4px 0 0 4px;
  }
  button {
    border-radius: 0 4px 4px 0;
  }
`;

const LoadMore = styled.button`
  margin-top: 2em;
  max-width: 300px;
  width: 100%;
`;
// #endregion

function ArticleList() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [hidden, setHidden] = useState<Number[]>([]);
  const { data, error, isLoading, canLoadMore, loadMore, reset } = useLoadMore<Article>(hackernewsApi.useGetArticlesQuery, { searchValue });

  if (isLoading) return <Loader />;
  if (!data) return <Error error={error} />;

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && performSearch();
  const performSearch = () => {
    if (isLoading || searchValue === inputValue) return;
    setSearchValue(inputValue);
    setHidden([]);
    reset();
  };

  return (
    <>
      <SearchContainer>
        <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <button onClick={performSearch} disabled={isLoading}>
          Search
        </button>
      </SearchContainer>
      <List>
        {data.hits.length === 0 && <NoArticles>No articles found</NoArticles>}
        {data.hits.map(a =>
          hidden.includes(a.objectID) ? (
            <div key={a.objectID}></div>
          ) : (
            <ArticleListItem key={a.objectID} article={a} setHidden={setHidden} />
          )
        )}
      </List>
      {canLoadMore && (
        <LoadMore onClick={loadMore} disabled={isLoading}>
          Load more
        </LoadMore>
      )}
    </>
  );
}

export default ArticleList;
